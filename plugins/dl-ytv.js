
import fs from 'fs';
import os from 'os';
import fetch from 'node-fetch';

let limit = 500;
let handler = async (m, { conn, args, isPrems, isOwner, usedPrefix, command }) => {
  let chat = global.db.data.chats[m.chat];
  if (!args || !args[0]) throw `✳️ Ejemplo:\n${usedPrefix + command} https://youtu.be/YzkTFFwxtXI`;
  if (!args[0].match(/youtu/gi)) throw `❎ Verifica bien tu link de YouTube`;


  var ggapi = `https://vihangayt.me/download/ytmp4?url=${encodeURIComponent(args)}`

  const response = await fetch(ggapi);
  if (!response.ok) {
      console.log('Error al buscar la cancion:', response.statusText);
      throw 'Error al buscar la cancion';
  }
  const data = await response.json();

  const caption = `✼ ๑Y O U T U B E ๑ ✼

  ❏ Titulo: ${data.data.title}
  ❒ Link: ${args[0]}
  ❒ ᴄʀᴇᴀᴅᴏʀ ᴅᴇʟ ʙᴏᴛ ᴄᴜʀɪ
  ⊱─━⊱༻●༺⊰━─⊰`
 let vres = data.data.vid_360p

  let vid = await fetch(vres)
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