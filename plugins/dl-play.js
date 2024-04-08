import fetch from "node-fetch";
import ytdl from 'youtubedl-core';
import yts from 'youtube-yts';
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import os from 'os';

const streamPipeline = promisify(pipeline);

async function handler(m, { conn, command, text, usedPrefix }) {
    if (!text) throw `Por favor, proporciona un texto para buscar. Ejemplo: *${usedPrefix}${command} Naruto Blue Bird*`;

    const searchResult = await searchAndDownloadMusic(text);
    await conn.sendFile(m.chat, 'https://telegra.ph/file/1e92cfea8e14eda0fd893.jpg', 'imagen.jpg', '𝙲𝙰𝚁𝙶𝙰𝙽𝙳𝙾 𝚁𝙴𝚂𝚄𝙻𝚃𝙰𝙳𝙾𝚂:', m);

    const infoText = `✦ ──『 *𝙍𝙀𝙈-𝙋𝙇𝘼𝙔𝙀𝙍* 』── ⚝ \n\n [ 🎧 𝘙𝘦𝘴𝘱𝘰𝘯𝘥𝘦 𝘤𝘰𝘯 𝘦𝘭 𝘯ú𝘮𝘦𝘳𝘰 𝘥𝘦𝘭 𝘳𝘦𝘴𝘶𝘭𝘵𝘢𝘥𝘰 𝘥𝘦𝘴𝘦𝘢𝘥𝘰 𝘱𝘢𝘳𝘢 𝘰𝘣𝘵𝘦𝘯𝘦𝘳 𝘦𝘭 𝘢𝘶𝘥𝘪𝘰 ]. \n\n`;
    const orderedLinksText = searchResult.allLinks.map((link, index) => `*${index + 1}.* ${link.title}`).join("\n\n");
    const fullText = `${infoText}\n\n${orderedLinksText}`;
    const { key } = await conn.reply(m.chat, fullText, m);

    conn.REMPLAY = conn.REMPLAY || {};
    conn.REMPLAY[m.sender] = {
        result: searchResult,
        key: key,
        timeout: setTimeout(() => {
            conn.sendMessage(m.chat, { delete: key });
            delete conn.REMPLAY[m.sender];
        }, 150 * 1000),
    };
}

async function searchAndDownloadMusic(query) {
    try {
        const { videos } = await yts(query);
        if (!videos.length) throw new Error("Lo sentimos, no se encontraron resultados de vídeo para esta búsqueda.");

        const allLinks = videos.map(video => ({ title: video.title, url: video.url }));

        return {
            title: videos[0].title,
            description: videos[0].description,
            duration: videos[0].duration,
            author: videos[0].author.name,
            allLinks: allLinks,
            videoUrl: videos[0].url,
            thumbnail: videos[0].thumbnail,
        };
    } catch (error) {
        throw new Error("Error: " + error.message);
    }
}

async function downloadAndSendAudio(conn, m, selectedUrl) {
    try {
        const title = generateRandomName();
        const audioStream = ytdl(selectedUrl, { filter: 'audioonly', quality: 'highestaudio' });
        const tmpDir = os.tmpdir();
        const writableStream = fs.createWriteStream(`${tmpDir}/${title}.mp3`);
        await streamPipeline(audioStream, writableStream);

        const doc = {
            audio: { url: `${tmpDir}/${title}.mp3` },
            mimetype: 'audio/mpeg',
            ptt: false,
            waveform: [100, 0, 0, 0, 0, 0, 100],
            fileName: `${title}`,
        };

        await conn.sendMessage(m.chat, doc, { quoted: m });
    } catch (error) {
        throw new Error("Error al descargar y enviar el audio: " + error.message);
    }
}

async function before(m, { conn }) {
    conn.REMPLAY = conn.REMPLAY || {};
    if (m.isBaileys || !(m.sender in conn.REMPLAY)) return;

    const { result, key, timeout } = conn.REMPLAY[m.sender];
    if (!m.quoted || m.quoted.id !== key.id || !m.text) return;

    const choice = m.text.trim();
    const inputNumber = Number(choice);

    if (inputNumber >= 1 && inputNumber <= result.allLinks.length) {
        const selectedUrl = result.allLinks[inputNumber - 1].url;
        await downloadAndSendAudio(conn, m, selectedUrl);
    } else {
        await conn.reply(m.chat, "Número de secuencia no válido. Seleccione el número apropiado de la lista anterior.\nEntre 1 a " + result.allLinks.length, m);
    }
}

handler.before = before;
handler.help = ["play"];
handler.tags = ["downloader"];
handler.command = /^(play)$/i;
handler.limit = true;

export default handler;

function generateRandomName() {
    const adjectives = ["happy", "sad", "funny", "brave", "clever", "kind", "silly", "wise", "gentle", "bold"];
    const nouns = ["cat", "dog", "bird", "tree", "river", "mountain", "sun", "moon", "star", "cloud"];

    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

    return randomAdjective + "-" + randomNoun;
}
