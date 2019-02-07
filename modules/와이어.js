/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/*
  On the Subject of Wires:
  Wires are the lifeblood of electronics! Wait, no, electricity is the lifeblood.
  Wires are more like the arteries. The veins? No matter...
*/

const discord = require('discord.js')
const randomHexColor = require('random-hex-color')
const randomString = require('randomstring')

module.exports.run = (bot, input) => {
  console.log("\n\nWire Module Called By '" + input.author.username + '#' + input.author.discriminator + "'")
  let serialLastNumber = Math.floor(Math.random() * 8) + 1
  let serialNumber = randomString.generate({
    'length': 8,
    'charset': 'hex',
    'capitalization': 'uppercase'
  }) + serialLastNumber.toString()
  console.log("Bomb's Serial Number is " + serialNumber)
  // 0: RED, 1: WHITE, 2: YELLOW, 3: DARK, 4: BLUE
  let WireCount = Math.floor(Math.random() * 4) + 3 // "A wire module can have 3-6 wires on it"
  console.log('A wire module has ' + WireCount + ' wires on it')
  let numberWires = []
  for (let tempWireCount = 0; tempWireCount !== WireCount; tempWireCount++) {
    numberWires[tempWireCount] = Math.floor(Math.random() * 5)
    console.log('numberWire ' + tempWireCount + ' is ' + numberWires[tempWireCount] + '.')
  } let wires = []
  for (let tempWireCount = 0; tempWireCount !== WireCount; tempWireCount++) {
    if (numberWires[tempWireCount] === 0) {
      wires[tempWireCount] = 'Red'
    } else if (numberWires[tempWireCount] === 1) {
      wires[tempWireCount] = 'White'
    } else if (numberWires[tempWireCount] === 2) {
      wires[tempWireCount] = 'Yellow'
    } else if (numberWires[tempWireCount] === 3) {
      wires[tempWireCount] = 'Dark'
    } else if (numberWires[tempWireCount] === 4) {
      wires[tempWireCount] = 'Blue'
    }
    console.log('Wire ' + tempWireCount + ' is ' + wires[tempWireCount] + '.')
  }
  let wireEmbed = new discord.RichEmbed()
    .setAuthor(input.author.username + '는 폭탄(와이어 모듈)을 해체중입니다', input.author.avatarURL)
    .setTitle('Wire Generated')
    .setColor(randomHexColor())
    .setThumbnail('https://cdn.discordapp.com/attachments/530043751901429762/537827105371586560/WireComponent.png')
    .setDescription('음? 어케 하는건지 모르겠다구요? [여길 눌러요!](http://uminz.tistory.com/attachment/cfile26.uf@236F35485633028A031ABB.pdf)\n\nWire는 전기장치의 생명선이지!! 자..잠간.. 아니지...전기가 생면선이지..?\nWire는 정맥에 가깝지. 아니면 동맥? ..뷁! 알깨뭐야!')
    .addBlankField(false)
    .addField('폭탄의 시리얼번호', serialNumber, true)
  for (let tempWireCount = 0; tempWireCount !== WireCount; tempWireCount++) {
    wireEmbed.addField((tempWireCount + 1) + '번째 선은...', wires[tempWireCount], true)
  }
  wireEmbed.setFooter('... 뭘 짤라야하지?')
    .setTimestamp()
  input.channel.send(wireEmbed).then((emb) => {
    input.channel.send("'cut!wire <짜르고 싶은 선>'을 입력해 짜릅니다 | 30초 남음").then((q) => {
      const filter = (m) => m.author.id === input.author.id
      input.channel.awaitMessages(filter, {
        'max': 1,
        'time': 30000
      }).then((collected) => {
        if (!collected.first()) {
          let explodeByTimeout = new discord.RichEmbed()
            .setTitle('째깍째깍... 펑!... 너무 느린데요!')
            .setColor(0xff0000)
            .setImage('https://cdn.discordapp.com/attachments/530043751901429762/537966446626603049/BotProfile.jpg')
          q.delete()
          emb.edit(explodeByTimeout)
        } else if (collected.first().content.split(' ')[0] === 'cut!wire') {
          console.log('Wire has ' + wires.filter((wire) => wire === 'Red').length + ' Reds.')
          console.log('Wire has ' + wires.filter((wire) => wire === 'Blue').length + ' Blues.')
          console.log('Wire has ' + wires.filter((wire) => wire === 'Yellow').length + ' Yellows.')
          console.log('Wire has ' + wires.filter((wire) => wire === 'Dark').length + ' Darks.')
          console.log('Wire has ' + wires.filter((wire) => wire === 'White').length + ' Whites.')

          // Bomb Solve Process
          let cutWire

          if (wires.length === 3) {
            if (!wires.includes('Red')) {
              cutWire = 1
            } else if (wires[wires.length--] === 'White') {
              cutWire = 2
            } else if (wires.filter((wire) => { wire === 'Blue' }).length > 1) {
              cutWire = wires.lastIndexOf('Blue')
            } else {
              cutWire = 2
            }
          } else if (wires.length === 4) {
            if (wires.filter((wire) => { wire === 'Red' }).length > 1 && isOdd(serialLastNumber)) {
              cutWire = wires.lastIndexOf('Red')
            } else if (wires[wires.length--] === 'Yellow' && !wires.includes('Red')) {
              cutWire = 0
            } else if (wires.filter((wire) => { wire === 'Blue' }).length === 1) {
              cutWire = 0
            } else if (wires.filter((wire) => { wire === 'Yellow' }).length > 1) {
              cutWire = 3
            } else {
              cutWire = 1
            }
          } else if (wires.length === 5) {
            if (wires[wires.length--] === 'Dark' && isOdd(serialLastNumber)) {
              cutWire = 3
            } else if (wires.filter((wire) => { wire === 'Red' }).length === 1 && wires.filter((wire) => { wire === 'Yellow' }).length > 1) {
              cutWire = 0
            } else if (!wires.includes('Dark')) {
              cutWire = 1
            } else {
              cutWire = 0
            }
          } else if (wires.length === 6) {
            if (!wires.includes('Yellow') && isOdd(serialLastNumber)) {
              cutWire = 2
            } else if (wires.filter((wire) => { wire === 'Yellow' }) === 1 && wires.filter((wire) => { wire === 'Yellow' }).length > 1) {
              cutWire = 3
            } else if (!wires.includes('Red')) {
              cutWire = 5
            } else {
              cutWire = 3
            }
          }

          console.log('cutWire is ' + cutWire + '.')

          if ((collected.first().content.split(' ')[1]) === (cutWire + 1).toString()) {
            let defused = new discord.RichEmbed()
              .setAuthor(input.author.username + ' is Defused Wires', input.author.avatarURL)
              .setTitle(`딸깍! 경쾌한 소리와 함깨, 당신은 ${input.guild.name}를 구했다...`)
              .setColor(0x0000ff)
              .setImage('http://www.bombmanual.com/manual/1/html/img/ktane-logo.png')
            q.delete()
            emb.edit(defused)
          } else {
            let explodeByWrongAwnser = new discord.RichEmbed()
              .setTitle('퍼퍼퍼퍼ㅓ엉! 어이쿠 손이 미끄러졌네?')
              .setColor(0xff0000)
              .setImage('https://cdn.discordapp.com/attachments/530043751901429762/537966446626603049/BotProfile.jpg')
              .setDescription('정답은? ' + (cutWire + 1) + '! (분발합시다...)')
            q.delete()
            emb.edit(explodeByWrongAwnser)
          }
        } else {
          let explodeByAnothorMessage = new discord.RichEmbed()
            .setTitle('안이... 글자 모릅니까? "cut!wire <짜르고 싶은 선>"치라고...')
            .setColor(0xff0000)
            .setImage('https://cdn.discordapp.com/attachments/530043751901429762/537966446626603049/BotProfile.jpg')
          q.delete()
          emb.edit(explodeByAnothorMessage)
        }
      })
    })
  })
}

function isEven (x) { return (x % 2) === 0 }
function isOdd (x) { return !isEven(x) }

module.exports.alias = ['선들', 'ㅇ', '와이어']
