const {SlashCommandBuilder, EmbedBuilder} = require("discord.js")
const BaseSlashCommand = require("../utils/BaseSlashCommand")

module.exports = class GuildInfoSlashCommand extends BaseSlashCommand {
     constructor() {
          super("guildinfo")
     }
     run(client, interaction) {
          
          let info_embed = new EmbedBuilder()
          .setTitle("Guild Details")
          .setAuthor({name: interaction.guild.name, iconURL: interaction.guild.iconURL()})
          .setThumbnail(client.user.avatarURL())
          .addFields({name: "members:", value: `${interaction.guild.memberCount}`, inline: true}, {name: "owner:", value:`Testing`, inline: true}, {name: "created at:", value: `Test`})
          .setColor("Blue")
          console.log(ownerUser)
          return interaction.reply({content: "This Command is not Available now!"})
     }
     getSlashCommandJSON() {
          return new SlashCommandBuilder()
          .setName("guildinfo")
          .setDescription("Returns Guild info")
          .setDMPermission(false)
     }
}