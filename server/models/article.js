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

articleSchema.pre("save", async function (next) {
    if(!this.isModified("title")) return next();


    let baseSlug = slugify(this.title, {
        lower: true,
        strict: true,
        trim: true
    });
    let slug = baseSlug;
    let count = 1;

    while(await mongoose.models.Article.findOne({ slug })){
        slug = `${baseSlug}-${count++}`;
    }

    this.slug = slug;
    
    next();
});



const Article = mongoose.model("Article", articleSchema);

export default Article;
