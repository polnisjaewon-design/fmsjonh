export interface CourseDto {
  id: string;
  courseCode: string;
  nameTh: string;
  nameEn?: string | null;
  creditTotal: number;
  creditLecture: number;
  creditLab: number;
  creditSelf: number;
  courseType: string;
  descriptionTh?: string | null;
  descriptionEn?: string | null;
}

export interface StudyPlanDto {
  id: string;
  planType: string;
  nameTh: string;
  nameEn?: string | null;
  descriptionTh?: string | null;
  descriptionEn?: string | null;
  totalCredits: number;
}

export interface CurriculumDto {
  id: string;
  code: string;
  nameTh: string;
  nameEn?: string | null;
  degreeTitleTh: string;
  degreeTitleEn?: string | null;
  totalCredits: number;
  descriptionTh?: string | null;
  descriptionEn?: string | null;
  studyPlans: StudyPlanDto[];
  courses: CourseDto[];
}
