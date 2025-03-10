import {SlashCommandBuilder, AttachmentBuilder} from 'discord.js';
import * as fs from 'fs';
import {PDFDocument} from 'pdf-lib';
import * as pdfimg from 'pdf-to-img';
import fetch from 'node-fetch';
import { Character } from '../Character.js';

export default
{
	data: new SlashCommandBuilder()
		.setName('char')
		.setDescription('Look at your character sheet!'),
	async execute(interaction) {
        let file_data = fs.readFileSync(`./data/characters/${interaction.user.id}.pdf`);

        const document = await pdfimg.pdf(file_data);
        const page0buffer = await document.getPage(1);
        const page1buffer = await document.getPage(2);
        const page0Attachment = new AttachmentBuilder(Buffer.from(page0buffer));
        const page1Attachment = new AttachmentBuilder(Buffer.from(page1buffer));
		await interaction.reply({files: [page0Attachment, page1Attachment]});

	},
};