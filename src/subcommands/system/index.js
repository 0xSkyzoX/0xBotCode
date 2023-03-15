const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');
const BaseSlashSubcommand = require('../../utils/BaseSlashSubcommand');
const logTypes = require('../../data/logTypes.js')

module.exports = class SystemSubcommand extends BaseSlashSubcommand {
    constructor() {
        super(
            'system',
            [
                {
                    name: "add",
                    subcommands: ['welcome']
                },
                {
                    name: "remove",
                    subcommands: ["welcome"]
                }, {
                    name: "add",
                    subcommands: ["logs"]
                },
                {
                    name: "add",
                    subcommands: ["report"]
                },
                {
                    name: "remove",
                    subcommands: ["report"]
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
                                .setDescription("add a welcome system to your server")
                                .addChannelOption(option =>
                                    option.setName("channel").setDescription("select the welcome system")
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
                    .addSubcommand((subcommand) =>
                        subcommand.setName('report')
                            .setDescription('add report channel to your channel')
                            .addChannelOption((option) =>
                                option.setName('channel')
                                    .setDescription('add channel for reports')
                                    .setRequired(true)
                            )

                    )
                    .addSubcommand((subcommand) =>
                        subcommand.setName("logs").setDescription('add a log channel')
                            .addChannelOption(option =>
                                option.setName("channel")
                                    .setDescription('select a channel for the logs')
                                    .addChannelTypes(ChannelType.GuildText)
                                    .setRequired(true)
                            )
                    )
            )
            .addSubcommandGroup(group =>
                group.setName("remove").setDescription('remove a system command')
                    .addSubcommand(subcommand =>
                        subcommand.setName('welcome').setDescription('remove a welcome system from your server')
                    )
                    .addSubcommand(subcommand => 
                        subcommand.setName('report')
                        .setDescription('remove the report channel from CodeX!')
                        )
            )

            .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
            .setDMPermission(false)
    }
}