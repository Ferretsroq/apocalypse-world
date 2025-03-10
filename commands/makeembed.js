import {SlashCommandBuilder} from 'discord.js';
import {EmbedBuilder}  from 'discord.js'
import * as fs from 'fs';

export default
{
	data: new SlashCommandBuilder()
	.setName('makeembed')
	.setDescription('Creates an embed!')
	.addStringOption(option =>
		option.setName('name')
		.setDescription('The embed\'s name')
		.setRequired(true))
	.addStringOption(option =>
		option.setName('color')
		.setDescription('The embed\'s color')
		.setRequired(true))
	.addStringOption(option =>
		option.setName('title')
		.setDescription('The embed\'s title')
		.setRequired(true))
	.addStringOption(option =>
		option.setName('description')
		.setDescription('The embed\'s description')
		.setRequired(true))
	.addStringOption(option =>
		option.setName('url')
		.setDescription('The embed\'s URL')
		.setRequired(false)),

	async execute(interaction)
	{
		const name = interaction.options.getString('name');
		const color = interaction.options.getString('color');
		const title = interaction.options.getString('title');
		const url = interaction.options.getString('url');
		const description = interaction.options.getString('description').replace('\\n', '\n');
		const obj = {name: name, color: color, title: title, url: url, description: description};
		fs.writeFileSync(`./data/embeds/${name}.json`, JSON.stringify(obj));
		const embedData = JSON.parse(fs.readFileSync(`./data/embeds/${name}.json`));
		const embed = new EmbedBuilder().setColor(parseInt(embedData.color)).setTitle(embedData.title).setThumbnail(embedData.url).setDescription(embedData.description);
		await interaction.reply({embeds: [embed]});
	},
}