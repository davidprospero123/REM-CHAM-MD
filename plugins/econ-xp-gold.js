import axios from 'axios';
import { canLevelUp, xpRange } from '../lib/levelling.js';

const sendMessageWithImage = async (conn, m, message) => {
    const imgUrl = 'https://i.imgur.com/5fXIZYJ.png';
    try {
        const responseImg = await axios.get(imgUrl, { responseType: 'arraybuffer' });
        await conn.sendFile(m.chat, responseImg.data, "thumbnail.jpg", message, m);
    } catch (error) {
        console.error(error);
        await conn.reply(m.chat, message, m);
    }
}

const line = '━━━━━━━━━━━━━━━━━';
const decorLine = '═'.repeat(line.length);

const challenges = [
    { name: '𝙴𝚗𝚟𝚒𝚊𝚛 𝟷𝟶𝟶 𝚖𝚎𝚗𝚜𝚊𝚓𝚎𝚜', xpReward: 50 },
    { name: '𝙿𝚊𝚛𝚝𝚒𝚌𝚒𝚙𝚊𝚛 𝚎𝚗 𝟻 𝚎𝚟𝚎𝚗𝚝𝚘𝚜 𝚍𝚎𝚕 𝚐𝚛𝚞𝚙𝚘', xpReward: 100 },
    { name: '𝙸𝚗𝚟𝚒𝚝𝚊𝚛 𝚊 𝟹 𝚗𝚞𝚎𝚟𝚘𝚜 𝚖𝚒𝚎𝚖𝚋𝚛𝚘𝚜 700xᴘ', xpReward: 700 }
];

const completedChallenges = {};

function hasCompletedChallenge(userId, challengeName) {
    return completedChallenges[userId]?.includes(challengeName);
}

function completeChallenge(userId, challengeName) {
    completedChallenges[userId] = completedChallenges[userId] || [];
    completedChallenges[userId].push(challengeName);
}

let handler = async (m, { conn, args }) => {
    let name = conn.getName(m.sender);
    let user = global.db.data.users[m.sender];

    if (!args[0] || isNaN(args[0]) || args[0] < 1) {
        throw 'Por favor, ingresa una cantidad válida de oro para comprar experiencia.';
    }

    let xpAmount = parseInt(args[0]);
    let before = user.level * 1;

    user.credit -= xpAmount;

    while (xpAmount > 0) {
        if (canLevelUp(user.level, user.exp, global.multiplier)) {
            let { min, xp, max } = xpRange(user.level, global.multiplier);
            let xpNeeded = max - user.exp;
            let xpToAdd = Math.min(xpAmount, xpNeeded);
            user.exp += xpToAdd;
            xpAmount -= xpToAdd;
            if (user.exp >= max) {
                user.level++;
            }
        } else {
            break;
        }
    }

    let after = user.level * 1;

    let str = `
${decorLine}
📊 *Compra de Experiencia* 📊
${decorLine}

🌟 *Nombre*: ${name}
🎖️ *Nivel Actual*: ${before}
🎖️ *Nivel Nuevo*: ${after}
💰 *Oro Gastado*: ${args[0]}

`.trim();

    try {
        await sendMessageWithImage(conn, m, str);
    } catch (e) {
        await conn.reply(m.chat, str, m);
    }
}

handler.help = ['comprarexp'];
handler.tags = ['rpg'];
handler.command = ['comprarexp', 'buyxp'];
handler.register = true;
handler.group = true

export default handler;
