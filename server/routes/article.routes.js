import { Router } from "express";
import { getAllArticles, createArticle, updateArticle, deleteArticle } from "../controllers/articleController.js";
import { protect } from "../middleware/authMiddleware.js";
const articleRouter = Router();
articleRouter.get('/', getAllArticles);
articleRouter.post('/', protect, createArticle);
articleRouter.put('/:id', protect, updateArticle);
articleRouter.delete('/:id', protect, deleteArticle);
export default articleRouter;