import {SlashCommandBuilder} from '@discordjs/builders';
import {ComponentType, ActionRowBuilder, ButtonBuilder, ButtonStyle} from 'discord.js'
import {Character} from '../Character.js';
import * as fs from 'fs';

export default
{
	data: new SlashCommandBuilder()
	.setName('roll')
	.setDescription('Roll with your character!'),
	async execute(interaction)
	{
        const characterData = fs.readFileSync(`./data/characters/${interaction.user.id}.json`);
		const character = Character.fromJSON(JSON.parse(characterData));
		const buttonRow0 = new ActionRowBuilder();
		for(let stat of ['Cool', 'Hard', 'Hot', 'Sharp', 'Weird'])
		{
			buttonRow0.addComponents(new ButtonBuilder().setCustomId(`rollStat${stat}`).setLabel(`${stat}: ${character[stat.toLowerCase()]}`).setStyle(ButtonStyle.Primary));
		}

		const reply = await interaction.reply({content: 'Choose a stat to roll with!', components: [buttonRow0]});

		const filter = (i) => i.user.id === interaction.member.id;

		const collector = reply.createMessageComponentCollector({
			componentType: ComponentType.Button,
			filter
		});
		let stat = '';
		collector.on('collect', async (interaction) => {
				await this.Roll(interaction, character);
                return;
		});
	},
	async Roll(interaction, character)
	{
        const stat = interaction.customId.split('rollStat')[1].toLowerCase();
		const roll0 = Math.floor(Math.random()*6)+1;
		const roll1 = Math.floor(Math.random()*6)+1;
        const result = roll0 + roll1 + character[stat];
		await interaction.update({content: `${roll0}+${roll1}+${character[stat]} = **${result}**`, components: []});

		
	},
};
