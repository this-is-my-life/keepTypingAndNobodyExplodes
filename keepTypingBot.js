/* eslint-disable no-console */
/*
  proj- Keep Typing and Nobody Explodes. The Discord Bot,

  We Don't Like Close-Source. Email: pmhstudio.pmh@gmail.com
*/

const discord = require('discord.js')
const fs = require('fs')

const botToken = process.env.Token
const bot = new discord.Client()

bot.commands = new discord.Collection()

fs.readdir('./modules', (err, files) => {
  if (err) { console.log(err) }
  let moduleFile = files.filter((f) => f.split('.').pop() === 'js')
  moduleFile.forEach((f) => {
    let props = require(`./modules/${f}`)
    for (let aliasCount = props.alias.length - 1; aliasCount >= 0; aliasCount--) {
      bot.commands.set(props.alias[aliasCount], props)
      console.log('Module Loaded: ' + props.alias[aliasCount])
    }
  })
})

if (!process.env.CI) {
  bot.login(botToken)

  bot.on('ready', () => {
    console.log(bot.user.username + ' is Booted!')
    bot.user.setActivity("Dev | Type 'b!wire' To Defuse Wires")
  })

  bot.on('message', (input) => {
    if (input.author.id === bot.user.id) { return }

    // Message Caculation.
    let msgArray = input.content.split('!')
    if (msgArray[0] === 'b' && msgArray[1]) {
      let msgWant = msgArray[1]
      let msgRunFile = bot.commands.get(msgWant)
      if (!msgRunFile) { return }
      msgRunFile.run(bot, input)
    }
  })
} else {
  console.log('ktane Circle CI Test Complete')
}
