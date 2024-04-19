import fetch from "node-fetch";
import ytdl from 'ytdl-core';
import yts from 'youtube-yts';
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import os from 'os';

const streamPipeline = promisify(pipeline);

const handler = async (m, { conn, command, text, args, usedPrefix }) => {
    if (!text) throw `𝙿𝚛𝚘𝚙𝚘𝚛𝚌𝚒𝚘𝚗𝚊 𝚞𝚗 𝚝𝚎𝚡𝚝𝚘 𝚙𝚊𝚛𝚊 𝚋𝚞𝚜𝚌𝚊𝚛. 𝙴𝙹𝙴𝙼𝙿𝙻𝙾: *${usedPrefix + command}* 𝙸 𝚊𝚖 𝙼𝚊𝚌𝚑𝚒𝚗𝚎`;
    conn.REMPLAYER = conn.REMPLAYER ? conn.REMPLAYER : {};
    await conn.reply(m.chat, ' _𝓒𝓐𝓡𝓖𝓐𝓝𝓓𝓞..._▰▰▰▱▱▱▱▱', m);
    const result = await searchAndDownloadMusic(text);
    const infoText = ` ≫ ──── ≪『𝚁𝙴𝙼-𝙱𝙾𝚃』≫ ──── ≪ ▶︎ •၊၊||၊|။||||။‌‌‌‌‌၊|• 0:10\n\n[‹𝟹 𝚁𝙴𝚂𝙿𝙾𝙽𝙳𝙴 𝙲𝙾𝙽 𝙴𝙻 𝙽𝚄𝙼𝙴𝚁𝙾 𝙳𝙴 𝙻𝙰 𝙻𝙸𝚂𝚃𝙰 𝚀𝚄𝙴 𝙼𝙸𝚁𝙰𝚂 𝙰𝙱𝙰𝙹𝙾 𝙿𝙰𝚁𝙰 𝚂𝙰𝙱𝙴𝚁 𝚃𝚄 𝙳𝙴𝚂𝙲𝙰𝚁𝙶𝙰]\n━━━━━━━━━━━━━━━━━━━━\n`;

    const orderedLinks = result.allLinks.map((link, index) => {
        const sectionNumber = index + 1;
        const { title, url } = link;
        return `*${sectionNumber}.* ${title}`;
    });

    const orderedLinksText = orderedLinks.join("\n\n");
    const fullText = `${infoText}${orderedLinksText}`;
    const { key } = await conn.reply(m.chat, fullText, m);
    conn.REMPLAYER[m.sender] = {
        result,
        key,
        timeout: setTimeout(() => {
            conn.sendMessage(m.chat, { delete: key });
            delete conn.REMPLAYER[m.sender];
        }, 150 * 1000),
    };
    
    await addDownloadEmojis(conn, m.chat, key);
};

handler.before = async (m, { conn }) => {
    conn.REMPLAYER = conn.REMPLAYER ? conn.REMPLAYER : {};
    if (m.isBaileys || !(m.sender in conn.REMPLAYER)) return;
    const { result, key, timeout } = conn.REMPLAYER[m.sender];

    if (!m.quoted || m.quoted.id !== key.id || !m.text) return;
    const choice = m.text.trim();
    const inputNumber = Number(choice);
    if (inputNumber >= 1 && inputNumber <= result.allLinks.length) {
        const selectedUrl = result.allLinks[inputNumber - 1].url;
        let title = generateRandomName();
        const audioStream = ytdl(selectedUrl, {
            filter: 'audioonly',
            quality: 'highestaudio',
        });

        const tmpDir = os.tmpdir();
        const writableStream = fs.createWriteStream(`${tmpDir}/${title}.mp3`);
        await streamPipeline(audioStream, writableStream);

        const doc = {
            audio: {
                url: `${tmpDir}/${title}.mp3`
            },
            mimetype: 'audio/mpeg',
            ptt: false,
            waveform: [100, 0, 0, 0, 0, 0, 100],
            fileName: `${title}`,
        };

        await conn.sendMessage(m.chat, doc, {
            quoted: m
        });
        
        await addDownloadEmojis(conn, m.chat, m.quoted.id);
    } else {
        m.reply("𝚂𝙴𝙻𝙴𝙲𝙸𝙾𝙽𝙰 𝚄𝙽 𝙽𝚄𝙼𝙴𝚁𝙾 𝙳𝙴 𝙻𝙰 𝙻𝙸𝚂𝚃𝙰 𝙳𝙴 𝙰𝚁𝚁𝙸𝙱𝙰.\n𝙳𝙴 𝟷 𝙰  " + result.allLinks.length);
    }
};

handler.help = ["play"];
handler.tags = ["downloader"];
handler.command = /^(play)$/i;
handler.limit = true;
export default handler;

async function addDownloadEmojis(conn, chatId, messageId) {
    const imageUrl = 'https://imgur.com/a/0sqJkqr'; 
    const imageCaption = 'Descargar'; 
    const downloadButton = { buttonId: 'download', buttonText: imageCaption, description: 'Presiona el botón para descargar', buttonType: 1 }; // Definición del botón
    await conn.sendButton(chatId, imageUrl, 'Haz clic aquí para descargar', imageCaption, messageId, { thumbnail: null }).catch(() => {});
}

async function searchAndDownloadMusic(query) {
    try {
        const { videos } = await yts(query);
        if (!videos.length) return "Lo siento, no se encontraron resultados de video para esta búsqueda.";

        const allLinks = videos.map(video => ({
            title: video.title,
            url: video.url,
        }));

        const jsonData = {
            title: videos[0].title,
            description: videos[0].description,
            duration: videos[0].duration,
            author: videos[0].author.name,
            allLinks: allLinks,
            videoUrl: videos[0].url,
            thumbnail: videos[0].thumbnail,
        };

        return jsonData;
    } catch (error) {
        return "Error: " + error.message;
    }
}

function generateRandomName() {
    const adjectives = ["feliz", "triste", "divertido", "valiente", "inteligente", "amable", "tonto", "sabio", "gentil", "audaz"];
    const nouns = ["gato", "perro", "pájaro", "árbol", "río", "montaña", "sol", "luna", "estrella", "nube"];
    
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    
    return randomAdjective + "-" + randomNoun;
}
