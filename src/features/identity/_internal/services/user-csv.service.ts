import { prisma } from "@/shared/lib/infra/prisma";
import { env } from "@/shared/lib/infra/env";
import { sendMail } from "@/shared/lib/infra/mailer";
import { issueToken, TOKEN_TTL } from "../tokens";
import { writeAudit } from "../audit";
import { passwordSetupEmail } from "../email-templates";
import { SUPER_ADMIN_CODE } from "../../permissions";
import type { ExportUsersQuery, ImportUsersBatchInput } from "../validations/users";

interface Actor {
  tenantId: string;
  actorId: string;
  isSuperAdmin: boolean;
  permissions: string[];
}

function escapeCsvCell(val: string | null | undefined): string {
  if (val === null || val === undefined) return "";
  const str = String(val);
  if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function exportUsersToCsv(
  tenantId: string,
  q: ExportUsersQuery
): Promise<{ csvContent: string; filename: string; count: number }> {
  const where = {
    tenantId,
    ...(q.status === "active"
      ? { isActive: true, user: { isActive: true } }
      : q.status === "inactive"
        ? { OR: [{ isActive: false }, { user: { isActive: false } }] }
        : {}),
    ...(q.roleId ? { userRoles: { some: { roleId: q.roleId } } } : {}),
    ...(q.search
      ? {
          user: {
            OR: [
              { name: { contains: q.search, mode: "insensitive" as const } },
              { email: { contains: q.search, mode: "insensitive" as const } },
            ],
          },
        }
      : {}),
  };

  const rows = await prisma.userTenant.findMany({
    where,
    orderBy: { user: { name: "asc" } },
    include: {
      user: true,
      userRoles: {
        select: {
          role: {
            select: { id: true, code: true, nameTh: true, nameEn: true },
          },
        },
      },
    },
  });

  const headers = [
    "ID",
    "อีเมล (Email)",
    "ชื่อ-นามสกุล (Name)",
    "รหัสบทบาท (Role Codes)",
    "ชื่อบทบาท (Role Names)",
    "สถานะ (Status)",
    "ต้องเปลี่ยนรหัสผ่าน (Must Change Password)",
    "เข้าสู่ระบบล่าสุด (Last Login At)",
  ];

  const lines: string[] = [headers.join(",")];

  for (const r of rows) {
    const roleCodes = r.userRoles.map((ur) => ur.role.code).join("; ");
    const roleNames = r.userRoles.map((ur) => ur.role.nameTh).join("; ");
    const statusText = r.isActive && r.user.isActive ? "ใช้งาน (Active)" : "ระงับ (Inactive)";
    const mustChangeText = r.user.mustChangePassword ? "ใช่ (Yes)" : "ไม่ใช่ (No)";
    const lastLogin = r.user.lastLoginAt ? r.user.lastLoginAt.toISOString() : "";

    const row = [
      escapeCsvCell(r.user.id),
      escapeCsvCell(r.user.email),
      escapeCsvCell(r.user.name),
      escapeCsvCell(roleCodes),
      escapeCsvCell(roleNames),
      escapeCsvCell(statusText),
      escapeCsvCell(mustChangeText),
      escapeCsvCell(lastLogin),
    ];
    lines.push(row.join(","));
  }

  // UTF-8 BOM for Thai encoding in Excel
  const bom = "\uFEFF";
  const csvContent = bom + lines.join("\r\n");
  const filename = `users_export_${new Date().toISOString().slice(0, 10)}.csv`;

  return { csvContent, filename, count: rows.length };
}

export async function importUsersBatch(
  input: Actor & ImportUsersBatchInput
): Promise<{
  total: number;
  successCount: number;
  failedCount: number;
  results: Array<{ email: string; name: string; success: boolean; error?: string }>;
}> {
  const { tenantId, actorId, isSuperAdmin, permissions, users, sendPasswordSetupEmail } = input;
  const results: Array<{ email: string; name: string; success: boolean; error?: string }> = [];

  // 1. Fetch all tenant roles to validate role assignments
  const tenantRoles = await prisma.role.findMany({
    where: { tenantId },
    include: {
      rolePermissions: {
        select: { permission: { select: { code: true } } },
      },
    },
  });
  const roleMap = new Map(tenantRoles.map((r) => [r.id, r]));
  const heldPermissions = new Set(permissions);

  for (const u of users) {
    const email = u.email.toLowerCase().trim();
    const name = u.name.trim();

    try {
      // Check existing email
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        results.push({ email, name, success: false, error: "อีเมลนี้มีอยู่ในระบบแล้ว (Email already exists)" });
        continue;
      }

      // Validate roles
      for (const roleId of u.roleIds) {
        const role = roleMap.get(roleId);
        if (!role) {
          throw new Error("ไม่พบบทบาทที่ระบุในระบบ");
        }
        if (!isSuperAdmin) {
          if (role.code === SUPER_ADMIN_CODE) {
            throw new Error("เฉพาะผู้ดูแลสูงสุดเท่านั้นที่สามารถกำหนดบทบาท SUPER_ADMIN ได้");
          }
          const hasUnheld = role.rolePermissions.some((rp) => !heldPermissions.has(rp.permission.code));
          if (hasUnheld) {
            throw new Error("ไม่สามารถมอบบทบาทที่มีสิทธิ์เกินกว่าที่ตนเองถืออยู่ได้");
          }
        }
      }

      // Create user and relationships in a transaction
      const { rawToken } = await prisma.$transaction(async (tx) => {
        const createdUser = await tx.user.create({
          data: {
            email,
            name,
            mustChangePassword: true,
          },
        });

        const userTenant = await tx.userTenant.create({
          data: {
            userId: createdUser.id,
            tenantId,
            isActive: true,
          },
        });

        await tx.userRole.createMany({
          data: u.roleIds.map((roleId) => ({
            userTenantId: userTenant.id,
            roleId,
            scopeType: "ALL",
            scopeId: null,
          })),
        });

        const { raw } = await issueToken(
          {
            userId: createdUser.id,
            purpose: "PASSWORD_RESET",
            ttlMs: TOKEN_TTL.PASSWORD_SETUP,
          },
          tx
        );

        await writeAudit(
          {
            tenantId,
            actorId,
            action: "user.import",
            entity: "user",
            entityId: createdUser.id,
            after: { email, name, roleIds: u.roleIds },
          },
          tx
        );

        return { rawToken: raw };
      });

      // Optionally send email
      if (sendPasswordSetupEmail) {
        const link = `${env().APP_URL}/reset-password/${rawToken}`;
        await sendMail({
          to: email,
          ...passwordSetupEmail("th", { name, link, hours: 72 }),
        });
      }

      results.push({ email, name, success: true });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการสร้างผู้ใช้";
      results.push({ email, name, success: false, error: msg });
    }
  }

  const successCount = results.filter((r) => r.success).length;
  const failedCount = results.length - successCount;

  return {
    total: users.length,
    successCount,
    failedCount,
    results,
  };
}
