import {SlashCommandBuilder, AttachmentBuilder} from 'discord.js';
import * as fs from 'fs';
import {PDFDocument} from 'pdf-lib';
import * as pdfimg from 'pdf-to-img';
import fetch from 'node-fetch';
import { Character } from '../Character.js';

export default
{
	data: new SlashCommandBuilder()
		.setName('uploadcharacter')
		.setDescription('Upload your character pdf!')
        .addAttachmentOption(option => 
            option.setName('pdf')
            .setDescription('The pdf of your character sheet')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('playbook')
            .setDescription('Your character playbook')
            .setRequired(true)
        ),
	async execute(interaction) {
        const attachment = interaction.options.getAttachment('pdf').url;
        const playbook = interaction.options.getString('playbook').toLowerCase();
        const response = await fetch(attachment);
        let file_data = response.body;
        const buffer = await new Response(file_data).arrayBuffer();
        const pdfDoc = await PDFDocument.load(buffer);
        const form = pdfDoc.getForm();
        const manifest = JSON.parse(fs.readFileSync(`./data/${playbook}Manifest.json`));
        const name = form.getTextField(manifest['name']).getText();
        const cool = form.getTextField(manifest['cool']).getText();
        const hard = form.getTextField(manifest['hard']).getText();
        const hot = form.getTextField(manifest['hot']).getText();
        const sharp = form.getTextField(manifest['sharp']).getText();
        const weird = form.getTextField(manifest['weird']).getText();
        const character = new Character(name, playbook, cool, hard, hot, sharp, weird);
        const characterJSON = JSON.stringify(character, null, 2);
        fs.writeFileSync(`./data/characters/${interaction.user.id}.json`, characterJSON, 'utf8');
        const saveFile = await pdfDoc.save();
        fs.writeFileSync(`./data/characters/${interaction.user.id}.pdf`, saveFile);


        file_data = (await fetch(attachment)).body;
        const document = await pdfimg.pdf(file_data);
        const page0buffer = await document.getPage(1);
        const page1buffer = await document.getPage(2);
        const page0Attachment = new AttachmentBuilder(Buffer.from(page0buffer));
        const page1Attachment = new AttachmentBuilder(Buffer.from(page1buffer));
		await interaction.reply({content: 'Character uploaded!', files: [page0Attachment, page1Attachment]});

	},
};