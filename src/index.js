const { Client, GatewayIntentBits, Collection, Events } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders')
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers
  ]
});
const config = require("./data/config.json")
const prefix = "!";
const fs = require('node:fs');
const path = require('node:path');
const { measureMemory } = require('node:vm');
const { send } = require('node:process');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("Special Code")
});

client.on("guildMemberAdd", member => {
  var role = member.guild.roles.cache.find(role => role.name === "Member");
  member.roles.add(role)
  let wMessage = new EmbedBuilder()
    .setDescription("Welcome to Special Code Server! Don't forget to read the <#1007571455585832960> :wave:")
    .setAuthor({ name: `${member.user.tag} just joined!`, iconURL: member.user.avatarURL() })
    .setColor(0x0099FF);
  const channelID = "1007572403645333524";
  const channel = member.guild.channels.cache.get(channelID)
  channel.send({ embeds: [wMessage] })
})

// ownership Commands
client.on("messageCreate", (message) => {
  if (message.member.roles.cache.has("1007601330287808542")) {
    if (message.channel.id === "1007571455585832961") {
      if (message.content.startsWith(prefix + "build")) {
        let args = message.content.split(" ")
        let channelID = args[2]
        if (args[1] === "-embed") {
          let Title = args[3] + " " + args[4]
          let messageContentArgs = message.content.split('"')
          console.log(messageContentArgs)
          let messageEmbed = new EmbedBuilder()
            .setTitle(Title)
            .setDescription(`${messageContentArgs[1]}`)
          let messageSucces = new EmbedBuilder()
            .setTitle(`By ${message.author.tag}`)
            .setDescription(`Message sent to <#${channelID}> Successfully !`)
            .setColor(0x00FF00)
          message.reply({ embeds: [messageSucces] })
          client.channels.cache.get(channelID).send({ embeds: [messageEmbed] })
        } else { let ErrMessage = new EmbedBuilder().setTitle("Command Error!")
        .setDescription(args[1]+', did you mean "-embed"? for learn more: **-help** ').setColor(0xFF0000)
          message.channel.send({embeds: [ErrMessage]}).then(msg => {
          setTimeout(() => msg.delete(), 14000)
          setTimeout(() => message.delete(), 15000)
        } ) }
if (args[1] === '-message') {

}
if (args[1] === '-messageDM') {

}
        
      }
    }
  }
})

client.login(config.TOKEN);