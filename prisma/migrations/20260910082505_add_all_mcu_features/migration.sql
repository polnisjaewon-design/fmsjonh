-- CreateTable
CREATE TABLE "admission_rounds" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "year" INTEGER NOT NULL DEFAULT 2569,
    "term" INTEGER NOT NULL DEFAULT 1,
    "title_th" VARCHAR(255) NOT NULL,
    "title_en" VARCHAR(255),
    "description" TEXT,
    "start_date" TIMESTAMPTZ NOT NULL,
    "end_date" TIMESTAMPTZ NOT NULL,
    "fee_amount" DECIMAL(10,2) NOT NULL DEFAULT 500,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "admission_rounds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applications" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "round_id" UUID NOT NULL,
    "application_no" VARCHAR(50) NOT NULL,
    "applicant_type" VARCHAR(20) NOT NULL DEFAULT 'MONK',
    "title_th" VARCHAR(50) NOT NULL,
    "first_name_th" VARCHAR(100) NOT NULL,
    "last_name_th" VARCHAR(100),
    "monastic_name" VARCHAR(100),
    "monastic_rank" VARCHAR(100),
    "temple_name" VARCHAR(255),
    "id_card_or_passport" VARCHAR(50) NOT NULL,
    "phone" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "education_background" TEXT,
    "payment_slip_url" VARCHAR(500),
    "status" VARCHAR(50) NOT NULL DEFAULT 'SUBMITTED',
    "reviewer_note" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_profiles" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "user_id" UUID,
    "student_code" VARCHAR(50) NOT NULL,
    "applicant_type" VARCHAR(20) NOT NULL DEFAULT 'MONK',
    "title_th" VARCHAR(50) NOT NULL,
    "first_name_th" VARCHAR(100) NOT NULL,
    "last_name_th" VARCHAR(100),
    "monastic_name" VARCHAR(100),
    "monastic_rank" VARCHAR(100),
    "temple_name" VARCHAR(255),
    "ecclesiastical_province" VARCHAR(100),
    "batch_year" INTEGER NOT NULL DEFAULT 2569,
    "status" VARCHAR(50) NOT NULL DEFAULT 'STUDYING',
    "phone" VARCHAR(50),
    "email" VARCHAR(255),
    "enrollment_date" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "student_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "document_templates" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "title_th" VARCHAR(255) NOT NULL,
    "title_en" VARCHAR(255),
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "document_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_petitions" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "student_id" UUID NOT NULL,
    "template_id" UUID NOT NULL,
    "petition_no" VARCHAR(50) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "reason" TEXT NOT NULL,
    "attachment_url" VARCHAR(500),
    "status" VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    "current_step" INTEGER NOT NULL DEFAULT 1,
    "approver_note" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "student_petitions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academic_semesters" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "year" INTEGER NOT NULL DEFAULT 2569,
    "semester" INTEGER NOT NULL DEFAULT 1,
    "name_th" VARCHAR(100) NOT NULL,
    "is_current" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "academic_semesters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "class_schedules" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "semester_id" UUID NOT NULL,
    "course_code" VARCHAR(50) NOT NULL,
    "course_name" VARCHAR(255) NOT NULL,
    "instructor_name" VARCHAR(255) NOT NULL,
    "day_of_week" VARCHAR(20) NOT NULL,
    "start_time" VARCHAR(10) NOT NULL,
    "end_time" VARCHAR(10) NOT NULL,
    "room_number" VARCHAR(50) NOT NULL,
    "teaching_mode" VARCHAR(20) NOT NULL DEFAULT 'HYBRID',
    "online_meeting_url" VARCHAR(500),
    "online_meeting_passcode" VARCHAR(100),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "class_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "theses" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "student_id" UUID NOT NULL,
    "author_name" VARCHAR(255) NOT NULL,
    "title_th" VARCHAR(500) NOT NULL,
    "title_en" VARCHAR(500),
    "advisor_name" VARCHAR(255) NOT NULL,
    "co_advisor_name" VARCHAR(255),
    "status" VARCHAR(50) NOT NULL DEFAULT 'IN_PROGRESS',
    "abstract_th" TEXT,
    "abstract_en" TEXT,
    "keywords" VARCHAR(500),
    "similarity_percentage" DECIMAL(5,2),
    "defense_date" TIMESTAMPTZ,
    "document_url" VARCHAR(500),
    "new_body_of_knowledge" TEXT,
    "year_graduated" INTEGER,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "theses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "admission_rounds_tenant_id_is_active_idx" ON "admission_rounds"("tenant_id", "is_active");

-- CreateIndex
CREATE INDEX "applications_round_id_status_idx" ON "applications"("round_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "applications_tenant_id_application_no_key" ON "applications"("tenant_id", "application_no");

-- CreateIndex
CREATE INDEX "student_profiles_tenant_id_batch_year_status_idx" ON "student_profiles"("tenant_id", "batch_year", "status");

-- CreateIndex
CREATE UNIQUE INDEX "student_profiles_tenant_id_student_code_key" ON "student_profiles"("tenant_id", "student_code");

-- CreateIndex
CREATE UNIQUE INDEX "document_templates_tenant_id_code_key" ON "document_templates"("tenant_id", "code");

-- CreateIndex
CREATE INDEX "student_petitions_student_id_status_idx" ON "student_petitions"("student_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "student_petitions_tenant_id_petition_no_key" ON "student_petitions"("tenant_id", "petition_no");

-- CreateIndex
CREATE UNIQUE INDEX "academic_semesters_tenant_id_year_semester_key" ON "academic_semesters"("tenant_id", "year", "semester");

-- CreateIndex
CREATE INDEX "class_schedules_semester_id_day_of_week_idx" ON "class_schedules"("semester_id", "day_of_week");

-- CreateIndex
CREATE INDEX "theses_tenant_id_status_idx" ON "theses"("tenant_id", "status");

-- AddForeignKey
ALTER TABLE "admission_rounds" ADD CONSTRAINT "admission_rounds_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_round_id_fkey" FOREIGN KEY ("round_id") REFERENCES "admission_rounds"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_profiles" ADD CONSTRAINT "student_profiles_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_templates" ADD CONSTRAINT "document_templates_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_petitions" ADD CONSTRAINT "student_petitions_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_petitions" ADD CONSTRAINT "student_petitions_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_petitions" ADD CONSTRAINT "student_petitions_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "document_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_semesters" ADD CONSTRAINT "academic_semesters_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_schedules" ADD CONSTRAINT "class_schedules_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_schedules" ADD CONSTRAINT "class_schedules_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "academic_semesters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "theses" ADD CONSTRAINT "theses_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "theses" ADD CONSTRAINT "theses_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
