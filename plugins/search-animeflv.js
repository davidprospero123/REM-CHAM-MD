// EL CODIGO COMO LA API FUE ECHO POR GABRIEL CURI, SI VAS, USAR MIS PLUGINS DAME CREDITOS
// DAME CREDITOS P NO SEAS LACRA :v
import fetch from "node-fetch";

let handler = async (m, { conn, usedPrefix, text }) => {
  if (!text) return conn.reply(m.chat, "*𝙸𝚗𝚐𝚛𝚎𝚜𝚊 𝚎𝚕 𝚗𝚘𝚖𝚋𝚛𝚎 𝚍𝚎𝚕 𝚊𝚗𝚒𝚖𝚎 𝚚𝚞𝚎 𝚚𝚞𝚒𝚎𝚛𝚎𝚜 𝚋𝚞𝚜𝚌𝚊𝚛 :𝟹*", m);

  await m.react("💜");
  try {
    let response = await fetch(`https://animeflvapi.vercel.app/search?text=${encodeURIComponent(text)}`);
    let data = await response.json();

    if (!data.results.length) {
      return conn.reply(m.chat, "𝚂𝚒𝚗 𝚁𝚎𝚜𝚞𝚕𝚝𝚊𝚍𝚘𝚜, 𝙸𝚗𝚝𝚎𝚗𝚝𝚊 𝚋𝚞𝚜𝚌𝚊𝚛 𝚘𝚝𝚛𝚘 𝚝𝚒𝚝𝚞𝚕𝚘", m);
    }

    let txt = `*ᴀɴɪᴍᴇꜰʟᴠ - ꜱᴇᴀʀᴄʜ↻*`;
    for (let i = 0; i < (30 <= data.results.length ? 30 : data.results.length); i++) {
      txt += `\n\n`;
      txt += `	❧  *𝚃𝚒𝚝𝚞𝚕𝚘* : ${data.results[i].title}\n`;
      txt += `	❧  *𝚁𝚊𝚗𝚔𝚒𝚗𝚐* : ${data.results[i].rating || "N/A"}\n`;
      txt += `	❧  *𝚂𝚒𝚗𝚘𝚙𝚜𝚒𝚜* : ${data.results[i].synopsis || "No disponible"}\n`;
      txt += `	❧  *𝙸𝙳* :  ( *ɪᴍᴘᴏʀᴛᴀɴᴛᴇ ᴘᴀʀᴀ ʟᴀ ᴅᴇꜱᴄᴀʀɢᴀ* )\n *${data.results[i].id}*\n`;
    }

    await conn.sendFile(m.chat, "https://i.ibb.co/CvBHJSF/117895022-p0-master1200-1.jpg", "", txt, m, null, rcanal);
    await m.react("✅");
  } catch (error) {
    conn.reply(m.chat, "𝙷𝚞𝚋𝚘 𝚞𝚗 𝚎𝚛𝚛𝚘𝚛 𝚊𝚕 𝚋𝚞𝚜𝚌𝚊𝚛 𝚕𝚘𝚜 𝚍𝚊𝚝𝚘𝚜. 𝙸𝚗𝚝𝚎𝚗𝚝𝚊 𝚍𝚎 𝚗𝚞𝚎𝚟𝚘 𝚖á𝚜 𝚝𝚊𝚛𝚍𝚎.", m, null, rcanal);
    console.error(error);
  }
};

handler.help = ["animeflvsearch"];
handler.tags = ["search"];
handler.command = ["animeflvsearch", "aflvs" , 'animeflvs', 'animeflv'];
handler.register = true;

export default handler;
