import fetch from "node-fetch";

let handler = async (m, { conn, usedPrefix, text }) => {
  if (!text) return conn.reply(m.chat,"*💚 𝙸𝚗𝚐𝚛𝚎𝚜𝚊 𝚕𝚘 𝚚𝚞𝚎 𝚍𝚎𝚜𝚎𝚊𝚜 𝚋𝚞𝚜𝚌𝚊𝚛 𝚎𝚗 𝚂𝚙𝚘𝚝𝚒𝚏𝚢.*", m);
  await m.react("💚");
  let results;
  try {
    results = await fetch(`https://thepapusteamspotify.koyeb.app/api/spotify/search?q=${encodeURIComponent(text)}`).then(res => res.json());
  } catch (error) {
    console.error(error);
    await m.react("❌");
    return conn.reply(m.chat,"𝙷𝚞𝚋𝚘 𝚞𝚗 𝚎𝚛𝚛𝚘𝚛 𝚊𝚕 𝚌𝚘𝚗𝚜𝚞𝚕𝚝𝚊𝚛 𝚎𝚗 𝚂𝚙𝚘𝚝𝚒𝚏𝚢.", m);
  }

  if (!results || !results.data || results.data.tracks.length === 0)
    return conn.reply(m.chat,"𝙽𝚘 𝚜𝚎 𝚎𝚗𝚌𝚘𝚗𝚝𝚛𝚊𝚛𝚘𝚗 𝚛𝚎𝚜𝚞𝚕𝚝𝚊𝚍𝚘𝚜, 𝚒𝚗𝚝𝚎𝚗𝚝𝚊 𝚌𝚘𝚗 𝚘𝚝𝚛𝚘 𝚝é𝚛𝚖𝚒𝚗𝚘 𝚍𝚎 𝚋ú𝚜𝚚𝚞𝚎𝚍𝚊.", m).then((_) => m.react("❌"));

  let txt = `*Ｓｐｏｔｉｆｙ-Ｓｅａｒｃｈ \n ⇄ Ⅰ<    ⅠⅠ    >Ⅰ   ↻*`;
  for (let i = 0; i < (results.data.tracks.length >= 10 ? 10 : results.data.tracks.length); i++) {
    const track = results.data.tracks[i];
    txt += `\n\n`;
    txt += `	❧  *𝚃𝚒𝚝𝚞𝚕𝚘* : ${track.name}\n`;
    txt += `	❧  *𝙰𝚛𝚝𝚒𝚜𝚝𝚊* : ${track.artists}\n`;
    txt += `	❧  *Á𝚕𝚋𝚞𝚖* : ${track.album}\n`;
    txt += `	❧  *𝙻𝚒𝚗𝚔* : ${track.external_urls.spotify}\n`;
  }

  conn.reply(m.chat, txt, m, rcanal);
};

handler.help = ["spotifysearch"];
handler.tags = ["search"];
handler.command = /^(spotifysearch)$/i;

export default handler;
