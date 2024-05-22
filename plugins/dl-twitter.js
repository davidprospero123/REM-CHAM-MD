import fg from 'api-dylux';

let handler = async (message, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `📌 𝙴𝚓𝚎𝚖𝚙𝚕𝚘: \n*${usedPrefix + command}* https://twitter.com/fernandavasro/status/1569741835555291139?t=ADxk8P3Z3prq8USIZUqXCg&s=19`;

  message.react(rwait);

  try {
    let { SD, HD, desc, thumb, audio } = await fg.twitter(args[0]);
    
    let template = `
┌─⊷ *_𝚃𝚆𝙸𝚃𝚃𝙴𝚁 𝙳𝙻_*
├─📜 𝙳𝚎𝚜𝚌𝚛𝚒𝚙𝚌𝚒𝚘𝚗: ${desc}
├─ 𝚁𝙴𝙼-𝙱𝙾𝚃 𝚋𝚢 𝚌𝚞𝚛𝚒
└────────────────────`;

    conn.sendFile(message.chat, HD, 'twitter.mp4', template, message);
    message.react(done);
  } catch (error) {
    message.reply(`✳️ 𝚅𝚎𝚛𝚒𝚏𝚒𝚌𝚊 𝚋𝚒𝚎𝚗 𝚝𝚞 𝚎𝚗𝚕𝚊𝚌𝚎 𝚍𝚎 𝚃𝚠𝚒𝚝𝚝𝚎𝚛`);
  } 
}

handler.help = ['twitter'].map(command => command + ' <url>');
handler.tags = ['downloader'];
handler.command = /^(twitter|tw)$/i;
handler.diamond = true;

export default handler;
