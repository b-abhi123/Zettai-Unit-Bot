const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`I am listening at http://localhost:${port}`));
////////////////////////////////////////
const topgg = require('@top-gg/sdk')
const Discord = require("discord.js");
const fs = require("fs");
require('discord-reply')
const bot = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const { promisify } = require('util');

const menu = require("discord-menus")
const mongoose = require("mongoose")

const pog = "z!"


bot.commands = new Discord.Collection();

bot.isReady = true
const { DiscordMenus, ButtonBuilder, MenuBuilder } = require('discord-menus')

const MenusManager = new DiscordMenus(bot);

MenusManager.on('MENU_CLICKED', (menu) => {
    console.log('yey')
})

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        
        bot.commands.set(command.help.name, command);
    }
}


bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.cache.size} servers!`);
  setInterval(() => {
    bot.user.setActivity(`with ${bot.guilds.cache.get('814511122945671188').memberCount} people!`, {
    type: "STREAMING",
    url: "https://twitch.tv/mrbeast6000"
    });
  }, 5000)
  
});

bot.on("guildMemberAdd", (member) => {
   const welcomeEmb = new Discord.MessageEmbed()
  .setTitle(`New member onboard! :airplane:`)
  .setColor(`#32fa46`)
  .setThumbnail('https://i.imgur.com/nJuAbgw.gif')
  .setDescription(`Welcome to the world of Zettai Unit, **${member.user.tag}**!\n<a:Zu_cute_dance:878446589755142185> Get some roles at <#840132697719308309> and read <#840205638536658995>!\n<a:Zu_cute_dance:878446589755142185> **And, surely don't forget to have fun!!**`)
  .setFooter(`Sent from Zettai Unit!`)
  .setTimestamp()
  bot.channels.cache.get('814512424383807578').send(welcomeEmb).catch((e) => {console.log(e)})
})

//Command Manager
bot.on("message", async msg => {
  if(msg.author.bot) return;
  if(msg.channel.type === "dm") return;
  if(msg.content.includes(bot.user.id)) return   msg.channel.send(`:sunglasses: Coolest bot made for this server [z!help]`)

  let prefix = process.env.prefix;
  let messageArray = msg.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  
  
  //Check for prefix
  if(!cmd.startsWith(prefix)) return;
  if(!msg.guild.me.permissionsIn(msg.channel).has("EMBED_LINKS")) return msg.lineReply('I cannot send EMBEDS in this channel. Please fix my permissions since most of my messages turn out as embeds!')
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,msg,args,pog);

});
//Token need in token.json
bot.login(process.env.token);
