const BaseSubcommandExecutor = require('../../../utils/BaseSubcommandExecutor');
const LogsData = require('../../../data/logsMongoDatabase');
const { EmbedBuilder } = require('discord.js');

module.exports = class LogsChannelSubcommand extends BaseSubcommandExecutor {
    constructor(baseCommand, group, name) {
        super(baseCommand, group, name)
    }

    async run(client, interaction) {
        const Logs = new LogsData({
            guild_id: interaction.guild.id,
            channel_id: interaction.options.get('channel').value,
        })
        try {
            const LogData = await LogsData.find({ guild_id: interaction.guild.id })
            if (LogData[0]?.guild_id === interaction.guild.id) {
                let faild_message = new EmbedBuilder()
                .setTitle('Oops! Faild Creating...')
                .setDescription('This server already have log channel!')
                .setColor('Red')
                .setFooter({text: `requested by ${interaction.user.name}`, iconURL: interaction.user.avatarURL()})
                .setTimestamp()
                interaction.reply({embeds: [faild_message]})
            } else {
                await Logs.save();
                let success_message = new EmbedBuilder()
                .setTitle('Successfully Created!')
                .setColor('Green')
                .setDescription(`System log have been created in <#${interaction.options.get('channel').value}>`)
                .setFooter({text: `requested by ${interaction.user.name}`, iconURL: interaction.user.avatarURL()})
                .setTimestamp()
                interaction.reply({embeds: [success_message]})
            }
        } catch(err) {
            
        }
        

    }
}