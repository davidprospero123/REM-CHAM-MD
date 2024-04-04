import fs from 'fs';
import os from 'os';
import fetch from 'node-fetch';

let limit = 500;
let handler = async (m, { conn, args, isPrems, isOwner, usedPrefix, command }) => {
  let chat = global.db.data.chats[m.chat];
  if (!args || !args[0]) throw `✳️ _Ejemplo_:\n${usedPrefix + command} https://youtu.be/4c9ew0TSygg`;
  if (!args[0].match(/youtu/gi)) throw `❎ _Verifica bien tu link de YouTube_`;

  var gapi = `${rembot}/v1/ytmp4?url=${encodeURIComponent(args)}`

  var ggapi = `${rembot}/ytplay?url=${encodeURIComponent(args)}`

  const response = await fetch(ggapi);
  if (!response.ok) {
      console.log('Error al buscar la musica:', response.statusText);
      throw 'Error al buscar la musica';
  }
  const data = await response.json();

  const caption = ` ••๑⋯❀ Y O U T U B E ❀⋯⋅๑•• 
	  
  ❏ ᴛɪᴛᴜʟᴏ: ${data.result.title}
  ❏ ᴄᴀɴᴀʟ: ${data.result.channel}
  ❐ ᴅᴜʀᴀᴄɪᴏɴ: ${data.result.seconds} ꜱᴇɢᴜɴᴅᴏꜱ
  ❑ ᴠɪꜱɪᴛᴀꜱ: ${data.result.view}
  ❒ ᴘᴜʙʟɪᴄᴀᴅᴏ: ${data.result.publicDate}
  ❒ ʟɪɴᴋ: ${args[0]}
  ❒ ᴄʀᴇᴀᴅᴏʀ ᴅᴇʟ ʙᴏᴛ - ᴄᴜʀɪ
  
  ⊱─━⊱༻●༺⊰━─⊰`


  let vid = await fetch(gapi)
  const vidBuffer = await vid.buffer();

  conn.sendFile(
    m.chat,
    vidBuffer,
    `error.mp4`,
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
