import { items } from './items';
import { units } from './units';
import { categories } from './categories';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main(): Promise<void> {
  for (const category of categories) {
    await prisma.category.upsert({
      where: {
        id: category.id,
      },
      update: {},
      create: {
        ...category,
      },
    });
  }

  for (const unit of units) {
    await prisma.units.upsert({
      where: {
        id: unit.id,
      },
      update: {},
      create: {
        ...unit,
      },
    });
  }

  for (const item of items) {
    await prisma.item.upsert({
      where: {
        id: item.id,
      },
      update: {},
      create: {
        ...item,
      },
    });
  }
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
