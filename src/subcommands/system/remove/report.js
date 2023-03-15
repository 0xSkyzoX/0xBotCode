const {SlashCommandBuilder, EmbedBuilder} = require('discord.js')
const BaseSlashSubcommand = require('../../../utils/BaseSlashSubcommand')
const ReportData = require('../../../data/reportDatabase')

module.exports = class removeReportSlashSubcommand extends BaseSlashSubcommand {
     constructor(baseCommand, group, name) {
          super(baseCommand, group, 'report')
     }
     async run(client, interaction) {
          const data = await ReportData.findOne({
               guild_id: interaction.guild.id
          })
          let success_message = new EmbedBuilder()
          .setTitle('Successfully Removed!')
          .setDescription('Report channel has removed from CodeX bot!')
          .setColor('Green')
          .setTimestamp()
          let failed_message = new EmbedBuilder()
          .setTitle('Failed Removing...')
          .setDescription('There is no report channel at this server! \n\n try this command: `/system add report`')
          .setColor('Red')
          .setTimestamp()
          if (data) {
               await ReportData.findOneAndDelete({guild_id: interaction.guild.id})
               return interaction.reply({embeds: [success_message]})
          } else {
               return interaction.reply({embeds: [failed_message], ephmeral: true})
          }
     }
}