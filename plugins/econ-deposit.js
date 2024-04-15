import axios from 'axios';

let handler = async (m, { conn, usedPrefix, args }) => {
    let user = global.db.data.users[m.sender];
    let depositAmount = args[0] ? parseInt(args[0]) : 0;

    if (isNaN(depositAmount) || depositAmount < 1) 
        throw 'Por favor, introduce una cantidad válida de oro para depositar. Ejemplo: .depositar 100';

    if (user.credit < depositAmount) 
        throw 'No tienes suficiente oro para realizar este depósito.';

    user.bank += depositAmount;
    user.credit -= depositAmount;

    let message = `
🏦 *Depósito Realizado* 🏦

💰 *Cantidad Depositada*: ${depositAmount} oro
👤 *Saldo Actual en la Bóveda*: ${user.bank} oro

Gracias por depositar en tu bóveda. ¡Tu oro está seguro con nosotros! 💼✨
`.trim();

    try {
        const imgUrl = 'https://i.imgur.com/P3u2et7.jpg';
        const responseImg = await axios.get(imgUrl, { responseType: 'arraybuffer' });
        await conn.sendFile(m.chat, responseImg.data, "thumbnail.jpg", message, m);
    } catch (e) {
        await conn.reply(m.chat, message, m);
    }
}

handler.help = ['depositar'];
handler.tags = ['economy'];
handler.command = ['depositar', 'dep'];

export default handler;

// Ejemplo de uso
// Comando: .depositar 100
// Texto: Realiza un depósito de 100 oro en tu bóveda.
