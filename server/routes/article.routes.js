import { Router } from "express";
import { getAllArticles, createArticle, updateArticle, deleteArticle, getArticleBySlug} from "../controllers/articleController.js";
import { protect } from "../middleware/authMiddleware.js";
const articleRouter = Router();

articleRouter.get('/', getAllArticles);
articleRouter.get('/:slug', getArticleBySlug);
articleRouter.post('/', protect, createArticle);
articleRouter.put('/:id', protect, updateArticle);
articleRouter.delete('/:id', protect, deleteArticle);
export default articleRouter;