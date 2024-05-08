import axios from "axios";

function formatUptime(uptime) {
  const days = Math.floor(uptime / 86400);
  const hours = Math.floor((uptime % 86400) / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);

  return `${days}𝙳 ${hours}𝙷 ${minutes}𝙼 ${seconds}𝚂`;
}

let handler = async (m, { conn }) => {
  try {
    const uptime = process.uptime();
    const uptimeString = formatUptime(uptime);

    const imgUrl = "https://i.imgur.com/rbRGvNu.jpeg";
    const responseImg = await axios.get(imgUrl, {
      responseType: "arraybuffer",
    });

    await conn.sendFile(
      m.chat,
      responseImg.data,
      "thumbnail.png",
      `🕒 𝚃𝚒𝚎𝚖𝚙𝚘 𝚊𝚌𝚝𝚒𝚟𝚘 𝚍𝚎𝚕 𝚋𝚘𝚝: ${uptimeString}\n\n\`𝚁𝙴𝙼-𝙱𝙾𝚃 𝚋𝚢 𝙶𝚊𝚋𝚛𝚒𝚎𝚕 𝙲𝚞𝚛𝚒\``,
      m,
    );

    await m.react("✅");
  } catch (error) {
    console.error(error);
    await m.reply("Hubo un error al enviar la imagen.");
  }
};

handler.help = ["listonline"];
handler.tags = ["owner"];
handler.command = ["runtime", "uptime", "activo"];
handler.owner = false;
handler.register = true;

export default handler;
