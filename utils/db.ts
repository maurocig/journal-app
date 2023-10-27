// when you make a new instance of a client, you're creating a new conection to the database. We're trying to limit those connections strings as much as possible.
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  // 											^ comes from node. global space that we're running in.
  // 																		^ we have to use unknown first so typescript doesn't complain about us trying to coerce a type.
  prisma: PrismaClient | undefined;
};

// check to see if we've already instantiated prisma
export const prisma =
  // if there's already a prisma client, use that. if not, create a new one:
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
// also prevents hot reloading from creating multiple instances of prisma
