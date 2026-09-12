--
-- PostgreSQL database dump
--

\restrict 5yCzHxUvzXNb561AjVKvOoqnxkP9pQaflGTbpDaxjpzIWk7rkfCCVpZJRRhY7He

-- Dumped from database version 16.15
-- Dumped by pg_dump version 16.15

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.user_tenants DROP CONSTRAINT IF EXISTS user_tenants_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.user_tenants DROP CONSTRAINT IF EXISTS user_tenants_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.user_roles DROP CONSTRAINT IF EXISTS user_roles_user_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.user_roles DROP CONSTRAINT IF EXISTS user_roles_role_id_fkey;
ALTER TABLE IF EXISTS ONLY public.theses DROP CONSTRAINT IF EXISTS theses_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.theses DROP CONSTRAINT IF EXISTS theses_student_id_fkey;
ALTER TABLE IF EXISTS ONLY public.study_plans DROP CONSTRAINT IF EXISTS study_plans_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.study_plans DROP CONSTRAINT IF EXISTS study_plans_curriculum_id_fkey;
ALTER TABLE IF EXISTS ONLY public.student_profiles DROP CONSTRAINT IF EXISTS student_profiles_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.student_petitions DROP CONSTRAINT IF EXISTS student_petitions_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.student_petitions DROP CONSTRAINT IF EXISTS student_petitions_template_id_fkey;
ALTER TABLE IF EXISTS ONLY public.student_petitions DROP CONSTRAINT IF EXISTS student_petitions_student_id_fkey;
ALTER TABLE IF EXISTS ONLY public.sample_items DROP CONSTRAINT IF EXISTS sample_items_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.roles DROP CONSTRAINT IF EXISTS roles_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.role_permissions DROP CONSTRAINT IF EXISTS role_permissions_role_id_fkey;
ALTER TABLE IF EXISTS ONLY public.role_permissions DROP CONSTRAINT IF EXISTS role_permissions_permission_id_fkey;
ALTER TABLE IF EXISTS ONLY public.news_categories DROP CONSTRAINT IF EXISTS news_categories_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.news_articles DROP CONSTRAINT IF EXISTS news_articles_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.news_articles DROP CONSTRAINT IF EXISTS news_articles_category_id_fkey;
ALTER TABLE IF EXISTS ONLY public.faculty_members DROP CONSTRAINT IF EXISTS faculty_members_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.document_templates DROP CONSTRAINT IF EXISTS document_templates_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.departments DROP CONSTRAINT IF EXISTS departments_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.curriculums DROP CONSTRAINT IF EXISTS curriculums_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.curriculums DROP CONSTRAINT IF EXISTS curriculums_department_id_fkey;
ALTER TABLE IF EXISTS ONLY public.courses DROP CONSTRAINT IF EXISTS courses_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.courses DROP CONSTRAINT IF EXISTS courses_curriculum_id_fkey;
ALTER TABLE IF EXISTS ONLY public.class_schedules DROP CONSTRAINT IF EXISTS class_schedules_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.class_schedules DROP CONSTRAINT IF EXISTS class_schedules_semester_id_fkey;
ALTER TABLE IF EXISTS ONLY public.auth_tokens DROP CONSTRAINT IF EXISTS auth_tokens_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.audit_logs DROP CONSTRAINT IF EXISTS audit_logs_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.audit_logs DROP CONSTRAINT IF EXISTS audit_logs_actor_id_fkey;
ALTER TABLE IF EXISTS ONLY public.applications DROP CONSTRAINT IF EXISTS applications_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.applications DROP CONSTRAINT IF EXISTS applications_round_id_fkey;
ALTER TABLE IF EXISTS ONLY public.admission_rounds DROP CONSTRAINT IF EXISTS admission_rounds_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.academic_semesters DROP CONSTRAINT IF EXISTS academic_semesters_tenant_id_fkey;
DROP INDEX IF EXISTS public.users_email_key;
DROP INDEX IF EXISTS public.user_tenants_user_id_tenant_id_key;
DROP INDEX IF EXISTS public.user_tenants_tenant_id_idx;
DROP INDEX IF EXISTS public.user_roles_user_tenant_id_role_id_scope_type_scope_id_key;
DROP INDEX IF EXISTS public.user_roles_role_id_idx;
DROP INDEX IF EXISTS public.theses_tenant_id_status_idx;
DROP INDEX IF EXISTS public.tenants_code_key;
DROP INDEX IF EXISTS public.study_plans_curriculum_id_idx;
DROP INDEX IF EXISTS public.student_profiles_tenant_id_student_code_key;
DROP INDEX IF EXISTS public.student_profiles_tenant_id_batch_year_status_idx;
DROP INDEX IF EXISTS public.student_petitions_tenant_id_petition_no_key;
DROP INDEX IF EXISTS public.student_petitions_student_id_status_idx;
DROP INDEX IF EXISTS public.sample_items_tenant_id_idx;
DROP INDEX IF EXISTS public.roles_tenant_id_code_key;
DROP INDEX IF EXISTS public.permissions_code_key;
DROP INDEX IF EXISTS public.news_categories_tenant_id_slug_key;
DROP INDEX IF EXISTS public.news_categories_tenant_id_idx;
DROP INDEX IF EXISTS public.news_articles_tenant_id_slug_key;
DROP INDEX IF EXISTS public.news_articles_tenant_id_is_published_published_at_idx;
DROP INDEX IF EXISTS public.faculty_members_tenant_id_sort_order_idx;
DROP INDEX IF EXISTS public.document_templates_tenant_id_code_key;
DROP INDEX IF EXISTS public.departments_tenant_id_idx;
DROP INDEX IF EXISTS public.departments_tenant_id_code_key;
DROP INDEX IF EXISTS public.curriculums_tenant_id_idx;
DROP INDEX IF EXISTS public.curriculums_tenant_id_code_key;
DROP INDEX IF EXISTS public.curriculums_department_id_idx;
DROP INDEX IF EXISTS public.courses_tenant_id_course_code_key;
DROP INDEX IF EXISTS public.courses_curriculum_id_idx;
DROP INDEX IF EXISTS public.class_schedules_semester_id_day_of_week_idx;
DROP INDEX IF EXISTS public.auth_tokens_user_id_purpose_idx;
DROP INDEX IF EXISTS public.auth_tokens_token_hash_key;
DROP INDEX IF EXISTS public.audit_logs_tenant_id_entity_entity_id_idx;
DROP INDEX IF EXISTS public.audit_logs_tenant_id_created_at_idx;
DROP INDEX IF EXISTS public.applications_tenant_id_application_no_key;
DROP INDEX IF EXISTS public.applications_round_id_status_idx;
DROP INDEX IF EXISTS public.admission_rounds_tenant_id_is_active_idx;
DROP INDEX IF EXISTS public.academic_semesters_tenant_id_year_semester_key;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.user_tenants DROP CONSTRAINT IF EXISTS user_tenants_pkey;
ALTER TABLE IF EXISTS ONLY public.user_roles DROP CONSTRAINT IF EXISTS user_roles_pkey;
ALTER TABLE IF EXISTS ONLY public.theses DROP CONSTRAINT IF EXISTS theses_pkey;
ALTER TABLE IF EXISTS ONLY public.tenants DROP CONSTRAINT IF EXISTS tenants_pkey;
ALTER TABLE IF EXISTS ONLY public.study_plans DROP CONSTRAINT IF EXISTS study_plans_pkey;
ALTER TABLE IF EXISTS ONLY public.student_profiles DROP CONSTRAINT IF EXISTS student_profiles_pkey;
ALTER TABLE IF EXISTS ONLY public.student_petitions DROP CONSTRAINT IF EXISTS student_petitions_pkey;
ALTER TABLE IF EXISTS ONLY public.sample_items DROP CONSTRAINT IF EXISTS sample_items_pkey;
ALTER TABLE IF EXISTS ONLY public.roles DROP CONSTRAINT IF EXISTS roles_pkey;
ALTER TABLE IF EXISTS ONLY public.role_permissions DROP CONSTRAINT IF EXISTS role_permissions_pkey;
ALTER TABLE IF EXISTS ONLY public.permissions DROP CONSTRAINT IF EXISTS permissions_pkey;
ALTER TABLE IF EXISTS ONLY public.news_categories DROP CONSTRAINT IF EXISTS news_categories_pkey;
ALTER TABLE IF EXISTS ONLY public.news_articles DROP CONSTRAINT IF EXISTS news_articles_pkey;
ALTER TABLE IF EXISTS ONLY public.login_throttles DROP CONSTRAINT IF EXISTS login_throttles_pkey;
ALTER TABLE IF EXISTS ONLY public.faculty_members DROP CONSTRAINT IF EXISTS faculty_members_pkey;
ALTER TABLE IF EXISTS ONLY public.document_templates DROP CONSTRAINT IF EXISTS document_templates_pkey;
ALTER TABLE IF EXISTS ONLY public.departments DROP CONSTRAINT IF EXISTS departments_pkey;
ALTER TABLE IF EXISTS ONLY public.curriculums DROP CONSTRAINT IF EXISTS curriculums_pkey;
ALTER TABLE IF EXISTS ONLY public.courses DROP CONSTRAINT IF EXISTS courses_pkey;
ALTER TABLE IF EXISTS ONLY public.class_schedules DROP CONSTRAINT IF EXISTS class_schedules_pkey;
ALTER TABLE IF EXISTS ONLY public.auth_tokens DROP CONSTRAINT IF EXISTS auth_tokens_pkey;
ALTER TABLE IF EXISTS ONLY public.audit_logs DROP CONSTRAINT IF EXISTS audit_logs_pkey;
ALTER TABLE IF EXISTS ONLY public.applications DROP CONSTRAINT IF EXISTS applications_pkey;
ALTER TABLE IF EXISTS ONLY public.admission_rounds DROP CONSTRAINT IF EXISTS admission_rounds_pkey;
ALTER TABLE IF EXISTS ONLY public.academic_semesters DROP CONSTRAINT IF EXISTS academic_semesters_pkey;
ALTER TABLE IF EXISTS ONLY public._prisma_migrations DROP CONSTRAINT IF EXISTS _prisma_migrations_pkey;
DROP TABLE IF EXISTS public.users;
DROP TABLE IF EXISTS public.user_tenants;
DROP TABLE IF EXISTS public.user_roles;
DROP TABLE IF EXISTS public.theses;
DROP TABLE IF EXISTS public.tenants;
DROP TABLE IF EXISTS public.study_plans;
DROP TABLE IF EXISTS public.student_profiles;
DROP TABLE IF EXISTS public.student_petitions;
DROP TABLE IF EXISTS public.sample_items;
DROP TABLE IF EXISTS public.roles;
DROP TABLE IF EXISTS public.role_permissions;
DROP TABLE IF EXISTS public.permissions;
DROP TABLE IF EXISTS public.news_categories;
DROP TABLE IF EXISTS public.news_articles;
DROP TABLE IF EXISTS public.login_throttles;
DROP TABLE IF EXISTS public.faculty_members;
DROP TABLE IF EXISTS public.document_templates;
DROP TABLE IF EXISTS public.departments;
DROP TABLE IF EXISTS public.curriculums;
DROP TABLE IF EXISTS public.courses;
DROP TABLE IF EXISTS public.class_schedules;
DROP TABLE IF EXISTS public.auth_tokens;
DROP TABLE IF EXISTS public.audit_logs;
DROP TABLE IF EXISTS public.applications;
DROP TABLE IF EXISTS public.admission_rounds;
DROP TABLE IF EXISTS public.academic_semesters;
DROP TABLE IF EXISTS public._prisma_migrations;
DROP TYPE IF EXISTS public."TokenPurpose";
DROP TYPE IF EXISTS public."ScopeType";
--
-- Name: ScopeType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ScopeType" AS ENUM (
    'ALL',
    'CAMPUS',
    'ORG_UNIT'
);


ALTER TYPE public."ScopeType" OWNER TO postgres;

--
-- Name: TokenPurpose; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."TokenPurpose" AS ENUM (
    'EMAIL_VERIFY',
    'PASSWORD_RESET'
);


