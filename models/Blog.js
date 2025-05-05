import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {type: String},
    excerpt: {type: String},
    content: {type: String},
    image: {type: String},
    reading: {type: String},
    patreon: {type: String},
    tags: {type: String},
    sources: {type: String},
    author: {type: String},
    uploaded_at: {type: String, default: new Date().toLocaleDateString()},
    likes: [
        {
            like: {type: String}
        }
    ],
    comments: [
        {
            by: {type: String},
            content: {type: String},
            posted_at: {type: String, default: new Date().toLocaleDateString()}
        }
    ],
})

const blogModel = mongoose.models.blogs || new mongoose.model('blogs', blogSchema)

export default blogModel