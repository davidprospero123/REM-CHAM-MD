//thanks to inrl:https://github.com/inrl-official
import fetch from 'node-fetch';

let handler = async (m, { text, usedPrefix, command }) => {
  if (command === 'tempmail') {
    try {
      const response = await fetch('https://inrl-web-fkns.onrender.com/api/getmail?apikey=inrl');
      const data = await response.json();

      if (data.status && data.result && data.result.length > 0) {
        const tempMails = data.result.join('\n');
        const replyMessage = `*Direcciones de correo electrónico temporales:*\n\n${tempMails}\n\n usa \`\`\`\.checkmail <dirección de correo>\`\`\`\ si desea verificar la bandeja de entrada de cualquier correo temporal utilizado desde arriba`;
        m.reply(replyMessage);
      } else {
        m.reply('No se encontraron direcciones de correo electrónico temporales.');
      }
    } catch (error) {
      console.error('Error:', error);
      m.reply('No se pudieron recuperar las direcciones de correo electrónico temporales.');
    }
  } else if (command === 'checkmail') {
    if (!text && !(m.quoted && m.quoted.text)) {
      m.reply('Por favor proporcione algún texto o cite un mensaje para obtener una respuesta..');
      return;
    }

    if (!text && m.quoted && m.quoted.text) {
      text = m.quoted.text;
    } else if (text && m.quoted && m.quoted.text) {
      text = `${text} ${m.quoted.text}`;
    }

    try {
      const response = await fetch(`https://inrl-web-fkns.onrender.com/api/getmailinfo?email=${encodeURIComponent(text)}&apikey=inrl`);
      const data = await response.json();

      if (data.status && data.result && data.result.length > 0) {
        const messages = data.result.map((message) => {
          return `
*From:* ${message.from}
*Subject:* ${message.subject}
*Date:* ${message.date}
*Body:*
${message.text}
          `;
        }).join('\n\n---\n\n');
        const replyMessage = `*Mensajes in* ${text}:\n\n${messages}`;
        m.reply(replyMessage);
      } else {
        m.reply(`No se encontraron mensajes en ${text}.`);
      }
    } catch (error) {
      console.error('Error:', error);
      m.reply(`No se pudieron verificar los mensajes en ${text}.`);
    }
  }
};
handler.help = ['tempmail']
handler.tags = ['tools']
handler.command = ['tempmail', 'checkmail',' correotemporal'];
handler.diamond = false;

export default handler;
