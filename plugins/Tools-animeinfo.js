import {translate} from '@vitalets/google-translate-api';
import { Anime } from '@shineiichijo/marika';

const client = new Anime();

let handler = async (m, { conn, text, usedPrefix }) => {
  if (!text) return m.reply(`*[❗] Por favor ingresa el nombre de un anime para buscar.*`);
  try {
    let anime = await client.searchAnime(text);
    let result = anime.data[0];
    let resultes = await translate(`${result.background}`, { to: 'en', autoCorrect: true });
    let resultes2 = await translate(`${result.synopsis}`, { to: 'hi', autoCorrect: true });
    let AnimeInfo = `
🎀 • *TitUÑP:* ${result.title}
🎋 • *FormatO:* ${result.type}
📈 • *Estado:* ${result.status.toUpperCase().replace(/\_/g, ' ')}
🍥 • *Total Episodios:* ${result.episodes}
🎈 • *Duracion: ${result.duration}*
✨ • *Based on:* ${result.source.toUpperCase()}
💫 • *Released:* ${result.aired.from}
🎗 • *Finished:* ${result.aired.to}
🎐 • *Popular:* ${result.popularity}
🎏 • *Favoritos:* ${result.favorites}
🎇 • *Rating:* ${result.rating}
🏅 • *Rank:* ${result.rank}
♦ • *Trailer:* ${result.trailer.url}
🌐 • *URL:* ${result.url}
🎆 • *Background:* ${resultes.text}
❄ • *Synopsis:* ${resultes2.text}`;

    conn.sendFile(m.chat, result.images.jpg.image_url, 'error.jpg', AnimeInfo, m);
  } catch {
    throw `*[❗] ERROR, por favor inténtalo de nuevo.*`;
  }
};

handler.help = ['anime']
handler.tags = ['anime']
handler.command = /^(anime|animeinfo)$/i;
export default handler;
