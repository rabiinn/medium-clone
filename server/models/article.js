import mongoose from "mongoose";
import slugify from "slugify";
const articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    body: {
        type: String,
        required: true,
        
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
        slug: {
        type: String,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    genre: {
        type: String,
    },
    favoritedBy: [{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
       default: []
    }],
    tags: [String]
    

}, {timestamps: true});

articleSchema.pre("save", function (next) {
    if(!this.isModified("title")) return next();

    this.slug = slugify(this.title, {
        lower: true,
        strict: true,
        trim: true
    });
    
    next();
});

const Article = mongoose.model("Article", articleSchema);

export default Article;
