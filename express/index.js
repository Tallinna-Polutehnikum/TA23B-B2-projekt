import 'dotenv/config'
import express from 'express'
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import MovieController from './controllers/MovieController.js';

const app = express();

app.use(express.json());

app.use('/movies', MovieController);

const server = app.listen(process.env.BACKEND_PORT, () =>
  console.log(`🚀 Server ready at: http://localhost:${process.env.BACKEND_PORT}`),
);
