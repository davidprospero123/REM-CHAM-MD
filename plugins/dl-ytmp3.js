import fetch from 'node-fetch';
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import os from 'os';

const streamPipeline = promisify(pipeline);

const handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, '𝚒𝚗𝚐𝚛𝚎𝚜𝚊 𝚒𝚗 𝚕𝚒𝚗𝚔 𝚍𝚎 𝚢𝚘𝚞𝚝𝚞𝚋𝚎', m);

  const videoUrl = text.trim();
  const apiUrl = `https://youtube-api-thepapusteam.koyeb.app/api/video?url=${videoUrl}`;

  try {
    console.log(`Solicitando información del video desde: ${apiUrl}`);
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data.status) {
      throw new Error('Error al obtener información del video');
    }

    console.log('Información del video recibida:', data);

    const { title, thumbnails, author } = data.data;
    const thumbnail = thumbnails[0].url;
    const audioUrl = data.downloads.mp3.url;

    const tmpDir = os.tmpdir();
    const filePath = `${tmpDir}/${title}.mp3`;
    const writableStream = fs.createWriteStream(filePath);

    console.log('Descargando audio desde:', audioUrl);
    const audioResponse = await fetch(audioUrl);
    if (!audioResponse.ok) {
      throw new Error('Error al descargar el audio');
    }

    await streamPipeline(audioResponse.body, writableStream);
    console.log('Descarga de audio completada');

    await m.react('🕓');

    const txt = `> » Titulo: ${title}\n` +
                `> » Autor: ${author.name}\n` +
                `> » Canal: ${author.url}\n\n`;

    await conn.reply(m.chat, txt, m);

    await conn.sendMessage(m.chat, {
      audio: { url: filePath },
      mimetype: "audio/mp4",
      fileName: `${title}.mp3`,
      quoted: m,
      contextInfo: {
        'forwardingScore': 200,
        'isForwarded': true,
        externalAdReply: {
          showAdAttribution: true,
          title: title,
          body: author.name,
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

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Ocurrió un error al borrar el archivo audio: ${err}`);
        m.react('❌');
      } else {
        console.log(`Borrando archivo de audio: ${filePath}`);
        m.react('✅');
      }
    });
  } catch (error) {
    console.error('Error en el proceso:', error);
    await conn.reply(m.chat, 'Ocurrió un error al procesar tu solicitud', m);
    await m.react('❌');
  }
};

handler.help = ["ytmp3"].map((v) => v + " <link>");
handler.tags = ['dl'];
handler.command = /^(ytmp3|yta|audio)$/i;

export default handler;
