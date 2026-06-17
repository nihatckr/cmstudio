-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('hospitality', 'residential', 'commercial');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('PLANNING', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD');

-- CreateEnum
CREATE TYPE "JobDepartment" AS ENUM ('ARCHITECTURE', 'INTERIOR', 'SUSTAINABILITY', 'ENGINEERING', 'MANAGEMENT', 'INTERNSHIP');

-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'HYBRID');

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "city" VARCHAR(100) NOT NULL,
    "country" VARCHAR(100) NOT NULL,
    "location" VARCHAR(200) NOT NULL,
    "type" "ProjectType" NOT NULL,
    "typology" VARCHAR(100) NOT NULL,
    "area" INTEGER NOT NULL,
    "areaUnit" VARCHAR(10) NOT NULL DEFAULT 'm²',
    "size" VARCHAR(50) NOT NULL,
    "status" "ProjectStatus" NOT NULL DEFAULT 'PLANNING',
    "year" VARCHAR(4) NOT NULL,
    "client" VARCHAR(200) NOT NULL,
    "hue" INTEGER NOT NULL DEFAULT 200,
    "tags" TEXT[],
    "images" TEXT[],
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "role" VARCHAR(200) NOT NULL,
    "email" VARCHAR(200),
    "phone" VARCHAR(50),
    "bio" TEXT,
    "avatar" VARCHAR(500),
    "linkedin" VARCHAR(500),
    "portfolio" VARCHAR(500),
    "specializations" TEXT[],
    "hue" INTEGER NOT NULL DEFAULT 200,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "sectionName" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "dept" "JobDepartment" NOT NULL,
    "location" VARCHAR(100) NOT NULL,
    "employmentType" "EmploymentType" NOT NULL,
    "remote" BOOLEAN NOT NULL DEFAULT false,
    "title" VARCHAR(200) NOT NULL,
    "desc" TEXT NOT NULL,
    "requirements" TEXT[],
    "responsibilities" TEXT[],
    "benefits" TEXT[],
    "salaryMin" INTEGER,
    "salaryMax" INTEGER,
    "salaryCurrency" VARCHAR(10),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "postedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "loc" VARCHAR(200) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteMetadata" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "siteName" VARCHAR(100) NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "description" TEXT NOT NULL,
    "siteUrl" VARCHAR(500) NOT NULL,
    "locale" VARCHAR(10) NOT NULL DEFAULT 'en_US',
    "twitterHandle" VARCHAR(50),
    "ogImageUrl" VARCHAR(500) NOT NULL,
    "ogImageWidth" INTEGER NOT NULL DEFAULT 1200,
    "ogImageHeight" INTEGER NOT NULL DEFAULT 630,
    "ogImageAlt" VARCHAR(200) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageMetadata" (
    "id" SERIAL NOT NULL,
    "pageName" VARCHAR(100) NOT NULL,
    "title" VARCHAR(200),
    "description" TEXT,
    "keywords" TEXT[],
    "ogTitle" VARCHAR(200),
    "ogDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PageMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentBlock" (
    "id" SERIAL NOT NULL,
    "blockKey" VARCHAR(100) NOT NULL,
    "blockType" VARCHAR(50) NOT NULL,
    "content" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContentBlock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_code_key" ON "Project"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE INDEX "Project_slug_idx" ON "Project"("slug");

-- CreateIndex
CREATE INDEX "Project_type_idx" ON "Project"("type");

-- CreateIndex
CREATE INDEX "Project_status_idx" ON "Project"("status");

-- CreateIndex
CREATE INDEX "Project_featured_idx" ON "Project"("featured");

-- CreateIndex
CREATE INDEX "Project_published_idx" ON "Project"("published");

-- CreateIndex
CREATE INDEX "Project_sortOrder_idx" ON "Project"("sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "TeamMember_slug_key" ON "TeamMember"("slug");

-- CreateIndex
CREATE INDEX "TeamMember_slug_idx" ON "TeamMember"("slug");

-- CreateIndex
CREATE INDEX "TeamMember_active_idx" ON "TeamMember"("active");

-- CreateIndex
CREATE INDEX "TeamMember_sectionName_idx" ON "TeamMember"("sectionName");

-- CreateIndex
CREATE INDEX "TeamMember_sortOrder_idx" ON "TeamMember"("sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "Job_slug_key" ON "Job"("slug");

-- CreateIndex
CREATE INDEX "Job_slug_idx" ON "Job"("slug");

-- CreateIndex
CREATE INDEX "Job_dept_idx" ON "Job"("dept");

-- CreateIndex
CREATE INDEX "Job_active_idx" ON "Job"("active");

-- CreateIndex
CREATE INDEX "Job_featured_idx" ON "Job"("featured");

-- CreateIndex
CREATE INDEX "Job_postedAt_idx" ON "Job"("postedAt");

-- CreateIndex
CREATE UNIQUE INDEX "PageMetadata_pageName_key" ON "PageMetadata"("pageName");

-- CreateIndex
CREATE INDEX "PageMetadata_pageName_idx" ON "PageMetadata"("pageName");

-- CreateIndex
CREATE UNIQUE INDEX "ContentBlock_blockKey_key" ON "ContentBlock"("blockKey");

-- CreateIndex
CREATE INDEX "ContentBlock_blockKey_idx" ON "ContentBlock"("blockKey");

-- CreateIndex
CREATE INDEX "ContentBlock_blockType_idx" ON "ContentBlock"("blockType");

-- CreateIndex
CREATE INDEX "ContentBlock_published_idx" ON "ContentBlock"("published");
