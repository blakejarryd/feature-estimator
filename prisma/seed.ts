import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Delete existing records
  await prisma.effortConfig.deleteMany();

  // Create default effort configurations
  const defaultConfigs = [
    { effortSize: 'Extra Small', days: 3, costPerDay: 1000 },
    { effortSize: 'Small', days: 5, costPerDay: 1000 },
    { effortSize: 'Medium', days: 10, costPerDay: 1000 },
    { effortSize: 'Large', days: 20, costPerDay: 1000 }
  ];

  for (const config of defaultConfigs) {
    await prisma.effortConfig.create({
      data: config
    });
  }

  console.log('✅ Seed data inserted successfully');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });