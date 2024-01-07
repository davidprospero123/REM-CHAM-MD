import fetch from 'node-fetch';
import displayLoadingScreen from '../lib/loading.js';
let handler = async (m, { conn, text }) => {
    if (!text) {
        console.log('No se proporcionó ningún nombre de canción.');
        throw `*ᴘᴏʀ ꜰᴀᴠᴏʀ ɪɴɢʀᴇꜱᴀ ᴇʟ ɴᴏᴍʙʀᴇ ᴅᴇ ᴜɴᴀ ᴄᴀɴᴄɪÓɴ*`;
    }
  m.react('🎶')
  await displayLoadingScreen(conn, m.chat);
  let pp = 'https://telegra.ph/file/daaf1d574dc2264307c5c.jpg'
    const query = encodeURIComponent(text);
    let res = `https://guruapi.tech/api/spotifydl?url=${query}`
   // let spotify = await (await fetch(res)).buffer()
    let doc = {
        audio: {
          url: res
        },
        mimetype: 'audio/mpeg',
        ptt: true,
        waveform:  [100, 0, 100, 0, 100, 0, 100],
        fileName: "Guru.mp3",

        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
            title: "↺ |◁   II   ▷|   ♡",
            body: `ᴇꜱᴄᴜᴄʜᴀɴᴅᴏ ᴀʜᴏʀᴀ: ${text}`,
            thumbnailUrl: pp,
            sourceUrl: null,
            mediaType: 1,
            renderLargerThumbnail: false
          }
        }
    };

    await conn.sendMessage(m.chat, doc, { quoted: m });
}
handler.help = ['spotify'];
handler.tags = ['downloader'];
handler.command = /^(spotify|song)$/i;

export default handler;