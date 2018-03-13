const Discord = require("discord.js");
const sql = require("sqlite");
const config = require("./config.json");
const request = require("request");
const xml2js = require("xml2js").parseString;

const client  = new Discord.Client();
const BOT_VERSION = "1.0.0";

sql.open("./score.sqlite");



const commandPrefix = config.prefix;

// This is a function which will be called when the bot is ready.
client.on("ready", () => {
    console.log("JERJBOT READY! Version " + BOT_VERSION);
});

client.on("message", (message) => {


    // It will do nothing when the message doesnt start with the prefix
    if(!message.content.startsWith(commandPrefix)) return;
    if (message.author.bot) return; // Ignore bots.
    if (message.channel.type === "dm") return; // Ignore DM channels.

    let args = message.content.slice(commandPrefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();

    switch(command) {
      case "help":
        let embed = new Discord.RichEmbed()
            .setTitle("Bot commands:")
            .addField("!help", "yup")
            .addField("!hello", "Sends a friendly message!")
            .addField("!die", "uh oh")
            .addField("!rollins", "Henry Lawrence Garfield")
            .setFooter("thanks good luck out there")
            .setColor("0xff0000");
        // Send the embed with message.channel.send()
        message.channel.send({embed: embed});
        break;
      case "hello":
        message.channel.send("Hello " + message.author + "! Nice to meet you. :eggplant: :rage: ");
        break;
      case "rollins":
        message.channel.send("https://youtu.be/RBlXN35oS9E");
        break;
      case "die":
        message.channel.send("You roll a die. It lands on "+Math.ceil(Math.random() * 6)+".");
        break;
      case "define":
        let word = args[0];
        let url = "https://www.dictionaryapi.com/api/v1/references/collegiate/xml/"+word+"?key="+config.dictionarykey;
        request.get(url, function(err,res,body) {
          xml = body;
          xml2js(xml, function(error, result) {
            if (!'entry_list' in result) return;
            if (!('entry' in result.entry_list)) {
              console.log('no entry');
              return; 
            }
            if ( 'suggestion' in result.entry_list) {
              console.log('suggestion');
              return;
            }
            let entry = result.entry_list.entry[0];
            let part = entry.fl[0];
            let def = entry.def[0].dt[0];
            if (typeof(def) === 'object') {
              if ('_' in def) text = String(def['_']).split(':');
              else {
                console.log(def);
                return;
              }
            } else {
              let text = String(def).split(":");
            }
            let embed = new Discord.RichEmbed();

            console.log(entry.def);
            console.log(entry.def[0]);
    
                embed.setTitle(word)
                .addField("---",part)
                .setColor("0x123456");
            let count = 0;
            for (var i=0;i<text.length;i++) {
              if (!(/^\s*$/.test(text[i]))) continue;
              count++;
              console.log(count+": "+text[i]);
              embed.addField(count+":",text[i]);
            } 
            message.channel.send({embed:embed}) 


          });
        });
    }
    
    

});

client.login(config.token);


