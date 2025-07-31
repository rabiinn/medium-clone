import User from "../models/user.js";
import bcrypt from "bcrypt";
import config from "../config/config.js";
import validator from "validator";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
    try{
        console.log('Request body: ', req.body)
        const {name, email, username, password } = req.body;
        if(!email || !password || !username || !name){
           return res.status(400).json({error: "All fields are required"});
        }

        if(!validator.isEmail(email)){
            return res.status(400).json({error: "Please provide valid email"});
        }

        if(username.length < 5 || username.length > 20){
            return res.status(400).json({error: "Username must be between 5 and 20 characters "})
        }
        if(!/^[a-zA-Z0-9_]+$/.test(username)) {
            return res.status(400).json({error: "Username can only contain letters, numbers, and underscores"});
        }

        if(password.length < 8) {
            return res.status(400).json({error: "Password must be at least 8 characters long"});
        }

        if(!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(password)){
            return res.status(400).json({error: "Passowrd must contain at least one uppercase letter, one lowercase letter, one number and one special character"});
        }

        const existingUser = await User.findOne({
            $or: [{username}, {email}]
        });

        if(existingUser) {
            return res.status(409).json({error: "User with this email or username already exists"});
        }

    const hashedPassword = await bcrypt.hash(password,config.SALT);

    const newUser = new User({
        name,
        email,
        username,
        passwordHash: hashedPassword
      });
      await newUser.save();

      res.status(201).json({
        message: "User created successfully",
        userId: newUser._id
      })
    }
    catch(error){
        console.error('Error in registerUser:', error);
        next(error);
    }
}


export const loginUser = async (req, res, next) => {
    try{
        const { username, password } = req.body;

        if(!username || !password) {
           return res.status(401).json({error: "Invalid credentials"});
        }
        if(username.trim().length < 5) {
            return res.status(400).json({error: "Invalid username"});
        }
        const user = await User.findOne({username});

        if(!user) {
            return res.status(401).json({error: "User not found"});
        }
        const passwordHash = user.passwordHash;

        const isPasswordCorrect = await bcrypt.compare(password,passwordHash);

        if(!isPasswordCorrect){
            return res.status(401).json({error: "Wrong Password"});
        }

        const userForToken = {
            username: user.username,
            id: user._id
        }

        const token = jwt.sign(userForToken,config.SECRET, {expiresIn: '24h'});

        res.status(200).json({
            token,
            username: user.username,
            name: user.name,
            userId: user._id
        });

    }

    catch(error){
        next(error);
    }
}

export const getAllUser = async (req, res, next) => {
    try{
        const loggedinuser = req.user;
        if(!loggedinuser){
            return res.stutus(401).json({error: "Unauthorized"});
        }
        const users = await User.find({});
        res.status(200).json(users);
    }
    catch(error){
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
