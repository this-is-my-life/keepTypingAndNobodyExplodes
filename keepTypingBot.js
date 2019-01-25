/*
  proj- Keep Typing and Nobody Explodes. The Discord Bot,

  We Don't Like Close-Source. Email: pmhstudio.pmh@gmail.com
*/

const discord = require("discord.js");
const fs = require("fs");

const botToken = process.env.Token;
const bot = new discord.Client();

bot.login(botToken);
bot.commands = new discord.Collection();

fs.readdir("./modules", (err, files) => {
  if (err) { console.log(err); }
  let moduleFile = files.filter((f) => f.split(".").pop() === "js");
  moduleFile.forEach((f, i) => {
    let props = require(`./modules/${f}`);
    let Commands = f.split('.');
    let Command = Commands[0];
    for (let aliasCount = props.alias.length-1; aliasCount >= 0; aliasCount--) {
      bot.commands.set(props.alias[aliasCount], props);
      console.log("Module Loaded: " + props.alias[aliasCount]);
    }
  });
});

bot.on("ready", () => {
  console.log(bot.user.username + " is Booted!");
  bot.user.setActivity("Dev | Type 'b!wire' To Defuse Wires");
});

bot.on("message", (input) => {
  if (input.author.id === bot.user.id) { return; }
  
  // Message Caculation.
  let msgArray = input.content.split(" ");
  let msgWant = msgArray[0].slice("b!".length);
  let msgRunFile = bot.commands.get(msgWant);
  if (!msgRunFile) { return; }
  msgRunFile.run(bot, input);
});
