import { createHash } from 'crypto';
import axios from 'axios';

let handler = async function (m, { conn, args, usedPrefix }) {
    if (!args[0]) throw `✳️ 𝙸𝚗𝚐𝚛𝚎𝚜𝚊 𝚝𝚞 𝚗ú𝚖𝚎𝚛𝚘 𝚍𝚎 𝚜𝚎𝚛𝚒𝚎\n𝚅𝚎𝚛𝚒𝚏𝚒𝚌𝚊 𝚝𝚞 𝚗ú𝚖𝚎𝚛𝚘 𝚍𝚎 𝚜𝚎𝚛𝚒𝚎 𝚌𝚘𝚗 𝚎𝚕 𝚌𝚘𝚖𝚊𝚗𝚍𝚘...\n\n*${usedPrefix}nserie*`;

    let sn = createHash('md5').update(m.sender).digest('hex');

    if (args[0] !== sn) throw '⚠️ 𝙽ú𝚖𝚎𝚛𝚘 𝚍𝚎 𝚜𝚎𝚛𝚒𝚎 𝚒𝚗𝚌𝚘𝚛𝚛𝚎𝚌𝚝𝚘';

    let user = global.db.data.users[m.sender];
    user.registered = false;

    m.reply(`💙 ¡𝚁𝚎𝚐𝚒𝚜𝚝𝚛𝚘 𝚎𝚕𝚒𝚖𝚒𝚗𝚊𝚍𝚘 𝚌𝚘𝚛𝚛𝚎𝚌𝚝𝚊𝚖𝚎𝚗𝚝𝚎!\n𝙴𝚜𝚙𝚎𝚛𝚊𝚖𝚘𝚜 𝚝𝚞 𝚛𝚎𝚐𝚛𝚎𝚜𝚘 𝚙𝚛𝚘𝚗𝚝𝚘.`);

    const imgUrl = "https://i.imgur.com/P3u2et7.jpg";
    const responseImg = await axios.get(imgUrl, { responseType: 'arraybuffer' });
    let txt = `
┌─「 *𝚁𝚎𝚐𝚒𝚜𝚝𝚛𝚘 𝙴𝚕𝚒𝚖𝚒𝚗𝚊𝚍𝚘* 」
│
│🔑 *𝙽ú𝚖𝚎𝚛𝚘 𝚍𝚎 𝚂𝚎𝚛𝚒𝚎:* ${args[0]}
│
└─「──────────────」
`.trim();

    await conn.sendFile(m.chat, responseImg.data, "thumbnail.jpg", txt, m);
    await m.react("😢");
}

handler.help = ['unreg <Número de Serie>'];
handler.tags = ['rg'];
handler.command = ['unreg', 'eliminarrg', 'eliminarregistro'];
handler.register = true;

export default handler;
