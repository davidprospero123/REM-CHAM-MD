import ytdl from 'ytdl-core'
import fs from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'
import os from 'os'

const streamPipeline = promisify(pipeline);

const handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, '𝚒𝚗𝚐𝚛𝚎𝚜𝚊 𝚒𝚗 𝚕𝚒𝚗𝚔 𝚍𝚎 𝚢𝚘𝚞𝚝𝚞𝚋𝚎', m)
  
  const videoUrl = text;
  const videoInfo = await ytdl.getInfo(videoUrl);
  const { videoDetails } = videoInfo;
  const { title, thumbnails, lengthSeconds, viewCount, uploadDate } = videoDetails;
  const thumbnail = thumbnails[0].url;
  const audioStream = ytdl(videoUrl, {
    filter: 'audioonly',
    quality: 'highestaudio',
  });

  const tmpDir = os.tmpdir();
  const filePath = `${tmpDir}/${title}.mp3`;
  const writableStream = fs.createWriteStream(filePath);
  
  await streamPipeline(audioStream, writableStream);

  const dl_url = filePath;
  
  await m.react('🕓');
  
  const txt = `> » Titulo: ${title}\n` +
              `> » Duracion: ${lengthSeconds}s\n` +
              `> » Visitas: ${viewCount}\n\n`;
  
  await conn.reply(m.chat, txt, m);
  
  await conn.sendMessage(m.chat, {
    audio: { url: dl_url },
    mimetype: "audio/mp4",
    fileName: `${title}.mp3`,
    quoted: m,
    contextInfo: {
      'forwardingScore': 200,
      'isForwarded': true,
      externalAdReply: {
        showAdAttribution: true,
        title: title,
        body: uploadDate,
        mediaType: 2,
        sourceUrl: global.canal,
        thumbnail: await (await conn.getFile(thumbnail)).data,
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true,
      }
    }
  }, { quoted: m });
  
  await m.react('✅');
  
  fs.unlink(dl_url, (err) => {
    if (err) {
      console.error(`Ocurrió un error al borrar el archivo audio: ${err}`);
      m.react('❌');
    } else {
      console.log(`Borrando archivo de audio: ${dl_url}`);
      m.react('✅');
    }
  });
};

handler.help = ["ytmp3"].map((v) => v + " <link>");
handler.tags = ['dl'];
handler.command = /^(ytmp3|yta|audio)$/i;

export default handler;
