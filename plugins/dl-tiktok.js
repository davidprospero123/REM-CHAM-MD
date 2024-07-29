import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) return m.reply('*Ingresa un enlace de TikTok*');

  try {
    await m.react('🕓'); 
    const apiResponse = await fetch(`https://thepapusapi.koyeb.app/api/tiktok/?url=${args[0]}`);
    const responseData = await apiResponse.json();
    
    if (responseData.status) {
      const { creator, data } = responseData;
      const { author, desc, cover, result } = data;
      let txt = '    `TikTok downloader`\n\n';
      txt += `> *Autor*: _${author}_\n`;
      txt += `> *Descripción*: ${desc}\n`;
      txt += `> *Cover*: ${cover}\n`;

      await conn.sendMessage(m.chat, { video: { url: result.mp4NoWm[0] }, caption: txt }, { quoted: m });
      await m.react('✅'); 
    } else {
      await m.react('❌'); 
    }
  } catch {
    await m.react('❌'); 
  }
}

handler.help = ['tiktok *<link>*'];
handler.tags = ['dl'];
handler.command = ['tiktok', 'tt', 'TikTok', 'TK'];
export default handler;
