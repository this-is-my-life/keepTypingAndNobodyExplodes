/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/*
  On the Subject of The Button
  You might think that a button telling you to press it is pretty straightforward.
  That’s the kind of thinking that gets people exploded.
*/

const discord = require('discord.js')
const indicators = ['SND', 'CLR', 'CAR', 'IND', 'FRQ', 'SIG', 'NSA', 'MSA', 'TRN', 'BOB', 'FRK']
const buttonTexts = ['Abort', 'Detonate', 'Hold', 'Need', 'MOM', 'Noto']
const buttonColors = ['Red', 'Yellow', 'Blue', 'Green', 'White']
const buttonHexColors = [0xff0000, 0xffff00, 0x0000ff, 0x00ff00, 0xffffff]
const stripColors = ['Red', 'Yellow', 'Blue', 'Green', 'White', 'Magenta', 'Cyan', 'Orange']

module.exports.run = (bot, input) => {
  console.log("\n\nButton Module Called By '" + input.author.username + '#' + input.author.discriminator + "'")
  let buttonText = buttonTexts[Math.floor(Math.random() * (buttonTexts.length - 1))].toString()
  console.log('buttonText is ' + buttonText)
  let buttonColor = buttonColors[Math.floor(Math.random() * (buttonColors.length - 1))].toString()
  console.log('buttonColor is ' + buttonColor)
  let stripColor = stripColors[Math.floor(Math.random() * (stripColors.length - 1))].toString()
  console.log('stripColor is ' + stripColor)
  let indicatorCount = Math.floor(Math.random() * 2) + 1
  console.log('A button module has ' + indicatorCount + ' indicator on it')
  let indicator = []
  for (let tempIndicatorCount = 0; tempIndicatorCount !== indicatorCount; tempIndicatorCount++) {
    indicator[tempIndicatorCount] = indicators[Math.floor(Math.random() * (indicators.length - 1))].toString()
    console.log('Indicator' + tempIndicatorCount + ' is ' + indicator[tempIndicatorCount])
  }
  let buttonEmbed = new discord.RichEmbed()
    .setAuthor(input.author.username + 'is Defusing Button', input.author.avatarURL)
    .setTitle('Button Generated')
    .setColor(buttonHexColors[buttonColors.indexOf(buttonColor)])
    .setThumbnail('https://cdn.discordapp.com/attachments/530043751901429762/561714701386645508/ButtonComponent.png')
    .setDescription('How To Defuse Button? [Click Here!](http://www.bombmanual.com/manual/1/pdf/Bomb-Defusal-Manual_1.pdf)\n\nYou might think that a button telling you to press it is pretty straight forward.\nThat’s the kind of thinking that gets people exploded.')
    .addBlankField(false)
    .addField('Button Color: ' + buttonColor)
  input.channel.send('테스트중입니다\n' + buttonEmbed)
}

module.exports.alias = ['button', 'b', 'buttons']
