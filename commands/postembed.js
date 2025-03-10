import {SlashCommandBuilder} from 'discord.js';
import {EmbedBuilder}  from 'discord.js'
import * as fs from 'fs';


export default
{
	data: new SlashCommandBuilder()
	.setName('postembed')
	.setDescription('Posts an embed!')
	.addStringOption(option =>
		option.setName('name')
		.setDescription('The embed\'s name')
		.setRequired(true)),

	async execute(interaction)
	{
		const name = interaction.options.getString('name');
		const embedData = JSON.parse(fs.readFileSync(`./data/embeds/${name}.json`));
		const embed = new EmbedBuilder()
		.setColor(parseInt(embedData.color))
		.setTitle(embedData.title)
		.setThumbnail(embedData.url)
		.setDescription(embedData.description);
		await interaction.reply({embeds: [embed]});
	},
}