import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, args, command, text }) => {
  if (!text) throw `ᴅᴇʙᴇꜱ ᴘʀᴏᴘᴏʀᴄɪᴏɴᴀʀ ʟᴀ ᴜʀʟ ᴅᴇ ᴄᴜᴀʟQᴜɪᴇʀ ᴠɪᴅᴇᴏ, ᴘᴜʙʟɪᴄᴀᴄɪÓɴ, ᴄᴀʀʀᴇᴛᴇ ᴏ ɪᴍᴀɢᴇɴ ᴅᴇ ɪɴꜱᴛᴀɢʀᴀᴍ.`;
  m.reply(wait);

  let res;
  try {
    res = await fetch(`${gurubot}/igdlv1?url=${text}`);
  } catch (error) {
    throw `ᴏᴄᴜʀʀɪÓ ᴜɴ ᴇʀʀᴏʀ: ${error.message}`;
  }

  let api_response = await res.json();

  if (!api_response || !api_response.data) {
    throw `ɴᴏ ꜱᴇ ᴇɴᴄᴏɴᴛʀÓ ɴɪɴɢÚɴ ᴠɪᴅᴇᴏ ᴏ ɪᴍᴀɢᴇɴ ᴏ ʀᴇꜱᴘᴜᴇꜱᴛᴀ ɴᴏ ᴠÁʟɪᴅᴀ ᴅᴇ ʟᴀ ᴀᴘɪ.`;
  }

  const mediaArray = api_response.data;

  for (const mediaData of mediaArray) {
    const mediaType = mediaData.type;
    const mediaURL = mediaData.url_download;

    let cap = `ᴀQᴜÍ ᴇꜱᴛÁ ᴇʟ ${mediaType.toUpperCase()} >,<`;

    if (mediaType === 'video') {

      conn.sendFile(m.chat, mediaURL, 'instagram.mp4', cap, m);
    } else if (mediaType === 'image') {

      conn.sendFile(m.chat, mediaURL, 'instagram.jpg', cap, m);
    }
  }
};

handler.help = ['instagram'];
handler.tags = ['downloader'];
handler.command = /^(instagram|igdl|ig|insta)$/i;

export default handler;
