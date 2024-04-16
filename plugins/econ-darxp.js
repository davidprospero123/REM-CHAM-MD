import axios from 'axios';

let handler = async (m, { conn, usedPrefix, args }) => {
    let target = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
    let user = global.db.data.users[target];
    let username = m.sender ? conn.getName(m.sender) : null;

    if (!user) 
        throw `🟨 El usuario no está registrado en la base de datos`;

    let xpToAdd = args[1] ? parseInt(args[1]) : 1;

    if (isNaN(xpToAdd) || xpToAdd < 1) 
        throw 'Por favor, introduce una cantidad válida de XP para añadir. Por ejemplo: .darxp @usuario 50';

    user.exp += xpToAdd;

    let message = `
━━━━━━━━━━━━━━━━━
🌟 *DANDO XP* 🌟
━━━━━━━━━━━━━━━━━
👤 *Usuario*: ${username}
💬 *XP añadida*: ${xpToAdd}
━━━━━━━━━━━━━━━━━
`.trim();

    try {
        const imgUrl = 'https://i.imgur.com/Em0VBOJ.png';
        const responseImg = await axios.get(imgUrl, { responseType: 'arraybuffer' });
        await conn.sendFile(m.chat, responseImg.data, "thumbnail.jpg", message, m);
    } catch (e) {
        await conn.reply(m.chat, message, m);
    }
}

handler.help = ['darxp', 'addxp'];
handler.tags = ['economy'];
handler.command = ['darxp', 'addxp'];

export default handler;
