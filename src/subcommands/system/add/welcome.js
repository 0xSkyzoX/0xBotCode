const BaseSubcommandExecutor = require('../../../utils/BaseSubcommandExecutor');
const WelcomeData = require('../../../data/mongoWelcomeChannel');
const { EmbedBuilder } = require('discord.js');

module.exports = class AddWelcomeSubcommand extends BaseSubcommandExecutor {
    constructor(baseCommand, group, name) {
        super(baseCommand, group, 'welcome')
    }

    async run(client, interaction) {

        let success_message = new EmbedBuilder()
            .setTitle("Successfully Created :white_check_mark:")
            .setDescription(`Welcome channel have been successfully created on <#${interaction.options.get("channel").value}> !`)
            .setTimestamp()
            .setColor("Green")
            .setFooter({ text: client.user.username, iconURL: client.user.avatarURL() })
        const ChannelData = new WelcomeData({
            guild_id: interaction.guild.id,
            channel_id: interaction.options.get('channel').value,
            rule_channel_id: interaction.options.get('read').value,
            default_role_id: interaction.options.get('role').value
        })
        try {
            const firstData = await WelcomeData.find({ guild_id: interaction.guild.id })
            if (firstData[0]?.guild_id == interaction.guild.id) {
                let faild_message = new EmbedBuilder()
                    .setTitle("Faild Creating :x:")
                    .setDescription(`You have created the welcome channel <#${firstData[0].channel_id}> before ! \n use this command to delete this welcome channel: \`/system remove welcome\`. `)
                    .setFooter({ text: client.user.username, iconURL: client.user.avatarURL() })
                    .setColor("Red")
                    .setTimestamp()
                return interaction.reply({ embeds: [faild_message] , ephemeral: true})
            } else {
                await ChannelData.save()
                interaction.reply({ embeds: [success_message], ephemeral: true })
            }


        } catch (err) {
            console.log(err)
        } 
    }
}