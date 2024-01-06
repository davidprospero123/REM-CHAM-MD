import uploadImage from '../lib/uploadImage.js';
import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, args, text }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  
  if (!mime) throw '⚠️️ Responder a una imagen o vídeo.';
  if (!text) throw '⚠️️ Ingrese el nuevo tamaño de archivo para la imagen/video.';
  if (isNaN(text)) throw '🔢 Sólo se permiten números.';
  
  if (!/image\/(jpe?g|png)|video|document/.test(mime)) throw '⚠️️ Formato no compatible.';
  
  let img = await q.download();
  let url = await uploadImage(img);

  if (/image\/(jpe?g|png)/.test(mime)) {
    conn.sendMessage(m.chat, { image: { url: url }, caption: `Aquí tienes`, fileLength: `${text}`, mentions: [m.sender] }, { ephemeralExpiration: 24 * 3600, quoted: m });
  } else if (/video/.test(mime)) {
    return conn.sendMessage(m.chat, { video: { url: url }, caption: `Aquí tienes`, fileLength: `${text}`, mentions: [m.sender] }, { ephemeralExpiration: 24 * 3600, quoted: m });
  }
};

handler.tags = ['tools'];
handler.help = ['length <amount>'];
handler.command = /^(length|filelength|edittamaño|totamaño|tamaño)$/i;

export default handler;
