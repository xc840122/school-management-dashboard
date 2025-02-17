// solution for nextjs development env:
// https://www.prisma.io/docs/orm/more/help-and-troubleshooting/nextjs-help#avoid-multiple-prisma-client-instances
// export const prisma = new PrismaClient();

// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;