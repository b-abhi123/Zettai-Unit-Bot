const Discord = require("discord.js");
const { DiscordMenus, ButtonBuilder, MenuBuilder } = require('discord-menus')

module.exports.run = async (bot, msg, args, pog) => {
  if(msg.channel.id !== "894564695963496448") return msg.channel.send(`Please go into <#894564695963496448> to apply as staff!`)
  const questions = [
    "First of all, do you have an instagram account? If you do, please reply with the account's username, if you don't, type 'No'! [1/5]",
    "On a scale of 1 to 10, how much can you be active on the server? (With 1 being the lowest, and 10 being the maximum)\nIf you can, please specify the approximate amount of hours you can do so. [2/5]",
    "Please attach a link to one of your edits. [3/5]",
    "How often can you represent our unit for your edits? [4/5]",
    "Please explain why you want to be a member in our unit, a long answer is recommendeded for this final question! [5/5]"
  ]
  msg.channel.send(`Please check your DMs for further instructions.`)
  const dmChannel = await msg.author.send(`Hey there, thanks for applying into our staff application system! Please answer all the questions with honesty, that will ensure maximum placement!`)
  const collector = dmChannel.channel.createMessageCollector((message) => message.author.id == msg.author.id)
  let i = 0
  const res = []
  dmChannel.channel.send(questions[0])
  collector.on('collect', async(m) => {
    if(questions.length == i) return collector.stop('MAX') && dmChannel.channel.send(`Thanks for completing the application! You will be notified if you have passed! :blush:`)
    const answer = m.content
    res.push({ question: questions[i], answer })
    i++;
    if(questions.length == i) return collector.stop('MAX') && dmChannel.channel.send(`Thanks for completing the application! You will be notified if you have passed! :blush:`)
    else {
      dmChannel.channel.send(questions[i])
    }
  })
  collector.on('end', async(collected, reason) => {
    if(reason == "MAX") {
      dmChannel.channel.send(`Thanks for completing the application! We hope you pass, and you will be notiifed if your result has been taken into consideration! :blush:`)
      const data = bot.channels.cache.find(ch => ch.name.toLowerCase() == "apps-results" && ch.type == "text");
      const desc = res.map(d => `**${d.question}**\n~${d.answer}`).join("\n")
      const embed = new Discord.MessageEmbed()
      .setTitle(`:warning: **ALERT!** :warning:\n${msg.author.tag} has submitted an application!`)
      .setDescription(desc)
      .setColor('#14c234')
      data.send(`<@&942409467411189791>`)
      data.send(embed)
    }
  })
}

module.exports.help = {
  name:"apply",
  directory:"utility"
}