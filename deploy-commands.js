import {REST, Routes} from 'discord.js';
import config from './config.json' with {type: "json"};
import * as fs from 'fs';

const clientId = config.clientId;
const guildIds = config.guildIds;
const token = config.token;

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles)
{
	const command = await import(`./commands/${file}`);
	commands.push(command.default.data.toJSON());
}
const rest = new REST().setToken(token);

(async () => 
{
	try
	{
		for(const guildId of guildIds)
		{
			await rest.put(Routes.applicationGuildCommands(clientId, guildId),{body: commands},);
		}
		console.log('Successfully registered application commands.');
	}
	catch (error)
	{
		console.error(error);
	}
})();