const {SlashCommandBuilder, EmbedBuilder} = require('discord.js')
const BaseSlashCommand = require('../utils/BaseSlashCommand')
const ReportData = require('../data/reportDatabase')
module.exports = class ReportsSlashCommand extends BaseSlashCommand {
     constructor() {
          super('report')
     }

     async run(client, interaction) {
          let error_message = new EmbedBuilder()
          .setTitle('Failed Reporting...')
          .setDescription('This command maybe is not available in this server!?')
          .setTimestamp()
          .setColor('Yellow')
          let success_message = new EmbedBuilder()
          .setTitle('Report Sended!')
          .setDescription('Report is Send Successfully!')
          .setTimestamp()
          .setColor('Green')
          let report_message = new EmbedBuilder()
          .setTitle(`Report by ${interaction.user.tag}`)
          .setDescription(interaction.options.get('content').value)
          .setThumbnail(interaction.user.avatarURL())
          .setFooter({text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.avatarURL()})
          .setTimestamp()
          .setColor('Blue')
          const data = await ReportData.findOne({guild_id: interaction.guild.id})
          if (!data) {
               return interaction.reply({embeds: [error_message]})
          } else {
               client.channels.cache.get(data?.channel_id).send({embeds: [report_message]})
               return interaction.reply({embeds: [success_message], ephmeral: true})
          }
     }

     getSlashCommandJSON() {
          return new SlashCommandBuilder()
          .setName('report')
          .setDescription('Report an issue')
          .addStringOption(option => 
               option.setName('content')
               .setDescription('Description of this report!')
               .setRequired(true)
          )
     }
}