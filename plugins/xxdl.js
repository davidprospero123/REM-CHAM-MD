
import { xnxxSearch, xnxxdl } from '../lib/scraper.js';



let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  let chat = global.db.data.chats[m.chat];
  if (!chat.nsfw) throw `🚫 Este grupo no admite contenido NSFW .\n\nEnciendelo, usando: *${usedPrefix}enable* nsfw`;
  let user = global.db.data.users[m.sender].age;
    if (user < 18) throw `❎ Debes tener 18 años o más para utilizar esta función.`;
  if (!text) throw `✳️ ¿Qué quieres buscar?\n📌 Usa: *${usedPrefix + command} <search>*\n\nEjemplo: Chica Cosplayer\nEjemplo: .xnxx link *`;

  m.react('⌛');

  let url;
  try {
    url = new URL(text);
  } catch (error) {
    url = null;
  }

  if (url) {
    try {
      const files = await xnxxdl(url.href);
      if (files && files.high) {
        conn.sendFile(
          m.chat,
          files.high,
          'video.mp4',
          'Aqui esta tu video',
          m
        );
        m.react('✅');
      } else {
        m.reply('🔴 Error: no se pudo recuperar la URL de descarga.');
      }
    } catch (e) {
      console.error(e);
      m.reply('🔴 Error: encontramos un problema al procesar la solicitud.');
    }
  } else {
    try {
      const results = await xnxxSearch(text);
      if (results.length > 0) {
        const message = results.map((r, i) => `${i + 1}. [${r.title}](${r.link})`).join('\n');
        m.reply(message, null, {
          contextInfo: {
            mentionJid: conn.parseMention(message),
          },
        });
      } else {
        m.reply('🔴 Error: No se encontraron resultados de búsqueda.');
      }
    } catch (e) {
      console.error(e);
      m.reply('🔴 Error: encontramos un problema al procesar la solicitud.');
    }
  }
};

handler.help = ['xnxx'];
handler.tags = ['nsfw', 'premium'];
handler.command = ['xnxxsearch', 'xnxxdl', 'xnxx'];
handler.group = true;
handler.premium = false;
handler.register = true;

export default handler;
