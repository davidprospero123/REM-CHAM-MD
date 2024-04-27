import { canLevelUp } from '../lib/levelling.js'
import axios from 'axios'

export async function before(m, { conn }) {
    let user = global.db.data.users[m.sender]
    
    if (typeof user.autolevelup === 'undefined') {
        user.autolevelup = true
    }

    let before = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier))
        user.level++
    user.role = global.rpg.role(user.level).name
    if (before !== user.level) {
        const line = "━━━━━━━━━━━━━━━━"
        const username = conn.getName(m.sender)
        const randomEmoji = () => {
            const emojis = ["🌟", "💰", "🏦", "💎", "📈", "💼"]
            return emojis[Math.floor(Math.random() * emojis.length)]
        }
        const wealthLevel = () => {
            if (user.bank <= 3000) return '𝙷𝚄𝙼𝙸𝙻𝙳𝙴';
            else if (user.bank <= 6000) return '𝙳𝙴 𝙱𝙰𝙹𝙾𝚂 𝚁𝙴𝙲𝚄𝚁𝚂𝙾𝚂';
            else if (user.bank <= 100000) return '𝙲𝙻𝙰𝚂𝙴 𝙼𝙴𝙳𝙸𝙰';
            else if (user.bank <= 1000000) return '𝚁𝙸𝙺𝙾';
            else if (user.bank <= 10000000) return '𝙼𝙸𝙻𝙻𝙾𝙽𝙰𝚁𝙸𝙾';
            else if (user.bank <= 1000000000) return '𝙼𝚄𝙻𝚃𝙸𝙼𝙸𝙻𝙻𝙾𝙽𝙰𝚁𝙸𝙾';
            else if (user.bank <= 10000000000) return '𝙱𝙸𝙻𝙻𝙾𝙽𝙰𝚁𝙸𝙾';
            else return '𝙰𝙲𝚄𝙼𝚄𝙻𝙰𝙳𝙾𝚁';
        }
        const txt = `
${line}
${randomEmoji()} *𝙱𝙰𝙽𝙲𝙾 | ${username}* ${randomEmoji()}
${line}

${randomEmoji()} *𝙾𝚁𝙾*: ${user.credit} ${randomEmoji()}
${randomEmoji()} *𝙱Ó𝚅𝙴𝙳𝙰*: ${user.bank} ${randomEmoji()}

${randomEmoji()} *𝙽𝙸𝚅𝙴𝙻 𝙳𝙴 𝚁𝙸𝚀𝚄𝙴𝚉𝙰*: ${wealthLevel()} ${randomEmoji()}
${line}
*‹𝟹 𝙻𝙴𝚅𝙴𝙻 𝚄𝙿*

*${before}* ‣ *${user.level}*
𝚁𝙾𝙻: ${global.rpg.role(user.level)}
 
𝚂𝙾𝚈 𝚁𝙴𝙼 𝙲𝙷𝙰𝙼 𝚄𝙽 𝙱𝙾𝚃 𝙲𝚁𝙴𝙰𝙳𝙾𝚁 𝙿𝙾𝚁 𝙶𝙰𝙱𝚁𝙸𝙴𝙻 𝙲𝚄𝚁𝙸 :𝟹
${line}
        `.trim()
        const url = "https://i.imgur.com/BO4TfMR.png";
        const responseImg = await axios.get(url, { responseType: 'arraybuffer' });
        await conn.sendFile(m.chat, responseImg.data, "thumbnail.png", txt, m);
    }
}
