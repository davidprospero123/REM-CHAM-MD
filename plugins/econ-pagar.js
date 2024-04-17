import axios from 'axios';

const sendMessageWithImage = async (conn, m, message) => {
    const imgUrl = 'https://i.imgur.com/QeY0qzN.png';
    try {
        const responseImg = await axios.get(imgUrl, { responseType: 'arraybuffer' });
        await conn.sendFile(m.chat, responseImg.data, "thumbnail.jpg", message, m);
    } catch (error) {
        console.error(error);
        await conn.reply(m.chat, message, m);
    }
}

let handler = async (m, { conn, args }) => {
    let user = global.db.data.users[m.sender];
    let loan = user.loan;

    if (!loan) {
        throw '𝙽𝚘 𝚝𝚒𝚎𝚗𝚎𝚜 𝚗𝚒𝚗𝚐ú𝚗 𝚙𝚛é𝚜𝚝𝚊𝚖𝚘 𝚙𝚎𝚗𝚍𝚒𝚎𝚗𝚝𝚎.';
    }

    let repaymentDate = loan.repaymentDate;
    let timeNow = Date.now();

    if (timeNow < repaymentDate) {
        throw '𝙰ú𝚗 𝚗𝚘 𝚎𝚜 𝚎𝚕 𝚖𝚘𝚖𝚎𝚗𝚝𝚘 𝚍𝚎 𝚙𝚊𝚐𝚊𝚛 𝚎𝚕 𝚙𝚛é𝚜𝚝𝚊𝚖𝚘. 𝙻𝚊 𝚏𝚎𝚌𝚑𝚊 𝚍𝚎 𝚟𝚎𝚗𝚌𝚒𝚖𝚒𝚎𝚗𝚝𝚘 𝚎𝚜: ' + new Date(repaymentDate).toLocaleString();
    }

    let goldAmount = loan.amount;

    if (goldAmount > user.credit) {
        throw '𝙽𝚘 𝚝𝚒𝚎𝚗𝚎𝚜 𝚜𝚞𝚏𝚒𝚌𝚒𝚎𝚗𝚝𝚎 𝚘𝚛𝚘 𝚙𝚊𝚛𝚊 𝚙𝚊𝚐𝚊𝚛 𝚎𝚕 𝚙𝚛é𝚜𝚝𝚊𝚖𝚘.';
    }

    user.credit -= goldAmount;
    delete user.loan;

    let str = `
🌟 ¡𝙿𝚛é𝚜𝚝𝚊𝚖𝚘 𝚍𝚎 𝙾𝚛𝚘 𝙿𝚊𝚐𝚊𝚍𝚘! 🌟

💰 *𝙲𝚊𝚗𝚝𝚒𝚍𝚊𝚍 𝙿𝚊𝚐𝚊𝚍𝚊*: ${goldAmount} oro

𝙶𝚛𝚊𝚌𝚒𝚊𝚜 𝚙𝚘𝚛 𝚙𝚊𝚐𝚊𝚛 𝚝𝚞 𝚙𝚛é𝚜𝚝𝚊𝚖𝚘 𝚊 𝚝𝚒𝚎𝚖𝚙𝚘.

`.trim();

    try {
        await sendMessageWithImage(conn, m, str);
    } catch (e) {
        await conn.reply(m.chat, str, m);
    }
}

handler.help = ['pagar'];
handler.tags = ['economy'];
handler.command = ['pagar', 'devolveroro', 'repagar'];
handler.register = true;
handler.group = true;

export default handler;
