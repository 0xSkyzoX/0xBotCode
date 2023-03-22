const { Client, GatewayIntentBits, Collection, EmbedBuilder, ActivityType } = require('discord.js');
const { config } = require('dotenv');
config();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers
  ]
});
const TOKEN = process.env.TOKEN
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest');
const fs = require('node:fs');
const path = require('node:path');
const express = require('express')
const app = express()
const port = 80;
const rest = new REST({ version: '10' }).setToken(TOKEN)
const set = require("./data/config.json")
const {registerCommands, registerSubcommands} = require('./utils/registry')
const mongoose = require("mongoose")
const WelcomeData = require("./data/mongoWelcomeChannel.js")

app.listen(port, console.log("App listening on port 80!"))
app.get('/', async (req, res) => {
  res.send("Bot is Online!")
});

async function main() {
  client.slashCommands = new Collection();
    client.slashSubcommands = new Collection();
    await registerCommands(client, '../commands');
    await registerSubcommands(client);
    const slashCommandsJson = client.slashCommands.map((cmd) =>
      cmd.getSlashCommandJSON()
    );
    const slashSubcommandsJson = client.slashSubcommands.map((cmd) =>
      cmd.getSlashCommandJSON()
    );
  try {
    rest.put(Routes.applicationCommands(set.CLIENT_ID), {
      body: [...slashCommandsJson, ...slashSubcommandsJson],
    });
    const registeredSlashCommands = await rest.get(
      Routes.applicationCommands(set.CLIENT_ID, set.GUILD_ID)
    );
    console.log(registeredSlashCommands);
   await client.login(process.env.TOKEN);
  } catch (err) {
    console.log(err);
  }
}
main();

client.on('interactionCreate', (interaction) => {
  if (interaction.isChatInputCommand()) {
    const { commandName } = interaction;
    const cmd = client.slashCommands.get(commandName);
    
    const subcommandGroup = interaction.options.getSubcommandGroup(false);
    const subcommandName = interaction.options.getSubcommand(false);

    console.log(commandName);
    console.log(subcommandGroup, subcommandName);
    if (subcommandName) {
      if (subcommandGroup) {
        const subcommandInstance = client.slashSubcommands.get(commandName);
        subcommandInstance.groupCommands
          .get(subcommandGroup)
          .get(subcommandName)
          .run(client, interaction);
      } else {
        const subcommandInstance = client.slashSubcommands.get(commandName);
        subcommandInstance.groupCommands
          .get(subcommandName)
          .run(client, interaction);
      }
      return;
    }
    if (cmd) {
      cmd.run(client, interaction);
    } else {
      interaction.reply({ content: 'This command has no run method.' });
    }
  }
  
})

const UpdateChannel = require('./events/UpdateChannel')
client.on('ready', () => {
  UpdateChannel(client)
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({activities: [{name: `/help`, type: ActivityType.Watching}], status: "idle"})
});

client.on("guildMemberAdd", async member => {
  let guildData = await WelcomeData.find({guild_id: member.guild.id})
  if (guildData[0].guild_id == member.guild.id) {
    let welcome_message = new EmbedBuilder()
    .setDescription(`Welcome to ${member.guild.name} Server! Don't forget to read the <#${guildData[0].rule_channel_id}> :wave:`)
    .setAuthor({ name: `${member.user.tag} just joined!`, iconURL: member.user.avatarURL() })
    .setColor("Blue");
    let welcome_channel = client.channels.cache.get(guildData[0].channel_id)
    try {
      let role = member.guild.roles.cache.find(role => role.id === guildData[0].default_role_id)
      member.roles.add(role).catch(err => console.log(err))
      await welcome_channel.send({embeds: [welcome_message]})
    } catch(err) {
      console.log(err)
    }
  }
})
const moment = require('moment')
const LeaveData = require('./data/leaveMemberData.js')
client.on("guildMemberRemove", async member => {
  const data = await LeaveData.findOne({guild_id: member.guild.id})
  if (data) {
    let leave_message = new EmbedBuilder()
    .setDescription(`ID: ${member.user.id} \n Joined At : ${moment(member.guild.joinedAt).format('DD/MM/YYYY')}`)
    .setAuthor({ name: `${member.user.tag} just Leave!`, iconURL: member.user.avatarURL() })
    .setColor("Purple")
    .setTimestamp()
    client.channels.cache.get(data.channel_id).send({embeds: [leave_message]})
  } else {
    console.log('No Channel')
  }
})
mongoose.set('strictQuery', false);
mongoose.connect(set.MONGO_TOKEN, { useNewUrlParser: true, useUnifiedTopology: true })