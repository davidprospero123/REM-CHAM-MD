import fetch from 'node-fetch';

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `✳️ *Ejemplo:*\n\n*${usedPrefix + command}* Soy feo?`;

  m.react('🫣');
  conn.sendPresenceUpdate('composición', m.chat);

  let res = await fetch(`https://gurugpt.cyclic.app/gpt4?prompt=${encodeURIComponent(text)}&model=llama`);
  let json = await res.json();

  if (json && json.data) {
    const answer = json.data;

    m.reply(`≡ *RESPUESTA*
    
▢ *Cuestion:* ${text}
▢ *Respuesta:* ${answer}`);
  } else {
    throw 'No se recibió respuesta válida de la API.';
  }
};

handler.help = ['question'];
handler.tags = ['fun'];
handler.command = ['question', 'q' ,'cuestionarse' ,'preguntar'];

export default handler;
