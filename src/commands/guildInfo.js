const {SlashCommandBuilder, EmbedBuilder} = require("discord.js")
const BaseSlashCommand = require("../utils/BaseSlashCommand")

module.exports = class GuildInfoSlashCommand extends BaseSlashCommand {
     constructor() {
          super("guildinfo")
     }
     run(client, interaction) {
          var ownerID =interaction.guild.ownerId
          var ownerUser = interaction.guild.members.cache.get(ownerID)
          let info_embed = new EmbedBuilder()
          .setTitle("Guild Details")
          .setAuthor({name: interaction.guild.name, iconURL: interaction.guild.iconURL()})
          .setThumbnail(client.user.avatarURL())
          .addFields({name: "members:", value: `${interaction.guild.memberCount}`, inline: true}, {name: "owner:", value:`${ownerUser.user.tag}`, inline: true})
          return interaction.reply({embeds: [info_embed]})
     }
     getSlashCommandJSON() {
          return new SlashCommandBuilder()
          .setName("guildinfo")
          .setDescription("Returns Guild info")
          .setDMPermission(false)
     }
}