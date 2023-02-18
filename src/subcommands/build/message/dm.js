const BaseSubcommandExecutor = require('../../../utils/BaseSubcommandExecutor');
const {EmbedBuilder} = require('discord.js');

module.exports = class SendDmMessageSubcommand extends BaseSubcommandExecutor {
  constructor(baseCommand, group, name) {
    super(baseCommand, group, name);
  }

  run(client, interaction) {
    let content_option = interaction.options.get('content')
    let user_option = interaction.options.get('user')
    let success_message = new EmbedBuilder()
      .setTitle(`Successfully Send Embed`)
      .setDescription(`${interaction.user.username}, Message sent to <@${interaction.options.get('user').value}>`)
      .setFooter({ text: client.user.username, iconURL: client.user.avatarURL() })
      .setColor("Green")
      .setTimestamp()
    try {
      client.users.fetch(user_option.value, false ).then((user) => {
        user.send({ content: content_option.value})
      })
    } catch(err) {
      console.log(err)
    } finally {
      interaction.reply({embeds: [success_message]})
    }
  }
};