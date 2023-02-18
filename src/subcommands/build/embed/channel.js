const BaseSubcommandExecutor = require('../../../utils/BaseSubcommandExecutor');
const { EmbedBuilder } = require('discord.js')

module.exports = class BuildChannelEmbedSubcommand extends BaseSubcommandExecutor {
  constructor(baseCommand, group) {
    super(baseCommand, group, 'channel');
  }


  run(client, interaction) {

    let title_option = interaction.options.get('title')
    let color_option = interaction.options.get('color')

    let success_message = new EmbedBuilder()
      .setTitle(`Successfully Send Embed`)
      .setDescription(`${interaction.user.username}, Message sent to <#${interaction.options.get('channel').value}>`)
      .setFooter({ text: client.user.username, iconURL: client.user.avatarURL() })
      .setColor("Green")
      .setTimestamp()

    let channel_option_value = interaction.options.get('channel').value

    let EmbedBuildMessage = new EmbedBuilder()
      .setTitle(title_option.value)
      .setColor(color_option.value)
      .setDescription(interaction.options.get('content').value)
      .setTimestamp()
      .setFooter({ text: `requested by ${interaction.user.username}`, iconURL: interaction.user.avatarURL() })
      .setURL(interaction.options.get('url') ? interaction.options.get('url').value : null)
      .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
      .setThumbnail(client.user.avatarURL())

    try {
      client.channels.cache.get(channel_option_value).send({ embeds: [EmbedBuildMessage] })
    } catch (err) {
      console.log(err)
    } finally {
      interaction.reply({ embeds: [success_message] })
    }
  }
};