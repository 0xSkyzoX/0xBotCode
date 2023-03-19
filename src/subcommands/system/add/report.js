const {SlashCommandBuilder, EmbedBuilder, Base} = require('discord.js')
const BaseSlashSubcommandExecutor = require('../../../utils/BaseSubcommandExecutor')
const ReportData = require("../../../data/reportDatabase")

module.exports = class addReportChannel extends BaseSlashSubcommandExecutor {
     constructor(baseCommand, group, name) { 
          super(baseCommand, group, name)
     }

     async run(client, interaction) {
          const data = await ReportData.findOne({guild_id: interaction.guild.id})
          let error_message = new EmbedBuilder()
          .setTitle('Already Registered!')
          .setDescription(`Report Channel is already Registered on: <#${data?.channel_id}>`)
          .setColor('Orange')
          .setTimestamp()
          let success_message = new EmbedBuilder()
          .setTitle('Successfully Created!')
          .setDescription(`Report Channel has Created on <#${interaction.options.get('channel').value}> !`)
          .setColor('Green')
          .setTimestamp()
          if (!data) {
               const newData = new ReportData({
                    channel_id: interaction.options.get('channel').value,
                    guild_id: interaction.guild.id
               })
               newData.save()
               return interaction.reply({embeds: [success_message], ephemeral: true})
          } else {
               return interaction.reply({embeds: [error_message], ephemeral: true})
          }
     }
}