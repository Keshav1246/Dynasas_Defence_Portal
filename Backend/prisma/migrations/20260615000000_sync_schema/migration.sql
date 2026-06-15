-- CreateEnum
CREATE TYPE "InquiryType" AS ENUM ('CONTACT', 'DEMO_REQUEST', 'QUOTE');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER', 'VIEWER');

-- AlterTable Inquiry
ALTER TABLE "Inquiry" RENAME COLUMN "assignedTo" TO "assignedAdminId";

ALTER TABLE "Inquiry" 
ADD COLUMN "inquiryType" "InquiryType" NOT NULL DEFAULT 'CONTACT';

-- Validate Foreign Key references before adding constraint
-- Set invalid assignedAdminId to NULL if they don't match any User.id
UPDATE "Inquiry" SET "assignedAdminId" = NULL WHERE "assignedAdminId" NOT IN (SELECT "id" FROM "User");

-- Clean User role values
UPDATE "User" SET "role" = 'ADMIN' WHERE "role" NOT IN ('SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER', 'VIEWER');

-- AlterTable User
ALTER TABLE "User" ADD COLUMN "lastLogin" TIMESTAMP(3),
ADD COLUMN "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "AdminRole" USING "role"::text::"AdminRole";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'ADMIN';

-- CreateTable WebsiteAnalytics
CREATE TABLE "WebsiteAnalytics" (
    "id" SERIAL NOT NULL,
    "sessionId" TEXT NOT NULL,
    "visitorId" TEXT NOT NULL,
    "pagePath" TEXT NOT NULL,
    "durationSeconds" INTEGER NOT NULL DEFAULT 0,
    "bounced" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WebsiteAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable UserInvitation
CREATE TABLE "UserInvitation" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "AdminRole" NOT NULL DEFAULT 'ADMIN',
    "invitationToken" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "invitedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserInvitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable RolePermissions
CREATE TABLE "RolePermissions" (
    "id" TEXT NOT NULL,
    "role" "AdminRole" NOT NULL,
    "dashboardAccess" BOOLEAN NOT NULL DEFAULT false,
    "homepageManage" BOOLEAN NOT NULL DEFAULT false,
    "servicesView" BOOLEAN NOT NULL DEFAULT false,
    "servicesEdit" BOOLEAN NOT NULL DEFAULT false,
    "servicesDelete" BOOLEAN NOT NULL DEFAULT false,
    "mediaUpload" BOOLEAN NOT NULL DEFAULT false,
    "mediaDelete" BOOLEAN NOT NULL DEFAULT false,
    "inquiriesView" BOOLEAN NOT NULL DEFAULT false,
    "inquiriesManage" BOOLEAN NOT NULL DEFAULT false,
    "partnersManage" BOOLEAN NOT NULL DEFAULT false,
    "analyticsView" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RolePermissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserInvitation_email_key" ON "UserInvitation"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserInvitation_invitationToken_key" ON "UserInvitation"("invitationToken");

-- CreateIndex
CREATE UNIQUE INDEX "RolePermissions_role_key" ON "RolePermissions"("role");

-- AddForeignKey
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_assignedAdminId_fkey" FOREIGN KEY ("assignedAdminId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInvitation" ADD CONSTRAINT "UserInvitation_invitedById_fkey" FOREIGN KEY ("invitedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
