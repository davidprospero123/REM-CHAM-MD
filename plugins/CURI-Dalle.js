import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`*𝙸𝚗𝚐𝚛𝚎𝚜𝚊 𝙴𝚕 𝚃𝚎𝚡𝚝𝚘 𝙳𝚎 𝙻𝚊 𝙸𝚖𝚊𝚐𝚎𝚗 𝚀𝚞𝚎 𝚀𝚞𝚒𝚎𝚛𝚎𝚜*\n\n*_𝚎𝚓𝚎𝚖𝚙𝚕𝚘_*\n*${usedPrefix + command} Anime Girl*`)

  try {
    m.reply('*𝙶𝚎𝚗𝚎𝚛𝚊𝚗𝚍𝚘 𝙸𝚖𝚊𝚐𝚎𝚗, 𝙴𝚜𝚙𝚎𝚛𝚊 :𝟹*');

    const endpoint = `https://gurugpt.cyclic.app/dalle?prompt=${encodeURIComponent(text)}`;
    const response = await fetch(endpoint);
    
    if (response.ok) {
      const imageBuffer = await response.buffer();
      await conn.sendFile(m.chat, imageBuffer, 'image.png', null, m, null, rcanal);
    } else {
      throw '*𝙲𝚊𝚛𝚐𝚊𝚗𝚍𝚘 𝙸𝚖𝚊𝚐𝚎𝚗 :3*';
    }
  } catch {
    throw '❌ *Ocurrio Un Error Inesperado* ❌';
  }
};

handler.help = ['dalle'];
handler.tags = ['AI'];
handler.command = ['dalle', 'gen', 'gimg', 'openai2'];
export default handler;
