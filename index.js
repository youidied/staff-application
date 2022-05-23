//config 
const clientId = ''//ايدي بوتك
const staffids = ["id1", "id2", "id3", "id4"]//ايديات الستف
const q1 = ""//السوال الاول
const q2 = ""//السوال الثاني
const q3 = ""//السوال الثالث
const q4 = ""//السوال الرابع
const q5 = ""//السوال الخامس
const logchnl = ""//ايدي روم اللوج
//
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
const { MessageEmbed } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const { MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Modal, TextInputComponent } = require('discord.js');
//packages end


const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// ready

client.on('ready', () => {
	console.log(`logged in as ${client.user.tag}`);
});
const commands = [];

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


// ready end 

const commandlol = new SlashCommandBuilder().setName("staff-application").setDescription("send staff application embed").addStringOption(option =>
            option.setName("set-title")
                .setDescription("to set the embed title")
                .setRequired(true)
                
).addStringOption(option =>
            option.setName("set-description")
                .setDescription("to set the embed description")
                .setRequired(true)
                
).addAttachmentOption(option => option.setName("embed-thumbnail").setDescription("set the embed thumbnail").setRequired(false));
      
			
        
         
        
	

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
client.on('interactionCreate', async interaction => {
	
	
  if (interaction.commandName === 'staff-application') {
    const title = interaction.options.getString('set-title');
    const des = interaction.options.getString('set-description');
    const attachment = interaction.options.getAttachment('embed-thumbnail');
    

    
		const Embed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`${title}`)
	.setDescription(`${des}`)
	.setTimestamp()
	.setFooter({ text: 'DEV by you i died#1530'});
    if (attachment) {
      Embed.setThumbnail(attachment.url)
    }
    const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('apply')
					.setLabel('Primary')
					.setStyle('PRIMARY'),
			);
    if (staffids.includes(interaction.member.id)) {
      await interaction.deferReply({ephemeral: true })
      await wait(2000)
      await interaction.editReply({content  : "DONE"})
      await interaction.followUp({embeds: [Embed], components: [row]});
  }else {
    await interaction.deferReply({ephemeral: true })
    await wait(2000)
    await interaction.editReply({content  : "NO PERM :)"})
  }
	}
});
client.on('interactionCreate', async interaction => {
	if (!interaction.isButton()) return;
	
  if (interaction.customId === 'apply') {
  const applymodal = new Modal()
			.setCustomId('apply')
			.setTitle(`${interaction.guild.name} staff application`);
		
		const q1input = new TextInputComponent()
			.setCustomId('q1')
      .setLabel(`${q1}`)
     	.setStyle('SHORT');
		const q2input = new TextInputComponent()
			.setCustomId('q2')
			.setLabel(`${q2}`)
			.setStyle('SHORT');
    const q3input = new TextInputComponent()
			.setCustomId('q3')
			.setLabel(`${q3}`)
			.setStyle('SHORT');
    const q4input = new TextInputComponent()
			.setCustomId('q4')
			.setLabel(`${q4}`)
			.setStyle('SHORT');
    const q5input = new TextInputComponent()
			.setCustomId('q5')
			.setLabel(`${q5}`)
			.setStyle('SHORT');
		const firActionRow = new MessageActionRow().addComponents(q1input);
		const secActionRow = new MessageActionRow().addComponents(q2input);
    const thirdActionRow = new MessageActionRow().addComponents(q3input);
    const fourActionRow = new MessageActionRow().addComponents(q4input);
    const fivActionRow = new MessageActionRow().addComponents(q5input);
		// Add inputs to the modal
		applymodal.addComponents(firActionRow, secActionRow, thirdActionRow, fourActionRow, fivActionRow);
		// Show the modal to the user
		await interaction.showModal(applymodal);



    
  }
});
//modal sumbit
client.on('interactionCreate', async interaction => {
	if (!interaction.isModalSubmit()) return;
	
  const q1val = interaction.fields.getTextInputValue('q1');
	const q2val = interaction.fields.getTextInputValue('q2');
  const q3val = interaction.fields.getTextInputValue('q3');
  const q4val = interaction.fields.getTextInputValue('q4');
  const q5val = interaction.fields.getTextInputValue('q5');
	
  await interaction.reply({content: "send succesfully", ephemeral: true})

  const logembed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`${interaction.guild.name} staff application`)
	.setDescription(`sumbited by ${interaction.user.tag}`)
	
	.addFields(
		{ name: `${q1}:`, value: `${q1val}`, inline: false },
		{ name: `${q2}:`, value: `${q2val}`, inline: false },
    { name: `${q3}:`, value: `${q3val}`, inline: false },
    { name: `${q4}:`, value: `${q4val}`, inline: false },
    { name: `${q5}:`, value: `${q5val}`, inline: false },
    
	)
	
	.setTimestamp()
	.setFooter({ text: 'dev by you i died#1530' });

  const channel = client.channels.cache.find(channel => channel.id === logchnl)
  
 await channel.send({embeds: [logembed]})
});
// Login to Discord with your client's token
client.login(process.env.token);