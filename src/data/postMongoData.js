const mongoose = require('mongoose')

const {Schema, model} = mongoose

const PostSchema = new Schema({
    title: String,
    user_id: String,
    user_avatarURL: String,
    descriptoin: String,
    user_name: String,
    time: String,
})

const Post = model("post", PostSchema)

module.exports = Post