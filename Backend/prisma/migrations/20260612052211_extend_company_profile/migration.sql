-- AlterTable
ALTER TABLE "CompanyProfile" ADD COLUMN     "defenseContractsPhone" TEXT,
ADD COLUMN     "foundedYear" TEXT,
ADD COLUMN     "generalEmail" TEXT,
ADD COLUMN     "headquarters" TEXT,
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "longTermGoals" TEXT,
ADD COLUMN     "mailingAddress" TEXT,
ADD COLUMN     "mainPhone" TEXT,
ADD COLUMN     "missionStatement" TEXT,
ADD COLUMN     "missionTitle" TEXT,
ADD COLUMN     "registrationNumber" TEXT,
ADD COLUMN     "securityEmail" TEXT,
ADD COLUMN     "visionStatement" TEXT,
ADD COLUMN     "visionTitle" TEXT,
ADD COLUMN     "website" TEXT;

-- CreateTable
CREATE TABLE "CompanyStatistic" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "companyProfileId" TEXT NOT NULL,

    CONSTRAINT "CompanyStatistic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MissionPillar" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "companyProfileId" TEXT NOT NULL,

    CONSTRAINT "MissionPillar_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CompanyStatistic" ADD CONSTRAINT "CompanyStatistic_companyProfileId_fkey" FOREIGN KEY ("companyProfileId") REFERENCES "CompanyProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MissionPillar" ADD CONSTRAINT "MissionPillar_companyProfileId_fkey" FOREIGN KEY ("companyProfileId") REFERENCES "CompanyProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
