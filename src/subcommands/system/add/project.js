const {SlashCommandBuilder, EmbedBuilder, Embed} = require('discord.js')
const BaseSlashSubcommandExecutor = require('../../../utils/BaseSubcommandExecutor')
const Project = require('../../../data/setProjectData')

module.exports = class addProjectSlashSubcommand extends BaseSlashSubcommandExecutor {
     constructor(baseCommand, group, name ) {
          super(baseCommand, group, "project")
     }
     async run(client, interaction){
          const data = await Project.findOne({guild_id: interaction.guild.id})
          let success_message = new EmbedBuilder()
          .setTitle('Successfully Created!')
          .setDescription('Project System has successfully created on this server! \n \n try to share a project: `/project create` !')
          .setColor('Purple')
          .setTimestamp()
          let failed_message = new EmbedBuilder()
          .setTitle('Failed Creating...')
          .setDescription('Error while trying to add project system. \n\n Maybe there are already project system at this server? \n try : `/system remove project`')
          .setColor('Red')
          .setTimestamp()
          if (!data) {
               const newData = new Project({
                    channel_id: interaction.options.get('channel').value,
                    guild_id: interaction.guild.id
               })
               newData.save();
               return interaction.reply({embeds: [success_message], ephemeral: true})
          } else {
               return interaction.reply({embeds: [failed_message], ephemeral: true})
          }
     }
}
