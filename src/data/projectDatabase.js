const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
     user_id: String,
     title: String,
     description: String,
     color: String,
     guild_id: String,
     link: String
})

const Project = mongoose.model("projects", ProjectSchema)

module.exports = Project