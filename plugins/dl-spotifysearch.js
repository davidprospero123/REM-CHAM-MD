import fetch from "node-fetch";

let handler = async (m, { conn, usedPrefix, text }) => {
  if (!text)
    return conn.reply(
      m.chat,
      "*💚 𝙸𝚗𝚐𝚛𝚎𝚜𝚊 𝚕𝚘 𝚚𝚞𝚎 𝚍𝚎𝚜𝚎𝚊𝚜 𝚋𝚞𝚜𝚌𝚊𝚛 𝚎𝚗 𝚂𝚙𝚘𝚝𝚒𝚏𝚢.*",
      m,
    );
  await m.react("💚");
  let results;
  try {
    results = await fetch(`https://delirius-api-oficial.vercel.app/api/spotify?q=${encodeURIComponent(text)}`).then(res => res.json());
  } catch (error) {
    console.error(error);
    return conn.reply(m.chat, "Ocurrió un error al buscar en Spotify.", m);
  }
  
  if (!results || !results.data || results.data.length === 0)
    return conn
      .reply(
        m.chat,
        "𝙽𝚘 𝚜𝚎 𝚎𝚗𝚌𝚘𝚗𝚝𝚛𝚊𝚛𝚘𝚗 𝚛𝚎𝚜𝚞𝚕𝚝𝚊𝚍𝚘𝚜, 𝚒𝚗𝚝𝚎𝚗𝚝𝚊 𝚌𝚘𝚗 𝚘𝚝𝚛𝚘 𝚝é𝚛𝚖𝚒𝚗𝚘 𝚍𝚎 𝚋ú𝚜𝚚𝚞𝚎𝚍𝚊.",
        m,
      )
      .then((_) => m.react("❌"));

  let txt = `*Ｓｐｏｔｉｆｙ-Ｓｅａｒｃｈ ⇄ Ⅰ<    ⅠⅠ    >Ⅰ   ↻*`;
  for (let i = 0; i < (results.data.length >= 10 ? 10 : results.data.length); i++) {
    const track = results.data[i];
    txt += `\n\n`;
    txt += `	❧  *ᴛɪᴛʟᴇ* : ${track.title}\n`;
    txt += `	❧  *ᴀʀᴛɪsᴛ* : ${track.artist}\n`;
    txt += `	❧  *ᴅᴜʀᴀᴄɪÓɴ* : ${track.duration}\n`;
    txt += `	❧  *ᴘᴏᴘᴜʟᴀʀɪᴅᴀᴅ* : ${track.popularity}\n`;
    txt += `	❧  *ᴘᴜʙʟɪᴄᴀᴅᴏ* : ${track.publish}\n`;
    txt += `	❧  *ʟɪɴᴋ* : ${track.url}\n`;
  }
  await conn.reply(m.chat, txt, m);
  await m.react("✅");
};
handler.help = ["spotifysearch"];
handler.tags = ["search"];
handler.command = ["spotifysearch", "spotisearch", "spotifys", "spts"];
handler.register = true;
export default handler;
