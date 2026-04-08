import { beforeAll, afterAll, beforeEach } from 'vitest';
import { prisma } from './lib/prisma';


beforeAll(async () => {
  await prisma.$connect();
});

beforeEach(async () => {
  // Clear tables before each test
  await prisma.item.deleteMany(); // repeat for other tables
  await prisma.archive.deleteMany(); // repeat for other tables
});

afterAll(async () => {
  await prisma.$disconnect();
});
