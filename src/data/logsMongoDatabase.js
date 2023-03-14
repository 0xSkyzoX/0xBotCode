const mongoose = require('mongoose')

const {Schema, model} = mongoose

const PostSchema = new Schema({
    guild_id: String,
    channel_id: String
})

const LogsData = model("logs", PostSchema)

module.exports = LogsData