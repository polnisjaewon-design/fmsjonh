import {
  listDepartments as listDepts,
  getDepartmentById as getDeptById,
  listAllCurriculumsForSelection as listCurrs,
} from "./_internal/services";

export async function listDepartments(
  tenantId: string,
  options?: { search?: string; isActive?: boolean }
) {
  return listDepts(tenantId, options);
}

export async function getDepartmentById(tenantId: string, id: string) {
  return getDeptById(tenantId, id);
}

export async function listAllCurriculumsForSelection(tenantId: string) {
  return listCurrs(tenantId);
}
