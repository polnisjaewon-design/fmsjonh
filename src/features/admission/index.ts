export interface AdmissionRoundDto {
  id: string;
  year: number;
  term: number;
  titleTh: string;
  titleEn?: string | null;
  startDate: string;
  endDate: string;
  feeAmount: number;
  isActive: boolean;
}

export interface ApplicationDto {
  id: string;
  roundId: string;
  applicationNo: string;
  applicantType: string;
  titleTh: string;
  firstNameTh: string;
  lastNameTh?: string | null;
  monasticName?: string | null;
  fullNameTh: string;
  templeName?: string | null;
  phone: string;
  email: string;
  educationBackground?: string | null;
  paymentSlipUrl?: string | null;
  status: string;
  createdAt: string;
}
