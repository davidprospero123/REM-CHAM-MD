import ytdl from 'ytdl-core';
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';

const streamPipeline = promisify(pipeline);

const handler = async (m, { conn, command, text, usedPrefix }) => {
    if (!text) throw `𝚄𝚜𝚎: ${usedPrefix}${command} <𝚈𝚘𝚞𝚃𝚞𝚋𝚎 𝚅𝚒𝚍𝚎𝚘 𝚄𝚁𝙻>`;

    const videoUrl = text.trim();

    const videoInfo = await ytdl.getInfo(videoUrl);

    const { videoDetails } = videoInfo;
    const { title, thumbnails, lengthSeconds, viewCount, uploadDate } = videoDetails;
    const thumbnail = thumbnails[0].url; 

    const videoStream = ytdl(videoUrl, {
        filter: 'audioandvideo',
        quality: 'highest',
    });

    const tmpFilePath = `tmp/${title}.mp4`;
    const writableStream = fs.createWriteStream(tmpFilePath);

    await streamPipeline(videoStream, writableStream);

    const doc = {
        video: {
            url: tmpFilePath,
        },
        mimetype: 'video/mp4',
        fileName: title,
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                mediaType: 2,
                mediaUrl: videoUrl,
                title: title,
                sourceUrl: videoUrl,
                thumbnail: await conn.getFile(thumbnail).then((file) => file.data),
            },
        },
    };

    await conn.sendMessage(m.chat, doc, { quoted: m });

    fs.unlink(tmpFilePath, (err) => {
        if (err) {
            console.error(`Failed to delete video file: ${err}`);
        } else {
            console.log(`Deleted video file: ${tmpFilePath}`);
        }
    });
};

handler.help = ['ytmp4 <URL>'];
handler.tags = ['downloader'];
handler.command = /^(ytmp4)$/i;

export default handler;
