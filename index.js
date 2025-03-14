// Require the necessary discord.js classes

import {Client, Collection, GatewayIntentBits, InteractionType} from 'discord.js';
import * as fs from 'fs';
import config from './config.json' with {type: "json"};


// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const characterFiles = fs.readdirSync('./data/characters').filter(file => file.endsWith('.json'));
const characters = {};

for (const file of commandFiles)
{
	const command = await import(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.default.data.name, command.default);
}



// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
	//setInterval(function(){LoadCharacters(characters)}, 60000);
});

// Command listener
client.on('interactionCreate', async interaction =>
{
	if(interaction.type != InteractionType.ApplicationCommand) return;

	const command = client.commands.get(interaction.commandName);
	if(!command) return;
	try
	{
		await command.execute(interaction);
	}
	catch (error)
	{
		console.error(error);
		await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
	}
});

// Button listener
client.on('interactionCreate', async interaction =>
{
	if(!interaction.isButton()) return;
	
	
	else if(interaction.customId === 'fatechartSubmit')
	{
		await client.commands.get('fatechart').Roll(interaction);
	}
	
	
});

// Select Menu listener
client.on('interactionCreate', async interaction =>
{
	if(!interaction.isStringSelectMenu()) return;
	
	


})

// Modal submit listener
client.on('interactionCreate', async interaction =>
{
	if(interaction.type != InteractionType.ModalSubmit) return;

	
});
//Login to Discord with your client's token
client.login(config.token);


function LoadCharacters(characters)
{
	console.log(characters);
	for (const file of fs.readdirSync('./data/characters').filter(file => file.endsWith('.json')))
	{

	}

}


