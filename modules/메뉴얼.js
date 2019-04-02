/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/*
    Manual Command of Ktane Bot.
*/

const discord = require('discord.js')
const randomHexColor = require('random-hex-color')

module.exports.run = (bot, input) => {
  console.log("\n\nManual Module Called By '" + input.author.username + '#' + input.author.discriminator + "'")
  let manualEmbed = new discord.RichEmbed()
    .setAuthor(input.author.username + ' is Defusing Manual', input.author.avatarUrl)
    .setTitle('Manual Generated')
    .setColor(randomHexColor())
    .setThumbnail('https://cdn.discordapp.com/attachments/530043751901429762/543597858733948931/IndicatorWidget.png')
    .addBlankField(false)
    .addField('Kr.', 'http://uminz.tistory.com/attachment/cfile26.uf@236F35485633028A031ABB.pdf')
    .addField('En.', 'http://www.bombmanual.com/manual/1/pdf/Bomb-Defusal-Manual_1.pdf')
  input.channel.send(manualEmbed)
}

module.exports.alias = ['m', 'manual', '메뉴얼']
