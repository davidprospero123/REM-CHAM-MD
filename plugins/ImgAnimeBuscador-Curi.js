import { translate } from '@vitalets/google-translate-api';
import { Anime } from '@shineiichijo/marika';

const client = new Anime();

let handler = async (m, { conn, text, usedPrefix }) => {
    if (!text) return m.reply(`*[❗] Por favor ingresa el nombre de un anime para buscar.*`);
    try {
        let anime = await client.searchAnime(text);
        let result = anime.data[0];

        if (!result) {
            throw `*[❗] No se pudo obtener información sobre el anime. Por favor, inténtalo de nuevo.*`;
        }

        // Traducir cada propiedad al español
        let translatedTitle = await translate(result.title, { to: 'es', autoCorrect: true });
        let translatedBackground = await translate(result.background, { to: 'es', autoCorrect: true });
        let translatedSynopsis = await translate(result.synopsis, { to: 'es', autoCorrect: true });

        let AnimeInfo = `
🎀 • *Título:* ${translatedTitle.text}
🎋 • *Formato:* ${result.type}
📈 • *Estado:* ${result.status.toUpperCase().replace(/\_/g, ' ')}
🍥 • *Episodios totales:* ${result.episodes}
🎈 • *Duración: ${result.duration}*
✨ • *Basado en:* ${result.source.toUpperCase()}
💫 • *Estrenado:* ${result.aired.from}
🎗 • *Finalizado:* ${result.aired.to}
🎐 • *Popularidad:* ${result.popularity}
🎏 • *Favoritos:* ${result.favorites}
🎇 • *Clasificación:* ${result.rating}
🏅 • *Rango:* ${result.rank}
♦ • *Trailer:* ${result.trailer.url}
🌐 • *URL:* ${result.url}
🎆 • *Background:* ${translatedBackground.text}
❄ • *Sinopsis:* ${translatedSynopsis.text}`;

        conn.sendFile(m.chat, result.images.jpg.image_url, 'error.jpg', AnimeInfo, m);
    } catch (error) {
        throw `*[❗] ERROR: ${error}.*`;
    }
};

handler.help = ['anime']
handler.tags = ['anime']
handler.command = /^(anime|animeinfo)$/i;
export default handler;
