import { Router } from "express";
import { registerUser, getAllUser, loginUser, getPublicProfile, followUser, unfollowUser } from "../controllers/user.controller.js";
import { protect } from "../middleware/authMiddleware.js";
const userRouter = Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/getall', protect, getAllUser);

userRouter.get('/:username', getPublicProfile);
userRouter.post('/:username/follow', protect, followUser);
userRouter.delete('/:username/unfollow', protect, unfollowUser);

export default userRouter;  