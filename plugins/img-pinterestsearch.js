import axios from "axios";

let handler = async (m, { conn, text }) => {
  if (!text)
    return conn.reply(
      m.chat,
      "*🚩 Ingresa lo que deseas buscar en Pinterest.*",
      m,
    );
  await m.react("💙");
  let response = await axios.get(`https://delirius-api-oficial.vercel.app/api/pinterest?text=${encodeURIComponent(text)}`);
  let results = response.data.result;
  if (!results.length)
    return conn
      .reply(
        m.chat,
        "No se encontraron resultados, intenta con otro término de búsqueda.",
        m,
      )
      .then((_) => m.react("✖️"));

  for (let i = 0; i < (results.length >= 10 ? 10 : results.length); i++) {
    let txt = `*Ｐｉｎｔｅｒｅｓｔ- ⇄     ⅠⅠ    *`;
    txt += `\n\n`;
    txt += `	❧  *ᴛɪᴛᴜʟᴏ* : ${results[i].title || "×"}\n`;
    txt += `	❧  *ᴄʀᴇᴀᴅᴏ ᴇɴ* : ${results[i].created_at}\n`;
    txt += `	❧  *ᴜʀʟ* : ${results[i].media.url}\n`;
    txt += '\n\n`REM-BOT Ⴆყ GαႦɾιҽʅ Cυɾι`';
    await conn.sendFile(m.chat, results[i].media.url, "", txt, m);
  }

  await m.react("✅");
};
handler.help = ["pinterestsearch"];
handler.tags = ["search"];
handler.command = ["pinterest2", "pintsearch"];
handler.register = true;
export default handler;
