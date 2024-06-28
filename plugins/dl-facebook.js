import fg from 'api-dylux';

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) conn.reply(m.chat, `*𝙸𝚗𝚐𝚛𝚎𝚜𝚊 𝚞𝚗 𝚎𝚗𝚕𝚊𝚌𝚎 𝚍𝚎 𝙵𝚊𝚌𝚎𝚋𝚘𝚘𝚔 :𝟹*\n\n*_𝚎𝚓𝚎𝚖𝚙𝚕𝚘_*\n*${usedPrefix + command}* https://www.facebook.com/Ankursajiyaan/videos/981948876160874/?mibextid=rS40aB7S9Ucbxw6v`, m)

  const urlRegex = /^(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.watch)\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
  if (!urlRegex.test(args[0])) conn.reply(m.chat,'𝙿𝚘𝚛𝚏𝚊𝚟𝚘𝚛 𝚛𝚎𝚟𝚒𝚜𝚊 𝚀𝚞𝚎 𝙴𝚕 𝙻𝚒𝚗𝚔 𝚂𝚎𝚊 𝙳𝚎 𝙵𝚊𝚌𝚎𝚋𝚘𝚘𝚔 :𝟹', m)

  m.react(rwait);

  try {
    const result = await fg.fbdl(args[0]);
    const tex = `
⊱ ─── { *𝚁𝙴𝙼 - 𝙵𝙱* } ─── ⊰
↳ *𝚃𝚒𝚝𝚞𝚕𝚘:* ${result.title}
⊱ ────── {⋆♬⋆} ────── ⊰`;

    const response = await fetch(result.videoUrl);
    const arrayBuffer = await response.arrayBuffer();
    const videoBuffer = Buffer.from(arrayBuffer);

    conn.sendFile(m.chat, videoBuffer, 'fb.mp4', tex, m, null, rcanal);
    m.react(done);
  } catch (error) {
    console.log(error);
    m.reply('⚠️ Se produjo un error al procesar la solicitud. Por favor, inténtelo de nuevo más tarde.');
  }
};

handler.help = ['facebook <url>'];
handler.tags = ['downloader'];
handler.command = /^((facebook|fb)(downloder|dl)?)$/i;
handler.diamond = true;

export default handler;
