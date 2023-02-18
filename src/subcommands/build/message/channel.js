const BaseSubcommandExecutor = require('../../../utils/BaseSubcommandExecutor');
const {EmbedBuilder} = require("discord.js")

module.exports = class BuildChannelMessageSubcommand extends BaseSubcommandExecutor {
  constructor(baseCommand, group, name) {
    super(baseCommand, group, 'channel');
  }

  run(client, interaction) {
    let success_message = new EmbedBuilder()
      .setTitle(`Successfully Send Embed`)
      .setDescription(`${interaction.user.username}, Message sent to <#${interaction.options.get('channel').value}>`)
      .setFooter({ text: client.user.username, iconURL: client.user.avatarURL() })
      .setColor("Green")
      .setTimestamp()
    let channel_option = interaction.options.get("channel")
    let content_option_value = interaction.options.get("content").value
    try {
      client.channels.cache.get(channel_option.value).send({content: content_option_value})
    } catch(err) {
      console.log("err")
    } finally{
      interaction.reply({embeds: [success_message]})
    }
  }
};