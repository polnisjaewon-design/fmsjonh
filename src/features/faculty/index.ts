export interface FacultyMemberDto {
  id: string;
  academicRank?: string | null;
  monasticRank?: string | null;
  titleTh: string;
  firstNameTh: string;
  lastNameTh?: string | null;
  monasticName?: string | null;
  fullNameTh: string;
  titleEn?: string | null;
  firstNameEn?: string | null;
  lastNameEn?: string | null;
  templeName?: string | null;
  positionTh: string;
  positionEn?: string | null;
  isVipassanaMaster: boolean;
  isExecutive: boolean;
  expertise?: string | null;
  educationHistory?: string | null;
  email?: string | null;
  phone?: string | null;
  avatarUrl?: string | null;
  sortOrder: number;
}
