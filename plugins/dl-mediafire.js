import axios from 'axios';
import path from 'path';

let handler = async (message, { conn, args, usedPrefix, text, command }) => {
  try {
    if (!text) {
      return message.reply(`${usedPrefix + command} https://www.mediafire.com/file/example`);
    }
    const response = await axios.get(`https://remcham-bot.vercel.app/api/mediafire?url=${text}`);
    const { data } = response.data;
    if (!response.data.success) {
      return message.reply('Error: No se pudo obtener los detalles del archivo.');
    }
    const {
      url,
      filename,
      filesizeH,
      ext,
      filetype,
      uploadDate
    } = data;
    const downloadingMessage = `🌩️ *_ꜱᴜ ᴅᴇꜱᴄᴀʀɢᴀ ᴇꜱᴛᴀ ᴄᴏᴍᴇɴᴢᴀɴᴅᴏ...._*`;
    const imageUrl = 'https://i.pinimg.com/736x/e4/7c/be/e47cbe22aae75ef2f22962cc022d6bac.jpg';
    const responseImg = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    await conn.sendFile(message.chat, responseImg.data, 'thumbnail.png', downloadingMessage, message);
    const caption = `*_ＤＥＳＣＡＲＧＡ ＥＸＩＴＯＳＡ..._*\n*_ᴀʀᴄʜɪᴠᴏ_*: ${filename}\n*_ᴛᴀᴍᴀÑᴏ_*: ${filesizeH}\n*_ᴛɪᴘᴏ_*: ${filetype}\n*_ᴇxᴛᴇɴᴄɪᴏɴ_*: ${ext}\n*_ᴘᴜʙʟɪᴄᴀᴅᴏ ᴇʟ_*: ${uploadDate}`;
    const fileData = await axios({
      method: 'get',
      url,
      responseType: 'arraybuffer'
    });
    const fileExtension = path.extname(filename).toLowerCase();
    const mimeTypes = {
      '.mp4': 'video/mp4',
      '.pdf': 'application/pdf',
      '.zip': 'application/zip',
      '.rar': 'application/x-rar-compressed',
      '.7z': 'application/x-7z-compressed',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.apk': 'application/vnd.android.package-archive'
    };
    let mimetype = mimeTypes[fileExtension] || 'application/octet-stream';
    await conn.sendFile(message.chat, fileData.data, filename, caption, message, null, { mimetype, asDocument: true });
  } catch (error) {
    return message.reply(`Error: ${error.message}`);
  }
};

handler.help = ['mediafire'];
handler.tags = ['downloader'];
handler.command = /^(mediafire|mf)$/i;

export default handler;

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log (k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
