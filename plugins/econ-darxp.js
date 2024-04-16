import axios from 'axios';

let handler = async (m, { conn, usedPrefix, args }) => {
    let target = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
    let user = global.db.data.users[target];
    let username = m.sender ? conn.getName(m.sender) : null;

    if (!user) 
        throw `🟨 𝙴𝚕 𝚞𝚜𝚞𝚊𝚛𝚒𝚘 𝚗𝚘 𝚎𝚜𝚝á 𝚛𝚎𝚐𝚒𝚜𝚝𝚛𝚊𝚍𝚘 𝚎𝚗 𝚕𝚊 𝚋𝚊𝚜𝚎 𝚍𝚎 𝚍𝚊𝚝𝚘𝚜`;

    let xpToAdd = args[1] ? parseInt(args[1]) : 1;

    if (isNaN(xpToAdd) || xpToAdd < 1) 
        throw '𝙿𝚘𝚛 𝚏𝚊𝚟𝚘𝚛, 𝚒𝚗𝚝𝚛𝚘𝚍𝚞𝚌𝚎 𝚞𝚗𝚊 𝚌𝚊𝚗𝚝𝚒𝚍𝚊𝚍 𝚟á𝚕𝚒𝚍𝚊 𝚍𝚎 𝚇𝙿 𝚙𝚊𝚛𝚊 𝚊ñ𝚊𝚍𝚒𝚛. 𝙿𝚘𝚛 𝚎𝚓𝚎𝚖𝚙𝚕𝚘: .𝚍𝚊𝚛𝚡𝚙 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘 𝟻𝟶';

    user.exp += xpToAdd;

    
    const emojis = ['👍', '👏', '🎉', '💼', '💰'];

    let message = `
━━━━━━━━━━━━━━━━━━━━
🌟 *𝙳𝙰𝙽𝙳𝙾 𝚇𝙿* 🌟
━━━━━━━━━━━━━━━━━━━━
👤 *𝚄𝚜𝚞𝚊𝚛𝚒𝚘*: ${username}
💬 *𝚇𝙿 𝚊ñ𝚊𝚍𝚒𝚍𝚊*: ${xpToAdd}
━━━━━━━━━━━━━━━━━━━━
`.trim();

    try {
        const imgUrl = 'https://i.imgur.com/Em0VBOJ.png';
        const responseImg = await axios.get(imgUrl, { responseType: 'arraybuffer' });
        await conn.sendFile(m.chat, responseImg.data, "thumbnail.jpg", message, m);
    } catch (e) {
        await conn.reply(m.chat, message, m);
    }

    
    for (const emoji of emojis) {
        await m.react(emoji);
    }
}

handler.help = ['darxp', 'addxp'];
handler.tags = ['economy'];
handler.command = ['darxp', 'addxp'];

export default handler;
