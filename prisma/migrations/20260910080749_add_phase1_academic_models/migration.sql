-- CreateTable
CREATE TABLE "sample_items" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "status" VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "sample_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news_categories" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "name_th" VARCHAR(100) NOT NULL,
    "name_en" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "news_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news_articles" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "category_id" UUID,
    "title_th" VARCHAR(255) NOT NULL,
    "title_en" VARCHAR(255),
    "slug" VARCHAR(255) NOT NULL,
    "summary_th" TEXT,
    "summary_en" TEXT,
    "content_th" TEXT NOT NULL,
    "content_en" TEXT,
    "cover_image_url" VARCHAR(500),
    "is_pinned" BOOLEAN NOT NULL DEFAULT false,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "published_at" TIMESTAMPTZ,
    "view_count" INTEGER NOT NULL DEFAULT 0,
    "author_id" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "news_articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "curriculums" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "name_th" VARCHAR(255) NOT NULL,
    "name_en" VARCHAR(255) NOT NULL,
    "degree_title_th" VARCHAR(255) NOT NULL,
    "degree_title_en" VARCHAR(255) NOT NULL,
    "total_credits" INTEGER NOT NULL DEFAULT 36,
    "description_th" TEXT,
    "description_en" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "curriculums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "study_plans" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "curriculum_id" UUID NOT NULL,
    "plan_type" VARCHAR(20) NOT NULL,
    "name_th" VARCHAR(255) NOT NULL,
    "name_en" VARCHAR(255) NOT NULL,
    "description_th" TEXT,
    "description_en" TEXT,
    "total_credits" INTEGER NOT NULL DEFAULT 36,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "study_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "curriculum_id" UUID NOT NULL,
    "course_code" VARCHAR(50) NOT NULL,
    "name_th" VARCHAR(255) NOT NULL,
    "name_en" VARCHAR(255) NOT NULL,
    "credit_total" INTEGER NOT NULL DEFAULT 3,
    "credit_lecture" INTEGER NOT NULL DEFAULT 3,
    "credit_lab" INTEGER NOT NULL DEFAULT 0,
    "credit_self" INTEGER NOT NULL DEFAULT 6,
    "course_type" VARCHAR(50) NOT NULL DEFAULT 'CORE',
    "description_th" TEXT,
    "description_en" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faculty_members" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "user_id" UUID,
    "academic_rank" VARCHAR(50),
    "monastic_rank" VARCHAR(100),
    "title_th" VARCHAR(50) NOT NULL,
    "first_name_th" VARCHAR(100) NOT NULL,
    "last_name_th" VARCHAR(100),
    "monastic_name" VARCHAR(100),
    "title_en" VARCHAR(50),
    "first_name_en" VARCHAR(100),
    "last_name_en" VARCHAR(100),
    "temple_name" VARCHAR(255),
    "position_th" VARCHAR(255) NOT NULL,
    "position_en" VARCHAR(255),
    "is_vipassana_master" BOOLEAN NOT NULL DEFAULT false,
    "is_executive" BOOLEAN NOT NULL DEFAULT false,
    "expertise" TEXT,
    "education_history" TEXT,
    "email" VARCHAR(255),
    "phone" VARCHAR(50),
    "avatar_url" VARCHAR(500),
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "faculty_members_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "sample_items_tenant_id_idx" ON "sample_items"("tenant_id");

-- CreateIndex
CREATE INDEX "news_categories_tenant_id_idx" ON "news_categories"("tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "news_categories_tenant_id_slug_key" ON "news_categories"("tenant_id", "slug");

-- CreateIndex
CREATE INDEX "news_articles_tenant_id_is_published_published_at_idx" ON "news_articles"("tenant_id", "is_published", "published_at");

-- CreateIndex
CREATE UNIQUE INDEX "news_articles_tenant_id_slug_key" ON "news_articles"("tenant_id", "slug");

-- CreateIndex
CREATE INDEX "curriculums_tenant_id_idx" ON "curriculums"("tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "curriculums_tenant_id_code_key" ON "curriculums"("tenant_id", "code");

-- CreateIndex
CREATE INDEX "study_plans_curriculum_id_idx" ON "study_plans"("curriculum_id");

-- CreateIndex
CREATE INDEX "courses_curriculum_id_idx" ON "courses"("curriculum_id");

-- CreateIndex
CREATE UNIQUE INDEX "courses_tenant_id_course_code_key" ON "courses"("tenant_id", "course_code");

-- CreateIndex
CREATE INDEX "faculty_members_tenant_id_sort_order_idx" ON "faculty_members"("tenant_id", "sort_order");

-- AddForeignKey
ALTER TABLE "sample_items" ADD CONSTRAINT "sample_items_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_categories" ADD CONSTRAINT "news_categories_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_articles" ADD CONSTRAINT "news_articles_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_articles" ADD CONSTRAINT "news_articles_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "news_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curriculums" ADD CONSTRAINT "curriculums_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "study_plans" ADD CONSTRAINT "study_plans_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "study_plans" ADD CONSTRAINT "study_plans_curriculum_id_fkey" FOREIGN KEY ("curriculum_id") REFERENCES "curriculums"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_curriculum_id_fkey" FOREIGN KEY ("curriculum_id") REFERENCES "curriculums"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faculty_members" ADD CONSTRAINT "faculty_members_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
