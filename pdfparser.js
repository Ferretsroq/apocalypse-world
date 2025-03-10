import * as fs from 'fs';
import { PDFDocument } from 'pdf-lib';
import * as pdfimg from 'pdf-to-img';

const file_data = fs.readFileSync('./AW2E - Angel (fillable).pdf');

const pdfDoc = await PDFDocument.load(file_data);




/*(const form = pdfDoc.getForm();
const fields = form.getFields();
let manifest = {};

for(let index = 0; index < fields.length; index++)
{
    console.log(fields[index].getName());
    manifest[fields[index].getName()] = '';
}

fs.writeFileSync('.json', JSON.stringify(manifest, null, 2), 'utf8');*/


//const document = await pdfimg.pdf(file_data);
//for await (const image of document)
//{
//    let counter = 0;
//    fs.writeFileSync(`page${counter}.png`, image);
//    counter++;
//}

//const page0buffer = await document.getPage(1);
//const page1buffer = await document.getPage(2);

//fs.writeFileSync('page0.png', page0buffer);
//fs.writeFileSync('page1.png', page1buffer);

for(const file of fs.readdirSync('./data/').filter(file => file.endsWith('reversed.json')))
{
    const filename = file.split('reversed')[0];
    const reversedData = JSON.parse(fs.readFileSync(`./data/${file}`));
    const newData = {};
    for(const [key, value] of Object.entries(reversedData))
    {
        newData[value] = key;
    }
    fs.writeFileSync(`./data/${filename}.json`, JSON.stringify(newData, null, 2))
}
