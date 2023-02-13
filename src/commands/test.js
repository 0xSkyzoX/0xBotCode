const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('test slash commands'),
  async execute() {
    await interaction.reply({content: "Hello Test"})
  }
}