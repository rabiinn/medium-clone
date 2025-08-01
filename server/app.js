import express from 'express'
import userRouter from './routes/user.routes.js';
import articleRouter from './routes/article.routes.js';
import commentRouter from './routes/comment.routes.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import { requestLogger } from './middleware/requestLogger.js';
import meRouter from './routes/me.routes.js';
const app = express()
app.use(express.json());
app.use(requestLogger)
app.use('/api/users', userRouter);
app.use('/api/users/me',meRouter )
app.use('/api/articles', articleRouter);
app.use('/api/articles', commentRouter);
app.use(errorMiddleware.errorHandler);

export default app;



