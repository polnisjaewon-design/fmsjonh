export interface StudentPetitionDto {
  id: string;
  petitionNo: string;
  studentCode: string;
  studentName: string;
  templateTitle: string;
  title: string;
  reason: string;
  status: string;
  currentStep: number;
  approverNote?: string | null;
  createdAt: string;
}

export interface DocumentTemplateDto {
  id: string;
  code: string;
  titleTh: string;
  description?: string | null;
}
