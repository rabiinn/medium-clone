import Comment from "../models/comment.js";
import User from "../models/user.js";
import Article from "../models/article.js";

export const addComment = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { body } = req.body; 

        if (!id) {
            return res.status(400).json({error: "Id required"});
        }
        if (!body) {
            return res.status(400).json({error: "Body required"});
        }

        const article = await Article.findById(id);
        if (!article) {
            return res.status(404).json({error: "Article not found"});
        }

        const comment = new Comment({
            body,
            author: req.user.id,
            article: article._id
        });

        const savedComment = await comment.save();
        res.status(201).json(savedComment);

    } catch (error) {
        next(error);
    }
}

export const getCommentsForArticle = async (req, res, next) => {

    try {
        const articleId = req.params.id;

        const article = await Article.findById(articleId);

        if(!article) {
            return res.status(404).json({ error : "Article not found "});
        }

        const comments = await Comment.find( { article: articleId }).populate("author", "username name").sort({ createdAt: -1 });

        res.status(200).json(comments);

    }
    catch(error) {
        next(error);
    }
}

export const deleteComment = async (req, res, next ) => {
    try {
        const { articleId, commentId } = req.params;

        const comment = await Comment.findById(commentId);

        if(!comment) {
            return res.status(404).json({ error: "Comment not found"});
        }

         if (comment.article.toString() !== articleId) {
            return res.status(400).json({ error: "Comment does not belong to this article" });
        }

        if(comment.author.toString() !== req.user.id ) {
            return res.status(403).json({ error: "Not authorized to delete this comment "});
        }

        await Comment.findByIdAndDelete(commentId);
        res.status(204).end();

    }

    catch(error) {
        next(error);
    }
}

export const updateComment = async (req, res, next ) => {
    try { 
        const { articleId, commentId } = req.params;
        const { body } = req.body;
        if(!body) {
            return res.status(400).json({error: "Body required"});
        }
        const comment = await Comment.findById(commentId);
        if(!comment){
            return res.status(404).json({error: "Comment not found"});
        }
        if(comment.article.toString() !== articleId ){
            return res.status(400).json({error: "Comment doesnot belong to the article"});
        }
        if(comment.author.toString() !== req.user.id) {
            return res.status(403).json({ error: "Not authorized to update this comment"});
        }
        comment.body = body;
        const updatedComment = await comment.save();
        
        res.status(200).json(updatedComment);

    }

    catch(error) {
        next(error);
    }
}


