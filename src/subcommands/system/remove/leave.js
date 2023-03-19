const {SlashCommandBuilder, EmbedBuilder} = require("discord.js")
const BaseSlashSubcommandExecutor = require("../../../utils/BaseSubcommandExecutor")
const leaveData = require("../../../data/leaveMemberData")

module.exports = class LeaveSlashSubcommand extends BaseSlashSubcommandExecutor {
     constructor(baseCommand, group, name) {
          super(baseCommand, group, "leave")
     }
     async run(client, interaction) {
          const data = await leaveData.findOne({
               guild_id: interaction.guild.id
          })
          if (data) {
               let success_messag = new EmbedBuilder()
               .setTitle('Successfully Removed!')
               .setDescription('Leave System has removed from CodeX bot!')
               .setColor('Green')
               .setTimestamp()
               await data.delete()
               return interaction.reply({embeds: [success_messag], ephemeral: true})
          } else {
               let failed_message = new EmbedBuilder()
          .setTitle('Failed Removing...')
          .setDescription('There is no leave channel at this server! \n\n try this command: `/system add leave`')
          .setColor('Red')
          .setTimestamp()
          return interaction.reply({embeds: [failed_message], ephemeral: true})
          }

          
     }
}