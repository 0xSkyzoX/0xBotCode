const mongoose = require("mongoose")

const {Schema, model} = mongoose

const WelcomeSchema = new Schema({
    guild_id: String,
    channel_id: String,
    rule_channel_id: String,
    default_role_id: String,
})

const WelcomeData = model("Welcome", WelcomeSchema)

module.exports = WelcomeData