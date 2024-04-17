import axios from 'axios';

const sendMessageWithImage = async (conn, m, message) => {
    const imgUrl = 'https://i.imgur.com/DuEgPNA.png';
    try {
        const responseImg = await axios.get(imgUrl, { responseType: 'arraybuffer' });
        await conn.sendFile(m.chat, responseImg.data, "thumbnail.jpg", message, m);
    } catch (error) {
        console.error(error);
        await conn.reply(m.chat, message, m);
    }
}

const emojis = ['🌟', '💼', '💰', '🏦', '📈', '📊', '📉', '💹', '💵', '💲', '💱', '🏧', '💳', '💸', '🧾'];
const randomEmoji = () => emojis[Math.floor(Math.random() * emojis.length)];

const line = '━━━━━━━━━━━━━━━━━';
const decorLine = '═'.repeat(line.length);

let handler = async (m, { conn, usedPrefix, args }) => {
    let user = global.db.data.users[m.sender];
    let goldAmount = args[0] ? parseInt(args[0]) : 0;

    if (!args[0] || isNaN(goldAmount) || goldAmount < 1) 
        throw '𝙿𝚘𝚛 𝚏𝚊𝚟𝚘𝚛, 𝚒𝚗𝚐𝚛𝚎𝚜𝚊 𝚞𝚗𝚊 𝚌𝚊𝚗𝚝𝚒𝚍𝚊𝚍 𝚟á𝚕𝚒𝚍𝚊 𝚍𝚎 𝚘𝚛𝚘 𝚊 𝚛𝚎𝚝𝚒𝚛𝚊𝚛 𝚍𝚎 𝚕𝚊 𝚋ó𝚟𝚎𝚍𝚊. 𝙴𝚓𝚎𝚖𝚙𝚕𝚘: .𝚛𝚎𝚝𝚒𝚛𝚊𝚛 𝟷𝟶𝟶';

    if (user.bank < goldAmount) 
        throw '𝙽𝚘 𝚝𝚒𝚎𝚗𝚎𝚜 𝚜𝚞𝚏𝚒𝚌𝚒𝚎𝚗𝚝𝚎 𝚘𝚛𝚘 𝚎𝚗 𝚕𝚊 𝚋ó𝚟𝚎𝚍𝚊 𝚙𝚊𝚛𝚊 𝚛𝚎𝚊𝚕𝚒𝚣𝚊𝚛 𝚎𝚜𝚝𝚊 𝚝𝚛𝚊𝚗𝚜𝚊𝚌𝚌𝚒ó𝚗.';

    user.bank -= goldAmount;
    user.credit += goldAmount;

    const wealthLevel = () => {
        if (user.bank <= 3000) return '𝙷𝚄𝙼𝙸𝙻𝙳𝙴';
        else if (user.bank <= 6000) return '𝙳𝙴 𝙱𝙰𝙹𝙾𝚂 𝚁𝙴𝙲𝚄𝚁𝚂𝙾𝚂';
        else if (user.bank <= 100000) return '𝙲𝙻𝙰𝚂𝙴 𝙼𝙴𝙳𝙸𝙰';
        else if (user.bank <= 1000000) return '𝚁𝙸𝙺𝙾';
        else if (user.bank <= 10000000) return '𝙼𝙸𝙻𝙻𝙾𝙽𝙰𝚁𝙸𝙾';
        else if (user.bank <= 1000000000) return '𝙼𝚄𝙻𝚃𝙸𝙼𝙸𝙻𝙻𝙾𝙽𝙰𝚁𝙸𝙾';
        else if (user.bank <= 10000000000) return '𝙱𝙸𝙻𝙻𝙾𝙽𝙰𝚁𝙸𝙾';
    };

    let message = `
${decorLine}
${randomEmoji()} *𝙍𝙀𝙏𝙄𝙍𝙊 𝘿𝙀 𝙊𝙍𝙊* ${randomEmoji()}
${decorLine}

${randomEmoji()} *𝙲𝙖𝙣𝙩𝙞𝙙𝙖𝙙 𝙍𝙚𝙩𝙞𝙧𝙖𝙙𝙖*: ${goldAmount} 𝙤𝙧𝙤
${randomEmoji()} *𝙉𝙪𝙚𝙫𝙤 𝙎𝙖𝙡𝙙𝙤*: ${user.credit} 𝙤𝙧𝙤 𝙚𝙣 𝙡𝙖 𝙗𝙞𝙡𝙡𝙚𝙩𝙚𝙧𝙖
${randomEmoji()} *𝙉𝙄𝙑𝙀𝙇 𝘿𝙀 𝙍𝙄𝙌𝙐𝙀𝙕𝘼*: ${wealthLevel()} ${randomEmoji()}

¡𝙍𝙚𝙩𝙞𝙧𝙤 𝙚𝙭𝙞𝙩𝙤𝙨𝙤! 🌟✨
`.trim();

    try {
        await sendMessageWithImage(conn, m, message);
    } catch (e) {
        await conn.reply(m.chat, message, m);
    }
}

handler.help = ['withdraw'];
handler.tags = ['economy'];
handler.command = ['withdraw', 'with', 'retirar'];
handler.register = true
handler.group = true


export default handler;
