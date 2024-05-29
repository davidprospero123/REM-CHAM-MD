import axios from "axios";

let handler = async (m, { conn }) => {
  try {
    const uptime = process.uptime();
    const muptime = `${Math.floor(uptime / 3600)} 𝙷𝚘𝚛𝚊𝚜, ${Math.floor((uptime % 3600) / 60)} 𝚖𝚒𝚗𝚞𝚝𝚘𝚜 𝚢 ${Math.floor(uptime % 60)} 𝚜𝚎𝚐𝚞𝚗𝚍𝚘𝚜`;

    const imgUrl = "https://i.imgur.com/rbRGvNu.jpeg";
    const responseImg = await axios.get(imgUrl, {
      responseType: "arraybuffer",
    });

    await conn.sendFile(
      m.chat,
      responseImg.data,
      "thumbnail.png",
      `🕒 𝚃𝙸𝙴𝙼𝙿𝙾 𝙰𝙲𝚃𝙸𝚅𝙾 𝙳𝙴𝙻 𝙱𝙾𝚃: ${muptime}\n\n\`𝚁𝙴𝙼-𝙱𝙾𝚃 𝙱𝚈 𝙶𝙰𝙱𝚁𝙸𝙴𝙻 𝙲𝚄𝚁𝙸\``,
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
