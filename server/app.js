import express from 'express'
import userRouter from './routes/user.routes.js';
import errorMiddleware from './middleware/errorMiddleware.js';
const app = express()
app.use(express.json());

app.use('/api/users', userRouter);
app.use(errorMiddleware.errorHandler);

export default app;



