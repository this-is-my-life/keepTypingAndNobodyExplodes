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
const stripColors = ['Red', 'Yellow', 'Blue', 'Green', 'White', 'Magenta', 'Cyan', 'Orange']
const stripHexColors = [0xff0000, 0xffff00, 0x0000ff, 0x00ff00, 0xffffff, 0xff00ff, 0x00ffff, 0xff7f00]

module.exports.run = (bot, input) => {
  console.log("\n\nButton Module Called By '" + input.author.username + '#' + input.author.discriminator + "'")
  let buttonText = buttonTexts[Math.floor(Math.random() * (buttonTexts.length - 1))].toString()
  console.log('buttonText is ' + buttonText)
  let buttonColor = buttonColors[Math.floor(Math.random() * (buttonColors.length - 1))].toString()
  console.log('buttonColor is ' + buttonColor)
  let stripColor = stripColors[Math.floor(Math.random() * (stripColors.length - 1))].toString()
  console.log('stripColor is ' + stripColor)
  let batterys = Math.floor(Math.random() * 3)
  console.log('batterys is ' + batterys)
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
    .setColor(stripHexColors[stripColors.indexOf(stripColor)])
    .setThumbnail('https://cdn.discordapp.com/attachments/530043751901429762/561714701386645508/ButtonComponent.png')
    .setDescription('How To Defuse Button? [Click Here!](http://www.bombmanual.com/manual/1/pdf/Bomb-Defusal-Manual_1.pdf)\n\nYou might think that a button telling you to press it is pretty straight forward.\nThat’s the kind of thinking that gets people exploded.')
    .addBlankField(false)
    .addField('베터리 갯수', batterys, true)
    .addField('버튼 색깔', buttonColor, true)
    .addField('버튼에 적인 글자', buttonText, true)
    .setTimestamp()
  for (let tempIndicatorCount = 0; tempIndicatorCount !== indicatorCount; tempIndicatorCount++) {
    buttonEmbed.addField('계기판' + (tempIndicatorCount + 1) + '번', indicator[tempIndicatorCount], true)
  }
  input.channel.send(buttonEmbed).then((em) => {
    input.channel.send("'stop!button <초>' 혹은 'stop!button now'를 치세요 | 30초 남음").then((q) => {
      const filter = (m) => m.author.id === input.author.id
      input.channel.awaitMessages(filter, {
        'max': 1,
        'time': 30000
      }).then((collected) => {
        let awnser
        if (!collected.first()) {
          let explodeByTimeout = new discord.RichEmbed()
            .setTitle('째깍째깍... 펑!... 너무 느린데요!')
            .setColor(0xff0000)
            .setImage('https://cdn.discordapp.com/attachments/530043751901429762/537966446626603049/BotProfile.jpg')
          q.delete()
          em.edit(explodeByTimeout)
        } else if (collected.first().content.split(' ')[0] === 'stop!button') {
          if (buttonColor === 'Blue' && buttonText === 'Abort') {
            if (stripColor === 'Blue') {
              awnser = '4'
            } else if (stripColor === 'White') {
              awnser = '1'
            } else if (stripColor === 'Yellow') {
              awnser = '5'
            } else {
              awnser = '1'
            }
          } else if (batterys > 1 && buttonText === 'Detonate') {
            awnser = 'now'
          } else if (buttonColor === 'White' && indicator.includes('CAR')) {
            if (stripColor === 'Blue') {
              awnser = '4'
            } else if (stripColor === 'White') {
              awnser = '1'
            } else if (stripColor === 'Yellow') {
              awnser = '5'
            } else {
              awnser = '1'
            }
          } else if (batterys > 2 && indicator.includes('FRK')) {
            awnser = 'now'
          } else if (buttonColor === 'Yellow') {
            if (stripColor === 'Blue') {
              awnser = '4'
            } else if (stripColor === 'White') {
              awnser = '1'
            } else if (stripColor === 'Yellow') {
              awnser = '5'
            } else {
              awnser = '1'
            }
          } else if (buttonColor === 'Red' && buttonText === 'Hold') {
            awnser = 'now'
          } else {
            if (stripColor === 'Blue') {
              awnser = '4'
            } else if (stripColor === 'White') {
              awnser = '1'
            } else if (stripColor === 'Yellow') {
              awnser = '5'
            } else {
              awnser = '1'
            }
          }
          if ((collected.first().content.split(' ')[1]).includes(awnser)) {
            let defused = new discord.RichEmbed()
              .setAuthor(input.author.username + ' is Defused Wires', input.author.avatarURL)
              .setTitle(`딸깍! 경쾌한 소리와 함깨, 당신은 ${input.guild.name}를 구했다...`)
              .setColor(0x0000ff)
              .setImage('http://www.bombmanual.com/manual/1/html/img/ktane-logo.png')
            q.delete()
            em.edit(defused)
          } else {
            let explodeByWrongAwnser = new discord.RichEmbed()
              .setTitle('퍼퍼퍼퍼ㅓ엉! 어이쿠 손이 미끄러졌네?')
              .setColor(0xff0000)
              .setImage('https://cdn.discordapp.com/attachments/530043751901429762/537966446626603049/BotProfile.jpg')
              .setDescription('정답은? ' + awnser + '! (분발합시다...)')
            q.delete()
            em.edit(explodeByWrongAwnser)
          }
        } else {
          let explodeByAnothorMessage = new discord.RichEmbed()
            .setTitle('안이... 글자 모릅니까? "stop!button <초>"치라고...')
            .setColor(0xff0000)
            .setImage('https://cdn.discordapp.com/attachments/530043751901429762/537966446626603049/BotProfile.jpg')
          q.delete()
          em.edit(explodeByAnothorMessage)
        }
      })
    })
  })
}

module.exports.alias = ['버튼', 'ㅂ']
