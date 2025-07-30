import { Router } from "express";
import { registerUser, getAllUser, loginUser } from "../controllers/user.controller.js";
import { protect } from "../middleware/authMiddleware.js";
const userRouter = Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/getall', protect, getAllUser);

export default userRouter;