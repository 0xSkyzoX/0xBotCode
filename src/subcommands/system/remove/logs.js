const { SlashcommandBuilder, EmbedBuilder } = require("discord.js")
const BaseSubcommandExecutor = require("../../../utils/BaseSubcommandExecutor")
const LogsData = require("../../../data/logsMongoDatabase")

module.exports = class removeLogsSystemSlashSubcommand extends BaseSubcommandExecutor {
     constructor(baseCommand, group, name) {
          super(baseCommand, group, "logs")
     }
     async run(client, interaction) {
          const data = await LogsData.findOne({ guild_id: interaction })
          let success_messag = new EmbedBuilder()
               .setTitle('Successfully Removed!')
               .setDescription('logs System has removed from CodeX bot!')
               .setColor('Green')
               .setTimestamp()
          if (data?.guild_id === interaction.guild.id) {
               await data.delete()
               return interaction.reply({ embeds: [success_messag] })
          } else {
               let failed_message = new EmbedBuilder()
                    .setTitle('Failed Removing...')
                    .setDescription('There is no leave channel at this server! \n\n try this command: `/system add leave`')
                    .setColor('Red')
                    .setTimestamp()
                    return interaction.reply({embeds: [failed_message]})
          }
     }
}