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
╭─━━━━━━━━━━━━━━━━━─╮
🌟 𝙻𝚎𝚝𝚛𝚊: ${translatedTitle}
📺 𝙵𝚘𝚛𝚖𝚊𝚝𝚘: ${result.type}
📈 𝚎𝚜𝚝𝚊𝚍𝚘: ${result.status.toUpperCase().replace(/\_/g, ' ')}
🎬 𝙴𝚙𝚒𝚜𝚘𝚍𝚒𝚘𝚜 𝚝𝚘𝚝𝚊𝚕𝚎𝚜: ${result.episodes}
⏱ 𝙳𝚞𝚛𝚊𝚌𝚒ó𝚗: ${result.duration}
📚 𝙱𝚊𝚜𝚊𝚍𝚘 𝚎𝚗: ${result.source.toUpperCase()}
📅 𝙴𝚜𝚝𝚛𝚎𝚗𝚘: ${result.aired.from}
🏁 𝙵𝚒𝚗𝚊𝚕𝚒𝚣𝚊𝚍𝚘: ${result.aired.to}
🌟 𝙿𝚘𝚙𝚞𝚕𝚊𝚛𝚒𝚍𝚊𝚍: ${result.popularity}
❤️ 𝙵𝚊𝚟𝚘𝚛𝚒𝚝𝚘𝚜: ${result.favorites}
🌟 𝙲𝚕𝚊𝚜𝚒𝚏𝚒𝚌𝚊𝚌𝚒ó𝚗: ${result.rating}
🎖 𝚁𝚊𝚗𝚐𝚘: ${result.rank}
🎬 𝚃𝚛𝚊𝚒𝚕𝚎𝚛: ${result.trailer.url}
🔗 𝚄𝚁𝙻: ${result.url}
🎨 𝙱𝚊𝚌𝚔𝚐𝚛𝚘𝚞𝚗𝚍: ${translatedBackground}
📝 𝚂𝚒𝚗𝚘𝚙𝚜𝚒𝚜: ${translatedSynopsis}
╰─━━━━━━━━━━━━━━━━━─╯`;

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
