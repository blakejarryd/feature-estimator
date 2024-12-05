import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  const defaultProject = await prisma.project.create({
    data: {
      name: 'Default Project',
      description: 'Initial project created during setup'
    }
  });
  
  const defaultConfigs = [
    { effortSize: 'Extra Small', days: 3, costPerDay: 1000 },
    { effortSize: 'Small', days: 5, costPerDay: 1000 },
    { effortSize: 'Medium', days: 10, costPerDay: 1000 },
    { effortSize: 'Large', days: 20, costPerDay: 1000 },
  ];

  console.log('Starting to seed database...');

  // Clear existing configurations
  await prisma.effortConfig.deleteMany();

  // Create new configurations
  for (const config of defaultConfigs) {
    await prisma.effortConfig.create({
      data: config,
    });
  }

  console.log('Database seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
