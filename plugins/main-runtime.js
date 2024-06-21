import axios from "axios";

let handler = async (m, { conn }) => {
  try {
    const uptime = process.uptime();
    const muptime = `${Math.floor(uptime / 3600)} 𝙷𝚘𝚛𝚊𝚜, ${Math.floor((uptime % 3600) / 60)} 𝚖𝚒𝚗𝚞𝚝𝚘𝚜 𝚢 ${Math.floor(uptime % 60)} 𝚜𝚎𝚐𝚞𝚗𝚍𝚘𝚜`;

    const imgUrl = "https://i.imgur.com/rbRGvNu.jpeg";
    const responseImg = await axios.get(imgUrl, {
      responseType: "arraybuffer",
    });

    await conn.sendFile( m.chat, responseImg.data, "thumbnail.png", `🕒 𝙻𝚕𝚎𝚟𝚘 𝚊𝚌𝚝𝚒𝚟𝚊 : ${muptime} :3\n\n\`𝐑𝐄𝐌 - 𝐁𝐎𝐓 - 𝐁𝐘 - 𝐂𝐔𝐑𝐈\``, m, null, rcanal);

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
