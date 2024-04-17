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

    let goldAmount = loan.amount;
    let repaymentDate = loan.repaymentDate; // Corrección aquí

    if (!args[0] || isNaN(args[0]) || args[0] < 1) {
        throw '𝙿𝚘𝚛 𝚏𝚊𝚟𝚘𝚛, 𝚒𝚗𝚐𝚛𝚎𝚜𝚊 𝚞𝚗𝚊 𝚌𝚊𝚗𝚝𝚒𝚍𝚊𝚍 𝚟á𝚕𝚒𝚍𝚊 𝚍𝚎 𝚘𝚛𝚘 𝚙𝚊𝚛𝚊 𝚙𝚊𝚐𝚊𝚛 𝚙𝚘𝚛 𝚊𝚍𝚎𝚕𝚊𝚗𝚝𝚊𝚍𝚘.';
    }

    let advancePayment = parseInt(args[0]);

    if (advancePayment >= goldAmount) {
        throw '𝙻𝚊 𝚌𝚊𝚗𝚝𝚒𝚍𝚊𝚍 𝚍𝚎 𝚙𝚊𝚐𝚘 𝚊𝚗𝚝𝚒𝚌𝚒𝚙𝚊𝚍𝚘 𝚍𝚎𝚋𝚎 𝚜𝚎𝚛 𝚖𝚎𝚗𝚘𝚛 𝚚𝚞𝚎 𝚕𝚊 𝚌𝚊𝚗𝚝𝚒𝚍𝚊𝚍 𝚝𝚘𝚝𝚊𝚕 𝚍𝚎𝚕 𝚙𝚛é𝚜𝚝𝚊𝚖𝚘.';
    }

    if (advancePayment > user.credit) {
        throw '𝙽𝚘 𝚝𝚒𝚎𝚗𝚎𝚜 𝚜𝚞𝚏𝚒𝚌𝚒𝚎𝚗𝚝𝚎 𝚘𝚛𝚘 𝚙𝚊𝚛𝚊 𝚛𝚎𝚊𝚕𝚒𝚣𝚊𝚛 𝚎𝚜𝚝𝚎 𝚙𝚊𝚐𝚘 𝚊𝚗𝚝𝚒𝚌𝚒𝚙𝚊𝚍𝚘.';
    }

    let newRepaymentDate = Date.now() + Math.floor((repaymentDate - Date.now()) * (advancePayment / goldAmount));
    user.credit -= advancePayment;
    loan.repaymentDate = newRepaymentDate;

    let str = `
🌟 ¡𝙿𝚊𝚐𝚘 𝙰𝚗𝚝𝚒𝚌𝚒𝚙𝚊𝚍𝚘 𝚍𝚎 𝙿𝚛é𝚜𝚝𝚊𝚖𝚘 𝚍𝚎 𝙾𝚛𝚘 𝚁𝚎𝚊𝚕𝚒𝚣𝚊𝚍𝚘! 🌟

💰 *Cantidad Pagada por Adelantado*: ${advancePayment} oro
⏰ *Nueva Fecha de Repago*: ${new Date(newRepaymentDate).toLocaleString()}

𝙶𝚛𝚊𝚌𝚒𝚊𝚜 𝚙𝚘𝚛 𝚛𝚎𝚊𝚕𝚒𝚣𝚊𝚛 𝚎𝚕 𝚙𝚊𝚐𝚘 𝚊𝚗𝚝𝚒𝚌𝚒𝚙𝚊𝚍𝚘 𝚍𝚎 𝚝𝚞 𝚙𝚛é𝚜𝚝𝚊𝚖𝚘 𝚍𝚎 𝚘𝚛𝚘.
`.trim();

    try {
        await sendMessageWithImage(conn, m, str);
    } catch (e) {
        await conn.reply(m.chat, str, m);
    }
}

handler.help = ['pagaradelantado'];
handler.tags = ['economy'];
handler.command = ['pagaradelantado', 'pagoadelantado', 'anticipar'];
handler.register = true;
handler.group = true;

export default handler;
