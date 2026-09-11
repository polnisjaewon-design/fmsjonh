import "server-only";
export { getSessionContext, requireSession } from "./_internal/session";
export { requirePermission, hasPermission, permissionScopes } from "./_internal/rbac";
export { P } from "./permissions";
export { auth, handlers, signIn, signOut, oauthProviderIds } from "./_internal/auth";
export { resolvePalette, getTenantPalette, getTenantSettings, getDefaultTenantId, resolveTenantSettings, getTenantSmtp, type TenantSettings } from "./_internal/services/tenant.service";
export type { SmtpSettings, OrgInfo } from "./_internal/validations/settings";
export { getDashboardStats } from "./_internal/services/dashboard.service";
export { writeAudit, type AuditEntry } from "./_internal/audit";
