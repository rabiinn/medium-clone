import Article from "../models/article.js";
import User from "../models/user.js";

export const getAllArticles  = async (req, res, next ) => {

    try{

       const {
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        order = "desc",
        author,
        tag,
        q,
        genre
       } = req.query;

       const pageNum = parseInt(page);
       const limitNum = parseInt(limit);

       const filter = { };

       if(author) {
        const user = await User.findOne({ username: author});
        if(user) {
            filter.author = user._id;
        }
        else {
            return res.status(404).json({ error: "Author not found"});
        }
       }

       if(tag) {
            filter.tags = tag;
       }

       if(genre) {
            filter.genre = genre;
       }

       if(q) {
        filter.$or = [
            { title: { $regex: q, $options: "i" } },
            { body: { $regex: q, $options: "i" } },
        ];
       }

       const sortOrder = order === "asc" ? 1 : -1;


       
       const articles =  await Article.find(filter).sort({ [ sortBy ]: sortOrder })
       .skip((page - 1) * limitNum)
       .limit(limitNum)
       .populate('author', 'username');

       const totalCount = await Article.countDocuments(filter);

        res.status(200).json({
            page: pageNum,
            limit: limitNum,
            total: totalCount,
            articles
        });

    }
    catch(error){
        next(error);
    }
}

export const createArticle = async (req, res, next ) => {
    try{
        const username = req.user.username;
        const user = await User.findOne({username});
        if(!user){
            return res.status(401).json({Error: "User not loggedin"});
        }

        const {title, body, genre } = req.body;
        if(!title || !body || !genre){
            return res.status(400).json({error: "Missing body fields"});
        }

        const newArticle = new Article({
            title,
            body,
            genre,
            author: user._id
        });

        const returnedArticle = await newArticle.save();
        user.articles.push(returnedArticle._id);
        await user.save();
        res.status(201).json(returnedArticle);

    }
    catch(error){
        next(error);
    }
}

export const updateArticle = async ( req, res, next ) => {
    try {
        const id = req.params.id;
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "No fields provided to update" });
        }
        const { title, body, genre, tags } = req.body;

        const username  = req.user.username;
        const user = await User.findOne({username});
        if(!user) {
            return res.status(400).json({error: "User not logged in"});
        }
        const article = await Article.findById(id);
        if(!article){
            return res.status(404).json({error: "Article not found"});
        }

         if(article.author.toString() !== req.user.id){
            return res.status(401).json({error: "User unauthorized"});
        }

        if(title) article.title = title;
        if(body) article.body = body;
        if(genre) article.genre = genre;

        if(tags) article.tags = tags;

        const updatedArticle = await article.save();

        res.status(200).json(updatedArticle);


    }
    catch(error){
        next(error);
    }
}

export const deleteArticle = async ( req, res, next ) => {
    try{
        const id = req.params.id;
        if(!id){
            return res.status(400).json({error: "Article ID is required"});
        }
        const article = await Article.findById(id);
        if(!article){
            return res.status(404).json({error: "Article not found"});
        }
        if(article.author.toString() !== req.user.id){
            return res.status(403).json({error: "Unauthorized to delete"});
        }
        await article.deleteOne();

        const user = await User.findById(req.user.id);
        if(user) {
            user.articles = user.articles.filter(a => a.toString()!== id);
            await user.save();
        }
        res.status(204).end();
    }

    catch(error){
        next(error);
    }
}
