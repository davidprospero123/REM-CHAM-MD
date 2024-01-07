import { xvideosSearch, xvideosdl } from '../lib/scraper.js';

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  let chat = global.db.data.chats[m.chat];
  if (!chat.nsfw) throw `🚫 Este grupo no admite contenido NSFW.\n\nPara encenderlo, use: *${usedPrefix}enable* nsfw`;
  let user = global.db.data.users[m.sender].age;
  if (user < 18) throw `❎ Debes tener 18 años o más para utilizar esta función.`;
  if (!text) throw `✳️ ¿Qué quieres buscar?\n📌 Usa: *${usedPrefix + command} <search>*\n\nEjemplo: Chica cosplayer\nEjemplo: .xnxx link *`;

  m.react('⌛');
    if (!text) throw 'Proporcione una consulta de búsqueda o una URL de Xvideos válida.';

    // Check if the input is a valid Xvideos URL
    const isURL = /^(https?:\/\/)?(www\.)?xvideos\.com\/.+$/i.test(text);

    try {
      if (isURL) {
        // If it's a valid URL, directly download the video
        const result = await xvideosdl(text);
        const { title, url } = result.result;

        // Send the video file
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();

        conn.sendFile(
          m.chat,
          Buffer.from(buffer),
          `${title}.mp4`,
          `Here is your Xvideos video: ${title}`
        );

      } else {
        // If it's not a valid URL, perform a search and display the search results
        const results = await xvideosSearch(text);
        if (results.length === 0) {
          m.reply('No se encontraron resultados de búsqueda para la consulta dada.');
        } else {
          const searchResults = results.map((result, index) => {
            return `${index + 1}. *${result.title}*\nDuration: ${result.duration}\nQuality: ${result.quality}\nURL: ${result.url}`;
          }).join('\n\n');

          m.reply(`*Search Results for "${text}":*\n\n${searchResults}`);
        }
      }
    } catch (error) {
      console.error(error);
      throw 'No se pudieron recuperar los detalles del video Xvideos.';
    }
  };

  handler.help = ['xvid']
  handler.tags = ['nsfw']
handler.command = ['xvid','xvideos'];
handler.group = true;
handler.premium = false;
handler.register = true;

handler.premium = false;

export default handler;
