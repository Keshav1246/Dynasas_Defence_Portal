require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

console.log('Creating Prisma client...');

const prisma = new PrismaClient({
  adapter,
});

console.log('Prisma client created successfully');

async function main() {
  await prisma.$connect();
  console.log('Database connected');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });