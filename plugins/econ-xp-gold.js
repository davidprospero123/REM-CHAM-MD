import axios from 'axios';
import { canLevelUp, xpRange } from '../lib/levelling.js';

const sendMessageWithImage = async (conn, m, message) => {
    const imgUrl = 'https://i.imgur.com/xoOa8pn.png';
    try {
        const responseImg = await axios.get(imgUrl, { responseType: 'arraybuffer' });
        await conn.sendFile(m.chat, responseImg.data, "thumbnail.jpg", message, m);
    } catch (error) {
        console.error(error);
        await conn.reply(m.chat, message, m);
    }
}

const decorLine = '══════════════════════════════';

let handler = async (m, { conn, args }) => {
    let name = conn.getName(m.sender);
    let user = global.db.data.users[m.sender];

    if (!args[0] || isNaN(args[0]) || args[0] < 1) {
        throw '𝙿𝚘𝚛 𝚏𝚊𝚟𝚘𝚛, 𝚒𝚗𝚐𝚛𝚎𝚜𝚊 𝚞𝚗𝚊 𝚌𝚊𝚗𝚝𝚒𝚍𝚊𝚍 𝚟á𝚕𝚒𝚍𝚊 𝚍𝚎 𝚘𝚛𝚘 𝚙𝚊𝚛𝚊 𝚌𝚘𝚖𝚙𝚛𝚊𝚛 𝚎𝚡𝚙𝚎𝚛𝚒𝚎𝚗𝚌𝚒𝚊.';
    }

    let goldSpent = parseInt(args[0]);
    let experienceReward = goldSpent * 0.5; // Ajusta este factor según tus necesidades

    if (user.credit < goldSpent) {
        throw '𝙽𝚘 𝚝𝚒𝚎𝚗𝚎𝚜 𝚜𝚞𝚏𝚒𝚌𝚒𝚎𝚗𝚝𝚎 𝚘𝚛𝚘 𝚙𝚊𝚛𝚊 𝚌𝚘𝚖𝚙𝚛𝚊𝚛 𝚎𝚜𝚊 𝚌𝚊𝚗𝚝𝚒𝚍𝚊𝚍 𝚍𝚎 𝚎𝚡𝚙𝚎𝚛𝚒𝚎𝚗𝚌𝚒𝚊.';
    }

    user.credit -= goldSpent;
    user.exp += experienceReward;

    let before = user.level;

    while (canLevelUp(user.level, user.exp, global.multiplier)) {
        user.level++;
    }

    let after = user.level;

    let remainingGold = user.credit;

    let str = `
📊 *𝙲𝚘𝚖𝚙𝚛𝚊 𝚍𝚎 𝙴𝚡𝚙𝚎𝚛𝚒𝚎𝚗𝚌𝚒𝚊* 📊

👤 *𝙽𝚘𝚖𝚋𝚛𝚎*: ${name}
🎖️ *𝙽𝚒𝚟𝚎𝚕 𝙰𝚌𝚝𝚞𝚊𝚕*: ${before}
🎖️ *Nuevo Nivel*: ${after}
💰 *Oro Gastado*: ${goldSpent} 💰
🌟 *Experiencia Obtenida*: ${experienceReward} 🌟
💰 *Oro Restante*: ${remainingGold} 💰

${decorLine}
`.trim();

    try {
        await sendMessageWithImage(conn, m, str);
        
        
        const emojis = ['✅', '👍', '😊', '💎', '🚀']; 
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        await m.react(randomEmoji);
    } catch (e) {
        await conn.reply(m.chat, str, m);
    }
}

handler.help = ['comprarexp'];
handler.tags = ['rpg'];
handler.command = ['comprarexp', 'buyxp', 'buy'];
handler.register = true;
handler.group = true;

export default handler;
