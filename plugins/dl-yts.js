import yts from "yt-search";

let handler = async (m, { conn, usedPrefix, text }) => {
  if (!text) return conn.reply(m.chat,"*𝙸𝚗𝚐𝚛𝚎𝚜𝚊 𝚎𝚕 𝚝𝚎𝚡𝚝𝚘 𝚍𝚎 𝚕𝚘 𝚚𝚞𝚎 𝚚𝚞𝚒𝚎𝚛𝚎𝚜 𝚋𝚞𝚜𝚌𝚊𝚛 𝚎𝚗 𝚢𝚘𝚞𝚝𝚞𝚋𝚎 :𝟹*", m, );
  await m.react("💙");
  let results = await yts(text);
  let res = results.all.map((v) => v).filter((v) => v.type == "video");
  if (!res.length) return conn.reply(m.chat,"𝚂𝚒𝚗 𝚁𝚎𝚜𝚞𝚕𝚝𝚊𝚍𝚘𝚜, 𝙸𝚗𝚝𝚎𝚗𝚝𝚊 𝙱𝚞𝚜𝚌𝚊𝚗𝚍𝚘 𝙾𝚝𝚛𝚊 𝚌𝚘𝚜𝚊",m,)
  let txt = `*ＹｏｕＴｕｂｅ-Ｓｅａｒｃｈ ⇄ Ⅰ<    ⅠⅠ    >Ⅰ   ↻*`;
  for (let i = 0; i < (30 <= res.length ? 30 : res.length); i++) {
    txt += `\n\n`;
    txt += `	❧  *𝚃𝚒𝚝𝚞𝚕𝚘* : ${res[i].title}\n`;
    txt += `	❧  *𝙳𝚞𝚛𝚊𝚌𝚒𝚘𝚗* : ${res[i].timestamp || "×"}\n`;
    txt += `	❧  *𝙿𝚞𝚋𝚕𝚒𝚌𝚊𝚍𝚘* : ${res[i].ago}\n`;
    txt += `	❧  *𝙰𝚞𝚝𝚘𝚛* : ${res[i].author.name || "×"}\n`;
    txt += `	❧  *𝚄𝚛𝚕* : ${"https://youtu.be/" + res[i].videoId}\n`;
  }
  await conn.sendFile(m.chat, res[0].image, "", txt, m, null, rcanal);
  await m.react("✅");
};
handler.help = ["ytsearch"];
handler.tags = ["search"];
handler.command = ["ytsearch", "yts"];
handler.register = true;
export default handler;
