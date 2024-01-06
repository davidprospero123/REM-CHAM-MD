import fetch from 'node-fetch';

let gitagptHandler = async (m, { text, usedPrefix, command }) => {
  if (!text && !(m.quoted && m.quoted.text)) {
    throw `Proporcione algún texto o cite un mensaje para obtener una respuesta. Tenga en cuenta que GitaGPT aún se encuentra en la fase de prueba, por lo que en ocasiones puede generar respuestas inexactas..`;
  }

  if (!text && m.quoted && m.quoted.text) {
    text = m.quoted.text;
  }

  try {
    conn.sendPresenceUpdate('composición', m.chat);
    const prompt = encodeURIComponent(text);
    const endpoint = `https://ultimetron.guruapi.tech/gita?prompt=${prompt}`;

    const response = await fetch(endpoint);
    const data = await response.json();
    const result = data.completion; 

    m.reply(result);
  } catch (error) {
    console.error('Error:', error);
    throw `*ERROR*`;
  }
};
gitagptHandler.help = ['remagpt']
gitagptHandler.tags = ['AI']
gitagptHandler.command = ['remgpt'];
gitagptHandler.diamond = false;

export default gitagptHandler;
