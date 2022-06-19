const { Client, Collection, MessageEmbed } = require('discord.js');
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const client = new Client({ intents: 899 });
const fs = require("fs");

const token = "OTg0ODU0MjEzMjExMzUzMTg4.GO5TO-.mv3nHraagTOB-nFr08_1TMCKRbH6FH16SrgOj8";

global.client = client;
client.commands = (global.commands = []);
//#region KOMUTLAR LOAD
fs.readdir("./komutlar/", (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./komutlar/${file}`);
    client.commands.push({
      name: props.name.toLowerCase(),
      description: props.description,
      options: props.options,
      type: 1
    })
    console.log(`👌 Slash Komut Yüklendi: ${props.name}`);
  });
});
//#endregion
//#region EVENTS LOAD
fs.readdir("./events/", (_err, files) => {
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`👌 Event yüklendi: ${eventName}`);
    client.on(eventName, (...args) => {
      event(client, ...args);
    });
  });
});
//#endregion
//#region KOMUTLAR SET

const radyo = require("./yayın.js");

client.on("ready",async () => {
  
  const rest = new REST({ version: "10" }).setToken(token);
  try {
    await rest.put(Routes.applicationCommands(client.user.id), {
      body: commands,
    })
  } catch (error) {
    console.error(error);
  }
    console.log(`${client.user.tag} is online!`);
    client.user.setActivity({ name: "7/24 Radyo! | /yardım", type: "LISTENING" });
    radyo(client);
    setInterval(radyo, Math.max(3600000))
})
client.login(token)