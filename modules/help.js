/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/*
    Help Command of Ktane Bot.
*/

const discord = require('discord.js')
const randomHexColor = require('random-hex-color')

module.exports.run = (bot, input) => {
  console.log("\n\nHelp Module Called By '" + input.author.username + '#' + input.author.discriminator + "'")
  let helpEmbed = new discord.RichEmbed()
    .setAuthor(input.author.username + ' is Defusing Helps', input.author.avatarUrl)
    .setTitle('Helps Generated')
    .setColor(randomHexColor())
    .setThumbnail('https://cdn.discordapp.com/attachments/530043751901429762/543597858733948931/IndicatorWidget.png')
    .setDescription('How To Defuse Modules? [Click Here!](http://www.bombmanual.com/manual/1/pdf/Bomb-Defusal-Manual_1.pdf)\n\nWelcome to the dangerous and challenging world of bomb defusing.\n\nStudy this manual carefully; you are the expert. In these pages you will find\neverything you need to know to defuse even the most insidious of bombs.\nAnd remember — One small oversight and it could all be over!')
    .addBlankField(false)
    .addField('한국어로 폭탄해체', '```fix\nb!도움```')
    .addField('Defusing Helps', '```fix\nb!help```')
    .addField('Defusing Manual', '```fix\nb!manual```')
    .addField('Defusing Wires', '```fix\nb!wire```')
  input.channel.send(helpEmbed)
}

module.exports.alias = ['help', 'helps', '', 'h', '?']
