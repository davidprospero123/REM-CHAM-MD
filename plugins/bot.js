import axios from 'axios';

let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender];
  let name = conn.getName(m.sender);
  let taguser = '@' + m.sender.split('@s.whatsapp.net')[0];
  let av = `./Assets/mp3/${getRandom(["Rem1", "Rem2"])}.mp3`;

  const imgUrl = "https://i.imgur.com/R5EFCZa.jpeg"
  const responseImg = await axios.get(imgUrl, { responseType: 'arraybuffer' });

  let info = `Hola ${taguser} ¿Necesitas ayuda? escribe /ayuda`
  await conn.reply(m.chat, info, m, { contextInfo: { mentionedJid: [m.sender],forwardingScore: 256,
        isForwarded: true, externalAdReply: { title: botname, body: "𝚁𝙴𝙼𝙲𝙷𝙰𝙼-𝙱𝚈 𝙶𝙰𝙱𝚁𝙸𝙴𝙻", sourceUrl: fgyt, thumbnail: responseImg.data  }}})


  conn.sendMessage(m.chat, {audio: {url: av}, fileName: 'error.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
};

handler.customPrefix = /^(bot|rem)$/i;
handler.command = new RegExp();

export default handler;

 function getRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}
