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

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("Special Code")
});

client.on("guildMemberAdd", member => {
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
        if (args[1] === "embed") {
          let Title = args[3] + " " + args[4]
          
        } else if (args[1] === 'message') {

        } else if (args[1] === 'messageDM') {

        }
      }
    }
  }
})

client.login(config.TOKEN);