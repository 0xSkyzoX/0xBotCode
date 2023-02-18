const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');
const BaseSlashSubcommand = require('../../utils/BaseSlashSubcommand');

module.exports = class SystemSubcommand extends BaseSlashSubcommand {
    constructor() {
        super(
            'build',
            [
                {
                name: "add",
                subcommands: ['welcome']
            },
            {
                name: "remove",
                subcommand: ["welcome"]
            }
            ],
            []
            
        )
    }

    getSlashCommandJSON() {
        return new SlashCommandBuilder()
        .setName("system")
        .setDescription("System Commands")
        .addSubcommandGroup(group => 
            group.setName("add").setDescription("add a system command")
            .addSubcommand(
                (subcommand) => 
                subcommand.setName('welcome')
                .setDescription("add a welcome channel to your server")
                .addChannelOption(option => 
                    option.setName("channel").setDescription("select the welcome channel")
                    .setRequired(true).addChannelTypes(ChannelType.GuildText)
                    )
                .addChannelOption(option => 
                    option.setName("read")
                    .setDescription("select a channel you want the member to read (rules, ...)").setRequired(true)
                    .addChannelTypes(ChannelType.GuildText)
                    )
                .addRoleOption(option => 
                    option.setName("role")
                    .setDescription("Add a default role to any new member")
                    .setRequired(false)
                    )
            )
            )
        .addSubcommandGroup(group => 
            group.setName("remove").setDescription('remove a system command')
            .addSubcommand(subcommand => 
                subcommand.setName('welcome').setDescription('remove a welcome channel from your server')
                )
            )
            .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
            .setDMPermission(false)
    }
}