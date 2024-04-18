import axios from 'axios';

function randomGold() {
    let random = Math.random();
    let gold = Math.floor(Math.pow(random, 2) * 10000) + 1000;
    return gold;
}

const lastMine = {};
const mineCooldown = 10 * 60 * 1000; 

let handler = async (m, { conn }) => {
    let userId = m.sender;

    if (lastMine[userId] && Date.now() - lastMine[userId] < mineCooldown) {
        let remainingTime = Math.ceil((lastMine[userId] + mineCooldown - Date.now()) / 1000 / 60);
        return conn.reply(m.chat, `¡𝙴𝚜𝚙𝚎𝚛𝚊 𝚞𝚗 𝚙𝚘𝚌𝚘! 𝚃𝚘𝚍𝚊𝚟í𝚊 𝚝𝚒𝚎𝚗𝚎𝚜 ${remainingTime} 𝚖𝚒𝚗𝚞𝚝𝚘𝚜 𝚊𝚗𝚝𝚎𝚜 𝚍𝚎 𝚙𝚘𝚍𝚎𝚛 𝚖𝚒𝚗𝚊𝚛 𝚍𝚎 𝚗𝚞𝚎𝚟𝚘. ⏳`, m);
    }

    let gold = randomGold();

    let user = global.db.data.users[userId];
    user.credit += gold;

    lastMine[userId] = Date.now();

    let message = `
╭──────┅════┅───────╮
🪙 ¡𝙷𝚊𝚜 𝚖𝚒𝚗𝚊𝚍𝚘 ${gold} 𝚍𝚎 𝚘𝚛𝚘! 🏞️

𝚃𝚞 𝚜𝚊𝚕𝚍𝚘 𝚊𝚌𝚝𝚞𝚊𝚕 𝚎𝚜 𝚍𝚎 ${user.credit} 𝚍𝚎 𝚘𝚛𝚘!. 💰

¡𝙱𝚞𝚎𝚗𝚊 𝚜𝚞𝚎𝚛𝚝𝚎 𝚎𝚗 𝚝𝚞 𝚙𝚛ó𝚡𝚒𝚖𝚊 𝚋ú𝚜𝚚𝚞𝚎𝚍𝚊! ‹𝟹
    𓆝 𓆟 𓆞 𓆝
╰──────┅════┅─────╯
`;

    const imgUrl = 'https://i.imgur.com/IsskuO4.png';
    const responseImg = await axios.get(imgUrl, { responseType: 'arraybuffer' });

    await conn.sendFile(m.chat, responseImg.data, "thumbnail.jpg", message, m);

    m.react('⛏️');

    global.db.data.users[userId].lastMine = Date.now();
    global.db.data.users[userId].credit = user.credit;

    console.log('Datos guardados correctamente:', global.db.data);
}

const spacer = '\n'.repeat(10);

const dividingComment = '//'.repeat(20);

const additionalDecoration = `
🌟✨🔮 𝚈𝙾 𝚂𝙾𝚈 𝚁𝙴𝙼 𝙲𝙷𝙰𝙼 𝙱𝙾𝚃 🔮✨🌟
`.repeat(3);

const finalDecoration = `
🌟🌟🌟 𝙶𝚛𝚊𝚌𝚒𝚊𝚜 𝚙𝚘𝚛 𝚖𝚒𝚗𝚊𝚛 𝚌𝚘𝚗 𝚗𝚘𝚜𝚘𝚝𝚛𝚘𝚜 🌟🌟🌟
`.repeat(2);

handler.help = ['minar'];
handler.tags = ['economy'];
handler.command = ['minar'];
handler.register = true;
handler.group = true;

export default handler;
