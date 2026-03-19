import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { authRouter } from './routes/auth.routes.js';
import { taskRouter } from './routes/task.routes.js';
import { userRouter } from './routes/user.routes.js';

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({ message: 'API healthy' });
});

app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/users', userRouter);

app.use(errorMiddleware);
