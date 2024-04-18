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

const decorLine = '══════════════════════════════════════════';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let fa = `🟥 *𝙿𝚛𝚘𝚙𝚘𝚛𝚌𝚒𝚘𝚗𝚊 𝚕𝚊 𝚌𝚊𝚗𝚝𝚒𝚍𝚊𝚍 𝚍𝚎 𝚘𝚛𝚘 𝚙𝚊𝚛𝚊 𝚊𝚙𝚘𝚜𝚝𝚊𝚛*

*𝙴𝚓𝚎𝚖𝚙𝚕𝚘:
${usedPrefix + command} 500*`.trim()
    
    if (!args[0]) throw fa
    if (isNaN(args[0])) throw fa
    
    let amount = parseInt(args[0])
    m.react('🎰')
    
    let users = global.db.data.users[m.sender]
    let time = users.lastslot + 10000
    
    if (new Date - users.lastslot < 10000) throw `⏳ Espera *${msToTime(time - new Date())}* para usarlo de nuevo`
    
    if (amount < 500) throw `🟥 *𝙽𝚘 𝚙𝚞𝚎𝚍𝚎𝚜 𝚊𝚙𝚘𝚜𝚝𝚊𝚛 𝚖𝚎𝚗𝚘𝚜 𝚍𝚎 𝟻𝟶𝟶 𝚍𝚎 𝚘𝚛𝚘*`
    if (amount > 100000) throw `🟥 *𝙽𝚘 𝚙𝚞𝚎𝚍𝚎𝚜 𝚊𝚙𝚘𝚜𝚝𝚊𝚛 𝚖á𝚜 𝚍𝚎 𝟷𝟶𝟶𝟶𝟶𝟶 𝚍𝚎 𝚘𝚛𝚘*`
    if (users.credit < amount) throw `🟥 *𝙽𝚘 𝚝𝚒𝚎𝚗𝚎𝚜 𝚜𝚞𝚏𝚒𝚌𝚒𝚎𝚗𝚝𝚎 𝚘𝚛𝚘 𝚙𝚊𝚛𝚊 𝚊𝚙𝚘𝚜𝚝𝚊𝚛*`

    let emojis = ["🕊️", "🦀", "🦎"];
    let a = Math.floor(Math.random() * emojis.length);
    let b = Math.floor(Math.random() * emojis.length);
    let c = Math.floor(Math.random() * emojis.length);
    let x = [],
        y = [],
        z = [];
    
    for (let i = 0; i < 3; i++) {
        x[i] = emojis[a];
        a++;
        if (a == emojis.length) a = 0;
    }
    for (let i = 0; i < 3; i++) {
        y[i] = emojis[b];
        b++;
        if (b == emojis.length) b = 0;
    }
    for (let i = 0; i < 3; i++) {
        z[i] = emojis[c];
        c++;
        if (c == emojis.length) c = 0;
    }
    
    let end;
    let winMultiplier = 0.5; 

    if (a == b && b == c) {
        let winAmount = amount * winMultiplier; 
        end = `🎊 ¡𝙱𝚘𝚝𝚎! 𝙷𝚊𝚜 𝚐𝚊𝚗𝚊𝚍𝚘 ${winAmount} 𝚍𝚎 𝚘𝚛𝚘`
        users.credit += winAmount
    } else if (a == b || a == c || b == c) {
        let winAmount = amount * winMultiplier; 
        end = `🎉 ¡𝙲𝚊𝚜𝚒! 𝙷𝚊𝚜 𝚐𝚊𝚗𝚊𝚍𝚘 ${winAmount} 𝚍𝚎 𝚘𝚛𝚘`
        users.credit += winAmount
    } else {
        // Mantener la penalización por pérdida igual
        end = `¡𝙷𝚊𝚜 𝚙𝚎𝚛𝚍𝚒𝚍𝚘! 𝙿𝚒𝚎𝚛𝚍𝚎𝚜 ${amount} 𝚍𝚎 𝚘𝚛𝚘 :𝚌`
        users.credit -= amount
    }
    
    users.lastslot = new Date * 1
    
    let str = `
🎰 ┃𝚃𝚁𝙰𝙶𝙰𝙼𝙾𝙽𝙴𝙳𝙰┃ 🎰
${decorLine}
${x[0]} : ${y[0]} : ${z[0]}
${x[1]} : ${y[1]} : ${z[1]}
${x[2]} : ${y[2]} : ${z[2]}
${decorLine}
${end}`.trim();
    
    try {
        await sendMessageWithImage(conn, m, str);
    } catch (e) {
        await conn.reply(m.chat, str, m);
    }
}

handler.help = ['slot <amount>']
handler.tags = ['game']
handler.command = ['slot', 'tragamonedas']
handler.group = true
handler.register = true

export default handler

function msToTime(duration) {
    var seconds = Math.floor((duration / 1000) % 60)
    return seconds + " segundos"
}
