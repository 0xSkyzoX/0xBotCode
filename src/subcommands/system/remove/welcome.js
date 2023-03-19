const BaseSubcommandExecutor = require('../../../utils/BaseSubcommandExecutor');
const WelcomeData = require('../../../data/mongoWelcomeChannel');
const { EmbedBuilder, Guild } = require("discord.js");

module.exports = class RemoveWelcomeSubcommand extends BaseSubcommandExecutor {
    constructor(baseCommand, group, name) {
        super(baseCommand, group, 'welcome')
    }

    async run(client, interaction) {
        let guildData = await WelcomeData.find({guild_id: interaction.guild.id})
        let success_message = new EmbedBuilder()
            .setTitle("Successfully Removed !")
            .setDescription(`Welcome channel have been successfully removed <#${guildData[0]?.channel_id}> !`)
            .setTimestamp()
            .setColor("Yellow")
            .setFooter({ text: client.user.username, iconURL: client.user.avatarURL() })
        let error_message = new EmbedBuilder()
            .setTitle("Failed Removing...")
            .setDescription(`Welcome system is not found ? Maybe is Already Removed. \n \n use this command to add new welcome to channel: \`/system add welcome\`.`)
            .setTimestamp()
            .setColor("Red")
            .setFooter({ text: client.user.username, iconURL: client.user.avatarURL() })
        let guildID = interaction.guild.id;
        if (guildData[0]?.guild_id === guildID) {
            await WelcomeData.findOneAndRemove({ guild_id: guildID })
            return interaction.reply({ embeds: [success_message], ephemeral: true })
        } else {
            return interaction.reply({ embeds: [error_message], ephemeral: true })
        }
    }
}