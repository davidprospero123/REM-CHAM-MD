import axios from 'axios'; // Importar axios para enviar la imagen

const rouletteBets = {};
const rouletteResult = {};

const handler = async (m, { conn, args, usedPrefix, command }) => {
    const resolveRoulette = async (chatId, conn) => { // Hacer la función asíncrona para usar await
        let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
        let username = conn.getName(who);
        if (!(who in global.db.data.users)) throw `✳️ 𝙴𝙻 𝚄𝚂𝚄𝙰𝚁𝙸𝙾 𝙽𝙾 𝙴𝚂𝚃𝙰 𝙴𝙽 𝙼𝙸 𝙱𝙰𝚂𝙴 𝙳𝙴 𝙳𝙰𝚃𝙾𝚂 :c`;

        if (rouletteBets[chatId] && rouletteBets[chatId].length > 0) {
            let colours = ['rojo', 'negro'];
            let colour = colours[Math.floor(Math.random() * colours.length)];

            let winners = [];
            let resultMessage = `🎰 𝙻𝙰 𝙿𝙴𝙻𝙾𝚃𝙰 𝙰𝚃𝙴𝚁𝚁𝙸𝚉𝙾 𝙴𝙽 ${colour} 🎰\n━━━━━━━━━━━━━━━━━━━━\n`;

            for (let bet of rouletteBets[chatId]) {
                let result = '';
                if (colour === bet.color) {
                    result = `👑 @${bet.user.split('@')[0]} 𝙶𝙰𝙽𝙾 ${bet.amount} 𝙳𝙴 𝙾𝚁𝙾 💰`;
                    global.db.data.users[bet.user].credit += bet.amount;
                    winners.push(result);
                } else {
                    result = `💸 @${bet.user.split('@')[0]} 𝙿𝙴𝚁𝙳𝙸𝙾 ${bet.amount} 𝙳𝙴 𝙾𝚁𝙾 💸`;
                    global.db.data.users[bet.user].credit -= bet.amount;
                }
            }

            resultMessage += '\n🎉 ¡𝙶𝚊𝚗𝚊𝚍𝚘𝚛𝚎𝚜! 🎉\n' + winners.join('\n');
            if (winners.length === 0) {
                resultMessage += '\n👥 𝙽𝚊𝚍𝚒𝚎 𝚐𝚊𝚗ó';
            }

            rouletteResult[chatId] = resultMessage;
            delete rouletteBets[chatId];

            // Envía la imagen junto con el mensaje del resultado
            const url = "https://i.imgur.com/APg4Nl7.jpg";
            const responseImg = await axios.get(url, { responseType: 'arraybuffer' });
            const thumbnail = await conn.sendFile(m.chat, responseImg.data, "thumbnail.jpg", resultMessage, m);
        }
    };

    const runRoulette = (chatId, conn) => {
        const delay = 10 * 1000; // 10 segundos

        setTimeout(() => {
            resolveRoulette(chatId, conn);
        }, delay);
    };

    const betRoulette = (user, chatId, amount, color) => {
        let colours = ['rojo', 'negro'];
        if (isNaN(amount) || amount < 500) {
            throw `✳️ 𝙻𝚊 𝚊𝚙𝚞𝚎𝚜𝚝𝚊 𝚖í𝚗𝚒𝚖𝚊 𝚎𝚜 𝚍𝚎 𝟻𝟶𝟶 𝚍𝚎 𝚘𝚛𝚘`;
        }
        if (!colours.includes(color)) {
            throw '✳️ 𝙳𝚎𝚋𝚎𝚜 𝚎𝚜𝚙𝚎𝚌𝚒𝚏𝚒𝚌𝚊𝚛 𝚞𝚗 𝚌𝚘𝚕𝚘𝚛 𝚟á𝚕𝚒𝚍𝚘: 𝚛𝚘𝚓𝚘 𝚘 𝚗𝚎𝚐𝚛𝚘';
        }
        if (users.credit < amount) {
            throw '✳️ ¡𝙽𝚘 𝚝𝚒𝚎𝚗𝚎𝚜 𝚜𝚞𝚏𝚒𝚌𝚒𝚎𝚗𝚝𝚎 𝚘𝚛𝚘!';
        }
        if (amount > 100000) {
            throw `🟥 𝙽𝚘 𝚙𝚞𝚎𝚍𝚎𝚜 𝚊𝚙𝚘𝚜𝚝𝚊𝚛 𝚖á𝚜 𝚍𝚎 𝟷𝟶𝟶𝟶𝟶𝟶 𝚍𝚎 𝚘𝚛𝚘`;
        }

        if (!rouletteBets[chatId]) {
            rouletteBets[chatId] = [];
        }
        rouletteBets[chatId].push({ user, amount, color });
        return `✅ 𝚃𝚞 𝚊𝚙𝚞𝚎𝚜𝚝𝚊 𝚍𝚎 ${amount} 𝚍𝚎 𝚘𝚛𝚘 𝚎𝚗 ${color} 𝚑𝚊 𝚜𝚒𝚍𝚘 𝚛𝚎𝚊𝚕𝚒𝚣𝚊𝚍𝚊`;
    };

    let amount = parseInt(args[0]);
    let color = args[1]?.toLowerCase();
    if (args.length < 2) {
        throw `✳️ 𝚄𝚜𝚊 𝚎𝚕 𝚌𝚘𝚖𝚊𝚗𝚍𝚘 𝚊𝚜í: ${usedPrefix + command} <cantidad> <color>\n\n 𝙴𝚓𝚎𝚖𝚙𝚕𝚘: ${usedPrefix + command} 500 rojo`;
    }

    let users = global.db.data.users[m.sender];
    let response = betRoulette(m.sender, m.chat, amount, color);

    m.reply(response);
    runRoulette(m.chat, conn);
};

handler.help = ['ruleta <cantidad> <color(rojo/negro)>'];
handler.tags = ['economía'];
handler.command = ['ruleta', 'apostar', 'gamble'];
handler.register = true
handler.group = true

export default handler;
