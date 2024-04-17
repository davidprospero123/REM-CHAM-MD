import axios from 'axios';

let handler = async (m, { conn, usedPrefix }) => {
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let user = global.db.data.users[who];
    let username = conn.getName(who);

    if (!(who in global.db.data.users)) throw `🟨 𝙴𝚕 𝚞𝚜𝚞𝚊𝚛𝚒𝚘 𝚗𝚘 𝚎𝚜𝚝á 𝚎𝚗 𝚖𝚒 𝚋𝚊𝚜𝚎 𝚍𝚎 𝚍𝚊𝚝𝚘𝚜 :𝚌`;

    const line = '━━━━━━━━━━━━━━━━━';
    const spacer = '                   ';

    const walletMessage = `
${line}
👛 *𝙱𝚒𝚕𝚕𝚎𝚝𝚎𝚛𝚊 𝚍𝚎 ${username}* 👛
${line}

💰 *𝙾𝚁𝙾*: ${user.credit} 💰

${line}
📊 *𝚃𝚛𝚊𝚗𝚜𝚊𝚌𝚌𝚒𝚘𝚗𝚎𝚜 𝚁𝚎𝚌𝚒𝚎𝚗𝚝𝚎𝚜* 📊
(𝙿𝚛ó𝚡𝚒𝚖𝚊𝚖𝚎𝚗𝚝𝚎...)
${line}

🛒 *𝙲𝚘𝚖𝚊𝚗𝚍𝚘𝚜 𝚍𝚎 𝙴𝚌𝚘𝚗𝚘𝚖í𝚊* 
- *${usedPrefix}daily*: 𝚁𝚎𝚌𝚘𝚕𝚎𝚌𝚝𝚊 𝚝𝚞 𝚛𝚎𝚌𝚘𝚖𝚙𝚎𝚗𝚜𝚊 𝚍𝚒𝚊𝚛𝚒𝚊.
- *${usedPrefix}work*: 𝚃𝚛𝚊𝚋𝚊𝚓𝚊 𝚙𝚊𝚛𝚊 𝚐𝚊𝚗𝚊𝚛 𝙾𝚁𝙾.
- *${usedPrefix}transferir [𝚞𝚜𝚞𝚊𝚛𝚒𝚘] [𝚌𝚊𝚗𝚝𝚒𝚍𝚊𝚍]*: 𝚃𝚛𝚊𝚗𝚜𝚏𝚒𝚎𝚛𝚎 𝙶𝚘𝚕𝚍 𝚊 𝚘𝚝𝚛𝚘 𝚞𝚜𝚞𝚊𝚛𝚒𝚘.

${line}
🌟 *𝙾𝚝𝚛𝚊𝚜 𝙾𝚙𝚌𝚒𝚘𝚗𝚎𝚜* 🌟
${spacer}- *${usedPrefix}profile*: 𝙼𝚞𝚎𝚜𝚝𝚛𝚊 𝚝𝚞 𝚙𝚎𝚛𝚏𝚒𝚕.

📜 ¿𝙽𝚎𝚌𝚎𝚜𝚒𝚝𝚊𝚜 𝚊𝚢𝚞𝚍𝚊? 𝙿𝚛𝚞𝚎𝚋𝚊 ${usedPrefix}help
${line}
`;

    try {
        const imgUrl = 'https://i.imgur.com/Em0VBOJ.png';
        const responseImg = await axios.get(imgUrl, { responseType: 'arraybuffer' });
        await conn.sendFile(m.chat, responseImg.data, "thumbnail.jpg", walletMessage, m);
    } catch (e) {
        await conn.reply(m.chat, walletMessage, m);
    }
}

handler.help = ['wallet'];
handler.tags = ['economy'];
handler.command = ['wallet', 'gold', 'billetera'];
handler.register = true
handler.group = true

export default handler;
