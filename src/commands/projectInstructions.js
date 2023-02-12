const { EmbedBuilder } = require("@discordjs/builders");

module.exports = {
    data: new EmbedBuilder()  
    .setTitle("Project Instructions!"),
    async exucute(message) {
        message.channel.send("Hello")
    }
}