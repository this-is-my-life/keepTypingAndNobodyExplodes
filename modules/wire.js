/*
  On the Subject of Wires:
  Wires are the lifeblood of electronics! Wait, no, electricity is the lifeblood.
  Wires are more like the arteries. The veins? No matter...
*/

const discord = require("discord.js");
const randomHexColor = require("random-hex-color");
const randomString = require("randomstring");

module.exports.run = (bot, input) => {
  console.log("\n\nWire Module Called By '" + input.author.username + "#" + input.author.discriminator + "'");
  let serialLastNumber = Math.floor(Math.random() * 8) + 1;
  let serialNumber = randomString.generate({
    "length": 8,
    "charset": "hex",
    "capitalization": "uppercase"
  }) + serialLastNumber.toString();
  console.log("Bomb's Serial Number is " + serialNumber);
  // 0: RED, 1: WHITE, 2: YELLOW, 3: DARK, 4: BLUE
  let WireCount = Math.floor(Math.random() * 4) + 3; // "A wire module can have 3-6 wires on it"
  console.log("A wire module has " + WireCount + " wires on it");
  let numberWires = [];
  for (let tempWireCount = 0; tempWireCount !== WireCount; tempWireCount++) {
    numberWires[tempWireCount] = Math.floor(Math.random() * 5);
    console.log("numberWire " + tempWireCount + " is " + numberWires[tempWireCount] + ".");
  } let wires = [];
  for (let tempWireCount = 0; tempWireCount !== WireCount; tempWireCount++) {
    if (numberWires[tempWireCount] === 0) {
      wires[tempWireCount] = "Red";
    } else if (numberWires[tempWireCount] === 1) {
      wires[tempWireCount] = "White";
    } else if (numberWires[tempWireCount] === 2) {
      wires[tempWireCount] = "Yellow";
    } else if (numberWires[tempWireCount] === 3) {
      wires[tempWireCount] = "Dark";
    } else if (numberWires[tempWireCount] === 4) {
      wires[tempWireCount] = "Blue";
    }
    console.log("Wire " + tempWireCount + " is " + wires[tempWireCount] + ".")
  }
  let wireEmbed = new discord.RichEmbed()
  .setAuthor(input.author.username + " is Defusing Wires", input.author.avatarURL)
  .setTitle("Wire Generated")
  .setColor(randomHexColor())
  .setThumbnail("https://cdn.discordapp.com/attachments/530043751901429762/537827105371586560/WireComponent.png")
  .setDescription("Wires are the lifeblood of electronics! Wait, no, electricity is the lifeblood.\nWires are more like the arteries. The veins? No matter...")
  .addBlankField(false)
  .addField("Bomb's Serial is...", serialNumber, true)
  .addField("1st Wire is...", wires[0], true)
  .addField("2nd Wire is...", wires[1], true)
  .addField("3rd Wire is...", wires[2], true);
  for (let tempWireCount = 3; tempWireCount !== WireCount; tempWireCount++) {
    wireEmbed.addField((tempWireCount + 1) + "th Wire is...", wires[tempWireCount], true);
  }
  wireEmbed.setFooter("Which one shuld we cut?")
  .setTimestamp();
  input.channel.send(wireEmbed).then((emb) => {
    input.channel.send("Type 'cut!wire <number>' to cut it | 30 seconds left").then((q) => {
      const filter = (m) => m.author.id === input.author.id;
      input.channel.awaitMessages(filter, {
        "max": 1,
        "time": 30000
      }).then((collected) => {
        if (!collected.first()) {
          let explodeByTimeout = new discord.RichEmbed()
          .setTitle("Exploded By __You are lazy__")
          .setColor(0xff0000)
          .setImage("https://cdn.discordapp.com/attachments/530043751901429762/537966446626603049/BotProfile.jpg");
          q.delete();
          emb.edit(explodeByTimeout);
        } else if (collected.first().content.split(" ")[0] === "cut!wire") {
          console.log("Wire has " + wires.filter((wire) => wire === "Red").length + " Reds.");
          console.log("Wire has " + wires.filter((wire) => wire === "Blue").length + " Blues.");
          console.log("Wire has " + wires.filter((wire) => wire === "Yellow").length + " Yellows.");
          console.log("Wire has " + wires.filter((wire) => wire === "Dark").length + " Darks.");
          console.log("Wire has " + wires.filter((wire) => wire === "White").length + " Whites.");

          // Bomb Solve Process
          let cutWire;

          if (wires.length === 3) {
            if (!wires.includes("Red")) {
              cutWire = 1;
            } else if (wires[wires.length--] === "White") {
              cutWire = 2;
            } else if (wires.filter((wire) => { wire === "Blue" }).length > 1) {
              cutWire = wires.lastIndexOf("Blue");
            } else {
              cutWire = 2;
            }
          } else if (wires.length === 4) {
            if (wires.filter((wire) => { wire === "Red" }).length > 1 && isOdd(serialLastNumber)) {
              cutWire = wires.lastIndexOf("Red");
            } else if (wires[wires.length--] === "Yellow" && !wires.includes("Red")) {
              cutWire = 0;
            } else if (wires.filter((wire) => { wire === "Blue" }).length === 1) {
              cutwire = 0;
            } else if (wires.filter((wire) => { wire === "Yellow" }).length > 1) {
              cutWire = 3;
            } else {
              cutWire = 1;
            }
          } else if (wires.length === 5) {
            if (wires[wires.length--] === "Dark" && isOdd(serialLastNumber)) {
              cutWire = 3;
            } else if (wires.filter((wire) => { wire === "Red" }).length === 1 && wires.filter((wire) => { wire === "Yellow" }).length > 1) {
              cutWire = 0;
            } else if (!wires.includes("Dark")) {
              cutWire = 1;
            } else {
              cutWire = 0;
            }
          } else if (wires.length === 6) {
            if (!wires.includes("Yellow") && isOdd(serialLastNumber)) {
              cutWire = 2;
            } else if (wires.filter((wire) => { wire === "Yellow" }) === 1 && wires.filter((wire) => { wire === "Yellow" }).length > 1) {
              cutWire = 3;
            } else if (!wires.includes("Red")) {
              cutWire = 5;
            } else {
              cutWire = 3;
            }
          }
          
          console.log("cutWire is " + cutWire + ".");

          if ((collected.first().content.split(" ")[1]) === (cutWire + 1).toString()) {
            let defused = new discord.RichEmbed()
            .setAuthor(input.author.username + " is Defused Wires", input.author.avatarURL)
            .setTitle("You are Intelligent!")
            .setColor(0x0000ff)
            .setImage("http://www.bombmanual.com/manual/1/html/img/ktane-logo.png");
            q.delete();
            emb.edit(defused);
          } else {
            let explodeByWrongAwnser = new discord.RichEmbed()
            .setTitle("Exploded By Your Mistake!")
            .setColor(0xff0000)
            .setImage("https://cdn.discordapp.com/attachments/530043751901429762/537966446626603049/BotProfile.jpg")
            .setDescription("The correct Awnser is " + (cutWire + 1) + "!");
            q.delete();
            emb.edit(explodeByWrongAwnser);
          }

        } else {
          let explodeByAnothorMessage = new discord.RichEmbed()
          .setTitle("Exploded By Your Typing Mistake")
          .setColor(0xff0000)
          .setImage("https://cdn.discordapp.com/attachments/530043751901429762/537966446626603049/BotProfile.jpg");
          q.delete();
          emb.edit(explodeByAnothorMessage);
        }
      });
    });
  });

};

function isEven(x) { return (x % 2) === 0; }
function isOdd(x) { return !isEven(x); }

module.exports.alias = ["wire", "w", "와이어", "wires", "선"];
