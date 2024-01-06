import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*Este comando genera imágenes a partir de mensajes de texto.*\n\n*𝙴jemplo de uso*\n*◉ ${usedPrefix + command} Hermosa chica anime*\n*◉ ${usedPrefix + command} Elon Musk en salida rosa*`;

  try {
    m.reply('*Por favor espera, generando imágenes....*');

    const endpoint = `https://gurugpt.cyclic.app/dalle?prompt=${encodeURIComponent(text)}`;
    const response = await fetch(endpoint);
    
    if (response.ok) {
      const imageBuffer = await response.buffer();
      await conn.sendFile(m.chat, imageBuffer, 'image.png', null, m);
    } else {
      throw '*Please wait, generating images*';
    }
  } catch {
    throw '*¡Ups! Algo salió mal al generar imágenes. Por favor, inténtelo de nuevo más tarde.*';
  }
};

handler.help = ['dalle'];
handler.tags = ['AI'];
handler.command = ['dalle', 'gen', 'gimg', 'openai2'];
export default handler;
