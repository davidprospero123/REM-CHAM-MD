import fg from 'api-dylux';
import yts from 'yt-search';
import axios from 'axios';

const imgUrl = 'https://telegra.ph/file/46bc902de024bf8f9b03c.jpg';

let handler = async (m, { conn, text }) => {
    try {
        let [url] = text.split(/\s+/);

        if (!url || !url.match(/youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/|c\/[a-zA-Z0-9-_]{11})/))
            return conn.reply(m.chat, '* 𝙿𝚛𝚘𝚙𝚘𝚛𝚌𝚒𝚘𝚗𝚎 𝚞𝚗𝚊 𝚄𝚁𝙻 𝚍𝚎 𝚞𝚗 𝚟𝚒𝚍𝚎𝚘 𝚍𝚎 𝚈𝚘𝚞𝚃𝚞𝚋𝚎 𝚟á𝚕𝚒𝚍𝚊.*', m);

        let who = m.sender;
        let user = global.db.data.users[who];
        if (user.credit < 100) throw '𝙽𝚘 𝚝𝚒𝚎𝚗𝚎𝚜 𝚜𝚞𝚏𝚒𝚌𝚒𝚎𝚗𝚝𝚎𝚜 𝚖𝚘𝚗𝚎𝚍𝚊𝚜 𝚍𝚎 𝚘𝚛𝚘 𝚙𝚊𝚛𝚊 𝚛𝚎𝚊𝚕𝚒𝚣𝚊𝚛 𝚎𝚜𝚝𝚊 𝚊𝚌𝚌𝚒ó𝚗.';

        user.credit -= 100;
        global.db.data.users[who] = user;

        await m.reply('🔎 *𝙱𝚞𝚜𝚌𝚊𝚗𝚍𝚘 𝚎𝚕 𝚟𝚒𝚍𝚎𝚘 𝚎𝚗 𝚈𝚘𝚞𝚃𝚞𝚋𝚎...*');
        let result = await yts(text);
        let vid = result.all[0];

        const responseImg = await axios.get(imgUrl, { responseType: 'arraybuffer' });

        let yt = await fg.ytmp4(url, '720p');
        let { title, size, dl_url } = yt;

        if (parseFloat(size.split('MB')[0]) >= 1000) {
            return conn.reply(m.chat, '*⚠️ 𝙴𝚕 𝚊𝚛𝚌𝚑𝚒𝚟𝚘 𝚙𝚎𝚜𝚊 𝚖á𝚜 𝚍𝚎 𝟷𝟶𝟶𝟶 𝙼𝙱, 𝚜𝚎 𝚌𝚊𝚗𝚌𝚎𝚕ó 𝚕𝚊 𝚍𝚎𝚜𝚌𝚊𝚛𝚐𝚊.*', m);
        }

        let message = `
🍭 *𝚃í𝚝𝚞𝚕𝚘*: ${title}
⚖️ *𝚃𝚊𝚖𝚊ñ𝚘*: ${size}
   𝚁𝙴𝙼-𝙱𝙾𝚃 𝙱𝚢 𝙲𝚄𝚁𝙸

🔄 *𝙳𝚎𝚜𝚌𝚊𝚛𝚐𝚊𝚗𝚍𝚘 𝚎𝚕 𝚟𝚒𝚍𝚎𝚘, 𝚙𝚘𝚛 𝚏𝚊𝚟𝚘𝚛 𝚎𝚜𝚙𝚎𝚛𝚊...*
━━━━━━━━━━━━━━━━━━━
        `;

        await conn.sendFile(m.chat, responseImg.data, 'thumbnail.jpg', message, m);

        await conn.sendFile(m.chat, dl_url, 'video.mp4', `${vid.title}.mp4`, m);

        await conn.reply(m.chat, `━━━━━━━━━━━━━━━━━━━\n*✅ 𝙳𝚎𝚜𝚌𝚊𝚛𝚐𝚊 𝚌𝚘𝚖𝚙𝚕𝚎𝚝𝚊𝚍𝚊!*\n\n*𝚃𝚒𝚎𝚗𝚎𝚜 ${user.credit} 𝚖𝚘𝚗𝚎𝚍𝚊𝚜 𝚍𝚎 𝚘𝚛𝚘 𝚛𝚎𝚜𝚝𝚊𝚗𝚝𝚎𝚜.*`, m);

    } catch (error) {
        await conn.reply(m.chat, `*𝙴𝚛𝚛𝚘𝚛 𝚍𝚎𝚝𝚎𝚌𝚝𝚊𝚍𝚘 𝚖𝚊𝚗𝚍𝚊𝚗𝚍𝚘 𝙴𝚛𝚛𝚘𝚛 𝚊 𝙲𝚞𝚛𝚒:*\n${error}`, m);
        console.error(error);
    }
}

handler.help = ['ytmp4 <url yt>'];
handler.tags = ['downloader'];
handler.command = /^(ytmp4|descargar)$/i;
handler.register = true;

export default handler;
