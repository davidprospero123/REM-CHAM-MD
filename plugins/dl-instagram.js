import axios from 'axios';

let handler = async (m, { conn, args }) => {
  if (!args[0]) return conn.reply(m.chat, 'Ingresa un enlace de Instagram', m);
  try {
    let response = await axios.get(`https://rembotapi.vercel.app/api/instagramdl?url=${encodeURIComponent(args[0])}`);
    let result = response.data;
    if (!result.success || !result.data) {
      return conn.reply(m.chat, 'No se pudo obtener el video, intenta nuevamente', m);
    }
    let videoLink = result.data.downloads[0].video_link;
    let title = result.data.title;
    let likeCount = result.data.likeCount;
    let commentCount = result.data.commentCount;
    await conn.sendMessage(m.chat, {
      video: { url: videoLink },
      caption: `🎬 ＴＩＴＵＬＯ: ${title}\n👍 ʟɪᴋᴇꜱ: ${likeCount}\n💬 ᴄᴏᴍᴇɴᴛᴀʀɪᴏꜱ: ${commentCount}`,
      mimetype: 'video/mp4',
      fileName: 'igdl.mp4'
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    conn.reply(m.chat, 'Hubo un error al procesar el video, intenta nuevamente', m);
  }
}

handler.command = ['ig','instagram'];

export default handler;
