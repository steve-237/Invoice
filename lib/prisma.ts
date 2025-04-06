import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

prisma.$connect()
  .then(() => console.log('Connected to database'))
  .catch((err: string) => console.error('Database connection error:', err));

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
