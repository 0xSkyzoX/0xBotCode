const BaseSubcommandExecutor = require('../../../utils/BaseSubcommandExecutor');
const { EmbedBuilder } = require('discord.js')
module.exports = class SendDmEmbedSubcommand extends BaseSubcommandExecutor {
  constructor(baseCommand, group, name) {
    super(baseCommand, group, name);
  }

  run(client, interaction) {
    let title_option = interaction.options.get('title')
    let color_option = interaction.options.get('color')
    let user_option = interaction.options.get('user')
    let success_message = new EmbedBuilder()
      .setTitle(`Successfully Send Embed`)
      .setDescription(`${interaction.user.username}, Message sent to <@${interaction.options.get("user").value}>`)
      .setFooter({ text: client.user.username, iconURL: client.user.avatarURL() })
      .setColor("Green")
      .setTimestamp()
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
      client.users.fetch(user_option.value, false).then((user) => {
        user.send({ embeds: [EmbedBuildMessage] })
      })
    } catch (err) {
      console.log(err)

    } finally {
      interaction.reply({embeds: [success_message]})
    }
  }
};