import jwt from "jsonwebtoken";
import config from "../config/config.js";


export const protect  = (req, res, next) => {
    const authorization = req.get('authorization');
    let token = null;

    if(authorization && authorization.startsWith('Bearer ')){
        token = authorization.replace('Bearer ', '');
    }

    if(!token){
        return res.status(401).json({error: "No token provided"});
    }

    try {
        const decodedUser = jwt.verify(token,config.SECRET);
        req.user = decodedUser;
        next();
    }

    catch(error){
        next(error);
    }
}

