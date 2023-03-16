const mongoose = require('mongoose')

const LeaveSchema =  new mongoose.Schema({
     channel_id: String,
     guild_id: String
})

const Leave = mongoose.model("leaves", LeaveSchema)

module.exports = Leave