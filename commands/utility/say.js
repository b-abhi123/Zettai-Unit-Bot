const Discord = require("discord.js");
const { DiscordMenus, ButtonBuilder, MenuBuilder } = require('discord-menus')

module.exports.run = async (bot, msg, args, pog) => {
  const fields = [
    "Author",
    "Author Image",
    "Title",
    "Side Image",
    "Image",
    "Color",
    "Footer",
    "Footer Image"
  ]
  const res = []
  if(!msg.member.roles.cache.some(role => role.name === 'The Troupe')) return msg.lineReply(`:warning: You must have the "Troupe" role to run this command!`)
  if(msg.content.length >= 500) return msg.lineReply(`:warning: Message must be under **500** characters!`)
  if(msg.content.includes("http://")) return msg.lineReply(`:warning: I can't speak links!`)
  if(msg.content.includes("https://")) return msg.lineReply(`:warning: I can't speak links!`)
  if(msg.content === "") return msg.lineReply("I cannot send empty messages, you dumb shit!")
  let i = 0
  const collector = msg.channel.createMessageCollector((message) => message.author.id == msg.author.id)
  msg.channel.send(`Please specify the **${fields[0]}**, say "Nothing" if you want to leave this field empty.`)
  collector.on('collector')
  collector.on('collect', async(m) => {
    if(fields.length == i) return collector.stop('MAX')
    const answer = m.content
    if(answer === 'Nothing') return i++ && msg.channel.send('Field discarded.')
    res.push({ question: fields[i], answer})
    i++
    if(fields.length == i) {
      collector.stop('MAX')
    } else {
      msg.channel.send(`Please specify the **${fields[0]}**, say "Nothing" if you want to leave this field empty.`)
    }
  })
  collector.on('end', async(collected,reason) => {
    if(reason === 'MAX'){
      const newEmbed = new Discord.MessageEmbed()
      .setDescription('This is still under development!')
      msg.channel.send(newEmbed)
    }
  })
}

module.exports.help = {
  name:"say",
  directory:"utility"
}