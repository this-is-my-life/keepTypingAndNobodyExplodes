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
    .setDescription('음? 어케 하는건지 모르겠다구요? [여길 눌러요!](http://uminz.tistory.com/attachment/cfile26.uf@236F35485633028A031ABB.pdf)\n\n위험하고 도전적인 폭탄해제의 세계에 오신걸 환영합니다.\n\n이 메뉴얼을 열심히 공부하세요; 당신은 전문가 입니다. 이후의 페이지들에서 당신은\n이 폭탄의 가장 교활한 부분까지도 해체할 수 일는 법을 찾을 수 있을 것입니다.\n그리고 기억하세요 - 하나의 작은 실수가 모든것을 끝내버릴 겁니다!')
    .addBlankField(false)
    .addField('Help English ver.', '```fix\nb!help```')
    .addField('도움말을 해체하기', '```fix\nb!도움```')
    .addField('해체 매뉴얼을 해체하기', '```fix\nb!메뉴얼```')
    .addField('와이어 모듈 해체하기', '```fix\nb!와이어```')
  input.channel.send(helpEmbed)
}

module.exports.alias = ['도움', 'ㄷ', '사용법', '도움말', '커멘드북']
