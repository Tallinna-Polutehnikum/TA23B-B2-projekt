import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import MovieController from './controllers/MovieController.js';
import UserController from './controllers/UserController.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.sendFile(__dirname+"/index.html");
});

app.use('/movies', MovieController);
app.use('/users', UserController);

const server = app.listen(process.env.BACKEND_PORT, () =>
  console.log(`🚀 Server ready at: http://localhost:${process.env.BACKEND_PORT}`),
);
