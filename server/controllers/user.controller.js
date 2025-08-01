import User from "../models/user.js";
import Article from "../models/article.js";
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

export const getPublicProfile = async (req, res, next ) => {

    try {
        const username = req.params.username;

        if(!username) {
            return res.status(400).json({ error: 'Usdername parameter is required.'});
        }

        const user = await User.findOne({username})
        .populate("followers", "username")
        .populate("following", "username");
        
        if(!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const articles = await Article.find({author: user._id }).select('-body');

        res.status(200).json({
            username: user.username,
            name: user.name,
            followerCount: user.followers.length,
            followingCount: user.following.length,
            articles
        });
    }
    
    catch(error) {
        next(error);
    }
}

export const followUser = async ( req, res, next ) => {
    try {
        const currentUser = await User.findOne({ username: req.user.username });
        if( !currentUser ){
            return res.status(401).json({error: "User not logged in"});
        }

        const targetUsername = req.params.username;

        if(!targetUsername) {
            return res.status(400).json({error: "Target username parameter required"});
        }

        const targetUser = await User.findOne({ username: targetUsername });

        if(!targetUser) {
            return res.status(404).json({ error: "User not found" });
        }

        if(currentUser._id.equals(targetUser._id)) {
            return res.status(400).json({ error: "Cannot follow yourself" });
        }

        if(!targetUser.followers.includes(currentUser._id)) {
            targetUser.followers.push(currentUser._id);
            await targetUser.save();
        }

        if(!currentUser.following.includes(targetUser._id)) {
            currentUser.following.push(targetUser._id);
            await currentUser.save();
        }

        res.status(200).json({ message: `Followed ${targetUsername}`,
        following: currentUser.following,
        followers: targetUser.followers,
        followingCount: currentUser.following.length,
        followersCount: targetUser.followers.length
        });

    }

    catch(error) {
        next(error);
    }
}

export const unfollowUser  = async (req, res, next ) => {
 try {
        const currentUser = await User.findOne({ username: req.user.username });
        if( !currentUser ){
            return res.status(401).json({error: "User not logged in"});
        }

        const targetUsername = req.params.username;

        if(!targetUsername) {
            return res.status(400).json({error: "Target username parameter required"});
        }

        const targetUser = await User.findOne({ username: targetUsername });

        if(!targetUser) {
            return res.status(404).json({ error: "User not found" });
        }

        if (currentUser._id.equals(targetUser._id)) {
            return res.status(400).json({ error: "Cannot unfollow yourself" });
        }


        targetUser.followers = targetUser.followers.filter(
            id => id.toString() !== currentUser._id.toString()
        );

        currentUser.following = currentUser.following.filter(
            id => id.toString() !== targetUser._id.toString()
        );

        await targetUser.save();
        await currentUser.save();


        res.status(200).json({ message: `Unfollowed ${targetUsername}`,
        following: currentUser.following,
        followers: targetUser.followers,
        followingCount: currentUser.following.length,
        followersCount: targetUser.followers.length
        });
 }
 catch(error) {
    next(error);
 }
      
}
