import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

let handler = async (m, { conn, text, args, isPrems, isOwner, usedPrefix, command }) => {
  if (!args || !args[0]) return conn.reply(m.chat, `*𝙸𝚗𝚐𝚛𝚎𝚜𝚊 𝚞𝚗 𝙻𝚒𝚗𝚔 𝚍𝚎 𝚈𝚘𝚞𝚝𝚞𝚋𝚎*\n\n*_𝚎𝚓𝚎𝚖𝚙𝚕𝚘_*\n*${usedPrefix + command}* https://youtu.be/YzkTFFwxtXI`, m)
  if (!args[0].match(/youtu/gi)) return conn.reply(m.chat,`𝙿𝚘𝚛𝚏𝚊𝚟𝚘𝚛 𝚛𝚎𝚟𝚒𝚜𝚊 𝚚𝚞𝚎 𝚂𝚎𝚊 𝚄𝚗 𝙻𝚒𝚗𝚔 𝙳𝚎 𝚈𝚘𝚞𝚝𝚞𝚋𝚎 :3`, m)

  m.react(rwait); 

  try {
    let q = '128kbps'; 
    let v = args[0]; 
    const yt = await youtubedl(v).catch(async () => await youtubedlv2(v)); 
    const dl_url = await yt.audio[q].download(); 
    const title = await yt.title; 

    conn.sendFile(m.chat, dl_url, title + '.mp3', null,  m, false, { mimetype: 'audio/mpeg' });

    m.react(xmoji); 
  } catch {
    await m.react(error);
  }
};

handler.help = ['ytmp3 <url>']
handler.tags = ['downloader']
handler.command = ['ytmp3', 'yta'] 

export default handler

