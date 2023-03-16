const mongoose = require('mongoose')

const setProjecSchema = new mongoose.Schema({
     guild_id: String,
     channel_id: String
})

const setProject = mongoose.model('setprojects', setProjecSchema)

module.exports = setProject