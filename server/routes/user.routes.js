import { Router } from "express";
import { registerUser, getAllUser, loginUser, saveArticle, removeArticle, getSavedArticles } from "../controllers/user.controller.js";
import { protect } from "../middleware/authMiddleware.js";
const userRouter = Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/getall', protect, getAllUser);
userRouter.get('/saved', protect,getSavedArticles );
userRouter.post('/saved/:id', protect, saveArticle);
userRouter.delete('/saved/:id', protect, removeArticle);

export default userRouter;  