ALTER TYPE public."TokenPurpose" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: academic_semesters; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.academic_semesters (
    id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    year integer DEFAULT 2569 NOT NULL,
    semester integer DEFAULT 1 NOT NULL,
    name_th character varying(100) NOT NULL,
    is_current boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.academic_semesters OWNER TO postgres;

--
-- Name: admission_rounds; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admission_rounds (
    id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    year integer DEFAULT 2569 NOT NULL,
    term integer DEFAULT 1 NOT NULL,
    title_th character varying(255) NOT NULL,
    title_en character varying(255),
    description text,
    start_date timestamp with time zone NOT NULL,
    end_date timestamp with time zone NOT NULL,
    fee_amount numeric(10,2) DEFAULT 500 NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.admission_rounds OWNER TO postgres;

--
-- Name: applications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.applications (
    id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    round_id uuid NOT NULL,
    application_no character varying(50) NOT NULL,
    applicant_type character varying(20) DEFAULT 'MONK'::character varying NOT NULL,
    title_th character varying(50) NOT NULL,
    first_name_th character varying(100) NOT NULL,
    last_name_th character varying(100),
    monastic_name character varying(100),
    monastic_rank character varying(100),
    temple_name character varying(255),
    id_card_or_passport character varying(50) NOT NULL,
    phone character varying(50) NOT NULL,
    email character varying(255) NOT NULL,
    education_background text,
    payment_slip_url character varying(500),
    status character varying(50) DEFAULT 'SUBMITTED'::character varying NOT NULL,
    reviewer_note text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.applications OWNER TO postgres;

--
-- Name: audit_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.audit_logs (
    id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    actor_id uuid,
    action character varying(100) NOT NULL,
    entity character varying(50) NOT NULL,
    entity_id character varying(64) NOT NULL,
    before jsonb,
    after jsonb,
    ip character varying(64),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.audit_logs OWNER TO postgres;

--
-- Name: auth_tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_tokens (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    purpose public."TokenPurpose" NOT NULL,
    token_hash character varying(128) NOT NULL,
    payload jsonb,
    expires_at timestamp with time zone NOT NULL,
    used_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.auth_tokens OWNER TO postgres;

--
-- Name: class_schedules; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.class_schedules (
    id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    semester_id uuid NOT NULL,
    course_code character varying(50) NOT NULL,
    course_name character varying(255) NOT NULL,
    instructor_name character varying(255) NOT NULL,
    day_of_week character varying(20) NOT NULL,
    start_time character varying(10) NOT NULL,
    end_time character varying(10) NOT NULL,
    room_number character varying(50) NOT NULL,
    teaching_mode character varying(20) DEFAULT 'HYBRID'::character varying NOT NULL,
    online_meeting_url character varying(500),
    online_meeting_passcode character varying(100),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.class_schedules OWNER TO postgres;

--
-- Name: courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.courses (
    id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    curriculum_id uuid NOT NULL,
    course_code character varying(50) NOT NULL,
    name_th character varying(255) NOT NULL,
    name_en character varying(255) NOT NULL,
    credit_total integer DEFAULT 3 NOT NULL,
    credit_lecture integer DEFAULT 3 NOT NULL,
    credit_lab integer DEFAULT 0 NOT NULL,
    credit_self integer DEFAULT 6 NOT NULL,
    course_type character varying(50) DEFAULT 'CORE'::character varying NOT NULL,
    description_th text,
    description_en text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.courses OWNER TO postgres;

--
-- Name: curriculums; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.curriculums (
    id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    code character varying(50) NOT NULL,
    name_th character varying(255) NOT NULL,
    name_en character varying(255) NOT NULL,
    degree_title_th character varying(255) NOT NULL,
    degree_title_en character varying(255) NOT NULL,
    total_credits integer DEFAULT 36 NOT NULL,
    description_th text,
    description_en text,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    department_id uuid
);


ALTER TABLE public.curriculums OWNER TO postgres;

--
-- Name: departments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.departments (
    id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    code character varying(50) NOT NULL,
    name_th character varying(255) NOT NULL,
    name_en character varying(255) NOT NULL,
    faculty_name_th character varying(255),
    faculty_name_en character varying(255),
    head_name character varying(255),
    contact_email character varying(255),
    contact_phone character varying(50),
    office_location character varying(255),
    description_th text,
    description_en text,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.departments OWNER TO postgres;

--
-- Name: document_templates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.document_templates (
    id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    code character varying(50) NOT NULL,
    title_th character varying(255) NOT NULL,
    title_en character varying(255),
    description text,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.document_templates OWNER TO postgres;

--
-- Name: faculty_members; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.faculty_members (
    id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    user_id uuid,
    academic_rank character varying(50),
    monastic_rank character varying(100),
    title_th character varying(50) NOT NULL,
    first_name_th character varying(100) NOT NULL,
    last_name_th character varying(100),
    monastic_name character varying(100),
    title_en character varying(50),
    first_name_en character varying(100),
    last_name_en character varying(100),
    temple_name character varying(255),
    position_th character varying(255) NOT NULL,
    position_en character varying(255),
    is_vipassana_master boolean DEFAULT false NOT NULL,
    is_executive boolean DEFAULT false NOT NULL,
    expertise text,
    education_history text,
    email character varying(255),
    phone character varying(50),
    avatar_url character varying(500),
    sort_order integer DEFAULT 0 NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.faculty_members OWNER TO postgres;

--
-- Name: login_throttles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.login_throttles (
    key character varying(320) NOT NULL,
    fail_count integer DEFAULT 0 NOT NULL,
    locked_until timestamp with time zone,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.login_throttles OWNER TO postgres;

--
-- Name: news_articles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.news_articles (
    id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    category_id uuid,
    title_th character varying(255) NOT NULL,
    title_en character varying(255),
    slug character varying(255) NOT NULL,
    summary_th text,
    summary_en text,
    content_th text NOT NULL,
    content_en text,
    cover_image_url character varying(500),
    is_pinned boolean DEFAULT false NOT NULL,
    is_published boolean DEFAULT false NOT NULL,
    published_at timestamp with time zone,
    view_count integer DEFAULT 0 NOT NULL,
    author_id uuid,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.news_articles OWNER TO postgres;

--
-- Name: news_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.news_categories (
    id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    name_th character varying(100) NOT NULL,
    name_en character varying(100) NOT NULL,
    slug character varying(100) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.news_categories OWNER TO postgres;

--
-- Name: permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.permissions (
    id uuid NOT NULL,
    code character varying(100) NOT NULL,
    module character varying(50) NOT NULL,
    action character varying(50) NOT NULL,
    description character varying(255)
);


ALTER TABLE public.permissions OWNER TO postgres;

--
-- Name: role_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role_permissions (
    role_id uuid NOT NULL,
    permission_id uuid NOT NULL
);


ALTER TABLE public.role_permissions OWNER TO postgres;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    code character varying(50) NOT NULL,
    name_th character varying(100) NOT NULL,
    name_en character varying(100) NOT NULL,
    description character varying(500),
    is_system boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: sample_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sample_items (
    id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    status character varying(50) DEFAULT 'ACTIVE'::character varying NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.sample_items OWNER TO postgres;

--
-- Name: student_petitions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.student_petitions (
    id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    student_id uuid NOT NULL,
    template_id uuid NOT NULL,
    petition_no character varying(50) NOT NULL,
    title character varying(255) NOT NULL,
    reason text NOT NULL,
    attachment_url character varying(500),
    status character varying(50) DEFAULT 'PENDING'::character varying NOT NULL,
    current_step integer DEFAULT 1 NOT NULL,
    approver_note text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.student_petitions OWNER TO postgres;

--
-- Name: student_profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.student_profiles (
    id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    user_id uuid,
    student_code character varying(50) NOT NULL,
    applicant_type character varying(20) DEFAULT 'MONK'::character varying NOT NULL,
    title_th character varying(50) NOT NULL,
    first_name_th character varying(100) NOT NULL,
    last_name_th character varying(100),
    monastic_name character varying(100),
    monastic_rank character varying(100),
    temple_name character varying(255),
    ecclesiastical_province character varying(100),
    batch_year integer DEFAULT 2569 NOT NULL,
    status character varying(50) DEFAULT 'STUDYING'::character varying NOT NULL,
    phone character varying(50),
    email character varying(255),
    enrollment_date timestamp with time zone,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.student_profiles OWNER TO postgres;

--
-- Name: study_plans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.study_plans (
    id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    curriculum_id uuid NOT NULL,
    plan_type character varying(20) NOT NULL,
    name_th character varying(255) NOT NULL,
    name_en character varying(255) NOT NULL,
    description_th text,
    description_en text,
    total_credits integer DEFAULT 36 NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.study_plans OWNER TO postgres;

--
-- Name: tenants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tenants (
    id uuid NOT NULL,
    code character varying(50) NOT NULL,
    name_th character varying(255) NOT NULL,
    name_en character varying(255) NOT NULL,
    logo_url character varying(500),
    settings jsonb DEFAULT '{}'::jsonb NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.tenants OWNER TO postgres;

--
-- Name: theses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.theses (
    id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    student_id uuid NOT NULL,
    author_name character varying(255) NOT NULL,
    title_th character varying(500) NOT NULL,
    title_en character varying(500),
    advisor_name character varying(255) NOT NULL,
    co_advisor_name character varying(255),
    status character varying(50) DEFAULT 'IN_PROGRESS'::character varying NOT NULL,
    abstract_th text,
    abstract_en text,
    keywords character varying(500),
    similarity_percentage numeric(5,2),
    defense_date timestamp with time zone,
    document_url character varying(500),
    new_body_of_knowledge text,
    year_graduated integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.theses OWNER TO postgres;

--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_roles (
    id uuid NOT NULL,
    user_tenant_id uuid NOT NULL,
    role_id uuid NOT NULL,
    scope_type public."ScopeType" DEFAULT 'ALL'::public."ScopeType" NOT NULL,
    scope_id uuid,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.user_roles OWNER TO postgres;

--
-- Name: user_tenants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_tenants (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    joined_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.user_tenants OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255),
    name character varying(255) NOT NULL,
    image_url character varying(500),
    provider character varying(20) DEFAULT 'credentials'::character varying NOT NULL,
    provider_id character varying(255),
    email_verified boolean DEFAULT false NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    must_change_password boolean DEFAULT false NOT NULL,
    locale character varying(5),
    last_login_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
63d816d5-cc92-4fa0-bdad-9ad6501efc73	fd80935d218352238dd7f4afda97f345144d720dcbfbc92d9273ce312424b7bb	2026-09-11 08:06:51.746115+00	20260907020200_init	\N	\N	2026-09-11 08:06:51.646615+00	1
eddfe6ba-ce06-40d2-897b-0b717f9bfa21	fc71ef97127d5c096390bc15c5b6cf4063d70785c01d8132a9e34161f88c445b	2026-09-11 08:06:51.830015+00	20260910080749_add_phase1_academic_models	\N	\N	2026-09-11 08:06:51.747397+00	1
4b709610-b340-453c-b8a3-b1efe56c5e3d	34ac1ede2a5f926abef88d526f778266311ad4d1d6d7a90a89ef940d704d3628	2026-09-11 08:06:51.922171+00	20260910082505_add_all_mcu_features	\N	\N	2026-09-11 08:06:51.831437+00	1
006aab9b-3bb0-4c62-86fe-a6a8b2f3b03f	3665eea6aef1e9959b1dd77fdc9c01dfddc27cb99b646bcc4123138199fe171d	2026-09-12 02:46:46.511661+00	20260912093700_add_department_management	A migration failed to apply. New migrations cannot be applied before the error is recovered from. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolve\n\nMigration name: 20260912093700_add_department_management\n\nDatabase error code: 42701\n\nDatabase error:\nERROR: column "department_id" of relation "curriculums" already exists\n\nDbError { severity: "ERROR", parsed_severity: Some(Error), code: SqlState(E42701), message: "column \\"department_id\\" of relation \\"curriculums\\" already exists", detail: None, hint: None, position: None, where_: None, schema: None, table: None, column: None, datatype: None, constraint: None, file: Some("tablecmds.c"), line: Some(7356), routine: Some("check_for_column_name_collision") }\n\n   0: sql_schema_connector::apply_migration::apply_script\n           with migration_name="20260912093700_add_department_management"\n             at schema-engine/connectors/sql-schema-connector/src/apply_migration.rs:113\n   1: schema_commands::commands::apply_migrations::Applying migration\n           with migration_name="20260912093700_add_department_management"\n             at schema-engine/commands/src/commands/apply_migrations.rs:95\n   2: schema_core::state::ApplyMigrations\n             at schema-engine/core/src/state.rs:260	\N	2026-09-12 02:46:13.886714+00	1
\.


--
-- Data for Name: academic_semesters; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.academic_semesters (id, tenant_id, year, semester, name_th, is_current, created_at, updated_at) FROM stdin;
a6874896-15b6-4ffd-b883-f6fcc7724e15	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	2569	1	ภาคการศึกษาที่ ๑/๒๕๖๙	t	2026-09-11 08:06:52.89+00	2026-09-11 08:06:52.89+00
\.


--
-- Data for Name: admission_rounds; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admission_rounds (id, tenant_id, year, term, title_th, title_en, description, start_date, end_date, fee_amount, is_active, created_at, updated_at) FROM stdin;
00000000-0000-0000-0000-000000000010	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	2569	1	รับสมัครนิสิตระดับปริญญาโท สาขาวิชาวิปัสสนาภาวนาศึกษา รุ่นที่ ๑๕ ประจำปีการศึกษา ๒๕๖๙	Master's Degree Admissions Batch 15 Academic Year 2026	\N	2026-01-01 00:00:00+00	2026-12-31 00:00:00+00	500.00	t	2026-09-11 08:06:52.849+00	2026-09-11 08:06:52.849+00
\.


--
-- Data for Name: applications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.applications (id, tenant_id, round_id, application_no, applicant_type, title_th, first_name_th, last_name_th, monastic_name, monastic_rank, temple_name, id_card_or_passport, phone, email, education_background, payment_slip_url, status, reviewer_note, created_at, updated_at) FROM stdin;
6ea5c2f9-89de-49bf-a128-499954513258	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	00000000-0000-0000-0000-000000000010	VIP-2569-0001	MONK	พระ	สมชาย	\N	ชิตมาโร	\N	วัดมหาธาตุยุวราชรังสฤษฎิ์ กรุงเทพฯ	1100200300401	081-234-5678	somchai.monk@mcu.local	พธ.บ. (พระพุทธศาสนา), น.ธ.เอก	\N	PAYMENT_VERIFIED	\N	2026-09-11 08:06:52.858+00	2026-09-11 08:06:52.858+00
\.


--
-- Data for Name: audit_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.audit_logs (id, tenant_id, actor_id, action, entity, entity_id, before, after, ip, created_at) FROM stdin;
f4bf0078-d8c5-421e-8eaa-b3838c6f1690	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	1efbf903-43d7-45a4-834a-d48ac757cd05	tenant.logo_upload	tenant	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	\N	{"url": "/uploads/logos/ff4bfcb3-88e1-4f7a-8438-3b0df13805b0-logo-1789121982694-bb83f6263b49.jpg"}	\N	2026-09-11 10:19:42.747+00
764feb08-ad6b-43ff-8375-a59a87050c2c	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	1efbf903-43d7-45a4-834a-d48ac757cd05	tenant.settings_update	tenant	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	{"code": "MCU-VIPASSANA", "nameEn": "Master of Buddhism in Vipassana Meditation Studies (Weekend Program) MCU", "nameTh": "หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา (ภาคเสาร์-อาทิตย์) มจร", "logoUrl": null, "palette": "blue"}	{"smtp": {"host": "smtp.gmail.com", "pass": "", "port": 465, "user": "", "secure": true, "enabled": false, "fromName": "หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา (ภาคเสาร์-อาทิตย์) มจร", "fromEmail": ""}, "nameEn": "International Buddhist Studies College, MCU", "nameTh": "วิทยาลัยวิปัสสนาภาวนา มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย", "actorId": "1efbf903-43d7-45a4-834a-d48ac757cd05", "logoUrl": "/uploads/logos/ff4bfcb3-88e1-4f7a-8438-3b0df13805b0-logo-1789121982694-bb83f6263b49.jpg", "orgInfo": {"email": "vipassana@mcu.ac.th", "phone": "+66 35 248 000", "website": "https://www.mcu.ac.th", "addressEn": "79 Moo 1, Phahonyothin Road, Lamsai, Wang Noi, Phra Nakhon Si Ayutthaya 13170 Thailand", "addressTh": "๗๙ หมู่ ๑ ถนนพหลโยธิน ตำบลลำไทร อำเภอวังน้อย จังหวัดพระนครศรีอยุธยา ๑๓๑๗๐", "taglineEn": "Global Center for Buddhist Meditation Studies & Universal Peace", "taglineTh": "ศูนย์กลางการศึกษาวิปัสสนาภาวนาระดับสากลเพื่อสันติภาพโลก", "descriptionEn": "A premier international graduate institution dedicated to the integration of Vipassana meditation with modern sciences, cultivating world-class Buddhist scholarship.", "descriptionTh": "สถาบันการศึกษาระดับบัณฑิตศึกษาชั้นนำ มุ่งเน้นการบูรณาการหลักสูตรวิปัสสนาภาวนากับวิทยาการร่วมสมัย สร้างสรรค์บุคลากรทางพุทธศาสนาที่มีคุณภาพระดับสากล"}, "palette": "blue", "tenantId": "ff4bfcb3-88e1-4f7a-8438-3b0df13805b0"}	\N	2026-09-11 10:19:47.799+00
6cd9ef3b-9332-4c46-9ebf-383b902c94c3	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	1efbf903-43d7-45a4-834a-d48ac757cd05	tenant.logo_upload	tenant	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	\N	{"url": "/uploads/logos/ff4bfcb3-88e1-4f7a-8438-3b0df13805b0-logo-1789122185035-9da1bce474b7.jpg"}	\N	2026-09-11 10:23:05.052+00
1f862662-2650-4b59-b07b-33b109c11b89	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	1efbf903-43d7-45a4-834a-d48ac757cd05	tenant.logo_upload	tenant	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	\N	{"url": "/uploads/logos/ff4bfcb3-88e1-4f7a-8438-3b0df13805b0-logo-1789122216847-88264834f4d2.jpg"}	\N	2026-09-11 10:23:36.858+00
3d76375f-2378-4258-acab-eddedcd519d4	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	1efbf903-43d7-45a4-834a-d48ac757cd05	tenant.settings_update	tenant	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	{"code": "MCU-VIPASSANA", "smtp": {"host": "smtp.gmail.com", "pass": "", "port": 465, "user": "", "secure": true, "enabled": false, "fromName": "หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา (ภาคเสาร์-อาทิตย์) มจร", "fromEmail": ""}, "nameEn": "International Buddhist Studies College, MCU", "nameTh": "วิทยาลัยวิปัสสนาภาวนา มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย", "logoUrl": "/uploads/logos/ff4bfcb3-88e1-4f7a-8438-3b0df13805b0-logo-1789121982694-bb83f6263b49.jpg", "orgInfo": {"email": "vipassana@mcu.ac.th", "phone": "+66 35 248 000", "website": "https://www.mcu.ac.th", "addressEn": "79 Moo 1, Phahonyothin Road, Lamsai, Wang Noi, Phra Nakhon Si Ayutthaya 13170 Thailand", "addressTh": "๗๙ หมู่ ๑ ถนนพหลโยธิน ตำบลลำไทร อำเภอวังน้อย จังหวัดพระนครศรีอยุธยา ๑๓๑๗๐", "taglineEn": "Global Center for Buddhist Meditation Studies & Universal Peace", "taglineTh": "ศูนย์กลางการศึกษาวิปัสสนาภาวนาระดับสากลเพื่อสันติภาพโลก", "descriptionEn": "A premier international graduate institution dedicated to the integration of Vipassana meditation with modern sciences, cultivating world-class Buddhist scholarship.", "descriptionTh": "สถาบันการศึกษาระดับบัณฑิตศึกษาชั้นนำ มุ่งเน้นการบูรณาการหลักสูตรวิปัสสนาภาวนากับวิทยาการร่วมสมัย สร้างสรรค์บุคลากรทางพุทธศาสนาที่มีคุณภาพระดับสากล"}, "palette": "blue"}	{"smtp": {"host": "smtp.gmail.com", "pass": "Passw0rd!vibe", "port": 465, "user": "admin@app.local", "secure": true, "enabled": false, "fromName": "หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา (ภาคเสาร์-อาทิตย์) มจร", "fromEmail": ""}, "nameEn": "International Buddhist Studies College, MCU", "nameTh": "วิทยาลัยวิปัสสนาภาวนา มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย", "actorId": "1efbf903-43d7-45a4-834a-d48ac757cd05", "logoUrl": "/uploads/logos/ff4bfcb3-88e1-4f7a-8438-3b0df13805b0-logo-1789122216847-88264834f4d2.jpg", "orgInfo": {"email": "vipassana@mcu.ac.th", "phone": "+66 35 248 000", "website": "https://www.mcu.ac.th", "addressEn": "79 Moo 1, Phahonyothin Road, Lamsai, Wang Noi, Phra Nakhon Si Ayutthaya 13170 Thailand", "addressTh": "๗๙ หมู่ ๑ ถนนพหลโยธิน ตำบลลำไทร อำเภอวังน้อย จังหวัดพระนครศรีอยุธยา ๑๓๑๗๐", "taglineEn": "Global Center for Buddhist Meditation Studies & Universal Peace", "taglineTh": "ศูนย์กลางการศึกษาวิปัสสนาภาวนาระดับสากลเพื่อสันติภาพโลก", "descriptionEn": "A premier international graduate institution dedicated to the integration of Vipassana meditation with modern sciences, cultivating world-class Buddhist scholarship.", "descriptionTh": "สถาบันการศึกษาระดับบัณฑิตศึกษาชั้นนำ มุ่งเน้นการบูรณาการหลักสูตรวิปัสสนาภาวนากับวิทยาการร่วมสมัย สร้างสรรค์บุคลากรทางพุทธศาสนาที่มีคุณภาพระดับสากล"}, "palette": "blue", "tenantId": "ff4bfcb3-88e1-4f7a-8438-3b0df13805b0"}	\N	2026-09-11 10:24:32.627+00
cdc27570-6b65-4b77-9b9f-6990140751ca	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	1efbf903-43d7-45a4-834a-d48ac757cd05	tenant.logo_upload	tenant	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	\N	{"url": "/uploads/logos/ff4bfcb3-88e1-4f7a-8438-3b0df13805b0-logo-1789122288435-50ab81bf6a3d.jpg"}	\N	2026-09-11 10:24:48.443+00
7bbd000b-17cb-4846-adfe-7bbc01094437	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	1efbf903-43d7-45a4-834a-d48ac757cd05	tenant.logo_upload	tenant	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	\N	{"url": "/uploads/logos/ff4bfcb3-88e1-4f7a-8438-3b0df13805b0-logo-1789122334288-371b7753d455.jpg"}	\N	2026-09-11 10:25:34.294+00
b51d63b3-06f2-4cbf-b3df-4383fe81a5bb	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	1efbf903-43d7-45a4-834a-d48ac757cd05	tenant.logo_upload	tenant	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	\N	{"url": "/uploads/logos/ff4bfcb3-88e1-4f7a-8438-3b0df13805b0-logo-1789122461791-49a64584d1c5.jpg"}	\N	2026-09-11 10:27:41.799+00
382087ba-f2d2-4554-af94-0e22fa51f1dc	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	1efbf903-43d7-45a4-834a-d48ac757cd05	tenant.settings_update	tenant	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	{"code": "MCU-VIPASSANA", "smtp": {"host": "smtp.gmail.com", "pass": "Passw0rd!vibe", "port": 465, "user": "admin@app.local", "secure": true, "enabled": false, "fromName": "หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา (ภาคเสาร์-อาทิตย์) มจร", "fromEmail": ""}, "nameEn": "International Buddhist Studies College, MCU", "nameTh": "วิทยาลัยวิปัสสนาภาวนา มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย", "logoUrl": "/uploads/logos/ff4bfcb3-88e1-4f7a-8438-3b0df13805b0-logo-1789122216847-88264834f4d2.jpg", "orgInfo": {"email": "vipassana@mcu.ac.th", "phone": "+66 35 248 000", "website": "https://www.mcu.ac.th", "addressEn": "79 Moo 1, Phahonyothin Road, Lamsai, Wang Noi, Phra Nakhon Si Ayutthaya 13170 Thailand", "addressTh": "๗๙ หมู่ ๑ ถนนพหลโยธิน ตำบลลำไทร อำเภอวังน้อย จังหวัดพระนครศรีอยุธยา ๑๓๑๗๐", "taglineEn": "Global Center for Buddhist Meditation Studies & Universal Peace", "taglineTh": "ศูนย์กลางการศึกษาวิปัสสนาภาวนาระดับสากลเพื่อสันติภาพโลก", "descriptionEn": "A premier international graduate institution dedicated to the integration of Vipassana meditation with modern sciences, cultivating world-class Buddhist scholarship.", "descriptionTh": "สถาบันการศึกษาระดับบัณฑิตศึกษาชั้นนำ มุ่งเน้นการบูรณาการหลักสูตรวิปัสสนาภาวนากับวิทยาการร่วมสมัย สร้างสรรค์บุคลากรทางพุทธศาสนาที่มีคุณภาพระดับสากล"}, "palette": "blue"}	{"smtp": {"host": "smtp.gmail.com", "pass": "Passw0rd!vibe", "port": 465, "user": "admin@app.local", "secure": true, "enabled": false, "fromName": "หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา (ภาคเสาร์-อาทิตย์) มจร", "fromEmail": ""}, "nameEn": "International Buddhist Studies College, MCU", "nameTh": "วิทยาลัยวิปัสสนาภาวนา มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย", "actorId": "1efbf903-43d7-45a4-834a-d48ac757cd05", "logoUrl": "/uploads/logos/ff4bfcb3-88e1-4f7a-8438-3b0df13805b0-logo-1789122216847-88264834f4d2.jpg", "orgInfo": {"email": "vipassana@mcu.ac.th", "phone": "+66 35 248 000", "website": "https://www.mcu.ac.th", "addressEn": "79 Moo 1, Phahonyothin Road, Lamsai, Wang Noi, Phra Nakhon Si Ayutthaya 13170 Thailand", "addressTh": "๗๙ หมู่ ๑ ถนนพหลโยธิน ตำบลลำไทร อำเภอวังน้อย จังหวัดพระนครศรีอยุธยา ๑๓๑๗๐", "taglineEn": "Global Center for Buddhist Meditation Studies & Universal Peace", "taglineTh": "ศูนย์กลางการศึกษาวิปัสสนาภาวนาระดับสากลเพื่อสันติภาพโลก", "descriptionEn": "A premier international graduate institution dedicated to the integration of Vipassana meditation with modern sciences, cultivating world-class Buddhist scholarship.", "descriptionTh": "สถาบันการศึกษาระดับบัณฑิตศึกษาชั้นนำ มุ่งเน้นการบูรณาการหลักสูตรวิปัสสนาภาวนากับวิทยาการร่วมสมัย สร้างสรรค์บุคลากรทางพุทธศาสนาที่มีคุณภาพระดับสากล"}, "palette": "pink", "tenantId": "ff4bfcb3-88e1-4f7a-8438-3b0df13805b0"}	\N	2026-09-11 10:42:19.923+00
33f2b05c-c44b-4fbc-95f0-1c646f82b658	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	1efbf903-43d7-45a4-834a-d48ac757cd05	tenant.logo_upload	tenant	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	\N	{"url": "/uploads/logos/ff4bfcb3-88e1-4f7a-8438-3b0df13805b0-logo-1789123351593-eb11d32bca88.jpg"}	\N	2026-09-11 10:42:31.6+00
c496df69-56f3-4315-b69f-256e63cbb522	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	1efbf903-43d7-45a4-834a-d48ac757cd05	tenant.settings_update	tenant	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	{"code": "MCU-VIPASSANA", "smtp": {"host": "smtp.gmail.com", "pass": "Passw0rd!vibe", "port": 465, "user": "admin@app.local", "secure": true, "enabled": false, "fromName": "หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา (ภาคเสาร์-อาทิตย์) มจร", "fromEmail": ""}, "nameEn": "International Buddhist Studies College, MCU", "nameTh": "วิทยาลัยวิปัสสนาภาวนา มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย", "logoUrl": "/uploads/logos/ff4bfcb3-88e1-4f7a-8438-3b0df13805b0-logo-1789122216847-88264834f4d2.jpg", "orgInfo": {"email": "vipassana@mcu.ac.th", "phone": "+66 35 248 000", "website": "https://www.mcu.ac.th", "addressEn": "79 Moo 1, Phahonyothin Road, Lamsai, Wang Noi, Phra Nakhon Si Ayutthaya 13170 Thailand", "addressTh": "๗๙ หมู่ ๑ ถนนพหลโยธิน ตำบลลำไทร อำเภอวังน้อย จังหวัดพระนครศรีอยุธยา ๑๓๑๗๐", "taglineEn": "Global Center for Buddhist Meditation Studies & Universal Peace", "taglineTh": "ศูนย์กลางการศึกษาวิปัสสนาภาวนาระดับสากลเพื่อสันติภาพโลก", "descriptionEn": "A premier international graduate institution dedicated to the integration of Vipassana meditation with modern sciences, cultivating world-class Buddhist scholarship.", "descriptionTh": "สถาบันการศึกษาระดับบัณฑิตศึกษาชั้นนำ มุ่งเน้นการบูรณาการหลักสูตรวิปัสสนาภาวนากับวิทยาการร่วมสมัย สร้างสรรค์บุคลากรทางพุทธศาสนาที่มีคุณภาพระดับสากล"}, "palette": "pink"}	{"smtp": {"host": "smtp.gmail.com", "pass": "Passw0rd!vibe", "port": 465, "user": "admin@app.local", "secure": true, "enabled": false, "fromName": "หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา (ภาคเสาร์-อาทิตย์) มจร", "fromEmail": ""}, "nameEn": "International Buddhist Studies College, MCU", "nameTh": "วิทยาลัยวิปัสสนาภาวนา มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย", "actorId": "1efbf903-43d7-45a4-834a-d48ac757cd05", "logoUrl": "/uploads/logos/ff4bfcb3-88e1-4f7a-8438-3b0df13805b0-logo-1789123351593-eb11d32bca88.jpg", "orgInfo": {"email": "vipassana@mcu.ac.th", "phone": "+66 35 248 000", "website": "https://www.mcu.ac.th", "addressEn": "79 Moo 1, Phahonyothin Road, Lamsai, Wang Noi, Phra Nakhon Si Ayutthaya 13170 Thailand", "addressTh": "๗๙ หมู่ ๑ ถนนพหลโยธิน ตำบลลำไทร อำเภอวังน้อย จังหวัดพระนครศรีอยุธยา ๑๓๑๗๐", "taglineEn": "Global Center for Buddhist Meditation Studies & Universal Peace", "taglineTh": "ศูนย์กลางการศึกษาวิปัสสนาภาวนาระดับสากลเพื่อสันติภาพโลก", "descriptionEn": "A premier international graduate institution dedicated to the integration of Vipassana meditation with modern sciences, cultivating world-class Buddhist scholarship.", "descriptionTh": "สถาบันการศึกษาระดับบัณฑิตศึกษาชั้นนำ มุ่งเน้นการบูรณาการหลักสูตรวิปัสสนาภาวนากับวิทยาการร่วมสมัย สร้างสรรค์บุคลากรทางพุทธศาสนาที่มีคุณภาพระดับสากล"}, "palette": "pink", "tenantId": "ff4bfcb3-88e1-4f7a-8438-3b0df13805b0"}	\N	2026-09-11 10:42:37.397+00
532c7a82-d3ce-4059-b765-da84f2f2c6f9	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	1efbf903-43d7-45a4-834a-d48ac757cd05	tenant.settings_update	tenant	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	{"code": "MCU-VIPASSANA", "smtp": {"host": "smtp.gmail.com", "pass": "Passw0rd!vibe", "port": 465, "user": "admin@app.local", "secure": true, "enabled": false, "fromName": "หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา (ภาคเสาร์-อาทิตย์) มจร", "fromEmail": ""}, "nameEn": "International Buddhist Studies College, MCU", "nameTh": "วิทยาลัยวิปัสสนาภาวนา มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย", "logoUrl": "/uploads/logos/ff4bfcb3-88e1-4f7a-8438-3b0df13805b0-logo-1789123351593-eb11d32bca88.jpg", "orgInfo": {"email": "vipassana@mcu.ac.th", "phone": "+66 35 248 000", "website": "https://www.mcu.ac.th", "addressEn": "79 Moo 1, Phahonyothin Road, Lamsai, Wang Noi, Phra Nakhon Si Ayutthaya 13170 Thailand", "addressTh": "๗๙ หมู่ ๑ ถนนพหลโยธิน ตำบลลำไทร อำเภอวังน้อย จังหวัดพระนครศรีอยุธยา ๑๓๑๗๐", "taglineEn": "Global Center for Buddhist Meditation Studies & Universal Peace", "taglineTh": "ศูนย์กลางการศึกษาวิปัสสนาภาวนาระดับสากลเพื่อสันติภาพโลก", "descriptionEn": "A premier international graduate institution dedicated to the integration of Vipassana meditation with modern sciences, cultivating world-class Buddhist scholarship.", "descriptionTh": "สถาบันการศึกษาระดับบัณฑิตศึกษาชั้นนำ มุ่งเน้นการบูรณาการหลักสูตรวิปัสสนาภาวนากับวิทยาการร่วมสมัย สร้างสรรค์บุคลากรทางพุทธศาสนาที่มีคุณภาพระดับสากล"}, "palette": "pink"}	{"smtp": {"host": "smtp.gmail.com", "pass": "Passw0rd!vibe", "port": 465, "user": "admin@app.local", "secure": true, "enabled": false, "fromName": "หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา (ภาคเสาร์-อาทิตย์) มจร", "fromEmail": ""}, "nameEn": "IBSC Vipassana College, Mahachulalongkornrajavidyalaya University", "nameTh": "วิทยาลัยวิปัสสนาภาวนา มจร (ศูนย์กลางระดับสากล)", "actorId": "1efbf903-43d7-45a4-834a-d48ac757cd05", "logoUrl": "/uploads/logos/ff4bfcb3-88e1-4f7a-8438-3b0df13805b0-logo-1789123351593-eb11d32bca88.jpg", "orgInfo": {"email": "vipassana@mcu.ac.th", "phone": "+66 35 248 000", "website": "https://www.mcu.ac.th", "addressEn": "79 Moo 1, Phahonyothin Road, Lamsai, Wang Noi, Phra Nakhon Si Ayutthaya 13170 Thailand", "addressTh": "๗๙ หมู่ ๑ ถนนพหลโยธิน ตำบลลำไทร อำเภอวังน้อย จังหวัดพระนครศรีอยุธยา ๑๓๑๗๐", "taglineEn": "World-Class Center for Buddhist Meditation Studies & Universal Peace", "taglineTh": "ศูนย์กลางการศึกษาพระอภิธรรมและวิปัสสนาภาวนาเพื่อสันติภาพโลก", "descriptionEn": "A premier international graduate institution dedicated to the integration of Vipassana meditation with modern sciences, cultivating world-class Buddhist scholarship.", "descriptionTh": "สถาบันการศึกษาระดับบัณฑิตศึกษาชั้นนำ มุ่งเน้นการบูรณาการหลักสูตรวิปัสสนาภาวนากับวิทยาการร่วมสมัย สร้างสรรค์บุคลากรทางพุทธศาสนาที่มีคุณภาพระดับสากล"}, "palette": "pink", "tenantId": "ff4bfcb3-88e1-4f7a-8438-3b0df13805b0"}	\N	2026-09-11 10:56:54.323+00
418c7e0c-a015-4b2c-8057-75eff12e9c8e	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	1efbf903-43d7-45a4-834a-d48ac757cd05	tenant.settings_update	tenant	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	{"code": "MCU-VIPASSANA", "smtp": {"host": "smtp.gmail.com", "pass": "Passw0rd!vibe", "port": 465, "user": "admin@app.local", "secure": true, "enabled": false, "fromName": "หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา (ภาคเสาร์-อาทิตย์) มจร", "fromEmail": ""}, "nameEn": "Master of Arts Program in Vipassana Meditation Studies (Weekend Session), Department of Buddhism, Faculty of Buddhism, Mahachulalongkornrajavidyalaya University", "nameTh": "หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา(ภาคเสาร์-อาทิตย์) ภาควิชาพระพุทธศาสนา คณะพุทธศาสตร์ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย", "logoUrl": "/uploads/logos/ff4bfcb3-88e1-4f7a-8438-3b0df13805b0-logo-1789123351593-eb11d32bca88.jpg", "orgInfo": {"email": "vipassana@mcu.ac.th", "phone": "+66 35 248 000", "lineId": "", "website": "https://www.mcu.ac.th", "addressEn": "79 Moo 1, Phahonyothin Road, Lamsai, Wang Noi, Phra Nakhon Si Ayutthaya 13170 Thailand", "addressTh": "๗๙ หมู่ ๑ ถนนพหลโยธิน ตำบลลำไทร อำเภอวังน้อย จังหวัดพระนครศรีอยุธยา ๑๓๑๗๐", "taglineEn": "World-Class Center for Buddhist Meditation Studies & Universal Peace", "taglineTh": "ศูนย์กลางการศึกษาพระอภิธรรมและวิปัสสนาภาวนาเพื่อสันติภาพโลก", "facebookUrl": "", "descriptionEn": "A premier international graduate institution dedicated to the integration of Vipassana meditation with modern sciences, cultivating world-class Buddhist scholarship.", "descriptionTh": "สถาบันการศึกษาระดับบัณฑิตศึกษาชั้นนำ มุ่งเน้นการบูรณาการหลักสูตรวิปัสสนาภาวนากับวิทยาการร่วมสมัย สร้างสรรค์บุคลากรทางพุทธศาสนาที่มีคุณภาพระดับสากล", "officeHoursEn": "", "officeHoursTh": ""}, "palette": "pink"}	{"smtp": {"host": "smtp.gmail.com", "pass": "Passw0rd!vibe", "port": 465, "user": "admin@app.local", "secure": true, "enabled": false, "fromName": "หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา (ภาคเสาร์-อาทิตย์) มจร", "fromEmail": ""}, "nameEn": "Master of Arts Program in Vipassana Meditation Studies (Weekend Session), Department of Buddhism, Faculty of Buddhism, Mahachulalongkornrajavidyalaya University", "nameTh": "หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา(ภาคเสาร์-อาทิตย์) ภาควิชาพระพุทธศาสนา คณะพุทธศาสตร์ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย", "actorId": "1efbf903-43d7-45a4-834a-d48ac757cd05", "logoUrl": "/uploads/logos/ff4bfcb3-88e1-4f7a-8438-3b0df13805b0-logo-1789123351593-eb11d32bca88.jpg", "orgInfo": {"email": "vipassana.grad@mcu.ac.th", "phone": "๐๓๕-๒๔๘-๐๐๐ ต่อ ๘๐๕๐", "lineId": "@mcuvipassana", "website": "https://grad.mcu.ac.th", "addressEn": "Mahachulalongkornrajavidyalaya University, Wang Noi, Phra Nakhon Si Ayutthaya 13170 Thailand", "addressTh": "อาคารมหาจุฬาบรรณาคาร มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย ต.ลำไทร อ.วังน้อย จ.พระนครศรีอยุธยา ๑๓๑๗๐", "taglineEn": "World-Class Center for Buddhist Meditation Studies & Universal Peace", "taglineTh": "ศูนย์กลางการศึกษาพระอภิธรรมและวิปัสสนาภาวนาเพื่อสันติภาพโลก", "facebookUrl": "https://facebook.com/vipassanamcu", "descriptionEn": "A premier international graduate institution dedicated to the integration of Vipassana meditation with modern sciences, cultivating world-class Buddhist scholarship.", "descriptionTh": "สถาบันการศึกษาระดับบัณฑิตศึกษาชั้นนำ มุ่งเน้นการบูรณาการหลักสูตรวิปัสสนาภาวนากับวิทยาการร่วมสมัย สร้างสรรค์บุคลากรทางพุทธศาสนาที่มีคุณภาพระดับสากล", "officeHoursEn": "Saturday - Sunday: 08:30 - 17:00", "officeHoursTh": "วันเสาร์ - อาทิตย์ เวลา ๐๘:๓๐ - ๑๗:๐๐ น."}, "palette": "pink", "tenantId": "ff4bfcb3-88e1-4f7a-8438-3b0df13805b0"}	\N	2026-09-12 03:21:20.946+00
619b2def-5567-4c00-bb93-00172718a8e7	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	1efbf903-43d7-45a4-834a-d48ac757cd05	tenant.settings_update	tenant	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	{"code": "MCU-VIPASSANA", "smtp": {"host": "smtp.gmail.com", "pass": "Passw0rd!vibe", "port": 465, "user": "admin@app.local", "secure": true, "enabled": false, "fromName": "หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา (ภาคเสาร์-อาทิตย์) มจร", "fromEmail": ""}, "nameEn": "Master of Arts Program in Vipassana Meditation Studies (Weekend Session), Department of Buddhism, Faculty of Buddhism, Mahachulalongkornrajavidyalaya University", "nameTh": "หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา(ภาคเสาร์-อาทิตย์) ภาควิชาพระพุทธศาสนา คณะพุทธศาสตร์ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย", "logoUrl": "/uploads/logos/ff4bfcb3-88e1-4f7a-8438-3b0df13805b0-logo-1789123351593-eb11d32bca88.jpg", "orgInfo": {"email": "vipassana.grad@mcu.ac.th", "phone": "๐๓๕-๒๔๘-๐๐๐ ต่อ ๘๐๕๐", "lineId": "@mcuvipassana", "website": "https://grad.mcu.ac.th", "addressEn": "Mahachulalongkornrajavidyalaya University, Wang Noi, Phra Nakhon Si Ayutthaya 13170 Thailand", "addressTh": "อาคารมหาจุฬาบรรณาคาร มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย ต.ลำไทร อ.วังน้อย จ.พระนครศรีอยุธยา ๑๓๑๗๐", "taglineEn": "World-Class Center for Buddhist Meditation Studies & Universal Peace", "taglineTh": "ศูนย์กลางการศึกษาพระอภิธรรมและวิปัสสนาภาวนาเพื่อสันติภาพโลก", "facebookUrl": "https://facebook.com/vipassanamcu", "descriptionEn": "A premier international graduate institution dedicated to the integration of Vipassana meditation with modern sciences, cultivating world-class Buddhist scholarship.", "descriptionTh": "สถาบันการศึกษาระดับบัณฑิตศึกษาชั้นนำ มุ่งเน้นการบูรณาการหลักสูตรวิปัสสนาภาวนากับวิทยาการร่วมสมัย สร้างสรรค์บุคลากรทางพุทธศาสนาที่มีคุณภาพระดับสากล", "officeHoursEn": "Saturday - Sunday: 08:30 - 17:00", "officeHoursTh": "วันเสาร์ - อาทิตย์ เวลา ๐๘:๓๐ - ๑๗:๐๐ น."}, "palette": "pink"}	{"smtp": {"host": "smtp.gmail.com", "pass": "Passw0rd!vibe", "port": 465, "user": "admin@app.local", "secure": true, "enabled": false, "fromName": "หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา (ภาคเสาร์-อาทิตย์) มจร", "fromEmail": ""}, "gemini": {"model": "gemini-2.5-flash", "apiKey": "AIzaSyB3M1n1A1T3stK3yPr0v1d3r998877"}, "nameEn": "Master of Arts Program in Vipassana Meditation Studies (Weekend Session), Department of Buddhism, Faculty of Buddhism, Mahachulalongkornrajavidyalaya University", "nameTh": "หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา(ภาคเสาร์-อาทิตย์) ภาควิชาพระพุทธศาสนา คณะพุทธศาสตร์ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย", "actorId": "1efbf903-43d7-45a4-834a-d48ac757cd05", "logoUrl": "/uploads/logos/ff4bfcb3-88e1-4f7a-8438-3b0df13805b0-logo-1789123351593-eb11d32bca88.jpg", "orgInfo": {"email": "vipassana.grad@mcu.ac.th", "phone": "๐๓๕-๒๔๘-๐๐๐ ต่อ ๘๐๕๐", "lineId": "@mcuvipassana", "website": "https://grad.mcu.ac.th", "addressEn": "Mahachulalongkornrajavidyalaya University, Wang Noi, Phra Nakhon Si Ayutthaya 13170 Thailand", "addressTh": "อาคารมหาจุฬาบรรณาคาร มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย ต.ลำไทร อ.วังน้อย จ.พระนครศรีอยุธยา ๑๓๑๗๐", "taglineEn": "World-Class Center for Buddhist Meditation Studies & Universal Peace", "taglineTh": "ศูนย์กลางการศึกษาพระอภิธรรมและวิปัสสนาภาวนาเพื่อสันติภาพโลก", "facebookUrl": "https://facebook.com/vipassanamcu", "descriptionEn": "A premier international graduate institution dedicated to the integration of Vipassana meditation with modern sciences, cultivating world-class Buddhist scholarship.", "descriptionTh": "สถาบันการศึกษาระดับบัณฑิตศึกษาชั้นนำ มุ่งเน้นการบูรณาการหลักสูตรวิปัสสนาภาวนากับวิทยาการร่วมสมัย สร้างสรรค์บุคลากรทางพุทธศาสนาที่มีคุณภาพระดับสากล", "officeHoursEn": "Saturday - Sunday: 08:30 - 17:00", "officeHoursTh": "วันเสาร์ - อาทิตย์ เวลา ๐๘:๓๐ - ๑๗:๐๐ น."}, "palette": "pink", "tenantId": "ff4bfcb3-88e1-4f7a-8438-3b0df13805b0"}	\N	2026-09-12 04:02:56.958+00
e52d1da9-63c5-493f-85c3-603422ba5556	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	1efbf903-43d7-45a4-834a-d48ac757cd05	tenant.settings_update	tenant	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	{"code": "MCU-VIPASSANA", "smtp": {"host": "smtp.gmail.com", "pass": "Passw0rd!vibe", "port": 465, "user": "admin@app.local", "secure": true, "enabled": false, "fromName": "หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา (ภาคเสาร์-อาทิตย์) มจร", "fromEmail": ""}, "gemini": {"model": "gemini-2.5-flash", "apiKey": "AIzaSyB3M1n1A1T3stK3yPr0v1d3r998877"}, "nameEn": "Master of Arts Program in Vipassana Meditation Studies (Weekend Session), Department of Buddhism, Faculty of Buddhism, Mahachulalongkornrajavidyalaya University", "nameTh": "หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา(ภาคเสาร์-อาทิตย์) ภาควิชาพระพุทธศาสนา คณะพุทธศาสตร์ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย", "logoUrl": "/uploads/logos/ff4bfcb3-88e1-4f7a-8438-3b0df13805b0-logo-1789123351593-eb11d32bca88.jpg", "orgInfo": {"email": "vipassana.grad@mcu.ac.th", "phone": "๐๓๕-๒๔๘-๐๐๐ ต่อ ๘๐๕๐", "lineId": "@mcuvipassana", "website": "https://grad.mcu.ac.th", "addressEn": "Mahachulalongkornrajavidyalaya University, Wang Noi, Phra Nakhon Si Ayutthaya 13170 Thailand", "addressTh": "อาคารมหาจุฬาบรรณาคาร มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย ต.ลำไทร อ.วังน้อย จ.พระนครศรีอยุธยา ๑๓๑๗๐", "taglineEn": "World-Class Center for Buddhist Meditation Studies & Universal Peace", "taglineTh": "ศูนย์กลางการศึกษาพระอภิธรรมและวิปัสสนาภาวนาเพื่อสันติภาพโลก", "facebookUrl": "https://facebook.com/vipassanamcu", "descriptionEn": "A premier international graduate institution dedicated to the integration of Vipassana meditation with modern sciences, cultivating world-class Buddhist scholarship.", "descriptionTh": "สถาบันการศึกษาระดับบัณฑิตศึกษาชั้นนำ มุ่งเน้นการบูรณาการหลักสูตรวิปัสสนาภาวนากับวิทยาการร่วมสมัย สร้างสรรค์บุคลากรทางพุทธศาสนาที่มีคุณภาพระดับสากล", "officeHoursEn": "Saturday - Sunday: 08:30 - 17:00", "officeHoursTh": "วันเสาร์ - อาทิตย์ เวลา ๐๘:๓๐ - ๑๗:๐๐ น."}, "palette": "pink"}	{"smtp": {"host": "smtp.gmail.com", "pass": "Passw0rd!vibe", "port": 465, "user": "admin@app.local", "secure": true, "enabled": false, "fromName": "หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา (ภาคเสาร์-อาทิตย์) มจร", "fromEmail": ""}, "gemini": {"model": "gemini-2.5-flash", "apiKey": "AIzaSyB3M1n1A1T3stK3yPr0v1d3r998877"}, "nameEn": "Master of Arts Program in Vipassana Meditation Studies (Weekend Session), Department of Buddhism, Faculty of Buddhism, Mahachulalongkornrajavidyalaya University", "nameTh": "หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา(ภาคเสาร์-อาทิตย์) ภาควิชาพระพุทธศาสนา คณะพุทธศาสตร์ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย", "actorId": "1efbf903-43d7-45a4-834a-d48ac757cd05", "logoUrl": "/uploads/logos/ff4bfcb3-88e1-4f7a-8438-3b0df13805b0-logo-1789123351593-eb11d32bca88.jpg", "orgInfo": {"email": "vipassana.grad@mcu.ac.th", "phone": "๐๓๕-๒๔๘-๐๐๐ ต่อ ๘๐๕๐", "lineId": "@mcuvipassana", "website": "https://grad.mcu.ac.th", "addressEn": "Mahachulalongkornrajavidyalaya University, Wang Noi, Phra Nakhon Si Ayutthaya 13170 Thailand", "addressTh": "อาคารมหาจุฬาบรรณาคาร มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย ต.ลำไทร อ.วังน้อย จ.พระนครศรีอยุธยา ๑๓๑๗๐", "taglineEn": "World-Class Center for Buddhist Meditation Studies & Universal Peace", "taglineTh": "ศูนย์กลางการศึกษาพระอภิธรรมและวิปัสสนาภาวนาเพื่อสันติภาพโลก", "facebookUrl": "https://facebook.com/vipassanamcu", "descriptionEn": "A premier international graduate institution dedicated to the integration of Vipassana meditation with modern sciences, cultivating world-class Buddhist scholarship.", "descriptionTh": "สถาบันการศึกษาระดับบัณฑิตศึกษาชั้นนำ มุ่งเน้นการบูรณาการหลักสูตรวิปัสสนาภาวนากับวิทยาการร่วมสมัย สร้างสรรค์บุคลากรทางพุทธศาสนาที่มีคุณภาพระดับสากล", "officeHoursEn": "Saturday - Sunday: 08:30 - 17:00", "officeHoursTh": "วันเสาร์ - อาทิตย์ เวลา ๐๘:๓๐ - ๑๗:๐๐ น."}, "palette": "pink", "tenantId": "ff4bfcb3-88e1-4f7a-8438-3b0df13805b0"}	\N	2026-09-12 04:07:48.839+00
\.


--
-- Data for Name: auth_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_tokens (id, user_id, purpose, token_hash, payload, expires_at, used_at, created_at) FROM stdin;
\.


--
-- Data for Name: class_schedules; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.class_schedules (id, tenant_id, semester_id, course_code, course_name, instructor_name, day_of_week, start_time, end_time, room_number, teaching_mode, online_meeting_url, online_meeting_passcode, created_at, updated_at) FROM stdin;
0c17fc91-f0d6-4d2d-94b0-d85a9d20f7e9	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 101	วิธีวิทยาการวิจัยทางพระพุทธศาสนา	พระมหาสมบูรณ์ วุฑฺฒิกโร, รศ.ดร.	SATURDAY	09:00	12:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543210	MCU602101	2026-09-11 08:06:52.897+00	2026-09-11 08:06:52.897+00
525c0e34-b0f5-413c-8ef6-19ff3193656c	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 201	ทฤษฎีและประวัติวิปัสสนาภาวนา	พระครูปลัดสุวัฒนวชิรคุณ, ผศ.ดร.	SATURDAY	13:00	16:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543211	MCU602201	2026-09-11 08:06:52.901+00	2026-09-11 08:06:52.901+00
78b7c9f2-a0f7-486d-9048-0109f961bd7d	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 301	การปฏิบัติวิปัสสนาภาวนาขั้นสูง ๑ (สอบอารมณ์)	พระครูภาวนาวรานุวัตร, ดร.	SUNDAY	09:00	16:00	ศูนย์พัฒนาจิตตปัญญา มจร วังน้อย	ONSITE	\N	\N	2026-09-11 08:06:52.904+00	2026-09-11 08:06:52.904+00
82807043-7b2e-4590-88ea-e8e6c88dd61e	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 101	วิธีวิทยาการวิจัยทางพระพุทธศาสนา	พระมหาสมบูรณ์ วุฑฺฒิกโร, รศ.ดร.	SATURDAY	09:00	12:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543210	MCU602101	2026-09-11 08:21:46.12+00	2026-09-11 08:21:46.12+00
5f1a6ec2-2688-4d1e-b91b-dd7091b3784e	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 201	ทฤษฎีและประวัติวิปัสสนาภาวนา	พระครูปลัดสุวัฒนวชิรคุณ, ผศ.ดร.	SATURDAY	13:00	16:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543211	MCU602201	2026-09-11 08:21:46.125+00	2026-09-11 08:21:46.125+00
63471404-63bf-4e80-9396-5e420b831654	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 301	การปฏิบัติวิปัสสนาภาวนาขั้นสูง ๑ (สอบอารมณ์)	พระครูภาวนาวรานุวัตร, ดร.	SUNDAY	09:00	16:00	ศูนย์พัฒนาจิตตปัญญา มจร วังน้อย	ONSITE	\N	\N	2026-09-11 08:21:46.128+00	2026-09-11 08:21:46.128+00
c448836d-d2c9-46eb-bb71-b717a5b84c4d	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 101	วิธีวิทยาการวิจัยทางพระพุทธศาสนา	พระมหาสมบูรณ์ วุฑฺฒิกโร, รศ.ดร.	SATURDAY	09:00	12:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543210	MCU602101	2026-09-11 08:49:15.407+00	2026-09-11 08:49:15.407+00
75c724e6-7b64-49a2-9e08-e410301e1ce9	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 201	ทฤษฎีและประวัติวิปัสสนาภาวนา	พระครูปลัดสุวัฒนวชิรคุณ, ผศ.ดร.	SATURDAY	13:00	16:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543211	MCU602201	2026-09-11 08:49:15.412+00	2026-09-11 08:49:15.412+00
f9057172-c81c-4469-bd80-f554787b9a4a	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 301	การปฏิบัติวิปัสสนาภาวนาขั้นสูง ๑ (สอบอารมณ์)	พระครูภาวนาวรานุวัตร, ดร.	SUNDAY	09:00	16:00	ศูนย์พัฒนาจิตตปัญญา มจร วังน้อย	ONSITE	\N	\N	2026-09-11 08:49:15.415+00	2026-09-11 08:49:15.415+00
41a04006-5009-4574-babf-a2c262eefb2b	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 101	วิธีวิทยาการวิจัยทางพระพุทธศาสนา	พระมหาสมบูรณ์ วุฑฺฒิกโร, รศ.ดร.	SATURDAY	09:00	12:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543210	MCU602101	2026-09-11 09:01:25.07+00	2026-09-11 09:01:25.07+00
8123e9d3-ba5a-42a4-8e95-e149ac873bc0	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 201	ทฤษฎีและประวัติวิปัสสนาภาวนา	พระครูปลัดสุวัฒนวชิรคุณ, ผศ.ดร.	SATURDAY	13:00	16:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543211	MCU602201	2026-09-11 09:01:25.085+00	2026-09-11 09:01:25.085+00
616f9b42-c0b1-48c5-98d3-62c39ab2bcaa	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 301	การปฏิบัติวิปัสสนาภาวนาขั้นสูง ๑ (สอบอารมณ์)	พระครูภาวนาวรานุวัตร, ดร.	SUNDAY	09:00	16:00	ศูนย์พัฒนาจิตตปัญญา มจร วังน้อย	ONSITE	\N	\N	2026-09-11 09:01:25.099+00	2026-09-11 09:01:25.099+00
58cfabe3-5645-47bf-88d7-5dc1ed7e46a2	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 101	วิธีวิทยาการวิจัยทางพระพุทธศาสนา	พระมหาสมบูรณ์ วุฑฺฒิกโร, รศ.ดร.	SATURDAY	09:00	12:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543210	MCU602101	2026-09-11 09:30:22.009+00	2026-09-11 09:30:22.009+00
026b858d-60d9-4940-b3ff-6012f3cd9c4f	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 201	ทฤษฎีและประวัติวิปัสสนาภาวนา	พระครูปลัดสุวัฒนวชิรคุณ, ผศ.ดร.	SATURDAY	13:00	16:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543211	MCU602201	2026-09-11 09:30:22.1+00	2026-09-11 09:30:22.1+00
a2997124-ca2d-4164-bb73-91d698b2abab	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 301	การปฏิบัติวิปัสสนาภาวนาขั้นสูง ๑ (สอบอารมณ์)	พระครูภาวนาวรานุวัตร, ดร.	SUNDAY	09:00	16:00	ศูนย์พัฒนาจิตตปัญญา มจร วังน้อย	ONSITE	\N	\N	2026-09-11 09:30:22.121+00	2026-09-11 09:30:22.121+00
65ed4da7-df2b-44bf-83ad-8b582b04def5	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 101	วิธีวิทยาการวิจัยทางพระพุทธศาสนา	พระมหาสมบูรณ์ วุฑฺฒิกโร, รศ.ดร.	SATURDAY	09:00	12:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543210	MCU602101	2026-09-11 09:40:39.852+00	2026-09-11 09:40:39.852+00
3cb563df-dab5-467c-a91a-fb629ab514f1	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 201	ทฤษฎีและประวัติวิปัสสนาภาวนา	พระครูปลัดสุวัฒนวชิรคุณ, ผศ.ดร.	SATURDAY	13:00	16:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543211	MCU602201	2026-09-11 09:40:39.858+00	2026-09-11 09:40:39.858+00
b7b987b2-55b7-418b-b4e8-19c47b328ea2	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 301	การปฏิบัติวิปัสสนาภาวนาขั้นสูง ๑ (สอบอารมณ์)	พระครูภาวนาวรานุวัตร, ดร.	SUNDAY	09:00	16:00	ศูนย์พัฒนาจิตตปัญญา มจร วังน้อย	ONSITE	\N	\N	2026-09-11 09:40:39.862+00	2026-09-11 09:40:39.862+00
4af64ac4-9642-4a80-8b7d-80552fd4a3c1	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 101	วิธีวิทยาการวิจัยทางพระพุทธศาสนา	พระมหาสมบูรณ์ วุฑฺฒิกโร, รศ.ดร.	SATURDAY	09:00	12:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543210	MCU602101	2026-09-11 10:09:51.961+00	2026-09-11 10:09:51.961+00
44ad6979-cc91-4ed8-b6c0-f1dc22fa923e	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 201	ทฤษฎีและประวัติวิปัสสนาภาวนา	พระครูปลัดสุวัฒนวชิรคุณ, ผศ.ดร.	SATURDAY	13:00	16:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543211	MCU602201	2026-09-11 10:09:51.975+00	2026-09-11 10:09:51.975+00
9b23039b-6eb3-48c9-a076-4b803b713183	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 301	การปฏิบัติวิปัสสนาภาวนาขั้นสูง ๑ (สอบอารมณ์)	พระครูภาวนาวรานุวัตร, ดร.	SUNDAY	09:00	16:00	ศูนย์พัฒนาจิตตปัญญา มจร วังน้อย	ONSITE	\N	\N	2026-09-11 10:09:51.984+00	2026-09-11 10:09:51.984+00
520e1c13-02ed-409a-a718-f5fd81aece0f	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 101	วิธีวิทยาการวิจัยทางพระพุทธศาสนา	พระมหาสมบูรณ์ วุฑฺฒิกโร, รศ.ดร.	SATURDAY	09:00	12:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543210	MCU602101	2026-09-11 10:56:16.849+00	2026-09-11 10:56:16.849+00
31564090-dd1b-43cb-ab83-1449926d99b8	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 201	ทฤษฎีและประวัติวิปัสสนาภาวนา	พระครูปลัดสุวัฒนวชิรคุณ, ผศ.ดร.	SATURDAY	13:00	16:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543211	MCU602201	2026-09-11 10:56:16.856+00	2026-09-11 10:56:16.856+00
92f97955-5d29-41b4-b5df-d70fca8b4fa3	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 301	การปฏิบัติวิปัสสนาภาวนาขั้นสูง ๑ (สอบอารมณ์)	พระครูภาวนาวรานุวัตร, ดร.	SUNDAY	09:00	16:00	ศูนย์พัฒนาจิตตปัญญา มจร วังน้อย	ONSITE	\N	\N	2026-09-11 10:56:16.86+00	2026-09-11 10:56:16.86+00
b514595d-a5b7-4ba9-81a6-1a432c681e56	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 101	วิธีวิทยาการวิจัยทางพระพุทธศาสนา	พระมหาสมบูรณ์ วุฑฺฒิกโร, รศ.ดร.	SATURDAY	09:00	12:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543210	MCU602101	2026-09-11 11:15:59.935+00	2026-09-11 11:15:59.935+00
6d021b22-bcb4-49ea-b2d3-1ecc3453a6c4	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 201	ทฤษฎีและประวัติวิปัสสนาภาวนา	พระครูปลัดสุวัฒนวชิรคุณ, ผศ.ดร.	SATURDAY	13:00	16:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543211	MCU602201	2026-09-11 11:15:59.941+00	2026-09-11 11:15:59.941+00
8a713679-af70-48c0-bdf4-7284d2a784c2	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 301	การปฏิบัติวิปัสสนาภาวนาขั้นสูง ๑ (สอบอารมณ์)	พระครูภาวนาวรานุวัตร, ดร.	SUNDAY	09:00	16:00	ศูนย์พัฒนาจิตตปัญญา มจร วังน้อย	ONSITE	\N	\N	2026-09-11 11:15:59.944+00	2026-09-11 11:15:59.944+00
0ffa7249-df39-4a70-a7cc-9e8385d4bddd	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 101	วิธีวิทยาการวิจัยทางพระพุทธศาสนา	พระมหาสมบูรณ์ วุฑฺฒิกโร, รศ.ดร.	SATURDAY	09:00	12:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543210	MCU602101	2026-09-12 02:06:57.52+00	2026-09-12 02:06:57.52+00
f0eb71d0-3ad4-4d7b-bab9-fa77f0913eb8	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 201	ทฤษฎีและประวัติวิปัสสนาภาวนา	พระครูปลัดสุวัฒนวชิรคุณ, ผศ.ดร.	SATURDAY	13:00	16:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543211	MCU602201	2026-09-12 02:06:57.526+00	2026-09-12 02:06:57.526+00
304e7345-dc43-47bc-8398-04ee3fdb6b60	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 301	การปฏิบัติวิปัสสนาภาวนาขั้นสูง ๑ (สอบอารมณ์)	พระครูภาวนาวรานุวัตร, ดร.	SUNDAY	09:00	16:00	ศูนย์พัฒนาจิตตปัญญา มจร วังน้อย	ONSITE	\N	\N	2026-09-12 02:06:57.529+00	2026-09-12 02:06:57.529+00
ec56bcab-fe84-4d61-968d-1ceca5cb8fb9	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 101	วิธีวิทยาการวิจัยทางพระพุทธศาสนา	พระมหาสมบูรณ์ วุฑฺฒิกโร, รศ.ดร.	SATURDAY	09:00	12:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543210	MCU602101	2026-09-12 02:36:08.605+00	2026-09-12 02:36:08.605+00
759a4c7e-f666-448b-a6d4-54c5c26beb15	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 201	ทฤษฎีและประวัติวิปัสสนาภาวนา	พระครูปลัดสุวัฒนวชิรคุณ, ผศ.ดร.	SATURDAY	13:00	16:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543211	MCU602201	2026-09-12 02:36:08.609+00	2026-09-12 02:36:08.609+00
2b1b6aaa-5fea-4e92-a4d4-ee7e08067e89	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 301	การปฏิบัติวิปัสสนาภาวนาขั้นสูง ๑ (สอบอารมณ์)	พระครูภาวนาวรานุวัตร, ดร.	SUNDAY	09:00	16:00	ศูนย์พัฒนาจิตตปัญญา มจร วังน้อย	ONSITE	\N	\N	2026-09-12 02:36:08.612+00	2026-09-12 02:36:08.612+00
145a40e2-4aee-42ca-bfe4-31c0e511a817	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 101	วิธีวิทยาการวิจัยทางพระพุทธศาสนา	พระมหาสมบูรณ์ วุฑฺฒิกโร, รศ.ดร.	SATURDAY	09:00	12:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543210	MCU602101	2026-09-12 02:46:56.662+00	2026-09-12 02:46:56.662+00
f4234e48-bfa2-4f70-beae-8d7e1c985fa6	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 201	ทฤษฎีและประวัติวิปัสสนาภาวนา	พระครูปลัดสุวัฒนวชิรคุณ, ผศ.ดร.	SATURDAY	13:00	16:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543211	MCU602201	2026-09-12 02:46:56.67+00	2026-09-12 02:46:56.67+00
d36ca5e8-c599-4af3-b195-0617998338b2	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 301	การปฏิบัติวิปัสสนาภาวนาขั้นสูง ๑ (สอบอารมณ์)	พระครูภาวนาวรานุวัตร, ดร.	SUNDAY	09:00	16:00	ศูนย์พัฒนาจิตตปัญญา มจร วังน้อย	ONSITE	\N	\N	2026-09-12 02:46:56.674+00	2026-09-12 02:46:56.674+00
a9ca0791-6045-4fae-a207-f74a62432f8b	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 101	วิธีวิทยาการวิจัยทางพระพุทธศาสนา	พระมหาสมบูรณ์ วุฑฺฒิกโร, รศ.ดร.	SATURDAY	09:00	12:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543210	MCU602101	2026-09-12 02:55:52.199+00	2026-09-12 02:55:52.199+00
c58a9d0e-9283-4033-b361-cc4018c8dae2	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 201	ทฤษฎีและประวัติวิปัสสนาภาวนา	พระครูปลัดสุวัฒนวชิรคุณ, ผศ.ดร.	SATURDAY	13:00	16:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543211	MCU602201	2026-09-12 02:55:52.203+00	2026-09-12 02:55:52.203+00
1f9b0310-25c0-4056-9e09-d9ad9f712083	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 301	การปฏิบัติวิปัสสนาภาวนาขั้นสูง ๑ (สอบอารมณ์)	พระครูภาวนาวรานุวัตร, ดร.	SUNDAY	09:00	16:00	ศูนย์พัฒนาจิตตปัญญา มจร วังน้อย	ONSITE	\N	\N	2026-09-12 02:55:52.207+00	2026-09-12 02:55:52.207+00
ae894739-4bc0-4952-b7d0-7289ac6a9f26	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 101	วิธีวิทยาการวิจัยทางพระพุทธศาสนา	พระมหาสมบูรณ์ วุฑฺฒิกโร, รศ.ดร.	SATURDAY	09:00	12:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543210	MCU602101	2026-09-12 03:02:35.967+00	2026-09-12 03:02:35.967+00
1b2d548a-420b-4400-b1f4-706d461fa490	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 201	ทฤษฎีและประวัติวิปัสสนาภาวนา	พระครูปลัดสุวัฒนวชิรคุณ, ผศ.ดร.	SATURDAY	13:00	16:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543211	MCU602201	2026-09-12 03:02:35.971+00	2026-09-12 03:02:35.971+00
f83a5886-82d5-4d9f-8685-416d633e1dd6	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 301	การปฏิบัติวิปัสสนาภาวนาขั้นสูง ๑ (สอบอารมณ์)	พระครูภาวนาวรานุวัตร, ดร.	SUNDAY	09:00	16:00	ศูนย์พัฒนาจิตตปัญญา มจร วังน้อย	ONSITE	\N	\N	2026-09-12 03:02:35.974+00	2026-09-12 03:02:35.974+00
02e0f136-5109-46dd-9566-0ebe7b86b8dc	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 101	วิธีวิทยาการวิจัยทางพระพุทธศาสนา	พระมหาสมบูรณ์ วุฑฺฒิกโร, รศ.ดร.	SATURDAY	09:00	12:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543210	MCU602101	2026-09-12 03:18:03.492+00	2026-09-12 03:18:03.492+00
13e16ef3-b75c-4238-9ac9-0aa86de2c764	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 201	ทฤษฎีและประวัติวิปัสสนาภาวนา	พระครูปลัดสุวัฒนวชิรคุณ, ผศ.ดร.	SATURDAY	13:00	16:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543211	MCU602201	2026-09-12 03:18:03.497+00	2026-09-12 03:18:03.497+00
270a9753-1a14-4cea-a477-124bea07309b	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	602 301	การปฏิบัติวิปัสสนาภาวนาขั้นสูง ๑ (สอบอารมณ์)	พระครูภาวนาวรานุวัตร, ดร.	SUNDAY	09:00	16:00	ศูนย์พัฒนาจิตตปัญญา มจร วังน้อย	ONSITE	\N	\N	2026-09-12 03:18:03.501+00	2026-09-12 03:18:03.501+00
5345c693-9ece-4a8c-8d4d-0f3d38893aae	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	600 101	พระไตรปิฎกวิเคราะห์	พระมหาสมบูรณ์ วุฑฺฒิกโร, รศ.ดร.	SATURDAY	09:00	12:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543210	MCU600101	2026-09-12 03:44:25.356+00	2026-09-12 03:44:25.356+00
0aeb60c9-5bbb-40f1-a634-a005e8a56e1a	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	606 202	สติปัฏฐานภาวนา	พระครูปลัดสุวัฒนวชิรคุณ, ผศ.ดร.	SATURDAY	13:00	16:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543211	MCU606202	2026-09-12 03:44:25.36+00	2026-09-12 03:44:25.36+00
f8bb865a-7aee-42a3-836c-11bc82a7d848	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	606 408	ปฏิบัติวิปัสสนาภาวนา (สอบอารมณ์)	พระครูภาวนาวรานุวัตร, ดร.	SUNDAY	09:00	16:00	ศูนย์พัฒนาจิตตปัญญา มจร วังน้อย	ONSITE	\N	\N	2026-09-12 03:44:25.364+00	2026-09-12 03:44:25.364+00
35b22461-1038-420a-9fdc-a32f90b1c388	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	600 101	พระไตรปิฎกวิเคราะห์	พระมหาสมบูรณ์ วุฑฺฒิกโร, รศ.ดร.	SATURDAY	09:00	12:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543210	MCU600101	2026-09-12 04:02:22.335+00	2026-09-12 04:02:22.335+00
03bca8d0-6724-4e18-9a2b-9d232460368f	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	606 202	สติปัฏฐานภาวนา	พระครูปลัดสุวัฒนวชิรคุณ, ผศ.ดร.	SATURDAY	13:00	16:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543211	MCU606202	2026-09-12 04:02:22.339+00	2026-09-12 04:02:22.339+00
f8e21924-2c67-4672-a943-9b253effcce9	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	606 408	ปฏิบัติวิปัสสนาภาวนา (สอบอารมณ์)	พระครูภาวนาวรานุวัตร, ดร.	SUNDAY	09:00	16:00	ศูนย์พัฒนาจิตตปัญญา มจร วังน้อย	ONSITE	\N	\N	2026-09-12 04:02:22.344+00	2026-09-12 04:02:22.344+00
6c0ff8b2-81f0-4a84-b9f1-351c0834edba	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	600 101	พระไตรปิฎกวิเคราะห์	พระมหาสมบูรณ์ วุฑฺฒิกโร, รศ.ดร.	SATURDAY	09:00	12:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543210	MCU600101	2026-09-12 04:07:14.549+00	2026-09-12 04:07:14.549+00
0b15baf5-5734-4213-9f42-0a1d22948bac	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	606 202	สติปัฏฐานภาวนา	พระครูปลัดสุวัฒนวชิรคุณ, ผศ.ดร.	SATURDAY	13:00	16:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543211	MCU606202	2026-09-12 04:07:14.557+00	2026-09-12 04:07:14.557+00
5cd86009-c727-4e81-ad42-089d9f6323e0	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	606 408	ปฏิบัติวิปัสสนาภาวนา (สอบอารมณ์)	พระครูภาวนาวรานุวัตร, ดร.	SUNDAY	09:00	16:00	ศูนย์พัฒนาจิตตปัญญา มจร วังน้อย	ONSITE	\N	\N	2026-09-12 04:07:14.562+00	2026-09-12 04:07:14.562+00
e91267d8-b74f-4b0e-a618-7fe5a91b910f	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	600 101	พระไตรปิฎกวิเคราะห์	พระมหาสมบูรณ์ วุฑฺฒิกโร, รศ.ดร.	SATURDAY	09:00	12:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543210	MCU600101	2026-09-12 04:22:47.443+00	2026-09-12 04:22:47.443+00
8905ab11-5e4d-41dc-be30-55aebffdc4a3	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	606 202	สติปัฏฐานภาวนา	พระครูปลัดสุวัฒนวชิรคุณ, ผศ.ดร.	SATURDAY	13:00	16:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543211	MCU606202	2026-09-12 04:22:47.452+00	2026-09-12 04:22:47.452+00
17f38eae-b501-4ba5-a6fc-a009025a9f15	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	606 408	ปฏิบัติวิปัสสนาภาวนา (สอบอารมณ์)	พระครูภาวนาวรานุวัตร, ดร.	SUNDAY	09:00	16:00	ศูนย์พัฒนาจิตตปัญญา มจร วังน้อย	ONSITE	\N	\N	2026-09-12 04:22:47.463+00	2026-09-12 04:22:47.463+00
36e3cc00-4f3e-4f9c-a5ac-33f378085679	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	600 101	พระไตรปิฎกวิเคราะห์	พระมหาสมบูรณ์ วุฑฺฒิกโร, รศ.ดร.	SATURDAY	09:00	12:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543210	MCU600101	2026-09-12 04:31:15.02+00	2026-09-12 04:31:15.02+00
188bd1bb-5b0c-4262-902a-a0c6289ca634	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	606 202	สติปัฏฐานภาวนา	พระครูปลัดสุวัฒนวชิรคุณ, ผศ.ดร.	SATURDAY	13:00	16:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543211	MCU606202	2026-09-12 04:31:15.039+00	2026-09-12 04:31:15.039+00
dc8093c4-4913-4272-95cc-4a88c27bb88f	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	606 408	ปฏิบัติวิปัสสนาภาวนา (สอบอารมณ์)	พระครูภาวนาวรานุวัตร, ดร.	SUNDAY	09:00	16:00	ศูนย์พัฒนาจิตตปัญญา มจร วังน้อย	ONSITE	\N	\N	2026-09-12 04:31:15.052+00	2026-09-12 04:31:15.052+00
eab3247c-ca71-4cfb-a416-8eda0baa8186	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	600 101	พระไตรปิฎกวิเคราะห์	พระมหาสมบูรณ์ วุฑฺฒิกโร, รศ.ดร.	SATURDAY	09:00	12:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543210	MCU600101	2026-09-12 05:54:34.29+00	2026-09-12 05:54:34.29+00
3faa45cb-d961-4b2d-b9e6-1f0508f30012	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	606 202	สติปัฏฐานภาวนา	พระครูปลัดสุวัฒนวชิรคุณ, ผศ.ดร.	SATURDAY	13:00	16:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543211	MCU606202	2026-09-12 05:54:34.302+00	2026-09-12 05:54:34.302+00
ee0209b0-f22b-4fbf-8e9e-330582612588	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	606 408	ปฏิบัติวิปัสสนาภาวนา (สอบอารมณ์)	พระครูภาวนาวรานุวัตร, ดร.	SUNDAY	09:00	16:00	ศูนย์พัฒนาจิตตปัญญา มจร วังน้อย	ONSITE	\N	\N	2026-09-12 05:54:34.318+00	2026-09-12 05:54:34.318+00
6d953ee5-7a06-477a-899f-2b334505c04e	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	600 101	พระไตรปิฎกวิเคราะห์	พระมหาสมบูรณ์ วุฑฺฒิกโร, รศ.ดร.	SATURDAY	09:00	12:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543210	MCU600101	2026-09-12 05:58:22.255+00	2026-09-12 05:58:22.255+00
fa3234ff-19cb-4f2c-8d05-94d0215b7240	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	606 202	สติปัฏฐานภาวนา	พระครูปลัดสุวัฒนวชิรคุณ, ผศ.ดร.	SATURDAY	13:00	16:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543211	MCU606202	2026-09-12 05:58:22.263+00	2026-09-12 05:58:22.263+00
0a889c59-4ff7-406c-9070-9ccf26e29cd8	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	606 408	ปฏิบัติวิปัสสนาภาวนา (สอบอารมณ์)	พระครูภาวนาวรานุวัตร, ดร.	SUNDAY	09:00	16:00	ศูนย์พัฒนาจิตตปัญญา มจร วังน้อย	ONSITE	\N	\N	2026-09-12 05:58:22.27+00	2026-09-12 05:58:22.27+00
e0cd82be-00af-4ae7-9f4d-8c93c6412bc0	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	600 101	พระไตรปิฎกวิเคราะห์	พระมหาสมบูรณ์ วุฑฺฒิกโร, รศ.ดร.	SATURDAY	09:00	12:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543210	MCU600101	2026-09-12 07:20:53.797+00	2026-09-12 07:20:53.797+00
b1b5aa07-46ee-408f-ae49-5bf93dc42d60	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	606 202	สติปัฏฐานภาวนา	พระครูปลัดสุวัฒนวชิรคุณ, ผศ.ดร.	SATURDAY	13:00	16:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543211	MCU606202	2026-09-12 07:20:53.801+00	2026-09-12 07:20:53.801+00
4b0a5c0d-47bd-4bad-9ff3-c00d94cbde76	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	606 408	ปฏิบัติวิปัสสนาภาวนา (สอบอารมณ์)	พระครูภาวนาวรานุวัตร, ดร.	SUNDAY	09:00	16:00	ศูนย์พัฒนาจิตตปัญญา มจร วังน้อย	ONSITE	\N	\N	2026-09-12 07:20:53.805+00	2026-09-12 07:20:53.805+00
b68e77a3-7e74-48a6-b95f-01699cf9d64d	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	600 101	พระไตรปิฎกวิเคราะห์	พระมหาสมบูรณ์ วุฑฺฒิกโร, รศ.ดร.	SATURDAY	09:00	12:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543210	MCU600101	2026-09-12 07:31:35.375+00	2026-09-12 07:31:35.375+00
ffe71777-0185-4249-b0c4-ea96759fefd3	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	606 202	สติปัฏฐานภาวนา	พระครูปลัดสุวัฒนวชิรคุณ, ผศ.ดร.	SATURDAY	13:00	16:00	ห้องบรรยาย บัณฑิตศึกษา ๔๐๑	HYBRID	https://zoom.us/j/9876543211	MCU606202	2026-09-12 07:31:35.384+00	2026-09-12 07:31:35.384+00
30526a5e-6cf9-4403-81d6-30712f538ded	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	a6874896-15b6-4ffd-b883-f6fcc7724e15	606 408	ปฏิบัติวิปัสสนาภาวนา (สอบอารมณ์)	พระครูภาวนาวรานุวัตร, ดร.	SUNDAY	09:00	16:00	ศูนย์พัฒนาจิตตปัญญา มจร วังน้อย	ONSITE	\N	\N	2026-09-12 07:31:35.391+00	2026-09-12 07:31:35.391+00
\.


--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.courses (id, tenant_id, curriculum_id, course_code, name_th, name_en, credit_total, credit_lecture, credit_lab, credit_self, course_type, description_th, description_en, created_at, updated_at) FROM stdin;
792c227f-d29f-48be-aaff-3d03f58fcb4e	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	602 101	วิธีวิทยาการวิจัยทางพระพุทธศาสนา	Research Methodology in Buddhism	3	3	0	6	BASIC	\N	\N	2026-09-11 08:06:52.769+00	2026-09-11 08:06:52.769+00
dea239bc-54b7-4e37-a076-96efcfe8367e	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	602 102	พระไตรปิฎกวิเคราะห์	Analytical Study of Tipitaka	3	3	0	6	CORE	\N	\N	2026-09-11 08:06:52.78+00	2026-09-11 08:06:52.78+00
be2be170-eeae-4132-a1eb-487bd75cfab6	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	602 201	ทฤษฎีและประวัติวิปัสสนาภาวนา	Theory and History of Vipassana Meditation	3	3	0	6	CORE	\N	\N	2026-09-11 08:06:52.787+00	2026-09-11 08:06:52.787+00
70027c8c-06aa-49ba-9bc4-04365c2feda0	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	602 202	คัมภีร์วิสุทธิมรรคและอภิธรรมภาวนา	Visuddhimagga and Abhidhamma Meditation	3	3	0	6	SPECIALIZED	\N	\N	2026-09-11 08:06:52.794+00	2026-09-11 08:06:52.794+00
f4be2e58-dff6-46d0-ad18-a191309113d1	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	602 301	การปฏิบัติวิปัสสนาภาวนาขั้นสูง ๑	Advanced Vipassana Practice I	3	3	0	6	PRACTICE_VIPASSANA	\N	\N	2026-09-11 08:06:52.801+00	2026-09-11 08:06:52.801+00
7c29e113-e908-46f9-9ff7-231873f96df9	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	602 302	การปฏิบัติวิปัสสนาภาวนาขั้นสูง ๒	Advanced Vipassana Practice II	3	3	0	6	PRACTICE_VIPASSANA	\N	\N	2026-09-11 08:06:52.807+00	2026-09-11 08:06:52.807+00
f7573327-77da-4f3e-a24c-cd833e58da43	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	606 307	สัมมนาวิปัสสนาภาวนา	Seminar on Vipassana Bhavana	3	3	0	6	SPECIALIZED	การสัมมนาแลกเปลี่ยนประเด็นปัญหา ประสบการณ์ และปรากฏการณ์ที่เกิดขึ้นจากการปฏิบัติวิปัสสนาภาวนา การวิเคราะห์ตามคัมภีร์เถรวาท และการนำเสนอแนวทางแก้ไขข้อขัดข้องในการปฏิบัติ	\N	2026-09-12 03:44:25.155+00	2026-09-12 07:31:35.015+00
d97588d1-397e-464f-8f05-d0ef48412a71	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	102 302	การใช้ภาษาบาลี ๑	Pali Usage I	3	3	0	6	BASIC	ศึกษาไวยากรณ์บาลีเบื้องต้น โครงสร้างประโยค ศัพท์ และสำนวนภาษาบาลี เพื่อการสืบค้นและแปลความหมายจากคัมภีร์พระพุทธศาสนาชั้นต้น	\N	2026-09-12 03:44:25.111+00	2026-09-12 07:31:34.97+00
addda777-4262-4955-a667-8609fd319c96	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	102 306	การใช้ภาษาบาลี ๒	Pali Usage II	3	3	0	6	BASIC	ศึกษาไวยากรณ์บาลีขั้นสูง การแปลพระไตรปิฎก อรรถกถา และฎีกา เน้นคำศัพท์และรูปประโยคที่เกี่ยวข้องกับการปฏิบัติสมถะและวิปัสสนาภาวนา	\N	2026-09-12 03:44:25.116+00	2026-09-12 07:31:34.975+00
840a3866-9748-4fdd-aad4-9edd708a69a6	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	600 101	พระไตรปิฎกวิเคราะห์	Analytical Study of Tipitaka	3	3	0	6	CORE	ศึกษาประวัติ ความเป็นมา โครงสร้าง และสาระสำคัญของพระวินัยปิฎก พระสุตตันตปิฎก และพระอภิธรรมปิฎก การวิเคราะห์หลักธรรมสำคัญเพื่อการประยุกต์ใช้ในการปฏิบัติและการแก้ปัญหาสังคมร่วมสมัย	\N	2026-09-12 03:44:25.122+00	2026-09-12 07:31:34.983+00
12c3dd91-f27b-4a05-85c3-73f460647c42	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	606 202	สติปัฏฐานภาวนา	Satipatthana Bhavana	3	3	0	6	CORE	ศึกษาวิเคราะห์มหาสติปัฏฐานสูตรในพระสุตตันตปิฎก และอรรถกถาฎีกาที่เกี่ยวข้อง ทั้งกายานุปัสสนา เวทนานุปัสสนา จิตตานุปัสสนา และธัมมานุปัสสนา เพื่อเป็นรากฐานการปฏิบัติวิปัสสนาภาวนา	\N	2026-09-12 03:44:25.132+00	2026-09-12 07:31:34.99+00
00e49cf1-8cd1-4d95-a293-92f64799ad2f	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	606 203	ระเบียบวิธีวิจัยทางวิปัสสนาภาวนา	Research Methodology in Vipassana Meditation	3	3	0	6	CORE	ศึกษาหลักการและกระบวนการวิจัยทางพระพุทธศาสนา ระเบียบวิธีวิจัยเชิงคุณภาพ เชิงปริมาณ และเชิงปฏิบัติการ การออกแบบงานวิจัยด้านวิปัสสนาภาวนา การรวบรวมข้อมูล การวิเคราะห์ข้อมูล และการเขียนรายงานการวิจัย	\N	2026-09-12 03:44:25.137+00	2026-09-12 07:31:34.996+00
f9ae5319-2881-498e-9c53-90e66d85c52b	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	606 105	สมถภาวนา	Samatha Bhavana	3	3	0	6	SPECIALIZED	ศึกษาหลักธรรม อารมณ์ และวิธีการเจริญสมถกัมมัฏฐาน ๔๐ วิธีตามแนวคัมภีร์วิสุทธิมรรค องค์ฌาน อุปจารสมาธิ อัปปนาสมาธิ และการนำสมถะมาเป็นบาทฐานแก่วิปัสสนาภาวนา	\N	2026-09-12 03:44:25.141+00	2026-09-12 07:31:35.001+00
fbeb9731-0f4a-4400-ab27-b89c8dea75b6	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	606 206	วิปัสสนาภาวนา	Vipassana Bhavana	3	3	0	6	SPECIALIZED	ศึกษากระบวนการและลำดับขั้นตอนการเจริญวิปัสสนาภาวนา อารมณ์ของวิปัสสนา วิปัสสนาภูมิ ๖ วิสุทธิ ๗ และการเกิดขึ้นของวิปัสสนาญาณ ๑๖ อย่างเป็นระบบ	\N	2026-09-12 03:44:25.15+00	2026-09-12 07:31:35.009+00
c171d097-b290-4166-9ccd-920b45d064f6	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	606 116	จรณะศึกษา	Carana Studies	3	3	0	6	ELECTIVE	ศึกษาหลักจรณะ ๑๕ ประการ อันเป็นความประพฤติและศีลธรรมที่เอื้อต่อการบรรลุวิชชาและวิปัสสนาญาณ เพื่อพัฒนาจริยวัตรและจิตสำนึกแห่งการเป็นผู้นำทางจิตวิญญาณ	\N	2026-09-12 03:44:25.2+00	2026-09-12 07:31:35.061+00
195684e7-60e3-482a-bfa7-f220a35ce398	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	606 317	วิปัสสนาภาวนาในคัมภีร์พระพุทธศาสนา	Vipassana Meditation in Buddhist Scriptures	3	3	0	6	ELECTIVE	ศึกษาวิเคราะห์คำสอนเรื่องวิปัสสนาภาวนาที่ปรากฏในคัมภีร์ปฏิสัมภิทามรรค เนตติปกรณ์ และมิลินทปัญหา เพื่อความกระจ่างแจ้งในรากฐานทางคัมภีร์	\N	2026-09-12 03:44:25.206+00	2026-09-12 07:31:35.066+00
8f9a7406-aa9d-4350-b7c9-2d75cea81504	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	606 318	เทคนิคและกระบวนการสอนวิปัสสนาภาวนา	Techniques and Processes of Teaching Vipassana Meditation	3	2	2	5	ELECTIVE	ศึกษาจิตวิทยาการสอน ทักษะการสื่อสาร กระบวนการให้คำปรึกษา และเทคนิคการแนะนำอารมณ์กรรมฐานแก่ผู้ปฏิบัติที่มีพื้นฐานและปัญหาแตกต่างกัน	\N	2026-09-12 03:44:25.212+00	2026-09-12 07:31:35.07+00
956cc128-b0b2-430c-a6df-a4ffa585e4f7	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	606 109	ปรมัตถธรรมวิเคราะห์	Analytical Study of Paramattha Dhamma	3	3	0	6	ELECTIVE	ศึกษาวิเคราะห์สภาวธรรมอันเป็นปรมัตถ์ คือ จิต เจตสิก รูป และนิพพาน ตามแนวพระอภิธรรมปิฎก เพื่อความเข้าใจสภาพธรรมที่เกิดขึ้นจริงในขณะเจริญวิปัสสนา	\N	2026-09-12 03:44:25.165+00	2026-09-12 07:31:35.026+00
7e72adf6-9665-4b4d-af31-a9fdcfc005fe	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	606 310	การเป็นวิทยากรและการจัดค่ายวิปัสสนาภาวนา	Being a Speaker and Organizing Vipassana Retreats	3	2	2	5	ELECTIVE	ศึกษาบทบาท เทคนิค และคุณสมบัติของวิทยากรวิปัสสนาภาวนา การออกแบบหลักสูตรค่าย การจัดกิจกรรมและการประเมินผลการจัดค่ายปฏิบัติธรรมสำหรับเยาวชนและประชาชนทั่วไป	\N	2026-09-12 03:44:25.17+00	2026-09-12 07:31:35.033+00
ed915a2e-a5e3-4e34-8f6a-0556ff9b7873	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	606 311	การประเมินผลการปฏิบัติวิปัสสนาภาวนา	Evaluation of Vipassana Meditation Practice	3	2	2	5	ELECTIVE	ศึกษาเครื่องมือ เทคนิค และมาตรฐานในการติดตามและประเมินผลสภาวธรรมของผู้ปฏิบัติวิปัสสนาภาวนา การบันทึกสภาวะ การสัมภาษณ์และการสอบอารมณ์ตามหลักเกณฑ์ในคัมภีร์	\N	2026-09-12 03:44:25.174+00	2026-09-12 07:31:35.038+00
34f048ef-5f6c-49d0-bb6b-f54a57b6186d	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	606 112	วิปัสสนาภาวนากับสังคมร่วมสมัย	Vipassana Meditation and Contemporary Society	3	3	0	6	ELECTIVE	ศึกษาการประยุกต์ใช้วิปัสสนาภาวนาในการบำบัดความเครียด ภาวะซึมเศร้า และการพัฒนาคุณภาพชีวิตของคนในสังคมปัจจุบัน การสร้างภูมิคุ้มกันทางจิตใจในยุคดิจิทัล	\N	2026-09-12 03:44:25.179+00	2026-09-12 07:31:35.043+00
74255b04-3e26-447a-8761-be2ebbcdcfdc	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	606 213	ชีวิตและผลงานพระวิปัสสนาจารย์ไทย	Lives and Works of Thai Vipassana Masters	3	3	0	6	ELECTIVE	ศึกษาชีวประวัติ ปฏิปทา วิธีการสอน และคุณูปการของพระวิปัสสนาจารย์ที่มีชื่อเสียงของประเทศไทย เช่น พระมงคลเทพมุนี (สด จนฺทสโร), หลวงปู่มั่น ภูริทตฺโต, หลวงพ่อเทียน จิตฺตสุโภ, พระธรรมธีรราชมหามุนี (โชดก ญาณสิทฺธิ) เป็นต้น	\N	2026-09-12 03:44:25.184+00	2026-09-12 07:31:35.048+00
c5dac29f-95e0-4001-bc73-587f3fab2c63	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	606 314	เทคโนโลยีสารสนเทศเพื่อการเผยแผ่วิปัสสนาภาวนา	Information Technology for Vipassana Meditation Propagation	3	2	2	5	ELECTIVE	ศึกษาการนำเทคโนโลยีดิจิทัล สื่อออนไลน์ แอปพลิเคชัน และแพลตฟอร์มการเรียนรู้สมัยใหม่มาใช้ในการเผยแผ่และการสอนวิปัสสนาภาวนาสู่กลุ่มเป้าหมายสากล	\N	2026-09-12 03:44:25.189+00	2026-09-12 07:31:35.053+00
f2fae7b3-2055-4c9c-b79e-fe0baeea8e19	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	606 315	การศึกษาอิสระทางวิปัสสนาภาวนา	Independent Study in Vipassana Meditation	3	0	0	9	ELECTIVE	การค้นคว้า วิจัย หรือศึกษาประเด็นเฉพาะด้านวิปัสสนาภาวนาที่นิสิตมีความสนใจ ภายใต้คำแนะนำของอาจารย์ที่ปรึกษา และจัดทำรายงานวิชาการ	\N	2026-09-12 03:44:25.194+00	2026-09-12 07:31:35.057+00
e4dcbdae-3acd-4a12-a376-370b180eaef4	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	606 327	อานาปานสติภาวนาศึกษา	Anapanasati Bhavana Studies	3	3	0	6	ELECTIVE	ศึกษาวิเคราะห์อานาปานสติสูตร ขั้นตอนการเจริญอานาปานสติ ๑๖ ขั้น และการต่อยอดจากลมหายใจเข้า-ออกสู่การรู้แจ้งในวิปัสสนาญาณ	\N	2026-09-12 03:44:25.265+00	2026-09-12 07:31:35.12+00
d9184ec2-c330-4437-a5d7-8192c70682ec	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	602 200	วิทยานิพนธ์	Master's Thesis	12	0	0	36	THESIS	การทำวิทยานิพนธ์ที่มีมาตรฐานทางวิชาการ ก่อให้เกิดองค์ความรู้ใหม่ทางวิปัสสนาภาวนาและพระพุทธศาสนา ภายใต้การควบคุมของคณะกรรมการที่ปรึกษาวิทยานิพนธ์และเผยแพร่ตามเกณฑ์มาตรฐาน	\N	2026-09-12 03:44:25.272+00	2026-09-12 07:31:35.126+00
876a51a1-af91-49bb-9bc1-9964739cfa97	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	602 400	สารนิพนธ์	Thematic Paper	6	0	0	18	THESIS	การศึกษา ค้นคว้า และเรียบเรียงสารนิพนธ์ในหัวข้อเฉพาะทางด้านวิปัสสนาภาวนาที่มีระเบียบวิธีวิจัยถูกต้อง พร้อมทั้งการสอบปากเปล่าและการเผยแพร่งานวิชาการ	\N	2026-09-11 08:06:52.814+00	2026-09-12 07:31:35.134+00
1bed3d9e-7adb-4165-aa50-ec383b82a330	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	600 104	การใช้ภาษาอังกฤษสำหรับบัณฑิตศึกษา	English for Graduate Studies	3	3	0	6	BASIC	ศึกษาทักษะการใช้ภาษาอังกฤษเพื่อการสื่อสารทางวิชาการ การอ่านและทำความเข้าใจบทความวิชาการทางพระพุทธศาสนา การเขียนสรุปความ และการนำเสนอผลงานทางวิชาการเป็นภาษาอังกฤษ	\N	2026-09-12 03:44:25.105+00	2026-09-12 07:31:34.965+00
6555e1be-0af7-408b-860e-7bedfe1f7194	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	606 220	วิปัสสนาญาณ ๑๖	The Sixteen Stages of Vipassana Knowledge	3	3	0	6	ELECTIVE	ศึกษาวิเคราะห์พัฒนาการของวิปัสสนาญาณทั้ง ๑๖ ขั้น ตั้งแต่นามรูปปริจเฉทญาณ จนถึงมัคคญาณ ผลญาณ และปัจจเวกขณญาณ รวมถึงวิปัสสนูปกิเลส ๑๐	\N	2026-09-12 03:44:25.224+00	2026-09-12 07:31:35.079+00
07464ef2-d806-44cc-b407-e3a2d44d8fe7	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	606 321	ภาษาอังกฤษเพื่อการสอนวิปัสสนาภาวนา	English for Teaching Vipassana Meditation	3	3	0	6	ELECTIVE	ศึกษาคำศัพท์ สำนวน และทักษะภาษาอังกฤษที่ใช้ในการนำปฏิบัติ การบรรยายธรรม และการสอบอารมณ์กรรมฐานแก่ชาวต่างชาติ	\N	2026-09-12 03:44:25.228+00	2026-09-12 07:31:35.084+00
75ee1eff-f59e-4059-a214-e81f865c5608	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	606 122	ภาษาบาลีเพื่อการวิจัยวิปัสสนาภาวนา	Pali for Vipassana Meditation Research	3	3	0	6	ELECTIVE	ศึกษาคำศัพท์และโครงสร้างภาษาบาลีเฉพาะด้านสมถะและวิปัสสนา เพื่อประโยชน์ในการตรวจสอบเทียบเคียงคัมภีร์และการทำวิจัยเชิงคัมภีร์	\N	2026-09-12 03:44:25.233+00	2026-09-12 07:31:35.088+00
55b12cc4-78c4-468b-a5a9-a296bf7e09d1	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	606 323	ยุทธศาสตร์การบริหารศูนย์วิปัสสนาภาวนา	Strategic Management of Vipassana Meditation Centers	3	3	0	6	ELECTIVE	ศึกษาหลักการบริหารจัดการสำนักปฏิบัติธรรม การวางแผนยุทธศาสตร์ การบริหารบุคลากร งบประมาณ และการสร้างเครือข่ายความร่วมมือทั้งในและต่างประเทศ	\N	2026-09-12 03:44:25.237+00	2026-09-12 07:31:35.092+00
2bc46349-0836-43b3-bdfb-829747b81390	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	606 324	วิปัสสนาภาวนากับการพัฒนาสังคม	Vipassana Meditation and Social Development	3	3	0	6	ELECTIVE	ศึกษาบทบาทของวิปัสสนาภาวนาในการเสริมสร้างสันติภาพ ความสมานฉันท์ในชุมชน และการขับเคลื่อนองค์กรคุณธรรมเพื่อการพัฒนาสังคมที่ยั่งยืน	\N	2026-09-12 03:44:25.241+00	2026-09-12 07:31:35.097+00
b9cf1275-4a87-495a-97b1-a1936473f03c	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	606 325	การศึกษาวิเคราะห์วิปัสสนากับสมาธิทั่วไป	Analytical Study of Vipassana and General Meditation	3	3	0	6	ELECTIVE	ศึกษาเปรียบเทียบความเหมือนและความต่างระหว่างวิปัสสนาภาวนาตามแนวพุทธศาสนากับการทำสมาธิในศาสนาและลัทธิอื่น เช่น โยคะ เซน ทรานเซนเดนทัล เป็นต้น	\N	2026-09-12 03:44:25.247+00	2026-09-12 07:31:35.103+00
5b86dce4-859a-457d-bd2d-ea42f61c6236	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	606 326	การบูรณาการวิปัสสนาภาวนากับศาสตร์สมัยใหม่	Integration of Vipassana Meditation with Modern Sciences	3	3	0	6	ELECTIVE	ศึกษาการบูรณาการหลักวิปัสสนาภาวนากับวิทยาศาสตร์ทางสมอง (Neuroscience) จิตวิทยาการรู้คิด (Cognitive Psychology) และการแพทย์เชิงป้องกัน	\N	2026-09-12 03:44:25.255+00	2026-09-12 07:31:35.111+00
ba08b0fe-8180-4857-9f7b-06cca246f0e5	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	606 408	ปฏิบัติวิปัสสนาภาวนา	Vipassana Meditation Practice	3	1	4	4	PRACTICE_VIPASSANA	การเข้าปฏิบัติวิปัสสนากรรมฐานอย่างเข้มข้นต่อเนื่องเป็นเวลาไม่น้อยกว่า ๓ เดือน (๙๐ วัน) ตามแนวสติปัฏฐาน ๔ ณ สถาบันวิปัสสนาธุระ หรือสำนักวิปัสสนากรรมฐานที่มหาวิทยาลัยให้การรับรอง มีการส่งและสอบอารมณ์สม่ำเสมอ	\N	2026-09-12 03:44:25.159+00	2026-09-12 07:31:35.021+00
e29f5106-da04-4a13-aa0c-fc0bf5471611	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	606 319	กัมมัฏฐานในคัมภีร์พระอภิธรรม	Kammatthana in Abhidhamma	3	3	0	6	ELECTIVE	ศึกษาหมวดกัมมัฏฐานในอภิธัมมัตถสังคหะ คัมภีร์ยมก และคัมภีร์ปัฏฐาน เพื่อเข้าใจความสัมพันธ์ระหว่างสภาพจิตและอารมณ์ภาวนาอย่างละเอียดลึกซึ้ง	\N	2026-09-12 03:44:25.219+00	2026-09-12 07:31:35.075+00
\.


--
-- Data for Name: curriculums; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.curriculums (id, tenant_id, code, name_th, name_en, degree_title_th, degree_title_en, total_credits, description_th, description_en, is_active, created_at, updated_at, department_id) FROM stdin;
d874bb92-1a31-487b-9c3f-e24cefb122e3	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	6742061	หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา (หลักสูตรใหม่ พ.ศ. ๒๕๖๗)	Master of Buddhism Program in Vipassanabhavana Studies (New Curriculum 2024)	พุทธศาสตรมหาบัณฑิต (วิปัสสนาภาวนาศึกษา) / พธ.ม. (วิปัสสนาภาวนาศึกษา)	Master of Buddhism (Vipassanabhavana Studies) / M.B. (Vipassanabhavana Studies)	36	มุ่งเน้นผลิตมหาบัณฑิตที่มีความรู้ ความเข้าใจในหลักการและวิธีการปฏิบัติวิปัสสนาภาวนาตามแนวสติปัฏฐานอย่างถ่องแท้ มีความสามารถในการปฏิบัติ การวิจัย และการถ่ายทอดองค์ความรู้ด้านวิปัสสนาภาวนาสู่สังคมร่วมสมัยอย่างมีประสิทธิภาพและมีจริยธรรม	Aims to produce master's graduates with deep comprehension of Vipassana meditation principles based on Satipatthana, capable of rigorous practice, contemplative research, and effective knowledge propagation in contemporary society.	t	2026-09-11 08:06:52.744+00	2026-09-12 07:31:34.946+00	0535c1cc-529a-4c39-9d79-213f382823ec
\.


--
-- Data for Name: departments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.departments (id, tenant_id, code, name_th, name_en, faculty_name_th, faculty_name_en, head_name, contact_email, contact_phone, office_location, description_th, description_en, is_active, created_at, updated_at) FROM stdin;
36b67923-675e-46dc-8213-fda5f5d5bdbf	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	DEPT-MINDFULNESS	ส่วนงานนวัตกรรมจิตภาวนาและสติศึกษา	Department of Mindfulness and Contemplative Studies	บัณฑิตวิทยาลัย / คณะพุทธศาสตร์	\N	พระครูปลัดสุวัฒนศีลคุณ (ดร.)	\N	\N	อาคารธรรมวิจัย ชั้น ๔	\N	\N	t	2026-09-12 02:37:10.163+00	2026-09-12 02:37:10.163+00
0535c1cc-529a-4c39-9d79-213f382823ec	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	DEPT-BUDDHISM	ภาควิชาพระพุทธศาสนา	Department of Buddhism	คณะพุทธศาสตร์	Faculty of Buddhism	พระมหาดนัย ชิตมาโร (ดร.)	buddhism@mcu.ac.th	035-248-000 ต่อ 8100	อาคารเรียนรวม โซน B ชั้น ๓ มจร วังน้อย	มุ่งเน้นการจัดการศึกษา วิจัย ค้นคว้า และบริการวิชาการด้านพระไตรปิฎก พระพุทธศาสนาเถรวาทและมหายาน	\N	t	2026-09-12 02:36:08.449+00	2026-09-12 07:31:34.923+00
d0f6daf7-a01a-45b8-8188-e753e6abbc53	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	DEPT-REL-PHIL	ภาควิชาศาสนาและปรัชญา	Department of Religion and Philosophy	คณะพุทธศาสตร์	Faculty of Buddhism	รศ.ดร.สุรศักดิ์ สุขวัฒน์	relphil@mcu.ac.th	035-248-000 ต่อ 8105	อาคารเรียนรวม โซน B ชั้น ๓ มจร วังน้อย	ศึกษาเปรียบเทียบศาสนา ปรัชญาตะวันออกและตะวันตก	\N	t	2026-09-12 02:36:08.455+00	2026-09-12 07:31:34.929+00
ada10157-1eb9-4b9c-bc5e-3bde8500c264	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	VIPASSANA-INST	สถาบันวิปัสสนาธุระ (ส่วนงานวิปัสสนาภาวนา)	Vipassana Bhavana Academic Division	บัณฑิตวิทยาลัย / สถาบันวิปัสสนาธุระ	Graduate School / Vipassana Institute	พระธรรมวัชราจารย์ (ผู้ช่วยเจ้าอาวาสวัดปากน้ำ)	vipassana@mcu.ac.th	035-248-000 ต่อ 8400	อาคาร ๗๒ พรรษา พระธรรมปัญญาบดี มจร วังน้อย	ศูนย์กลางการศึกษา ค้นคว้า และส่งเสริมการปฏิบัติวิปัสสนากรรมฐานระดับสากล	\N	t	2026-09-12 02:36:08.459+00	2026-09-12 07:31:34.936+00
\.


--
-- Data for Name: document_templates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.document_templates (id, tenant_id, code, title_th, title_en, description, is_active, created_at, updated_at) FROM stdin;
6150bbc5-a395-4c95-b107-1519c8ca20ea	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	REQ-LEAVE-RETREAT	คำร้องขอลาปฏิบัติธรรมกรรมฐานประจำปี	\N	สำหรับนิสิตที่ประสงค์เข้าร่วมโครงการปฏิบัติวิปัสสนากรรมฐานเข้มข้น ณ ศูนย์ปฏิบัติธรรม มจร	t	2026-09-11 08:06:52.875+00	2026-09-11 08:06:52.875+00
\.


--
-- Data for Name: faculty_members; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.faculty_members (id, tenant_id, user_id, academic_rank, monastic_rank, title_th, first_name_th, last_name_th, monastic_name, title_en, first_name_en, last_name_en, temple_name, position_th, position_en, is_vipassana_master, is_executive, expertise, education_history, email, phone, avatar_url, sort_order, is_active, created_at, updated_at) FROM stdin;
96d056fb-5e68-4369-b286-19af156f211c	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	\N	ศ.ดร.	พระราชาคณะชั้นธรรม, ป.ธ.๙	พระธรรมวัชรบัณฑิต		\N	สมจินต์ สมฺมาปญฺโญ	\N	\N	\N	วัดปากน้ำ ภาษีเจริญ กรุงเทพฯ	อธิการบดี มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย	\N	f	t	พระพุทธศาสนา, พระไตรปิฎกศึกษา, ปรัชญาการศึกษาเชิงพุทธ	\N	\N	\N	\N	1	t	2026-09-12 07:31:35.143+00	2026-09-12 07:31:35.143+00
76a041f6-8818-4ea4-a13f-dc69794bfa06	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	\N	รศ.ดร.	เปรียญธรรม ๗ ประโยค	พระมหาสมบูรณ์		\N	วุฑฺฒิกโร	\N	\N	\N	วัดหงส์รัตนาราม กรุงเทพฯ	คณบดีบัณฑิตวิทยาลัย มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย	\N	f	t	พระพุทธศาสนามหายานและเถรวาท, ระเบียบวิธีวิจัยทางพระพุทธศาสนา	\N	\N	\N	\N	2	t	2026-09-12 07:31:35.147+00	2026-09-12 07:31:35.147+00
68f752bc-fd34-4013-a11e-25d0741816b5	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	\N	รศ.ดร.	เปรียญธรรม ๙ ประโยค (ป.ธ.๙)	พระมหา	ยุทธนา	\N	นรเชฏฺโฐ	\N	\N	\N	วัดมหาธาตุยุวราชรังสฤษฎิ์ กรุงเทพฯ	ประธานหลักสูตร / หัวหน้าภาควิชาพระพุทธศาสนา คณะพุทธศาสตร์	\N	t	t	พระไตรปิฎกศึกษา, พระพุทธศาสนาเถรวาท, วิปัสสนาภาวนา	\N	\N	\N	https://fb.mcu.ac.th/wp-content/uploads/2026/03/PmYuttana6901.png	3	t	2026-09-12 07:31:35.152+00	2026-09-12 07:31:35.152+00
803f9be6-4b4f-429e-a86c-7605663f82f8	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	\N	ผศ.ดร.	พระครูสัญญาบัตรวิปัสสนาธุระ	พระครูภาวนาวัฒนบัณฑิต วิ.	เจริญ	\N	วฑฺฒโน	\N	\N	\N	วัดแนบทวีพราราม / วัดยานนาวา	กรรมการและเลขานุการหลักสูตร / พระวิปัสสนาจารย์	\N	t	t	สติปัฏฐาน ๔, การสอบอารมณ์วิปัสสนากรรมฐาน, วิสุทธิมรรค	\N	\N	\N	https://fb.mcu.ac.th/wp-content/uploads/2026/04/951813001_09.png	4	t	2026-09-12 07:31:35.156+00	2026-09-12 07:31:35.156+00
cf41ea88-44d2-42e2-8f2b-a5bd581c30d2	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	\N	ผศ.ดร.	เปรียญธรรม ๙ ประโยค (ป.ธ.๙)	พระมหา	ยงยุทธ	\N	ธีรธมฺโม	\N	\N	\N	วัดมหาธาตุยุวราชรังสฤษฎิ์ กรุงเทพฯ	อาจารย์ผู้รับผิดชอบหลักสูตร / ผู้ช่วยศาสตราจารย์	\N	t	f	คัมภีร์อภิธรรม, พระอภิธัมมัตถสังคหะ, ภาษาบาลีเพื่อการวิจัย	\N	\N	\N	https://fb.mcu.ac.th/wp-content/uploads/2026/03/yongyut6901.png	5	t	2026-09-12 07:31:35.16+00	2026-09-12 07:31:35.16+00
16437881-7447-4112-b585-31309283e748	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	\N	รศ.ดร.	\N	นาย	สุเทพ	พรมเลิศ	\N	\N	\N	\N	\N	อาจารย์ผู้รับผิดชอบหลักสูตร / รองหัวหน้าภาควิชาพระพุทธศาสนา	\N	f	f	ปรัชญาพระพุทธศาสนา, จริยศาสตร์เชิงพุทธ, พระไตรปิฎกศึกษา	\N	\N	\N	https://fb.mcu.ac.th/wp-content/uploads/2026/03/AccSutep6901.png	6	t	2026-09-12 07:31:35.164+00	2026-09-12 07:31:35.164+00
ad8fcd9e-5675-420b-9e17-c6fbd7da395f	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	\N	ดร.	เปรียญธรรม, พธ.ด.	พระมหา	ราชัน	\N	จิตฺตปาโล	\N	\N	\N	มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย	อาจารย์ผู้รับผิดชอบหลักสูตร / ผู้ช่วยอธิการบดีฝ่ายกิจการนิสิต	\N	t	t	พระพุทธศาสนาเถรวาท, ธรรมนิเทศ, การพัฒนาจิตตภาวนา	\N	\N	\N	https://fb.mcu.ac.th/wp-content/uploads/2026/03/a3PmRashun6901.png	7	t	2026-09-12 07:31:35.171+00	2026-09-12 07:31:35.171+00
26bcf45b-2e89-4267-88cb-bb42ef7f7df0	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	\N	ผศ.ดร.	พระครูสัญญาบัตร	พระครูปลัดสุวัฒนวชิรคุณ	ไสว	\N	ฐิตสิริ	\N	\N	\N	วัดยานนาวา กรุงเทพฯ	ผู้อำนวยการหลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา	\N	t	t	วิปัสสนากรรมฐาน, คัมภีร์วิสุทธิมรรค, การสอบอารมณ์กรรมฐาน	\N	\N	\N	\N	8	t	2026-09-12 07:31:35.179+00	2026-09-12 07:31:35.179+00
255776d4-a10d-4f9c-b5b1-1d5d4114e293	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	\N	ดร.	พระวิปัสสนาจารย์	พระครูภาวนาวรานุวัตร		\N	เขมธโร	\N	\N	\N	สถาบันวิปัสสนาธุระ มจร วังน้อย อยุธยา	พระวิปัสสนาจารย์ประจำหลักสูตร	\N	t	f	สติปัฏฐาน ๔, การปฏิบัติวิปัสสนาเชิงลึก, การฝึกจิตตภาวนา	\N	\N	\N	\N	9	t	2026-09-12 07:31:35.183+00	2026-09-12 07:31:35.183+00
9d2218b3-39ca-4f21-8c1b-4176294b1b41	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	\N	รศ.ดร.	\N	รศ.ดร.	เวทย์	บรรณกรกุล	\N	\N	\N	\N	\N	อาจารย์ประจำหลักสูตรและผู้ทรงคุณวุฒิ	\N	f	f	พระอภิธรรมปิฎก, จิต เจตสิก รูป นิพพาน, ปริยัติธรรมสู่การปฏิบัติ	\N	\N	\N	\N	10	t	2026-09-12 07:31:35.188+00	2026-09-12 07:31:35.188+00
\.


--
-- Data for Name: login_throttles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.login_throttles (key, fail_count, locked_until, updated_at) FROM stdin;
\.


--
-- Data for Name: news_articles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.news_articles (id, tenant_id, category_id, title_th, title_en, slug, summary_th, summary_en, content_th, content_en, cover_image_url, is_pinned, is_published, published_at, view_count, author_id, created_at, updated_at) FROM stdin;
fc32d9bb-5936-4246-93c0-b3f415e1806c	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	b0ee1656-41d7-40d3-a2ae-d87fc296e0a1	โครงการปฏิบัติวิปัสสนากรรมฐานเฉลิมพระเกียรติ ประจำปี ๒๕๖๙	Annual Vipassana Meditation Retreat 2026 for Students and Public	โครงการปฏิบัติวิปัสสนากรรมฐานเฉลิมพระเกียรติ-ประจำปี-๒๕๖๙-mtxv0rbf	หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา จัดโครงการปฏิบัติธรรมวิปัสสนากรรมฐาน ณ ศูนย์วิปัสสนา มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย	Master of Arts Program in Vipassana Meditation Studies hosts the annual mindfulness meditation retreat at MCU Vipassana Center.	ภาควิชาพระพุทธศาสนา คณะพุทธศาสตร์ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย ขอเชิญนิสิต คณาจารย์ และพุทธศาสนิกชนทั่วไป เข้าร่วมโครงการปฏิบัติวิปัสสนากรรมฐานเฉลิมพระเกียรติ ประจำปี ๒๕๖๙ เพื่อพัฒนาศักยภาพจิตภาวนาตามแนวสติปัฏฐาน ๔ โดยมีคณาจารย์และพระวิปัสสนาจารย์ผู้ทรงคุณวุฒิคอยให้คำแนะนำตลอดหลักสูตรการปฏิบัติธรรม	The Department of Buddhism, Faculty of Buddhism, Mahachulalongkornrajavidyalaya University (MCU) cordially invites students, researchers, and meditation practitioners to join the Annual Vipassana Meditation Retreat 2026. This retreat focuses on the Four Foundations of Mindfulness (Satipatthana) guided by experienced Buddhist meditation masters.	\N	f	t	2026-09-12 04:03:05.163+00	0	1efbf903-43d7-45a4-834a-d48ac757cd05	2026-09-12 04:03:05.166+00	2026-09-12 04:03:05.166+00
c3bcc3f7-c9fa-4f02-8482-9f2d510107f7	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	b0ee1656-41d7-40d3-a2ae-d87fc296e0a1	ขอเชิญร่วมโครงการปฏิบัติวิปัสสนากรรมฐาน ประจำปีการศึกษา ๒๕๖๙ ณ สถาบันวิปัสสนาธุระ มจร วังน้อย	Annual Intensive Vipassana Meditation Retreat at Vipassana Institute MCU Wang Noi	annual-vipassana-retreat-2569	การปฏิบัติวิปัสสนากรรมฐานเข้มข้นสำหรับนิสิตระดับบัณฑิตศึกษา พร้อมการสอบอารมณ์โดยพระวิปัสสนาจารย์ผู้ทรงคุณวุฒิ	\N	สถาบันวิปัสสนาธุระ ร่วมกับภาควิชาวิปัสสนาภาวนาศึกษา จัดโครงการปฏิบัติวิปัสสนากรรมฐานเข้มข้นระยะเวลา ๓๐ วัน เพื่อเสริมสร้างสมาธิและปัญญาญาณตามหลักสติปัฏฐานกถา\n\nกิจกรรมสำคัญ:\n- การเดินจงกรมและนั่งสมาธิตามตารางปฏิบัติประจำวัน\n- การสอบอารมณ์รายบุคคลกับพระวิปัสสนาจารย์\n- การฟังธรรมบรรยายและธรรมปฏิบัติเชิงลึก	\N	https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1200	t	t	2026-09-11 08:06:52.724+00	521	\N	2026-09-11 08:06:52.736+00	2026-09-12 04:03:10.871+00
b1583b32-a9bf-4cc5-850f-a53f47f01416	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	b0ee1656-41d7-40d3-a2ae-d87fc296e0a1	โครงการปฏิบัติวิปัสสนากรรมฐานเฉลิมพระเกียรติ ประจำปี ๒๕๖๙	Annual Vipassana Meditation Retreat 2026 for Students and Public	โครงการปฏิบัติวิปัสสนากรรมฐานเฉลิมพระเกียรติ-ประจำปี-๒๕๖๙-mtxv70g1	หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา จัดโครงการปฏิบัติธรรมวิปัสสนากรรมฐาน ณ ศูนย์วิปัสสนา มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย	Master of Arts Program in Vipassana Meditation Studies hosts the annual mindfulness meditation retreat at MCU Vipassana Center.	ภาควิชาพระพุทธศาสนา คณะพุทธศาสตร์ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย ขอเชิญนิสิต คณาจารย์ และพุทธศาสนิกชนทั่วไป เข้าร่วมโครงการปฏิบัติวิปัสสนากรรมฐานเฉลิมพระเกียรติ ประจำปี ๒๕๖๙ เพื่อพัฒนาศักยภาพจิตภาวนาตามแนวสติปัฏฐาน ๔ โดยมีคณาจารย์และพระวิปัสสนาจารย์ผู้ทรงคุณวุฒิคอยให้คำแนะนำตลอดหลักสูตรการปฏิบัติธรรม	The Department of Buddhism, Faculty of Buddhism, Mahachulalongkornrajavidyalaya University (MCU) cordially invites students, researchers, and meditation practitioners to join the Annual Vipassana Meditation Retreat 2026. This retreat focuses on the Four Foundations of Mindfulness (Satipatthana) guided by experienced Buddhist meditation masters.	\N	f	t	2026-09-12 04:07:56.929+00	1	1efbf903-43d7-45a4-834a-d48ac757cd05	2026-09-12 04:07:56.933+00	2026-09-12 04:08:04.657+00
371c9472-6915-4159-b7c4-c54f71b3a27e	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	b0ee1656-41d7-40d3-a2ae-d87fc296e0a1	การประชุมวิชาการระดับชาติด้านพระพุทธศาสนากับการพัฒนามนุษย์ ๒๕๖๙	National Academic Conference on Buddhism and Human Development 2026	การประชุมวิชาการระดับชาติด้านพระพุทธศาสนากับการพัฒนามนุษย์-๒๕๖๙-mtxvuyan	คณะพุทธศาสตร์ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย จัดการประชุมวิชาการระดับชาติ ประจำปีการศึกษา ๒๕๖๙ เพื่อแลกเปลี่ยนองค์ความรู้และการพัฒนาอย่างยั่งยืน	The Faculty of Buddhism, MCU, hosts the National Academic Conference 2026 to foster cross-disciplinary Buddhist research and sustainable community development.	<h2>บทนำการประชุมวิชาการ</h2>\n<p>คณะพุทธศาสตร์ ขอเชิญชวนนักวิชาการ คณาจารย์ นิสิตนักศึกษา และผู้สนใจทุกท่าน เข้าร่วม<strong>การประชุมวิชาการระดับชาติ</strong> โดยมีวัตถุประสงค์เพื่อส่งเสริมการบูรณาการหลักธรรมทางพระพุทธศาสนากับศาสตร์สมัยใหม่</p>\n<h3>หัวข้อหลักในการสัมมนา</h3>\n<ul>\n<li>การประยุกต์ใช้จิตตภาวนากับสุขภาพจิตในศตวรรษที่ ๒๑</li>\n<li>หลักพุทธเศรษฐศาสตร์กับการพัฒนาเศรษฐกิจชุมชนอย่างยั่งยืน</li>\n<li>การจัดการศึกษาพระพุทธศาสนาในยุคดิจิทัล (AI and Buddhism)</li>\n</ul>\n<blockquote>"ธรรมะย่อมรักษาผู้ประพฤติธรรม และนำพาสังคมสู่สันติสุขที่แท้จริง"</blockquote>	<h2>Overview of the National Conference</h2>\n<p>The Faculty of Buddhism cordially invites scholars, researchers, faculty members, and students to attend the <strong>National Academic Conference 2026</strong> focused on integrating Buddhist philosophy with modern sciences.</p>\n<h3>Key Conference Tracks</h3>\n<ul>\n<li>Mindfulness Meditation and Mental Wellbeing in the 21st Century</li>\n<li>Buddhist Economics and Sustainable Community Growth</li>\n<li>Buddhist Education in the Age of Artificial Intelligence</li>\n</ul>\n<blockquote>"Wisdom and compassion remain the foundational pillars of enduring peace and prosperity."</blockquote>	\N	f	t	2026-09-12 04:26:33.887+00	1	1efbf903-43d7-45a4-834a-d48ac757cd05	2026-09-12 04:26:33.891+00	2026-09-12 04:26:40.429+00
e825f50d-86f9-4c96-9ec4-0fcc50cc19e3	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	b0ee1656-41d7-40d3-a2ae-d87fc296e0a1	การประชุมวิชาการระดับชาติด้านพระพุทธศาสนากับการพัฒนามนุษย์ ๒๕๖๙	National Academic Conference on Buddhism and Human Development 2026	การประชุมวิชาการระดับชาติด้านพระพุทธศาสนากับการพัฒนามนุษย์-๒๕๖๙-mtxw1p4f	คณะพุทธศาสตร์ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย จัดการประชุมวิชาการระดับชาติ ประจำปีการศึกษา ๒๕๖๙ เพื่อแลกเปลี่ยนองค์ความรู้และการพัฒนาอย่างยั่งยืน	The Faculty of Buddhism, MCU, hosts the National Academic Conference 2026 to foster cross-disciplinary Buddhist research and sustainable community development.	<h2>บทนำการประชุมวิชาการ</h2>\n<p>คณะพุทธศาสตร์ ขอเชิญชวนนักวิชาการ คณาจารย์ นิสิตนักศึกษา และผู้สนใจทุกท่าน เข้าร่วม<strong>การประชุมวิชาการระดับชาติ</strong> โดยมีวัตถุประสงค์เพื่อส่งเสริมการบูรณาการหลักธรรมทางพระพุทธศาสนากับศาสตร์สมัยใหม่</p>\n<h3>หัวข้อหลักในการสัมมนา</h3>\n<ul>\n<li>การประยุกต์ใช้จิตตภาวนากับสุขภาพจิตในศตวรรษที่ ๒๑</li>\n<li>หลักพุทธเศรษฐศาสตร์กับการพัฒนาเศรษฐกิจชุมชนอย่างยั่งยืน</li>\n<li>การจัดการศึกษาพระพุทธศาสนาในยุคดิจิทัล (AI and Buddhism)</li>\n</ul>\n<blockquote>"ธรรมะย่อมรักษาผู้ประพฤติธรรม และนำพาสังคมสู่สันติสุขที่แท้จริง"</blockquote>	<h2>Overview of the National Conference</h2>\n<p>The Faculty of Buddhism cordially invites scholars, researchers, faculty members, and students to attend the <strong>National Academic Conference 2026</strong> focused on integrating Buddhist philosophy with modern sciences.</p>\n<h3>Key Conference Tracks</h3>\n<ul>\n<li>Mindfulness Meditation and Mental Wellbeing in the 21st Century</li>\n<li>Buddhist Economics and Sustainable Community Growth</li>\n<li>Buddhist Education in the Age of Artificial Intelligence</li>\n</ul>\n<blockquote>"Wisdom and compassion remain the foundational pillars of enduring peace and prosperity."</blockquote>	\N	f	t	2026-09-12 04:31:48.591+00	1	1efbf903-43d7-45a4-834a-d48ac757cd05	2026-09-12 04:31:48.594+00	2026-09-12 04:31:54.625+00
fb6f3e87-f4dc-4475-9d57-f83d54a0253d	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	4367262e-69e9-4f7b-974d-c34039fa97da	เปิดรับสมัครนิสิตใหม่ระดับปริญญาโท สาขาวิชาวิปัสสนาภาวนาศึกษา (ภาคเสาร์-อาทิตย์) ประจำปีการศึกษา ๒๕๖๙	Online Admission Open for M.A. in Vipassana Meditation Studies (Weekend Program) Academic Year 2026	admission-open-2569	หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา มจร เปิดรับสมัครทั้งบรรพชิตและคฤหัสถ์ เรียนวันเสาร์และอาทิตย์	MCU welcomes both monastics and laypersons to apply for the Weekend Master's Degree in Vipassana Meditation.	หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา (ภาคเสาร์-อาทิตย์) บัณฑิตวิทยาลัย มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย เปิดรับสมัครผู้สนใจเข้าศึกษาต่อเพื่อพัฒนาจิตปัญญาและวิจัยเชิงลึกด้านวิปัสสนากรรมฐาน\n\nคุณสมบัติผู้สมัคร:\n๑. เป็นพระภิกษุ สามเณร หรือคฤหัสถ์ (อุบาสก อุบาสิกา)\n๒. สำเร็จการศึกษาระดับปริญญาตรีทุกสาขา หรือเทียบเท่า (เปรียญธรรม ๙ ประโยค)\n๓. มีความสนใจและมุ่งมั่นในการปฏิบัติวิปัสสนาภาวนาตามแนวสติปัฏฐาน ๔\n\nกำหนดการรับสมัคร:\n- เปิดรับสมัครออนไลน์ตั้งแต่บัดนี้เป็นต้นไป\n- สัมภาษณ์และสอบข้อเขียนตามประกาศของหลักสูตร	\N	https://images.unsplash.com/photo-1609619385002-f40f1df9b7eb?q=80&w=1200	t	t	2026-09-11 08:06:52.724+00	351	\N	2026-09-11 08:06:52.726+00	2026-09-12 08:40:33.083+00
\.


--
-- Data for Name: news_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.news_categories (id, tenant_id, name_th, name_en, slug, created_at, updated_at) FROM stdin;
b0ee1656-41d7-40d3-a2ae-d87fc296e0a1	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	กิจกรรมวิปัสสนาภาวนา	Vipassana Retreats	vipassana-retreats	2026-09-11 08:06:52.704+00	2026-09-11 08:06:52.704+00
4367262e-69e9-4f7b-974d-c34039fa97da	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	ข่าวการรับสมัครนิสิต	Admissions	admissions	2026-09-11 08:06:52.711+00	2026-09-11 08:06:52.711+00
a983de6b-c7d5-4368-b5ff-e2b64ebea77d	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	ข่าววิชาการและงานวิจัย	Academic & Research	academic	2026-09-11 08:06:52.718+00	2026-09-11 08:06:52.718+00
\.


--
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.permissions (id, code, module, action, description) FROM stdin;
1d84c427-7393-4a8e-812e-236f579d9c9d	student:manage	student	manage	จัดการประวัตินิสิต ฉายา และสถานะภาพ
9dfc3441-72ab-4df8-8d8b-4b3cac4ce6c6	petition:read	petition	read	ดูคำร้องและติดตามสถานะเอกสาร
51865419-1017-4a3b-a444-50b2ebfabb22	petition:approve	petition	approve	พิจารณาอนุมัติคำร้องของนิสิต
79a228ce-5ca7-42e4-9cac-457e320c34f3	schedule:read	schedule	read	ดูตารางเรียนและห้องเรียนออนไลน์
99179572-068e-451f-8de4-09d685842150	schedule:manage	schedule	manage	จัดตารางสอนและกำหนดห้องเรียนออนไลน์
c177bbee-df7c-4103-a535-aeee2a673c56	thesis:read	thesis	read	สืบค้นคลังวิทยานิพนธ์และงานวิจัย
11a77e0b-8764-4006-b9e9-b09f3af18d1d	thesis:manage	thesis	manage	จัดการหัวข้อ สอบเค้าโครง และเผยแพร่วิทยานิพนธ์
778a1b60-5fa7-4974-8150-f938bea2d6dc	users:read	users	read	\N
0feed324-03b5-445f-8f48-6774cb64b950	users:manage	users	manage	\N
d3af53aa-f34d-4728-944a-5f3042e003f4	roles:manage	roles	manage	\N
1dcfa87f-7d43-4e3d-ae8d-97df730c21fc	settings:manage	settings	manage	\N
19a7c4d4-9f6d-43b5-941e-5e1bf6022db7	audit:read	audit	read	\N
4e161fd1-0e25-457d-afb6-6557cbe615ef	sample:read	sample	read	\N
acf7bd53-113c-40bd-87d9-087f2c42968f	sample:manage	sample	manage	\N
2d0416b6-31ea-492a-82d1-1dc341426566	news:read	news	read	อ่านข่าวสารประชาสัมพันธ์
f97317f1-04ad-422e-a8bf-df2ba15b862f	news:manage	news	manage	สร้าง แก้ไข และลบข่าวสารประชาสัมพันธ์
ac3fb648-1d18-4326-be90-5c6765ff06ae	department:read	department	read	ดูข้อมูลภาควิชาและส่วนงานวิชาการ
69999a6e-16b1-4100-829d-4ecaf70d236b	department:manage	department	manage	จัดการข้อมูลภาควิชาและจัดสรรหลักสูตรในสังกัด
d187e2d4-cd71-418e-9e31-92c8715411aa	curriculum:read	curriculum	read	ดูข้อมูลหลักสูตรและแผนการเรียน
5d65b4dc-6a06-4687-bbc1-44837c01bf0b	curriculum:manage	curriculum	manage	จัดการหลักสูตรและรายวิชา
71a06f2f-1b26-499d-ada7-046df385c841	faculty:read	faculty	read	ดูทำเนียบคณาจารย์และบุคลากร
29e60fbe-6fc4-4769-b3aa-f57b6445d2e7	faculty:manage	faculty	manage	จัดการข้อมูลคณาจารย์และพระวิปัสสนาจารย์
1a29b19e-1cca-4deb-962d-2b89d3f7ac23	admission:read	admission	read	ดูข้อมูลการรับสมัครและผู้สมัคร
d8cbe0d6-4539-4703-a04a-3b3074434905	admission:manage	admission	manage	จัดการรอบรับสมัครและตรวจสอบเอกสารผู้สมัคร
46f40c2d-b205-4ee0-9c73-56a04c84541d	student:read	student	read	ดูข้อมูลทะเบียนประวัตินิสิต
\.


--
-- Data for Name: role_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role_permissions (role_id, permission_id) FROM stdin;
989f5af0-3109-4bfa-a009-69e4e717b42f	778a1b60-5fa7-4974-8150-f938bea2d6dc
989f5af0-3109-4bfa-a009-69e4e717b42f	0feed324-03b5-445f-8f48-6774cb64b950
989f5af0-3109-4bfa-a009-69e4e717b42f	d3af53aa-f34d-4728-944a-5f3042e003f4
989f5af0-3109-4bfa-a009-69e4e717b42f	1dcfa87f-7d43-4e3d-ae8d-97df730c21fc
989f5af0-3109-4bfa-a009-69e4e717b42f	19a7c4d4-9f6d-43b5-941e-5e1bf6022db7
1e416f80-a2be-4e05-86a5-7b178e95f559	778a1b60-5fa7-4974-8150-f938bea2d6dc
76ba471e-5998-4c78-bcfe-bc517f29c6ef	778a1b60-5fa7-4974-8150-f938bea2d6dc
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, tenant_id, code, name_th, name_en, description, is_system, created_at, updated_at) FROM stdin;
1a55c093-fc83-44a9-98ab-33cfec03c670	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	SUPER_ADMIN	ผู้ดูแลสูงสุด	Super admin	\N	t	2026-09-11 08:06:52.251+00	2026-09-12 07:31:34.359+00
989f5af0-3109-4bfa-a009-69e4e717b42f	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	ADMIN	ผู้ดูแลระบบ	Administrator	\N	f	2026-09-11 08:06:52.255+00	2026-09-12 07:31:34.364+00
1e416f80-a2be-4e05-86a5-7b178e95f559	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	STAFF	เจ้าหน้าที่	Staff	\N	f	2026-09-11 08:06:52.288+00	2026-09-12 07:31:34.397+00
76ba471e-5998-4c78-bcfe-bc517f29c6ef	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	VIEWER	ผู้ดู	Viewer	\N	f	2026-09-11 08:06:52.298+00	2026-09-12 07:31:34.408+00
\.


--
-- Data for Name: sample_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sample_items (id, tenant_id, title, description, status, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: student_petitions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.student_petitions (id, tenant_id, student_id, template_id, petition_no, title, reason, attachment_url, status, current_step, approver_note, created_at, updated_at) FROM stdin;
cde11528-db82-4a7e-b061-75ef671d0c75	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	c59aaacc-8b12-420b-ad99-3e0d19566001	6150bbc5-a395-4c95-b107-1519c8ca20ea	REQ-2569-0001	ขออนุมัติเข้าร่วมโครงการปฏิบัติวิปัสสนากรรมฐาน ๓๐ วัน	เพื่อเก็บหน่วยกิตวิชาปฏิบัติวิปัสสนาภาวนาขั้นสูงและฝึกจิตตภาวนาตามหลักสูตร	\N	APPROVED	2	เห็นควรอนุมัติเพื่อพัฒนาจิตตปัญญาตามแนวสติปัฏฐาน	2026-09-11 08:06:52.882+00	2026-09-11 08:06:52.882+00
\.


--
-- Data for Name: student_profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.student_profiles (id, tenant_id, user_id, student_code, applicant_type, title_th, first_name_th, last_name_th, monastic_name, monastic_rank, temple_name, ecclesiastical_province, batch_year, status, phone, email, enrollment_date, created_at, updated_at) FROM stdin;
c59aaacc-8b12-420b-ad99-3e0d19566001	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	\N	6801201001	MONK	พระมหา	อานนท์	\N	อาภสฺสโร	เปรียญธรรม ๙ ประโยค	วัดอรุณราชวราราม กรุงเทพฯ	ภาค ๑	2568	STUDYING	089-987-6543	ananda@mcu.local	\N	2026-09-11 08:06:52.866+00	2026-09-11 08:06:52.866+00
\.


--
-- Data for Name: study_plans; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.study_plans (id, tenant_id, curriculum_id, plan_type, name_th, name_en, description_th, description_en, total_credits, created_at, updated_at) FROM stdin;
00000000-0000-0000-0000-000000000001	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	PLAN_1	แผน ๑ (ทำวิทยานิพนธ์และศึกษารายวิชา)	Plan 1 (Coursework & Master's Thesis)	ศึกษารายวิชา ๒๔ หน่วยกิต (วิชาสัมพันธ์ ๙, วิชาเฉพาะ ๙, วิชาเลือก ๖) และทำวิทยานิพนธ์ ๑๒ หน่วยกิต รวม ๓๖ หน่วยกิต (พร้อมวิชาเสริมพื้นฐาน ๓ วิชา ไม่นับหน่วยกิต)	\N	36	2026-09-11 08:06:52.753+00	2026-09-12 07:31:34.956+00
00000000-0000-0000-0000-000000000002	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	d874bb92-1a31-487b-9c3f-e24cefb122e3	PLAN_2	แผน ๒ (ศึกษารายวิชาและทำสารนิพนธ์)	Plan 2 (Coursework & Thematic Paper)	ศึกษารายวิชา ๓๐ หน่วยกิต (วิชาสัมพันธ์ ๙, วิชาเฉพาะ ๑๒, วิชาเลือก ๙) และทำสารนิพนธ์ ๖ หน่วยกิต รวม ๓๖ หน่วยกิต (พร้อมวิชาเสริมพื้นฐาน ๓ วิชา ไม่นับหน่วยกิต)	\N	36	2026-09-11 08:06:52.76+00	2026-09-12 07:31:34.96+00
\.


--
-- Data for Name: tenants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tenants (id, code, name_th, name_en, logo_url, settings, is_active, created_at, updated_at) FROM stdin;
ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	MCU-VIPASSANA	หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา(ภาคเสาร์-อาทิตย์) ภาควิชาพระพุทธศาสนา คณะพุทธศาสตร์ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย	Master of Arts Program in Vipassana Meditation Studies (Weekend Session), Department of Buddhism, Faculty of Buddhism, Mahachulalongkornrajavidyalaya University	/uploads/logos/ff4bfcb3-88e1-4f7a-8438-3b0df13805b0-logo-1789123351593-eb11d32bca88.jpg	{"smtp": {"host": "smtp.gmail.com", "pass": "Passw0rd!vibe", "port": 465, "user": "admin@app.local", "secure": true, "enabled": false, "fromName": "หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา (ภาคเสาร์-อาทิตย์) มจร", "fromEmail": ""}, "gemini": {"model": "gemini-2.5-flash", "apiKey": "AIzaSyB3M1n1A1T3stK3yPr0v1d3r998877"}, "orgInfo": {"email": "vipassana.grad@mcu.ac.th", "phone": "๐๓๕-๒๔๘-๐๐๐ ต่อ ๘๐๕๐", "lineId": "@mcuvipassana", "website": "https://grad.mcu.ac.th", "addressEn": "Mahachulalongkornrajavidyalaya University, Wang Noi, Phra Nakhon Si Ayutthaya 13170 Thailand", "addressTh": "อาคารมหาจุฬาบรรณาคาร มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย ต.ลำไทร อ.วังน้อย จ.พระนครศรีอยุธยา ๑๓๑๗๐", "taglineEn": "World-Class Center for Buddhist Meditation Studies & Universal Peace", "taglineTh": "ศูนย์กลางการศึกษาพระอภิธรรมและวิปัสสนาภาวนาเพื่อสันติภาพโลก", "facebookUrl": "https://facebook.com/vipassanamcu", "descriptionEn": "A premier international graduate institution dedicated to the integration of Vipassana meditation with modern sciences, cultivating world-class Buddhist scholarship.", "descriptionTh": "สถาบันการศึกษาระดับบัณฑิตศึกษาชั้นนำ มุ่งเน้นการบูรณาการหลักสูตรวิปัสสนาภาวนากับวิทยาการร่วมสมัย สร้างสรรค์บุคลากรทางพุทธศาสนาที่มีคุณภาพระดับสากล", "officeHoursEn": "Saturday - Sunday: 08:30 - 17:00", "officeHoursTh": "วันเสาร์ - อาทิตย์ เวลา ๐๘:๓๐ - ๑๗:๐๐ น."}, "palette": "pink"}	t	2026-09-11 08:06:52.12+00	2026-09-12 04:07:48.788+00
\.


--
-- Data for Name: theses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.theses (id, tenant_id, student_id, author_name, title_th, title_en, advisor_name, co_advisor_name, status, abstract_th, abstract_en, keywords, similarity_percentage, defense_date, document_url, new_body_of_knowledge, year_graduated, created_at, updated_at) FROM stdin;
00000000-0000-0000-0000-000000000101	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	c59aaacc-8b12-420b-ad99-3e0d19566001	พระมหาอานนท์ อาภสฺสโร	การศึกษาวิเคราะห์การเจริญสติปัฏฐาน ๔ ในคัมภีร์วิสุทธิมรรคเพื่อเยียวยาภาวะจิตตกังวลในสังคมร่วมสมัย	An Analytical Study of the Four Foundations of Mindfulness in Visuddhimagga for Healing Anxiety in Contemporary Society	พระครูปลัดสุวัฒนวชิรคุณ, ผศ.ดร.	รศ.ดร.เวทย์ บรรณกรกุล	PUBLISHED	งานวิจัยนี้มีวัตถุประสงค์เพื่อศึกษาหลักการปฏิบัติวิปัสสนากรรมฐานตามแนวสติปัฏฐานในคัมภีร์วิสุทธิมรรค และประยุกต์ใช้ในการปรับสมดุลสภาวะจิตใจเพื่อลดความวิตกกังวล ผลการวิจัยพบว่าการตามรู้กาย เวทนา จิต ธรรม อย่างเป็นปัจจุบันช่วยลดปฏิกิริยาอัตโนมัติของสมองส่วนอารมณ์ และสร้างความมั่นคงทางจิตปัญญาอย่างยั่งยืน	\N	สติปัฏฐาน ๔, วิสุทธิมรรค, วิปัสสนาภาวนา, การเยียวยาจิตใจ, มจร	4.50	2026-03-15 00:00:00+00	\N	โมเดลบูรณาการวิปัสสนาภาวนาบำบัด (Vipassana Mindfulness Therapy Model) ที่สังเคราะห์จากอรรถกถาวิสุทธิมรรคเข้ากับจิตวิทยาการเจริญสติ	2568	2026-09-11 08:06:52.908+00	2026-09-11 08:06:52.908+00
\.


--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_roles (id, user_tenant_id, role_id, scope_type, scope_id, created_at) FROM stdin;
c28a2d3e-bfab-4209-84ed-00ab45a4154c	839e7670-afb8-488a-a47f-2d008f739332	1a55c093-fc83-44a9-98ab-33cfec03c670	ALL	\N	2026-09-12 07:31:34.767+00
bbe992c9-3c79-414d-98b3-cdbde9c83756	2ea580cf-3062-4596-8a45-fed8f4f57179	1e416f80-a2be-4e05-86a5-7b178e95f559	ALL	\N	2026-09-12 07:31:34.787+00
038d7922-c464-4df2-894b-4f8577a84d6d	6621de4b-9558-4021-ad75-590ebc6e697e	76ba471e-5998-4c78-bcfe-bc517f29c6ef	ALL	\N	2026-09-12 07:31:34.804+00
dde41593-97bd-46fb-ab3b-d63c98a8c49b	0721da71-373c-4ad3-9813-1d4f1a23d26e	76ba471e-5998-4c78-bcfe-bc517f29c6ef	ALL	\N	2026-09-12 07:31:34.822+00
35729ab8-7699-4e76-88d4-62de6ecba57d	a23ba134-96dc-44d4-9c45-5530d1d2ada7	76ba471e-5998-4c78-bcfe-bc517f29c6ef	ALL	\N	2026-09-12 07:31:34.863+00
\.


--
-- Data for Name: user_tenants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_tenants (id, user_id, tenant_id, is_active, joined_at) FROM stdin;
839e7670-afb8-488a-a47f-2d008f739332	1efbf903-43d7-45a4-834a-d48ac757cd05	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	t	2026-09-11 08:06:52.637+00
2ea580cf-3062-4596-8a45-fed8f4f57179	2f473be0-91f3-4971-a1d5-aa6cfda1c150	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	t	2026-09-11 08:06:52.653+00
6621de4b-9558-4021-ad75-590ebc6e697e	25274496-c66a-4f01-86e9-f5cbac8bf2a8	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	t	2026-09-11 08:06:52.665+00
0721da71-373c-4ad3-9813-1d4f1a23d26e	e152fbc2-2524-4d85-803b-c1ec3e79a771	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	t	2026-09-11 08:06:52.679+00
a23ba134-96dc-44d4-9c45-5530d1d2ada7	a3463939-2320-492b-9772-6a987386bf68	ff4bfcb3-88e1-4f7a-8438-3b0df13805b0	t	2026-09-11 08:06:52.692+00
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password_hash, name, image_url, provider, provider_id, email_verified, is_active, must_change_password, locale, last_login_at, created_at, updated_at) FROM stdin;
2f473be0-91f3-4971-a1d5-aa6cfda1c150	staff@app.local	$2b$12$EGXITSqNBCyE6X5ZyS6jUe3vPP.OhgEvF8mTlSynWhAqNJ4RSN/Pi	เจ้าหน้าที่หลักสูตร	\N	credentials	\N	t	t	f	\N	\N	2026-09-11 08:06:52.649+00	2026-09-12 07:31:34.775+00
25274496-c66a-4f01-86e9-f5cbac8bf2a8	viewer@app.local	$2b$12$EGXITSqNBCyE6X5ZyS6jUe3vPP.OhgEvF8mTlSynWhAqNJ4RSN/Pi	ผู้ดู	\N	credentials	\N	t	t	f	\N	\N	2026-09-11 08:06:52.661+00	2026-09-12 07:31:34.793+00
e152fbc2-2524-4d85-803b-c1ec3e79a771	lockme@app.local	$2b$12$EGXITSqNBCyE6X5ZyS6jUe3vPP.OhgEvF8mTlSynWhAqNJ4RSN/Pi	บัญชีทดสอบล็อก	\N	credentials	\N	t	t	f	\N	\N	2026-09-11 08:06:52.675+00	2026-09-12 07:31:34.81+00
a3463939-2320-492b-9772-6a987386bf68	forced@app.local	$2b$12$EGXITSqNBCyE6X5ZyS6jUe3vPP.OhgEvF8mTlSynWhAqNJ4RSN/Pi	บัญชีบังคับเปลี่ยนรหัส	\N	credentials	\N	t	t	t	\N	\N	2026-09-11 08:06:52.688+00	2026-09-12 07:31:34.828+00
1efbf903-43d7-45a4-834a-d48ac757cd05	admin@app.local	$2b$12$EGXITSqNBCyE6X5ZyS6jUe3vPP.OhgEvF8mTlSynWhAqNJ4RSN/Pi	ผู้ดูแลสูงสุด (มจร)	\N	credentials	\N	t	t	f	th	2026-09-12 07:31:42.756+00	2026-09-11 08:06:52.631+00	2026-09-12 07:31:42.758+00
\.


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: academic_semesters academic_semesters_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.academic_semesters
    ADD CONSTRAINT academic_semesters_pkey PRIMARY KEY (id);


--
-- Name: admission_rounds admission_rounds_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admission_rounds
    ADD CONSTRAINT admission_rounds_pkey PRIMARY KEY (id);


--
-- Name: applications applications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_pkey PRIMARY KEY (id);


--
-- Name: audit_logs audit_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_pkey PRIMARY KEY (id);


--
-- Name: auth_tokens auth_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_tokens
    ADD CONSTRAINT auth_tokens_pkey PRIMARY KEY (id);


--
-- Name: class_schedules class_schedules_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class_schedules
    ADD CONSTRAINT class_schedules_pkey PRIMARY KEY (id);


--
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- Name: curriculums curriculums_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.curriculums
    ADD CONSTRAINT curriculums_pkey PRIMARY KEY (id);


--
-- Name: departments departments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (id);


--
-- Name: document_templates document_templates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.document_templates
    ADD CONSTRAINT document_templates_pkey PRIMARY KEY (id);


--
-- Name: faculty_members faculty_members_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faculty_members
    ADD CONSTRAINT faculty_members_pkey PRIMARY KEY (id);


--
-- Name: login_throttles login_throttles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.login_throttles
    ADD CONSTRAINT login_throttles_pkey PRIMARY KEY (key);


--
-- Name: news_articles news_articles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news_articles
    ADD CONSTRAINT news_articles_pkey PRIMARY KEY (id);


--
-- Name: news_categories news_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news_categories
    ADD CONSTRAINT news_categories_pkey PRIMARY KEY (id);


--
-- Name: permissions permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (id);


--
-- Name: role_permissions role_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT role_permissions_pkey PRIMARY KEY (role_id, permission_id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: sample_items sample_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sample_items
    ADD CONSTRAINT sample_items_pkey PRIMARY KEY (id);


--
-- Name: student_petitions student_petitions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_petitions
    ADD CONSTRAINT student_petitions_pkey PRIMARY KEY (id);


--
-- Name: student_profiles student_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_profiles
    ADD CONSTRAINT student_profiles_pkey PRIMARY KEY (id);


--
-- Name: study_plans study_plans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.study_plans
    ADD CONSTRAINT study_plans_pkey PRIMARY KEY (id);


--
-- Name: tenants tenants_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tenants
    ADD CONSTRAINT tenants_pkey PRIMARY KEY (id);


--
-- Name: theses theses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.theses
    ADD CONSTRAINT theses_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);


--
-- Name: user_tenants user_tenants_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_tenants
    ADD CONSTRAINT user_tenants_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: academic_semesters_tenant_id_year_semester_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX academic_semesters_tenant_id_year_semester_key ON public.academic_semesters USING btree (tenant_id, year, semester);


--
-- Name: admission_rounds_tenant_id_is_active_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX admission_rounds_tenant_id_is_active_idx ON public.admission_rounds USING btree (tenant_id, is_active);


--
-- Name: applications_round_id_status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX applications_round_id_status_idx ON public.applications USING btree (round_id, status);


--
-- Name: applications_tenant_id_application_no_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX applications_tenant_id_application_no_key ON public.applications USING btree (tenant_id, application_no);


--
-- Name: audit_logs_tenant_id_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX audit_logs_tenant_id_created_at_idx ON public.audit_logs USING btree (tenant_id, created_at);


--
-- Name: audit_logs_tenant_id_entity_entity_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX audit_logs_tenant_id_entity_entity_id_idx ON public.audit_logs USING btree (tenant_id, entity, entity_id);


--
-- Name: auth_tokens_token_hash_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX auth_tokens_token_hash_key ON public.auth_tokens USING btree (token_hash);


--
-- Name: auth_tokens_user_id_purpose_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_tokens_user_id_purpose_idx ON public.auth_tokens USING btree (user_id, purpose);


--
-- Name: class_schedules_semester_id_day_of_week_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX class_schedules_semester_id_day_of_week_idx ON public.class_schedules USING btree (semester_id, day_of_week);


--
-- Name: courses_curriculum_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX courses_curriculum_id_idx ON public.courses USING btree (curriculum_id);


--
-- Name: courses_tenant_id_course_code_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX courses_tenant_id_course_code_key ON public.courses USING btree (tenant_id, course_code);


--
-- Name: curriculums_department_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX curriculums_department_id_idx ON public.curriculums USING btree (department_id);


--
-- Name: curriculums_tenant_id_code_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX curriculums_tenant_id_code_key ON public.curriculums USING btree (tenant_id, code);


--
-- Name: curriculums_tenant_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX curriculums_tenant_id_idx ON public.curriculums USING btree (tenant_id);


--
-- Name: departments_tenant_id_code_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX departments_tenant_id_code_key ON public.departments USING btree (tenant_id, code);


--
-- Name: departments_tenant_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX departments_tenant_id_idx ON public.departments USING btree (tenant_id);


--
-- Name: document_templates_tenant_id_code_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX document_templates_tenant_id_code_key ON public.document_templates USING btree (tenant_id, code);


--
-- Name: faculty_members_tenant_id_sort_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX faculty_members_tenant_id_sort_order_idx ON public.faculty_members USING btree (tenant_id, sort_order);


--
-- Name: news_articles_tenant_id_is_published_published_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX news_articles_tenant_id_is_published_published_at_idx ON public.news_articles USING btree (tenant_id, is_published, published_at);


--
-- Name: news_articles_tenant_id_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX news_articles_tenant_id_slug_key ON public.news_articles USING btree (tenant_id, slug);


--
-- Name: news_categories_tenant_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX news_categories_tenant_id_idx ON public.news_categories USING btree (tenant_id);


--
-- Name: news_categories_tenant_id_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX news_categories_tenant_id_slug_key ON public.news_categories USING btree (tenant_id, slug);


--
-- Name: permissions_code_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX permissions_code_key ON public.permissions USING btree (code);


--
-- Name: roles_tenant_id_code_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX roles_tenant_id_code_key ON public.roles USING btree (tenant_id, code);


--
-- Name: sample_items_tenant_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX sample_items_tenant_id_idx ON public.sample_items USING btree (tenant_id);


--
-- Name: student_petitions_student_id_status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX student_petitions_student_id_status_idx ON public.student_petitions USING btree (student_id, status);


--
-- Name: student_petitions_tenant_id_petition_no_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX student_petitions_tenant_id_petition_no_key ON public.student_petitions USING btree (tenant_id, petition_no);


--
-- Name: student_profiles_tenant_id_batch_year_status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX student_profiles_tenant_id_batch_year_status_idx ON public.student_profiles USING btree (tenant_id, batch_year, status);


--
-- Name: student_profiles_tenant_id_student_code_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX student_profiles_tenant_id_student_code_key ON public.student_profiles USING btree (tenant_id, student_code);


--
-- Name: study_plans_curriculum_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX study_plans_curriculum_id_idx ON public.study_plans USING btree (curriculum_id);


--
-- Name: tenants_code_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX tenants_code_key ON public.tenants USING btree (code);


--
-- Name: theses_tenant_id_status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX theses_tenant_id_status_idx ON public.theses USING btree (tenant_id, status);


--
-- Name: user_roles_role_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_roles_role_id_idx ON public.user_roles USING btree (role_id);


--
-- Name: user_roles_user_tenant_id_role_id_scope_type_scope_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX user_roles_user_tenant_id_role_id_scope_type_scope_id_key ON public.user_roles USING btree (user_tenant_id, role_id, scope_type, scope_id);


--
-- Name: user_tenants_tenant_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_tenants_tenant_id_idx ON public.user_tenants USING btree (tenant_id);


--
-- Name: user_tenants_user_id_tenant_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX user_tenants_user_id_tenant_id_key ON public.user_tenants USING btree (user_id, tenant_id);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: academic_semesters academic_semesters_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.academic_semesters
    ADD CONSTRAINT academic_semesters_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: admission_rounds admission_rounds_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admission_rounds
    ADD CONSTRAINT admission_rounds_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: applications applications_round_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_round_id_fkey FOREIGN KEY (round_id) REFERENCES public.admission_rounds(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: applications applications_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: audit_logs audit_logs_actor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_actor_id_fkey FOREIGN KEY (actor_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: audit_logs audit_logs_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: auth_tokens auth_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_tokens
    ADD CONSTRAINT auth_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: class_schedules class_schedules_semester_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class_schedules
    ADD CONSTRAINT class_schedules_semester_id_fkey FOREIGN KEY (semester_id) REFERENCES public.academic_semesters(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: class_schedules class_schedules_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class_schedules
    ADD CONSTRAINT class_schedules_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: courses courses_curriculum_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_curriculum_id_fkey FOREIGN KEY (curriculum_id) REFERENCES public.curriculums(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: courses courses_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: curriculums curriculums_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.curriculums
    ADD CONSTRAINT curriculums_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.departments(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: curriculums curriculums_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.curriculums
    ADD CONSTRAINT curriculums_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: departments departments_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: document_templates document_templates_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.document_templates
    ADD CONSTRAINT document_templates_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: faculty_members faculty_members_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faculty_members
    ADD CONSTRAINT faculty_members_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: news_articles news_articles_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news_articles
    ADD CONSTRAINT news_articles_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.news_categories(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: news_articles news_articles_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news_articles
    ADD CONSTRAINT news_articles_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: news_categories news_categories_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news_categories
    ADD CONSTRAINT news_categories_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: role_permissions role_permissions_permission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT role_permissions_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES public.permissions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: role_permissions role_permissions_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT role_permissions_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: roles roles_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: sample_items sample_items_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sample_items
    ADD CONSTRAINT sample_items_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: student_petitions student_petitions_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_petitions
    ADD CONSTRAINT student_petitions_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.student_profiles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: student_petitions student_petitions_template_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_petitions
    ADD CONSTRAINT student_petitions_template_id_fkey FOREIGN KEY (template_id) REFERENCES public.document_templates(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: student_petitions student_petitions_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_petitions
    ADD CONSTRAINT student_petitions_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: student_profiles student_profiles_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_profiles
    ADD CONSTRAINT student_profiles_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: study_plans study_plans_curriculum_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.study_plans
    ADD CONSTRAINT study_plans_curriculum_id_fkey FOREIGN KEY (curriculum_id) REFERENCES public.curriculums(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: study_plans study_plans_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.study_plans
    ADD CONSTRAINT study_plans_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: theses theses_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.theses
    ADD CONSTRAINT theses_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.student_profiles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: theses theses_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.theses
    ADD CONSTRAINT theses_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_roles user_roles_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: user_roles user_roles_user_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_tenant_id_fkey FOREIGN KEY (user_tenant_id) REFERENCES public.user_tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_tenants user_tenants_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_tenants
    ADD CONSTRAINT user_tenants_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_tenants user_tenants_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_tenants
    ADD CONSTRAINT user_tenants_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict 5yCzHxUvzXNb561AjVKvOoqnxkP9pQaflGTbpDaxjpzIWk7rkfCCVpZJRRhY7He

