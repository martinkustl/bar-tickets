// Use TypeScript module augmentation to declare the type of server.prisma to be PrismaClient
import { PrismaClient } from '@prisma/client';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}
