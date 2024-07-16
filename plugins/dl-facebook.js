import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) return m.reply('*`Ingresa un enlace de Facebook`*');

  try {
    await m.react('🕓'); 
    const apiResponse = await fetch(`https://thepapusteam.koyeb.app/api/fbvideodownload?url=${args[0]}`);
    const responseData = await apiResponse.json();
    
    if (responseData.success) {
      const { creator, title, src_url, og_url, picture, links, r_id } = responseData;
      let txt = '    `Facebook downloader`\n\n';
      txt += `> *Título*: _${title}_\n`;
      txt += `> *Enlace de origen*: ${src_url}\n`;
      txt += `> *Enlace OG*: ${og_url}\n`;
      txt += `> *ID*: ${r_id}\n`;
      txt += `> *Imagen*: ${picture}\n`;

      await conn.sendMessage(m.chat, { video: { url: links[0].link }, caption: txt }, { quoted: m });
      await m.react('✅'); 
    } else {
      await m.react('❌'); 
    }
  } catch {
    await m.react('❌'); 
  }
}

handler.help = ['facebook *<link>*'];
handler.tags = ['dl'];
handler.command = ['fb', 'facebook', 'FB', 'FACEBOOK'];
export default handler;
