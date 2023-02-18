const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');
const BaseSlashSubcommand = require('../../utils/BaseSlashSubcommand');
const colors = require('../../data/colors') 

module.exports = class BuildSubcommand extends BaseSlashSubcommand {
  constructor() {
    super(
      'build',
      [
        {
            name: 'embed',
            subcommands: ['channel']
          },
          {
            name: 'message',
            subcommands: ['channel']
          },
          {
            name: 'embed',
            subcommands: ['dm'],
          },
          {
            name: 'message',
            subcommands: ['dm']
          }
      ],
      []
    );
  }

  getSlashCommandJSON() {
    return new SlashCommandBuilder()
      .setName('build')
      .setDescription('Create a Message') 
      .addSubcommandGroup(group => 
        group.setName('embed').setDescription("Build a Message Embed")
        .addSubcommand((subcommand) =>
        subcommand.setName('channel').setDescription('Channel Message Embed')
        .addChannelOption(option => option.setName("channel").setDescription("Select a channel").setRequired(true).addChannelTypes(ChannelType.GuildText))
        .addStringOption(option => option.setName("title").setDescription("Add an embed title").setRequired(true))
        .addStringOption(option => option.setName('content').setDescription("Write the message embed content").setRequired(true))
        .addStringOption(option => option.setName("color").setDescription("Select a embed color").setRequired(true).addChoices(...colors))
      )
      .addSubcommand((subcommand) => 
      subcommand.setName("dm").setDescription('Dm Message Embed')
      .addUserOption(option => option.setName("user").setDescription("Select a user").setRequired(true))
      .addStringOption(option => option.setName('title').setDescription('Add an embed title').setRequired(true))
      .addStringOption(option => option.setName("content").setDescription('Write the message embed content').setRequired(true))
      .addStringOption(option => option.setName("color").setDescription("Select a embed color").setRequired(true).addChoices(...colors))
      ))
      .addSubcommandGroup(group => 
        group.setName('message')
        .setDescription("Create a Message")
        .addSubcommand(subcommand => 
          subcommand.setName('channel').setDescription('Channel Message')
          .addChannelOption(option => option.setName('channel').setDescription('Select a channel').setRequired(true).addChannelTypes(ChannelType.GuildText))
          .addStringOption(option => option.setName('content').setDescription('Write the message content').setRequired(true))
        )
        .addSubcommand(subcommand => 
          subcommand.setName('dm').setDescription('Create a DM Message')
          .addUserOption(option => 
            option.setName('user').setDescription("Select a user").setRequired(true))
            .addStringOption(option => option.setName("content").setDescription('DM Message Content').setRequired(true))
          )
          
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false)
  }
};