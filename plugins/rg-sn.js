import { createHash } from 'crypto';
import axios from 'axios';

let handler = async function (m, { conn, text, usedPrefix }) {
    let sn = createHash('md5').update(m.sender).digest('hex');
    
    const telegrap = "https://telegra.ph/file/602f953a6bef188b54fe9.png";
    
    const responseImg = await axios.get(telegrap, { responseType: 'arraybuffer' });
    await conn.sendFile(m.chat, responseImg.data, "thumbnail.png", `
┌─「 *𝙽𝚄𝙼𝙴𝚁𝙾 𝙳𝙴 𝚂𝙴𝚁𝙸𝙴* 」
│
│🔑 *𝙽𝚄𝙼𝙴𝚁𝙾 𝙳𝙴 𝚂𝙴𝚁𝙸𝙴:* 
│ ${sn}
│
└─「──────────────」
`.trim(), m); 
    await m.react("💙");
}

handler.help = ['mysn'];
handler.tags = ['rg'];
handler.command = ['nserie', 'sn', 'mysn', 'numerodeserie', 'nserie'];
handler.register = true;

export default handler;
