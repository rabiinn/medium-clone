import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    body: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
        required: true
    }
}, {timestamps: true});


const Comment = mongoose.model("Comment", commentSchema);

export default Comment;