import axios from "axios";

let handler = async (m, { conn, usedPrefix, text }) => {
  if (!text)
    return conn.reply(m.chat, "*𝙸𝚗𝚐𝚛𝚎𝚜𝚊 𝚕𝚘 𝚚𝚞𝚎 𝚍𝚎𝚜𝚎𝚊𝚜 𝚋𝚞𝚜𝚌𝚊𝚛 𝚎𝚗 𝚃𝚒𝚔𝚃𝚘𝚔.*", m);
  await m.react("💙");
  try {
    let response = await axios.get(`https://delirius-api-oficial.vercel.app/api/tiktoksearch?query=${encodeURIComponent(text)}`);
    let results = response.data.meta;
    if (!results.length) return conn.reply(m.chat, "𝙽𝚘 𝚎𝚗𝚌𝚘𝚗𝚝𝚛𝚎 𝚛𝚎𝚜𝚞𝚕𝚝𝚊𝚍𝚘𝚜, 𝚒𝚗𝚝𝚎𝚗𝚝𝚊 𝚋𝚞𝚜𝚌𝚊𝚗𝚍𝚘 𝚘𝚝𝚛𝚊 𝚌𝚘𝚜𝚊 :𝟹", m).then((_) => m.react("✖️"));
    
    let txt = `*ＴｉｋＴｏｋ－Ｓｅａｒｃｈ \n ⇄ Ⅰ<    ⅠⅠ    >Ⅰ   ↻*\n\n`;
    for (let i = 0; i < (30 <= results.length ? 30 : results.length); i++) {
      let video = results[i];
      txt += `\n`;
      txt += `	❧  *𝚃𝚒𝚝𝚞𝚕𝚘* : ${video.title}\n`;
      txt += `	❧  *𝙳𝚞𝚛𝚊𝚌𝚒𝚘𝚗* : ${video.duration} segundos\n`;
      txt += `	❧  *𝚄𝚛𝚕* : ${video.url}\n`;
      txt += `	❧  *𝙰𝚞𝚝𝚘𝚛* : ${video.author.username || "×"}\n`;
      txt += `	❧  *𝚅𝚒𝚜𝚒𝚝𝚊𝚜* : ${video.play}\n`;
      txt += `	❧  *𝙲𝚘𝚛𝚊𝚣𝚘𝚗𝚎𝚜* : ${video.like}\n\n`;
    }
    const url = "https://i.imgur.com/BO4TfMR.png"; 
    const responseImg = await axios.get(url, { responseType: 'arraybuffer' });
    await conn.sendFile(m.chat, responseImg.data, "thumbnail.png", txt, m, null, rcanal); 
    await m.react("✅");
  } catch {
    m.react("❌");
  }
};
handler.help = ["tiktoksearch"];
handler.tags = ["search"];
handler.command = ["tiktoksearch", "tiks"];
handler.register = true;
export default handler;
