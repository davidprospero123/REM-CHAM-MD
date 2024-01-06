import { canLevelUp, xpRange } from '../lib/levelling.js';

let handler = async (m, { conn }) => {
    let name = conn.getName(m.sender);
    let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://i.imgur.com/whjlJSf.jpg');
    let user = global.db.data.users[m.sender];
    let background = 'https://i.ibb.co/4YBNyvP/images-76.jpg'; // Fixed background URL

    if (!canLevelUp(user.level, user.exp, global.multiplier)) {
        let { min, xp, max } = xpRange(user.level, global.multiplier);
        let txt = `
╭────═[ 𝙎𝙪𝙗𝙞𝙧 𝘿𝙚 𝙉𝙞𝙫𝙚𝙡 ]
│╭───────────────···
┴│✯ *🍭 ɴᴏᴍʙʀᴇ* : ${name}
✩│✯ *📈 ɴɪᴠᴇʟ ᴀᴄᴛᴜᴀʟ* : ${user.level}
┬│✯ *💫 xᴘ* : ${user.exp - min}/${xp}
┬│✯ *📈ʀᴏʟ : *${user.role}*
│╰────────────────···
╰───────────═┅═──────────

ʜᴏʟᴀ, ${name}! ᴀÚɴ ɴᴏ ᴇꜱᴛÁꜱ ʟɪꜱᴛᴏ ᴘᴀʀᴀ ꜱᴜʙɪʀ ᴅᴇ ɴɪᴠᴇʟ. ᴘᴀʀᴇᴄᴇ Qᴜᴇ ɴᴇᴄᴇꜱɪᴛᴀꜱ ᴍᴀꜱᴛɪᴄᴀʀ *${max - user.exp}* ¡ᴍÁꜱ xᴘ ᴘᴀʀᴀ ꜱᴜʙɪʀ ᴅᴇ ɴɪᴠᴇʟ ʏ ᴀʟᴄᴀɴᴢᴀʀ ɴᴜᴇᴠᴀꜱ ᴀʟᴛᴜʀᴀꜱ! ᴄᴏɴᴛɪɴÚᴇ ʏᴏ ʀᴇᴍ ᴘʀᴏɴᴛᴏ ᴛᴇ ᴇʟɪᴏᴊᴀʀᴇ! 🚀
`.trim();

        try {
            let imgg = `https://telegra.ph/file/1d8804dbd83001d249da4.jpg?username=${encodeURIComponent(name)}&currxp=${user.exp - min}&needxp=${xp}&level=${user.level}&rank=${encodeURIComponent(pp)}&avatar=${encodeURIComponent(pp)}&background=${encodeURIComponent(background)}`;
            conn.sendFile(m.chat, imgg, 'level.jpg', txt, m);
        } catch (e) {
            m.reply(txt);
        }
    } else {
        let str = `
╭────═[ 𝙎𝙪𝙗𝙞𝙧 𝘿𝙚 𝙉𝙞𝙫𝙚𝙡 ]
│╭───────────────···
┴│✯ *🍭 ɴᴏᴍʙʀᴇ* : ${name}
✩│✯ *📈 ɴɪᴠᴇʟ ᴀᴄᴛᴜᴀʟ* : *${user.level}*
┬│✯ *📈 ɴɪᴠᴇʟ ᴀɴᴛᴇʀɪᴏʀ* : *${user.level - 1}*
┬│✯ *📈ʀᴏʟ : *${user.role}*
│╰────────────────···
╰───────────═┅═──────────

Woo-hoo, ${name}! ʜᴀꜱ ᴀꜱᴄᴇɴᴅɪᴅᴏ ᴀ ɴᴜᴇᴠᴀꜱ ᴀʟᴛᴜʀᴀꜱ ʏ ʜᴀꜱ ᴀʟᴄᴀɴᴢᴀᴅᴏ ᴜɴ ɴɪᴠᴇʟ ${user.level}! 🎉 ¡ᴛɪᴇᴍᴘᴏ ᴘᴀʀᴀ ᴄᴇʟᴇʙʀᴀʀ! 🎊
¡ᴛᴜ ɴᴜᴇᴠᴏ ᴘᴏᴅᴇʀ ɪɴꜰᴜɴᴅɪʀÁ ᴍɪᴇᴅᴏ ᴇɴ ʟᴏꜱ ᴄᴏʀᴀᴢᴏɴᴇꜱ ᴅᴇ ʟᴏꜱ ᴛʀᴏʟʟꜱ ʏ ʟᴏꜱ ʙᴏᴛꜱ ꜱᴇ ɪɴᴄʟɪɴᴀʀÁɴ ᴀɴᴛᴇ ᴛᴜꜱ Óʀᴅᴇɴᴇꜱ! ¡ꜱɪɢᴜᴇ ᴄᴏɴ ᴇꜱᴛᴇ ɪɴᴄʀᴇÍʙʟᴇ ᴛʀᴀʙᴀᴊᴏ ʏ QᴜɪÉɴ ꜱᴀʙᴇ QᴜÉ ᴀᴠᴇɴᴛᴜʀᴀꜱ Éᴘɪᴄᴀꜱ ᴛᴇ ᴇꜱᴘᴇʀᴀɴ ᴀ ᴄᴏɴᴛɪɴᴜᴀᴄɪÓɴ! 🌟
`.trim();

        try {
            let img = `https://telegra.ph/file/1d8804dbd83001d249da4.jpg?avatar=${encodeURIComponent(pp)}`;
            conn.sendFile(m.chat, img, 'levelup.jpg', str, m);
        } catch (e) {
            m.reply(str);
        }
    }
}

handler.help = ['levelup'];
handler.tags = ['economy'];
handler.command = ['lvl', 'levelup', 'level'];

export default handler