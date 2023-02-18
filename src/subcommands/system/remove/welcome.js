const BaseSubcommandExecutor = require('../../../utils/BaseSubcommandExecutor');
const WelcomeData = require('../../../data/mongoWelcomeChannel');

module.exports = class RemoveWelcomeSubcommand extends BaseSubcommandExecutor {
    constructor(baseCommand, group, name) {
        super(baseCommand, group, 'welcome')
    }
    
    async run(client, interaction) {
        let guildID = interaction.guild.guildID
        let dataGuild = await WelcomeData.find({guid_id: guildID})
        if (dataGuild[0]?.guid_id == guildID) {
            await WelcomeData.findOneAndDelete({guild_id: guildID})
        } else {
            return 
        }
    }
}