const BaseSubcommandExecutor = require('../../../utils/BaseSubcommandExecutor');
const LeaveData = require('../../../data/leaveMemberData');
const { EmbedBuilder } = require('discord.js');

module.exports = class LeaveSlashSubcommand extends BaseSubcommandExecutor {
     constructor(baseCommand, group, name) {
          super(baseCommand, group, "leave")
     }

     async run(client, interaction) {
          const data = await LeaveData.findOne({
                    guild_id: interaction.guild.id
               })
          let faild_message = new EmbedBuilder()
                .setTitle('Oops! Faild Creating...')
                .setDescription('This server already have leave channel!')
                .setColor('Red')
                .setFooter({text: `requested by ${interaction.user.name}`, iconURL: interaction.user.avatarURL()})
                .setTimestamp()
          let success_message = new EmbedBuilder()
                .setTitle('Successfully Created!')
                .setColor('Green')
                .setDescription(`Leave System have been created in <#${interaction.options.get('channel').value}>`)
                .setFooter({text: `requested by ${interaction.user.name}`, iconURL: interaction.user.avatarURL()})
                .setTimestamp()
          if (data?.guild_id == interaction.guild.id) {
               return interaction.reply({embeds: [faild_message], ephemeral: true})
          } else {
               const newData = new LeaveData({
                    guild_id: interaction.guild.id,
                    channel_id: interaction.options.get('channel').value
               })
               await newData.save();
               interaction.reply({embeds: [success_message], ephemeral: true})
               
          }
     }
}