import { Anime } from '@shineiichijo/marika';
import fetch from 'node-fetch';

const client = new Anime();

let handler = async (m, { conn, text, usedPrefix }) => {
    if (!text) return m.reply(`*[❗] Por favor ingresa el nombre de un anime para buscar.*`);
    try {
        let anime = await client.searchAnime(text);
        let result = anime.data[0];

        if (!result) {
            throw `*[❗] No se pudo obtener información sobre el anime. Por favor, inténtalo de nuevo.*`;
        }

        // Traducir cada propiedad al español utilizando Traducción de Google (puede haber limitaciones)
        let translatedTitle = await translateGoogle(result.title, 'en', 'es');
        let translatedBackground = await translateGoogle(result.background, 'en', 'es');
        let translatedSynopsis = await translateGoogle(result.synopsis, 'en', 'es');

        let AnimeInfo = `
🎀 • *Título:* ${translatedTitle}
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
🎆 • *Background:* ${translatedBackground}
❄ • *Sinopsis:* ${translatedSynopsis}`;

        conn.sendFile(m.chat, result.images.jpg.image_url, 'error.jpg', AnimeInfo, m);
    } catch (error) {
        throw `*[❗] ERROR: ${error}.*`;
    }
};

async function translateGoogle(text, sourceLang, targetLang) {
    const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
    const result = await response.json();
    return result[0][0][0];
}

handler.help = ['anime']
handler.tags = ['anime']
handler.command = /^(anime|animeinfo)$/i;
export default handler;

