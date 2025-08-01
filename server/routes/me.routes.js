import { Router } from "express";
import { getUser, getSavedArticles, removeArticle, saveArticle, getOwnArticles } from "../controllers/me.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const meRouter = Router();

meRouter.get('/', protect, getUser);
meRouter.get('/posts', protect, getOwnArticles);
meRouter.get('/saved', protect,getSavedArticles );
meRouter.post('/saved/:id', protect, saveArticle);
meRouter.delete('/saved/:id', protect, removeArticle);

export default meRouter;