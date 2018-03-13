const Discord = require("discord.js");
const sql = require("sqlite");
const config = require("./config.json");

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

    let command = message.content.toLowerCase().split(" ")[0];
    command = command.slice(commandPrefix.length);

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
    }

});

client.login(config.token);


