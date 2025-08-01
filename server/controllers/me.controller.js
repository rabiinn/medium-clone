import User from "../models/user.js";
import Article from "../models/article.js";

export const getUser =  async (req, res, next ) => {
    try {
        const username = req.user.username;

        const user = await User.findOne({username});

        if(!user) {
            return res.status(401).json({error: "User not logged in"});
        }

        res.status(200).json(user);
    }

    catch(error) {
        next(error);
    }
}

export const getOwnArticles = async (req, res, next ) => {
    try {

        const username = req.user.username;

        const user = await User.findOne({username});

        if(!user) {
            return res.status(401).json({error: "User not logged in"});
        }

        const articles = await Article.find({username});

        res.status(200).json(articles);
    }
    

    catch(error) {
        next(error);
    }
}


export const saveArticle = async (req, res, next) => {
    try{
        const  id = req.params.id;

        if(!id){
            return res.status(400).json({error: "Article Id required"});
        }

        const username = req.user.username;
        const user = await User.findOne({username});
        if(!user) {
            return res.status(401).json({error: "User not logged in"});
        }

        const article = await Article.findById(id);
        if(!article) {
            return res.status(404).json({error: "Article not found"});
        }
        if(!user.savedArticles.includes(id)) {
            user.savedArticles.push(id);
            await user.save();
        }
        
        res.status(200).json({message: "Article saved"});

    }
    catch(error){
        next(error);
    }
}

export const removeArticle = async ( req, res, next ) => {

    try{

        const id = req.params.id;

        const username = req.user.username;
        const user = await User.findOne({username});

        if(!user) {
            return res.status(401).json({error: "User not logged in"});
        }

       user.savedArticles = user.savedArticles.filter(articleId => articleId.toString() !== id );

       await user.save();

       res.status(204).end();
        

    }
    catch(error) {
        next(error);
    }
}

export const getSavedArticles = async (req, res, next ) => {

    try {
        const username = req.user.username;
        const user = await User.findOne({username}).populate('savedArticles');
        if(!user) {
            return res.status(401).json({error: "User not logged in"});
        }

        res.status(200).json({ savedArticles: user.savedArticles });
    }

    catch(error) {
        next(error);
    }
}

