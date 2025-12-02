import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from './generated/prisma/client.js';
import 'dotenv/config'

function parseMysqlUrl(url) {
    const regex = /^mysql:\/\/([^:]+):([^@]+)@([^:\/]+):(\d+)\/(.+)$/;

    const match = url.match(regex);
    if (!match) {
        throw new Error("Invalid MySQL connection string: " + url);
    }

    return {
        host: match[3],
        port: parseInt(match[4], 10),
        user: match[1],
        password: match[2],
        database: match[5]
    };
}

const adapter = new PrismaMariaDb({
    ...parseMysqlUrl(process.env.DATABASE_URL),
    connectionLimit: 5
});
const prisma = new PrismaClient({ adapter });
export default prisma;