import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 5,
        unique: true,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: validator.isEmail,
            message: 'Email validation failed'
        }
    },
    passwordHash: {
        type: String
    },
    articles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
        }
    ],
    savedArticles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Article',
            default: []
        }
    ]
})

const User = mongoose.model("User", userSchema);

export default User;