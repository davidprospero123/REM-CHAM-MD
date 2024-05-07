import axios from "axios";

let handler = async (m, { conn, args }) => {
  try {
    let id = args?.[0]?.match(/\d+\-\d+@g.us/) || m.chat;

    const participantesUnicos = Object.values(conn.chats[id]?.messages || {})
      .map((item) => item.key.participant)
      .filter((value, index, self) => self.indexOf(value) === index);

    const participantesOrdenados = participantesUnicos.sort((a, b) =>
      a.split("@")[0].localeCompare(b.split("@")[0]),
    );

    const listaEnLinea =
      participantesOrdenados
        .map((k, i) => `*${i + 1}.* @${k.split("@")[0]}`)
        .join("\n") || "𝙽𝚘 𝚑𝚊𝚢 𝚞𝚜𝚞𝚊𝚛𝚒𝚘𝚜 𝚎𝚗 𝚕í𝚗𝚎𝚊 𝚎𝚗 𝚎𝚜𝚝𝚎 𝚖𝚘𝚖𝚎𝚗𝚝𝚘 :c.";

    const imgUrl = "https://i.imgur.com/rbRGvNu.jpeg";
    const responseImg = await axios.get(imgUrl, {
      responseType: "arraybuffer",
    });

    await conn.sendFile(
      m.chat,
      responseImg.data,
      "thumbnail.png",
      `*🌐 𝙻𝚒𝚜𝚝𝚊 𝚍𝚎 𝚞𝚜𝚞𝚊𝚛𝚒𝚘𝚜 𝚎𝚗 𝚕í𝚗𝚎𝚊 𝚊𝚑𝚘𝚛𝚊 ♡:*\n${listaEnLinea}\n\n\`REM-BOT by curi\``,
      m,
      {
        contextInfo: { mentionedJid: participantesOrdenados },
      },
    );

    await m.react("✅");
  } catch (error) {
    console.error(error);
    await m.reply("𝙷𝚞𝚋𝚘 𝚞𝚗 𝚎𝚛𝚛𝚘𝚛 𝚊𝚕 𝚎𝚗𝚟𝚒𝚊𝚛 𝚕𝚊 𝚒𝚖𝚊𝚐𝚎𝚗.");
  }
};

handler.help = ["listonline"];
handler.tags = ["owner"];
handler.command = ["listonline", "online", "linea", "enlinea"];
handler.owner = false;
handler.mods = false;
handler.premium = false;
handler.group = true;
handler.private = false;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;
handler.register = true;

export default handler;
