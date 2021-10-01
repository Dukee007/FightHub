const ms = require('ms')

module.exports = {
    name: 'gstart',
    alises: ['g', 'giveaway', 'gaw'],
    description: 'start giveaways (testing only)',
    async execute(message, args, client){
        if(message.author.id !== '598918643727990784') return;

        //fh gstart 10s 1w prize

        let time = args[0]
        if(!time) return message.channel.send("You must specify time.")
        if(isNaN(ms(time))) return message.channel.send("Please specify valid time.")
        if(ms(time) > 600000) return message.channel.send("I can only host giveaways that end in less than 10 minutes as of now.")
        args.shift()
        time = ms(time)
        let winners = args[0]
        if(!winners) return message.channel.send("You must specify the number of winners.")
        winners = parseInt(winners)

        args.shift()
        let prize = args.join(" ")
        if(!prize) prize = 'nothing'

        const sussy = await message.channel.send({embed: {
            title: prize,
            description: `React with 🎉 to enter.\nTime: **${ms(time, { long: true })}**\nHosted by: ${message.member}`
        }})
        sussy.react('🎉')

        await sleep(time)
        const winner = sussy.reactions.cache.random()
        console.log(winner)
        sussy.edit({ embed: {
            title: `Giveaway for ${prize} has ended!`,
            description: `Winner: <@${winner.id}>`
        }})
        message.channel.send(`The winner for **${prize}** is <@${winner.id}>`, {embed: {
            description: `[Jump](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`
        }})
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}