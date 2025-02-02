const Messages = require('discord-messages')
const Heists = require('../../functions/heist-dono')
const Grinds = require('../../functions/grind-dono')
const Special = require('../../functions/another-dono-thing-whyy')
const { MessageEmbed } = require('discord.js')
const {
  MessageButton,
  MessageActionRow
} = require('discord-buttons')
module.exports = {
    name: 'mydono',
    aliases: ['myd'],
    description: 'Check your donations',
    usage: 'myd',
   async execute(message, args) {
        let target = message.mentions.users.first() || message.author
        const mainMessage = await message.channel.send({
            embed: {
                description: "Fetching database..."
            }
        })
        let user = await Messages.fetch(target.id, message.guild.id, true);
        let user2 = await Heists.fetch(target.id, message.guild.id, true);
        let user3 = await Grinds.fetch(target.id, message.guild.id, true);
        let user4 = await Special.fetch(target.id, message.guild.id, true);
        if (!user && !user2 && !user3 && !user4) return mainMessage.edit({
            embed: {
                description: 'Either the target has not donated any amount OR your donations are yet to be counted!'
            }
        })
       let donationAmount = {
           amount: user.data ? user.data.messages : 0,
           position: user.position || 0
       }
       let heistAmount = {
           amount: user2.data ? user2.data.amount : 0,
           position: user2.position || 0
       }
       let grindAmount = {
           amount: user3.data ? user3.data.amount : 0,
           position: user3.position || 0
       }
       let specialAmount = {
           amount: user4.data ? user4.data.amount : 0,
           position: user4.position || 0
       }
       const totalAmount = grindAmount.amount + donationAmount.amount + heistAmount.amount + specialAmount.amount
       
       let buttonD = new MessageButton()
        .setLabel("Donations")
        .setID("myd-d")
        .setStyle("grey")

        let buttonH = new MessageButton()
        .setLabel("Heist Donations")
        .setID("myd-h")
        .setStyle("grey")

        let buttonG = new MessageButton()
        .setLabel("Grinder Donations")
        .setID("myd-g")
        .setStyle("grey")

        let buttonS = new MessageButton()
        .setLabel("FF Donations")
        .setID("myd-s")
        .setStyle("grey")

        let row = new MessageActionRow().addComponents([buttonD, buttonH, buttonG, buttonS])

        let dataForD = {
            embed: {
                title: "Donations ~ Regular",
                description: `Donations from <@${target.id}>\nTotal amount donated by the user: **${totalAmount.toLocaleString()}** coins.`,
                fields: [
                    {
                        name: "Donated: ",
                        value: `${donationAmount.amount.toLocaleString()} coins.`
                    },
                    {
                        name: 'Position: ',
                        value: `${donationAmount.position.toLocaleString()}.`
                    }
                ],
                thumbnail: {
                    url: 'https://cdn.discordapp.com/emojis/856224481457602561.png?v=1'
                },
                footer: {
                    text: 'Thank you for donating!'
                },
                timestamp: new Date()
            },
            components: [
                row
            ]
        }
        let dataForH = {
            embed: {
                title: "Donations ~ Heists",
                description: `Donations from <@${target.id}>\nTotal amount donated by the user: **${totalAmount.toLocaleString()}** coins.`,
                fields: [
                    {
                        name: "Donated: ",
                        value: `${heistAmount.amount.toLocaleString()} coins.`
                    },
                    {
                        name: 'Position: ',
                        value: `${heistAmount.position.toLocaleString()}.`
                    }
                ],
                thumbnail: {
                    url: 'https://cdn.discordapp.com/emojis/856224481457602561.png?v=1'
                },
                footer: {
                    text: 'Thank you for donating!'
                },
                timestamp: new Date()
            },
            components: [
                row
            ]
        }
        let dataForG = {
            embed: {
                title: "Donations ~ Grinders",
                description: `Donations from <@${target.id}>\nTotal amount donated by the user: **${totalAmount.toLocaleString()}** coins.`,
                fields: [
                    {
                        name: "Donated: ",
                        value: `${grindAmount.amount.toLocaleString()} coins.`
                    },
                    {
                        name: 'Position: ',
                        value: `${grindAmount.position.toLocaleString()}.`
                    }
                ],
                thumbnail: {
                    url: 'https://cdn.discordapp.com/emojis/856224481457602561.png?v=1'
                },
                footer: {
                    text: 'Thank you for donating!'
                },
                timestamp: new Date()
            },
            components: [
                row
            ]
        }
        let dataForS = {
            embed: {
                title: "Donations ~ FF Dono",
                description: `Donations from <@${target.id}>\nTotal amount donated by the user: **${totalAmount.toLocaleString()}** coins.`,
                fields: [
                    {
                        name: "Donated: ",
                        value: `${specialAmount.amount.toLocaleString()} coins.`
                    },
                    {
                        name: 'Position: ',
                        value: `${specialAmount.position.toLocaleString()}.`
                    }
                ],
                thumbnail: {
                    url: 'https://cdn.discordapp.com/emojis/856224481457602561.png?v=1'
                },
                footer: {
                    text: 'Thank you for donating!'
                },
                timestamp: new Date()
            },
            components: [
                row
            ]
        }
        

        mainMessage.delete()
        const newMessage = await message.channel.send("If your donations are not yet counted, please contact a moderator.", {
            embed: dataForD.embed,
            components: dataForD.components
        })

        const collector = newMessage.createButtonCollector(b => b, { time: 30000 })

        collector.on('collect', async (button) => {
            if(button.clicker.user.id !== message.author.id){
                button.reply.send("This is not for you.", true)
                return;
            }

            if(button.id === 'myd-d'){
                buttonD = buttonD.setStyle("green").setDisabled()

                buttonH = buttonH.setStyle("grey").setDisabled(false)
                buttonG = buttonG.setStyle("grey").setDisabled(false)
                buttonS = buttonS.setStyle("grey").setDisabled(false)

                row = new MessageActionRow().addComponents([buttonD, buttonH, buttonG, buttonS])
                dataForD.components = row
                newMessage.edit("If your donations are not yet counted, please contact a moderator.", {
                    embed: dataForD.embed,
                    components: dataForD.components
                })
                button.reply.defer()
            } else if (button.id === 'myd-h'){
                buttonH = buttonH.setStyle("green").setDisabled()

                buttonD = buttonD.setStyle("grey").setDisabled(false)
                buttonG = buttonG.setStyle("grey").setDisabled(false)
                buttonS = buttonS.setStyle("grey").setDisabled(false)

                row = new MessageActionRow().addComponents([buttonD, buttonH, buttonG, buttonS])
                dataForH.components = row

                newMessage.edit("If your donations are not yet counted, please contact a moderator.", {
                    embed: dataForH.embed,
                    components: dataForH.components
                })
                button.reply.defer()

            } else if (button.id === 'myd-g'){
                buttonG = buttonG.setStyle("green").setDisabled()

                buttonD = buttonD.setStyle("grey").setDisabled(false)
                buttonH = buttonH.setStyle("grey").setDisabled(false)
                buttonS = buttonS.setStyle("grey").setDisabled(false)

                row = new MessageActionRow().addComponents([buttonD, buttonH, buttonG, buttonS])
                dataForG.components = row

                newMessage.edit("If your donations are not yet counted, please contact a moderator.", {
                    embed: dataForG.embed,
                    components: dataForG.components
                })
                button.reply.defer()

            } else if (button.id === 'myd-s'){
                buttonS = buttonS.setStyle("green").setDisabled()

                buttonD = buttonD.setStyle("grey").setDisabled(false)
                buttonG = buttonG.setStyle("grey").setDisabled(false)
                buttonH = buttonH.setStyle("grey").setDisabled(false)

                row = new MessageActionRow().addComponents([buttonD, buttonH, buttonG, buttonS])
                dataForS.components = row

                newMessage.edit("If your donations are not yet counted, please contact a moderator.", {
                    embed: dataForS.embed,
                    components: dataForS.components
                })
                button.reply.defer()

            } else;
        })

        collector.on('end', () => {
                buttonS = buttonS.setStyle("grey").setDisabled()
                buttonD = buttonD.setStyle("grey").setDisabled()
                buttonG = buttonG.setStyle("grey").setDisabled()
                buttonH = buttonH.setStyle("grey").setDisabled()

                row = new MessageActionRow().addComponents([buttonD, buttonH, buttonG, buttonS])

                newMessage.edit("This message is now inactive.", {embed: dataForD.embed ,components: row})
        })
    }
}