export interface DepartmentSummaryDto {
  id: string;
  code: string;
  nameTh: string;
  nameEn: string;
  facultyNameTh: string | null;
  facultyNameEn: string | null;
  headName: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  officeLocation: string | null;
  descriptionTh: string | null;
  descriptionEn: string | null;
  isActive: boolean;
  curriculumCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface DepartmentCurriculumItem {
  id: string;
  code: string;
  nameTh: string;
  nameEn: string;
  degreeTitleTh: string;
  degreeTitleEn: string;
  totalCredits: number;
  isActive: boolean;
}

export interface DepartmentDto extends DepartmentSummaryDto {
  curriculums: DepartmentCurriculumItem[];
}

export interface DepartmentInput {
  code: string;
  nameTh: string;
  nameEn: string;
  facultyNameTh?: string | null;
  facultyNameEn?: string | null;
  headName?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  officeLocation?: string | null;
  descriptionTh?: string | null;
  descriptionEn?: string | null;
  isActive?: boolean;
}

export { DEPARTMENT_P, DEPARTMENT_PERMISSIONS } from "./permissions";
