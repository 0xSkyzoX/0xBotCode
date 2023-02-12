const { Client, GatewayIntentBits, Collection, Events, Embed } = require('discord.js');
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
const express = require('express')
const app = express()
const port = 80;
app.listen(port, console.log("App listening on port 80!"))
app.get('/', async (req, res) => {
  res.send("Bot is Online!")
})
client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});


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

client.on("messageCreate", (message) => {
  if (message.content === prefix+"help") {
      let MessageEmbed = new EmbedBuilder()
      .setTitle(client.user.username+"'s Command List")
      .setAuthor({ name: `${message.guild.name}`, iconURL: message.guild.iconURL() })
      .setThumbnail(client.user.avatarURL())
      .setDescription("You can learn more: **!help (commands  name)**")
      .addFields({name: "!project", value: "project settings", inline: true}, {name: "!code", value: "Programming features", inline: true}, {name: "!team", value: "Coding team...", inline: true})
      .addFields({name: "!post", value: "Posting Code, project...", inline: true}, {name: "!system", value: "System bot", inline: true}, {name: "!setting", value: "edit your SC user", inline: true})
      .setTimestamp()
      .setFooter({text: `requested by ${message.author.username}`, iconURL: message.author.avatarURL()})
      message.channel.send(`<@${message.author.id}>, Look at your DMs for the help Command List!`)
      message.author.send({embeds: [MessageEmbed]})
  }
})

client.on("messageCreate", (message) => {
  let args = message.content.split(" ");
  if (message.content.startsWith(prefix + "help")) {
    if(args[1] === "project") {
      client.command.set()
    }
  }
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

client.login(process.env.TOKEN);