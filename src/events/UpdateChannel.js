const { EmbedBuilder } = require('@discordjs/builders')
const LogsDatabase = require('../data/logsMongoDatabase')

module.exports = (client) => {
    client.on('channelCreate',  async (channel) => {
        try {
            const LogData = await LogsDatabase.find({guild_id: channel.guild.id})
            if (channel.guild.id === LogData[0]?.guild_id) {  
                    client.channels.cache.get(LogData[0].channel_id).send('This channel have been Created ' + `<#${channel.id}>`)
            } else return;
            
        } catch (err) { console.log(err) }

    })
    client.on('channelDelete', async (channel) => {
        try {
            const LogData = await LogsDatabase.find({guild_id: channel.guild.id})
            if (channel.guild.id === LogData[0]?.guild_id) {
                    client.channels.cache.get(LogData[0]?.channel_id).send('This channel Deleted: '+`${channel.name}` )

            }
        } catch(err) {
            console.log(err)
        }
    })
    client.on('channelUpdate', async (oldChannel, newChannel) => {
        try {
            console.log(oldChannel)
            const LogData = await LogsDatabase.find({guild_id: oldChannel.guild.id})
            const log_message = new EmbedBuilder()
            .setTitle('Channel Update')
            .setDescription(`
            \`\`\`Name: ${oldChannel.name}\`\`\`
            `)
            if (oldChannel.guild.id === LogData[0]?.guild_id) {
                client.channels.cache.get(LogData[0]?.channel_id).send({embeds: [log_message]})
            }
        } catch(err) {
            console.log(err)
        }
    })

}