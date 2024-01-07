import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text && !(m.quoted && m.quoted.text)) {
    throw `𝙋𝙤𝙧 𝙛𝙖𝙫𝙤𝙧 𝙥𝙧𝙤𝙥𝙤𝙧𝙘𝙞𝙤𝙣𝙚 𝙖𝙡𝙜ú𝙣 𝙩𝙚𝙭𝙩𝙤 , 𝙀𝙟𝙚𝙢𝙥𝙡𝙤 𝙙𝙚 𝙪𝙨𝙤 ${usedPrefix}img Anime`;
  }
  if (!text && m.quoted && m.quoted.text) {
    text = m.quoted.text;
  }

  const match = text.match(/(\d+)/);
  const numberOfImages = match ? parseInt(match[1]) : 1;

  try {
    m.reply('*Por Favor Espera*');

    const images = [];

    for (let i = 0; i < numberOfImages; i++) {
      const endpoint = `https://api.guruapi.tech/api/googleimage?text=${encodeURIComponent(text)}`;
      const response = await fetch(endpoint);

      if (response.ok) {
        const imageBuffer = await response.buffer();
        images.push(imageBuffer);
      } else {
        throw '*Ocurrio un Error*';
      }
    }


    for (let i = 0; i < images.length; i++) {
      await conn.sendFile(m.chat, images[i], `image_${i + 1}.png`, null, m);
    }
  } catch {
    throw '*¡Ups! Algo salió mal al generar imágenes. Por favor, inténtelo de nuevo más tarde.*';
  }
};

handler.help = ['image'];
handler.tags = ['fun'];
handler.command = ['img', 'gimage'];

export default handler;
