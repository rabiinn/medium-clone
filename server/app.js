import express from 'express'
import userRouter from './routes/user.routes.js';
import articleRouter from './routes/article.routes.js';
import commentRouter from './routes/comment.routes.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import { requestLogger } from './middleware/requestLogger.js';
import meRouter from './routes/me.routes.js';
import cors from 'cors';

const app = express()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(requestLogger)
app.use('/api/users', userRouter);
app.use('/api/users/me',meRouter )
app.use('/api/articles', articleRouter);
app.use('/api/articles', commentRouter);
app.use(errorMiddleware.errorHandler);

export default app;



