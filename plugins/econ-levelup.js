import { canLevelUp, xpRange } from '../lib/levelling.js';

let handler = async (m, { conn }) => {
    let name = conn.getName(m.sender);
    let user = global.db.data.users[m.sender];

    if (!canLevelUp(user.level, user.exp, global.multiplier)) {
        let { min, xp, max } = xpRange(user.level, global.multiplier);
        let lvl = `
╭────═[ 𝚂𝚄𝙱𝙴𝚂 𝙳𝙴 𝙽𝙸𝚅𝙴𝙻 ]
│┬─✧ 𝙽𝙾𝙼𝙱𝚁𝙴: ${name}
││✧ 𝙽𝙸𝚅𝙴𝙻 𝙰𝙲𝚃𝚄𝙰𝙻: ${user.level}
││✧ 𝚇𝙿: ${user.exp - min}/${xp}
│╰─✧
╰───────═┅═───────

Te faltan *${max - user.exp}* de *XP* para subir de nivel
`.trim();
        await conn.reply(m.chat, lvl, m);
    }

    let before = user.level * 1;
    while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++;
    
    if (before !== user.level) {
        let str = `
╭────═[ 𝚂𝚄𝙱𝙴𝚂 𝙳𝙴 𝙽𝙸𝚅𝙴𝙻 ]
│┬─✧ 𝙽𝙾𝙼𝙱𝚁𝙴: ${name}
││✧ 𝙽𝙸𝚅𝙴𝙻 𝙰𝙲𝚃𝚄𝙰𝙻: ${user.level}
││✧ 𝙽𝙸𝚅𝙴𝙻 𝙰𝙲𝚃𝚄𝙰𝙻: ${before}
│╰─✧
╰───────═┅═───────
`.trim();
        await conn.reply(m.chat, str, m);
    }
}

handler.help = ['levelup'];
handler.tags = ['rpg'];
handler.command = ['nivel', 'lvl', 'levelup', 'level'];
handler.register = true;
export default handler;
