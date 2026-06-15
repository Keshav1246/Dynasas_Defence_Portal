const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const profile = await prisma.companyProfile.findFirst();
  if (!profile) {
    console.log("No profile found. Exiting.");
    return;
  }

  console.log("Migrating legacy fields...");

  await prisma.companyProfile.update({
    where: { id: profile.id },
    data: {
      missionStatement: profile.missionStatement || profile.mission,
      visionStatement: profile.visionStatement || profile.vision,
      generalEmail: profile.generalEmail || profile.contactEmail,
      mainPhone: profile.mainPhone || profile.phone,
      mailingAddress: profile.mailingAddress || profile.address,
    }
  });

  console.log("Migration completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
