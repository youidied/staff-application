//config 
const clientId = '967733244982337566'
const staffids = ["id1", "id2", "id3", "id4"]//ايديات الستف
// config end 
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});
//packages starts 
const { Client, Intents } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('node:fs');

const wait = require('node:timers/promises').setTimeout;
//packages end


const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { SlashCommandBuilder } = require('@discordjs/builders');
// ready

client.on('ready', () => {
	console.log(`logged in as ${client.user.tag}`);
});
const commands = [];

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

process.on("unhandledRejection", error => {
  return console.error(error);
});
process.on("unhandledRejection", error => {
  return console.error(error);
});
process.on("unhandledRejection", error => {
  return console.error(error);
});
// ready end 

const commandlol = new SlashCommandBuilder()
        .setName("mute")
        .setDescription("Mute/timeout someone!")
        .addStringOption(option =>
            option.setName("duration")
                .setDescription("The duration of the timeout")
                .setRequired(true)
                
        ).addStringOption(option =>
            option.setName("tgd")
                .setDescription("ef of the timeout")
                .setRequired(true)
                
        )
      ;
			
        
         
        
	

commandlol.toJSON()

commands.push(commandlol)


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
  
	commands.push(command);
  
    
}

const rest = new REST({ version: '9' }).setToken(process.env.token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
	Routes.applicationCommands(clientId),
	{ body: commands },
);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();
// puplic

// Login to Discord with your client's token
client.login(process.env.token);