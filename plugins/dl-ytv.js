import fetch from 'node-fetch';

let limit = 500;
let handler = async (m, { conn, args, usedPrefix, command }) => {
  let chat = global.db.data.chats[m.chat];
  if (!args || !args[0]) throw `✳️ _Ejemplo_:\n${usedPrefix + command} https://youtu.be/4c9ew0TSygg`;
  if (!args[0].match(/youtu/gi)) throw `❎ _Verifica bien tu link de YouTube_`;

  const apiUrl = 'https://delirius-api-oficial.vercel.app/api/ytmp4';
  const ggapi = `${apiUrl}?url=${encodeURIComponent(args[0])}`;

  const response = await fetch(ggapi);
  if (!response.ok) {
      console.log('Error al buscar el video:', response.statusText);
      throw 'Error al buscar el video';
  }
  
  const data = await response.json();
  const videoData = data.data;

  if (!videoData) {
    throw '𝙽𝚘 𝚜𝚎 𝚎𝚗𝚌𝚘𝚗𝚝𝚛𝚊𝚛𝚘𝚗 𝚍𝚊𝚝𝚘𝚜 𝚍𝚎 𝚟𝚒𝚍𝚎𝚘 𝚎𝚗 𝚕𝚊 𝚛𝚎𝚜𝚙𝚞𝚎𝚜𝚝𝚊 𝚍𝚎 𝚕𝚊 𝙰𝙿𝙸';
  }

  const caption = ` •⊱─━ 𝚈𝙾𝚄𝚃𝚄𝙱𝙴 ━─⊰• 
	  
  ❏ ᴛɪᴛᴜʟᴏ: ${videoData.title}
  ❏ ᴄᴀɴᴀʟ: ${videoData.author}
  ❐ ᴅᴜʀᴀᴄɪᴏɴ: ${videoData.duration} ꜱᴇɢᴜɴᴅᴏꜱ
  ❑ ᴠɪꜱɪᴛᴀꜱ: ${videoData.views}
  ❒ ᴘᴜʙʟɪᴄᴀᴅᴏ: ${videoData.publicDate}
  ❒ ʟɪɴᴋ: ${args[0]}
  ❒ ᴄʀᴇᴀᴅᴏʀ ᴅᴇʟ ʙᴏᴛ - ᴄᴜʀɪ
  
  ⊱─━⊱༻●༺⊰━─⊰`;

  const videoUrl = videoData.download.url;

  const videoResponse = await fetch(videoUrl);
  if (!videoResponse.ok) {
      console.log('Error al descargar el video:', videoResponse.statusText);
      throw 'Error al descargar el video';
  }
  
  const videoBuffer = await videoResponse.buffer();

  conn.sendFile(
    m.chat,
    videoBuffer,
    'video.mp4',
    caption,
    m,
    false,
    { asDocument: chat.useDocument }
  );

};

handler.help = ['ytmp4 <yt-link>'];
handler.tags = ['downloader'];
handler.command = ['ytmp4', 'video', 'ytv'];
handler.diamond = false;

export default handler;
