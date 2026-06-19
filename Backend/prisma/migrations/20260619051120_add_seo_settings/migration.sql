-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "ctaLink" TEXT,
ADD COLUMN     "ctaText" TEXT,
ADD COLUMN     "features" TEXT[],
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "subtitle" TEXT;

-- AlterTable
ALTER TABLE "Settings" ADD COLUMN     "seoDescription" TEXT,
ADD COLUMN     "seoKeywords" TEXT,
ADD COLUMN     "seoOgImage" TEXT,
ADD COLUMN     "seoTitle" TEXT,
ADD COLUMN     "seoTwitterImage" TEXT;

-- CreateTable
CREATE TABLE "ServicesPageContent" (
    "id" TEXT NOT NULL,
    "heroLabel" TEXT,
    "heroTitle" TEXT,
    "heroDescription" TEXT,
    "servicesNavigatorTitle" TEXT,

    CONSTRAINT "ServicesPageContent_pkey" PRIMARY KEY ("id")
);
