import axios from 'axios';

async function handler(m, { conn, usedPrefix }) {
  try {
    const connectedUsers = new Set();
    const addedNumbers = new Set();
    global.conns
      .filter(conn => conn.user && conn.state !== "close")
      .forEach(user => {
        const userJid = user.user.jid.replace(/[^0-9]/g, "");
        if (!addedNumbers.has(userJid)) {
          addedNumbers.add(userJid);
          const userName = user.user.name || "ʀᴇᴍ-ᴄʜᴀᴍ-ʙᴏᴛ";
          connectedUsers.add(`Wa.me/${userJid}?text=${usedPrefix}menu (${userName})`);
        }
      });

    const connectedUserCount = connectedUsers.size;
    if (connectedUserCount > 0) {
      const imageBuffer = await axios.get("https://i.imgur.com/APg4Nl7.jpg", { responseType: "arraybuffer" });
      await conn.sendFile(m.chat, imageBuffer.data, 'image.jpg', '⌛ _𝘾𝘼𝙍𝙂𝘼𝙉𝘿𝙊..._▰▰▰▱▱▱▱▱ 𝘚𝘜𝘉-𝘉𝘖𝘛𝘚');

      const userList = [...connectedUsers].join(`\n`);
      await m.reply(`𝐄𝐒𝐓𝐎𝐒 𝐒𝐎𝐍 𝐋𝐎𝐒 𝐒𝐔𝐁 𝐁𝐎𝐓𝐒 𝐀𝐂𝐓𝐈𝐕𝐎𝐒 𝐃𝐄 𝐑𝐄𝐌:\n${userList}`);
    } else {
      await m.reply("");
    }
  } catch (error) {
    console.error("Error:", error);
    await m.reply("Ocurrió un error al procesar la solicitud.");
  }
}

handler.command = ["listjadibot", "bots"];
handler.help = ["bots"];
handler.tags = ["serbot", "jadibot"];

export default handler;
