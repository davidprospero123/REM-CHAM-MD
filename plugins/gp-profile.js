import { createHash } from 'crypto';
import { canLevelUp, xpRange } from '../lib/levelling.js';

let handler = async (m, { conn, usedPrefix, command }) => {
    
    if (typeof conn.profilePictureUrl !== 'function' || typeof conn.fetchStatus !== 'function') {
        console.error('Los métodos conn.profilePictureUrl y/o conn.fetchStatus no están disponibles.');
        return;
    }

    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    if (!(who in global.db.data.users)) throw `✳️ 𝙴𝚕 𝚞𝚜𝚞𝚊𝚛𝚒𝚘 𝚗𝚘 𝚜𝚎 𝚎𝚗𝚌𝚞𝚎𝚗𝚝𝚛𝚊 𝚎𝚗 𝚖𝚒 𝚋𝚊𝚜𝚎 𝚍𝚎 𝚍𝚊𝚝𝚘𝚜`;

    let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './logo.jpg');
    let user = global.db.data.users[who];
    let about = (await conn.fetchStatus(who).catch(console.error))?.status || '';
    let { name, exp, credit, lastclaim, registered, regTime, age, level, role, wealth, warn, vault } = global.db.data.users[who];
    let { min, xp, max } = xpRange(user.level, global.multiplier);
    let username = conn.getName(who);
    let math = max - xp;
    let prem = global.prems.includes(who.split`@`[0]);
    let sn = createHash('md5').update(who).digest('hex');

    let levelProgress = Math.min(Math.floor((exp - min) / (max - min) * 20), 20); 
    let progressBar = '';
    for (let i = 0; i < 20; i++) {
        progressBar += i < levelProgress ? '▰' : '▱';
    }

    let profileMessage = `
👤 𝙿𝙴𝚁𝙵𝙸𝙻 𝙳𝙴 ${username}

📝 𝙽𝙾𝙼𝙱𝚁𝙴: ${name}
⭐ 𝚁𝙾𝙻: ${role}
⚠️ 𝙰𝚍𝚟𝚎𝚛𝚝𝚎𝚗𝚌𝚒𝚊𝚜: ${warn}

🎖️ 𝙽𝙸𝚅𝙴𝙻: ${level}
🆙 𝙴𝚇𝙿𝙴𝚁𝙸𝙴𝙽𝙲𝙸𝙰: ${exp} / ${xp} (${math <= 0 ? 'ʟɪꜱᴛᴏ ᴘᴀʀᴀ ꜱᴜʙɪʀ ᴅᴇ ɴɪᴠᴇʟ' : `𝙵𝚊𝚕𝚝𝚊𝚗 ${math} 𝚇𝙿 𝚙𝚊𝚛𝚊 𝚜𝚞𝚋𝚒𝚛 𝚍𝚎 𝚗𝚒𝚟𝚎𝚕`})

💰 𝙲𝚁𝙴𝙳𝙸𝚃𝙾: ${credit}
🔒 𝚁𝙴𝙶𝙸𝚂𝚃𝚁𝙾: ${registered ? '𝚂𝙸' : '𝙽𝙾'}
🌟 𝙿𝚁𝙴𝙼𝙸𝚄𝙼: ${prem ? '𝚂𝙸' : '𝙽𝙾'}

📆 𝙵𝚎𝚌𝚑𝚊 𝚍𝚎 𝚛𝚎𝚐𝚒𝚜𝚝𝚛𝚘: ${regTime}
🔗 𝙸𝙳: ${sn}

📝 𝙱𝙸𝙾𝙶𝚁𝙰𝙵𝙸𝙰:
${about}
`;

   
    let decoratedProfileMessage = `
╭────「 𝙿𝚎𝚛𝚏𝚒𝚕 𝚍𝚎 ${username} 」
│${profileMessage.trim().split('\n').join('\n│')}
│
│ 𝙿𝚛𝚘𝚐𝚛𝚎𝚜𝚘 𝚍𝚎𝚕 𝚗𝚒𝚟𝚎𝚕:
│
│ [${progressBar}] (${levelProgress * 5}%)
│
│────────────────────
│ 𝚈𝙾 𝚂𝙾𝚈 𝚁𝙴𝙼 𝙲𝙷𝙰𝙼 :𝟹
│
│ 𝚅𝚒𝚜𝚒𝚝𝚊 𝚗𝚞𝚎𝚜𝚝𝚛𝚘 𝚜𝚒𝚝𝚒𝚘 𝚠𝚎𝚋:
│
│(https://rem-cham.replit.app/)
│
│ 𝚁𝚎𝚙𝚘𝚜𝚒𝚝𝚘𝚛𝚒𝚘: [𝙶𝚒𝚝𝙷𝚞𝚋]
│
│(https://github.com/davidprospero123/REM-CHAM)
│────────────────────
│ 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝙲𝚄𝚁𝙸
╰────────────────────
`;

    conn.sendFile(m.chat, pp, 'profile.jpg', decoratedProfileMessage, m, false, { mentions: [who] });
    m.react('✅');
}

handler.help = ['profile'];
handler.tags = ['group'];
handler.command = ['profile', 'perfil'];
handler.register = true

export default handler;
