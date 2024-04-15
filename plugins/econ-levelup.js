import { canLevelUp, xpRange } from '../lib/levelling.js';
import axios from 'axios';

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

let handler = async (m, { conn }) => {
    let name = conn.getName(m.sender);
    let user = global.db.data.users[m.sender];

    if (!canLevelUp(user.level, user.exp, global.multiplier)) {
        let { min, xp, max } = xpRange(user.level, global.multiplier);
        let progress = Math.min(Math.max(Math.floor(((user.exp - min) / xp) * 10), 0), 10); 
        let progressBar = "▰".repeat(progress) + "▱".repeat(10 - progress);
        let lvl = `
╭───[ 𝚂𝚄𝙱𝙴𝚂 𝙳𝙴 𝙽𝙸𝚅𝙴𝙻 ]───
│ 🌟 𝙽𝙾𝙼𝙱𝚁𝙴: ${name}
│ 🎖️ 𝙽𝙸𝚅𝙴𝙻 𝙰𝙲𝚃𝚄𝙰𝙻: ${user.level}
│ 📊 𝚇𝙿: ${user.exp - min}/${xp}
│ 📈 𝙿𝚛𝚘𝚐𝚛𝚎𝚜𝚘: ${progressBar} (${Math.floor(((user.exp - min) / xp) * 100)}%)
│
│ ¡𝚃𝚎 𝚏𝚊𝚕𝚝𝚊𝚗 *${max - user.exp}* 𝙳𝚎 𝚇𝙿 𝚙𝚊𝚛𝚊 𝚜𝚞𝚋𝚒𝚛 𝚍𝚎 𝚗𝚒𝚟𝚎𝚕!
│
│ Desafíos Completados:
│ ${challenges.map(c => `${hasCompletedChallenge(m.sender, c.name) ? '✅' : '❌'} ${c.name}`).join('\n│ ')}
│
│ 𝙿𝚛ó𝚡𝚒𝚖𝚘𝚜 𝙳𝚎𝚜𝚊𝚏í𝚘𝚜:
│ ${challenges.map(c => `${hasCompletedChallenge(m.sender, c.name) ? '❌' : '✅'} ${c.name}`).join('\n│ ')}
╰────────═┅═────────
`.trim();
        try {
            const imgUrl = 'https://i.imgur.com/5fXIZYJ.png';
            const responseImg = await axios.get(imgUrl, { responseType: 'arraybuffer' });
            await conn.sendFile(m.chat, responseImg.data, "thumbnail.jpg", lvl, m);
        } catch (e) {
            await conn.reply(m.chat, lvl, m);
        }
    }

    let before = user.level * 1;
    while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++;
    
    if (before !== user.level) {
        let str = `
╭────[ 𝚂𝚄𝙱𝙴𝚂 𝙳𝙴 𝙽𝙸𝚅𝙴𝙻 ]────
│ 🌟 𝙽𝙾𝙼𝙱𝚁𝙴: ${name}
│ 🎖️ 𝙽𝙸𝚅𝙴𝙻 𝙰𝙲𝚃𝚄𝙰𝙻: ${user.level}
│ 🎖️ 𝙽𝙸𝚅𝙴𝙻 𝙰𝙽𝚃𝙴𝚁𝙸𝙾𝚁: ${before}
│
│ ¡𝙵𝚎𝚕𝚒𝚌𝚒𝚍𝚊𝚍𝚎𝚜, ${name}! 𝙷𝚊𝚜 𝚜𝚞𝚋𝚒𝚍𝚘 𝚍𝚎 𝚗𝚒𝚟𝚎𝚕.
╰────────═┅═──────────
`.trim();
        try {
            const imgUrl = 'https://i.imgur.com/5fXIZYJ.png';
            const responseImg = await axios.get(imgUrl, { responseType: 'arraybuffer' });
            await conn.sendFile(m.chat, responseImg.data, "thumbnail.jpg", str, m);
        } catch (e) {
            await conn.reply(m.chat, str, m);
        }
    }
}

handler.help = ['levelup'];
handler.tags = ['rpg'];
handler.command = ['nivel', 'lvl', 'levelup', 'level'];
handler.register = true;
export default handler;
