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

    if (!args[0] || isNaN(args[0]) || args[0] < 1) {
        throw '𝙿𝚘𝚛 𝚏𝚊𝚟𝚘𝚛, 𝚒𝚗𝚐𝚛𝚎𝚜𝚊 𝚞𝚗𝚊 𝚌𝚊𝚗𝚝𝚒𝚍𝚊𝚍 𝚟á𝚕𝚒𝚍𝚊 𝚍𝚎 𝚘𝚛𝚘 𝚙𝚊𝚛𝚊 𝚙𝚛𝚎𝚜𝚝𝚊𝚛.';
    }

    let goldAmount = parseInt(args[0]);

    if (goldAmount > user.credit) {
        throw '𝙽𝚘 𝚝𝚒𝚎𝚗𝚎𝚜 𝚜𝚞𝚏𝚒𝚌𝚒𝚎𝚗𝚝𝚎 𝚘𝚛𝚘 𝚙𝚊𝚛𝚊 𝚙𝚛𝚎𝚜𝚝𝚊𝚛 𝚎𝚜𝚊 𝚌𝚊𝚗𝚝𝚒𝚍𝚊𝚍.';
    }

    let timeNow = Date.now();
    let repaymentDate = timeNow + (7 * 24 * 60 * 60 * 1000); // 1 semana en milisegundos

    let loan = {
        amount: goldAmount,
        repaymentDate: repaymentDate
    };

    user.credit -= goldAmount;
    user.loan = loan;

    let str = `
🌟 ¡𝙿𝚛é𝚜𝚝𝚊𝚖𝚘 𝚍𝚎 𝙾𝚛𝚘 𝚁𝚎𝚊𝚕𝚒𝚣𝚊𝚍𝚘! 🌟

💰 *Cantidad Prestada*: ${goldAmount} oro
⏰ *Fecha de Repago*: ${new Date(repaymentDate).toLocaleString()}

𝚁𝚎𝚌𝚞𝚎𝚛𝚍𝚊 𝚍𝚎𝚟𝚘𝚕𝚟𝚎𝚛 𝚎𝚕 𝚙𝚛é𝚜𝚝𝚊𝚖𝚘 𝚍𝚎𝚗𝚝𝚛𝚘 𝚍𝚎 𝚞𝚗𝚊 𝚜𝚎𝚖𝚊𝚗𝚊 𝚙𝚊𝚛𝚊 𝚎𝚟𝚒𝚝𝚊𝚛 𝚙𝚎𝚗𝚊𝚕𝚒𝚣𝚊𝚌𝚒𝚘𝚗𝚎𝚜.

`.trim();

    try {
        await sendMessageWithImage(conn, m, str);
    } catch (e) {
        await conn.reply(m.chat, str, m);
    }
}

handler.help = ['prestamo'];
handler.tags = ['economy'];
handler.command = ['prestamo', 'prestaroro', 'loan'];
handler.register = true;
handler.group = true;

export default handler;
