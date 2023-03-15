const mongoose = require('mongoose')

const ReportSchema = new mongoose.Schema({
     guild_id: String,
     channel_id: String
})

const ReportData = mongoose.model('reports', ReportSchema)

module.exports = ReportData