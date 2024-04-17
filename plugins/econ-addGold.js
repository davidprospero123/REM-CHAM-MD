import axios from 'axios';

let handler = async (m, { conn, usedPrefix, args }) => {
    let user = global.db.data.users[m.sender];
    let mentionedUser = m.mentionedJid[0];
    let goldAmount = args[1] ? parseInt(args[1]) : 0;

    if (!mentionedUser) 
        throw '𝙿𝚘𝚛 𝚏𝚊𝚟𝚘𝚛, 𝚖𝚎𝚗𝚌𝚒𝚘𝚗𝚊 𝚊𝚕 𝚞𝚜𝚞𝚊𝚛𝚒𝚘 𝚊𝚕 𝚚𝚞𝚎 𝚍𝚎𝚜𝚎𝚊𝚜 𝚍𝚊𝚛 𝚘𝚛𝚘.';
    
    if (!args[1] || isNaN(goldAmount) || goldAmount < 1) 
        throw '𝙿𝚘𝚛 𝚏𝚊𝚟𝚘𝚛, 𝚒𝚗𝚝𝚛𝚘𝚍𝚞𝚌𝚎 𝚞𝚗𝚊 𝚌𝚊𝚗𝚝𝚒𝚍𝚊𝚍 𝚟á𝚕𝚒𝚍𝚊 𝚍𝚎 𝚘𝚛𝚘 𝚙𝚊𝚛𝚊 𝚍𝚊𝚛. 𝙴𝚓𝚎𝚖𝚙𝚕𝚘: .𝚍𝚊𝚛𝚘𝚛𝚘 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘 𝟷𝟶𝟶';

    if (user.credit < goldAmount) 
        throw '𝙽𝚘 𝚝𝚒𝚎𝚗𝚎𝚜 𝚜𝚞𝚏𝚒𝚌𝚒𝚎𝚗𝚝𝚎 𝚘𝚛𝚘 𝚙𝚊𝚛𝚊 𝚛𝚎𝚊𝚕𝚒𝚣𝚊𝚛 𝚎𝚜𝚝𝚊 𝚝𝚛𝚊𝚗𝚜𝚏𝚎𝚛𝚎𝚗𝚌𝚒𝚊.';

    let recipient = global.db.data.users[mentionedUser];
    recipient.credit += goldAmount;
    user.credit -= goldAmount;

    let message = `
🎁 *𝚃𝚛𝚊𝚗𝚜𝚏𝚎𝚛𝚎𝚗𝚌𝚒𝚊 𝚍𝚎 𝙾𝚛𝚘 𝚁𝚎𝚊𝚕𝚒𝚣𝚊𝚍𝚊.* 🎁

💰 *Cantidad Transferida*: ${goldAmount} oro
👤 *Destinatario*: @${mentionedUser.split('@')[0]}
👥 *Tu Saldo Actual*: ${user.credit} oro

¡𝙻𝚊 𝚝𝚛𝚊𝚗𝚜𝚏𝚎𝚛𝚎𝚗𝚌𝚒𝚊 𝚍𝚎 𝚘𝚛𝚘 𝚜𝚎 𝚑𝚊 𝚌𝚘𝚖𝚙𝚕𝚎𝚝𝚊𝚍𝚘 𝚌𝚘𝚗 é𝚡𝚒𝚝𝚘! 🌟✨

_🔹 ¡𝙳𝚒𝚗𝚎𝚛𝚘, 𝚍𝚒𝚗𝚎𝚛𝚘, 𝚍𝚒𝚗𝚎𝚛𝚘! 💰💸🔹_
`.trim();

    try {
        const imgUrl = 'https://i.imgur.com/Em0VBOJ.png';
        const responseImg = await axios.get(imgUrl, { responseType: 'arraybuffer' });
        await conn.sendFile(m.chat, responseImg.data, "thumbnail.jpg", message, m);
    } catch (e) {
        await conn.reply(m.chat, message, m);
    }
}

handler.help = ['daroro'];
handler.tags = ['economy'];
handler.command = ['daroro', 'transferiroro', 'dor'];
handler.register = true
handler.group = true

export default handler;

// Ejemplo de uso
// Comando: .daroro @usuario 100
// Texto: Transfiere 100 oro al usuario mencionado.
