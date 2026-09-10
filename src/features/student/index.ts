export interface StudentProfileDto {
  id: string;
  studentCode: string;
  applicantType: string;
  titleTh: string;
  firstNameTh: string;
  lastNameTh?: string | null;
  monasticName?: string | null;
  fullNameTh: string;
  monasticRank?: string | null;
  templeName?: string | null;
  ecclesiasticalProvince?: string | null;
  batchYear: number;
  status: string;
  phone?: string | null;
  email?: string | null;
  enrollmentDate?: string | null;
}
