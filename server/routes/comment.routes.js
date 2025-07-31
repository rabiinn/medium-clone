import { addComment, getCommentsForArticle, updateComment, deleteComment } from "../controllers/comment.controller.js";
import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
const commentRouter = Router();

commentRouter.get('/:id/comments', getCommentsForArticle);
commentRouter.post('/:id/comment', protect, addComment);
commentRouter.delete('/:articleId/comments/:commentId', protect, deleteComment);
commentRouter.put('/:articleId/comments/:commentId',protect, updateComment);


export default commentRouter;