const {SlashCommandBuilder, EmbedBuilder} = require("discord.js")
const BaseSlashSubcommandExecutor= require("../../../utils/BaseSubcommandExecutor")
const projectData = require("../../../data/setProjectData")

module.exports = class ProjectRemoveSlashSubcommand extends BaseSlashSubcommandExecutor {
     constructor(baseCommand, group, name) {
          super(baseCommand, group, "project")
     }
     async run(client, interaction) {
          const data = await projectData.findOne({guild_id: interaction.guild.id})
          let success_message = new EmbedBuilder()
          .setTitle('Successfully Removed!')
          .setDescription('Project System channel has removed from CodeX bot!')
          .setColor('Green')
          .setTimestamp()
          let failed_message = new EmbedBuilder()
          .setTitle('Failed Removing...')
          .setDescription('There is no project system at this server! \n\n try this command: `/system add project`')
          .setColor('Red')
          .setTimestamp()
          if (data?.guild_id === interaction.guild.id) {
               await data.delete()
               return interaction.reply({embeds: [success_message], ephemeral: true})
          } else {
               return interaction.reply({embeds: [failed_message], ephemeral: true})
          }
     }
}