const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');
const BaseSlashSubcommand = require('../../utils/BaseSlashSubcommand');
const logTypes = require('../../data/logTypes.js')
const ColorsList = require('../../data/colors')
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
                },
                {
                    name: "add",
                    subcommands: ["project"]
                },
                {
                    name: "add",
                    subcommands: ["leave"]
                },
                {
                    name: "remove",
                    subcommands: ["leave"]
                },
                {
                    name: "remove",
                    subcommands: ["project"]
                },
                {
                    name: "remove",
                    subcommands: ["logs"]
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
                    /*
                    .addSubcommand((subcommand) => 
                    subcommand.setName('project').setDescription('add project channel')
                    .addStringOption(option => 
                        option.setName('title')
                        .setDescription('add a title for your project')
                        .setRequired(true)
                        )
                    .addStringOption(option => 
                        option.setName('descriptoin')
                        .setDescription('add description for project')
                        .setRequired(true)
                        )
                    .addStringOption(option =>
                        option.setName('color')
                        .setDescription('choose a color for project')
                        .setChoices(...ColorsList)
                        .setRequired(true)
                        )
                    .addStringOption(option => 
                        option.setName('url')
                        .setDescription('add your project url')
                        .setRequired(true)
                        )
                    )
                    */
                   .addSubcommand((subcommand) => 
                   subcommand.setName('project')
                   .setDescription('add project system to your server')
                   .addChannelOption(option =>
                    option.setName('channel')
                    .setDescription('add a channel for sending projects')
                    .addChannelTypes(ChannelType.GuildText)
                    .setRequired(true)
                    )
                    
                   )
                   .addSubcommand((subcommand) => 
                    subcommand.setName('leave')
                    .setDescription('add leave channel for your server')
                    .addChannelOption(option => 
                        option.setName('channel')
                        .setDescription('select the channel for leave')
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
                    .addSubcommand(subcommand => 
                        subcommand.setName("leave")
                        .setDescription("remove leave system from this server")
                        )
                    .addSubcommand(sub => 
                        sub.setName("project")
                        .setDescription("remove project system from this server")
                        )
                    .addSubcommand(sub => 
                        sub.setName("logs")
                        .setDescription("Remove Logs System from this Bot")
                        )
            )
            .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
            .setDMPermission(false)
    }
}