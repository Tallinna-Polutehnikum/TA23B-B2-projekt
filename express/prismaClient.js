import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import pkg from '@prisma/client';

const { PrismaClient } = pkg;

// Адаптер для SQLite, использует тот же файл, что и prisma.config.ts
const adapter = new PrismaBetterSqlite3({
  url: 'file:./dev.db',
});

const prisma = new PrismaClient({ adapter });

export default prisma;