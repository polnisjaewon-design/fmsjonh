export interface ThesisDto {
  id: string;
  authorName: string;
  titleTh: string;
  titleEn?: string | null;
  advisorName: string;
  coAdvisorName?: string | null;
  status: string;
  abstractTh?: string | null;
  abstractEn?: string | null;
  keywords?: string | null;
  similarityPercentage?: number | null;
  defenseDate?: string | null;
  documentUrl?: string | null;
  newBodyOfKnowledge?: string | null;
  yearGraduated?: number | null;
}
