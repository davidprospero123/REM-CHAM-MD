//import db from '../lib/database.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    else who = m.chat
    let user = global.db.data.users[who]
    if (!who) throw `✳️ ᴇᴛɪQᴜᴇᴛᴀ ᴏ ᴍᴇɴᴄɪᴏɴᴀ ᴀ ᴀʟɢᴜɪᴇɴ\n\n📌 ᴇᴊᴇᴍᴘʟᴏ : ${usedPrefix + command} @user`
if (global.prems.includes(who.split`@`[0])) throw '✳️ El usuario mencionado ya es premium'
global.prems.push(`${who.split`@`[0]}`)

conn.reply(m.chat, `
乂 🌹 𝙋𝙍𝙀𝙈𝙄𝙐𝙈
 @${who.split`@`[0]} ᴀʜᴏʀᴀ ᴛᴇ ᴄᴏɴᴠɪᴇʀᴛᴇꜱ ᴇɴ ᴜɴ ᴜꜱᴜᴀʀɪᴏ ᴘʀᴇᴍɪᴜᴍ
┌───────────
乂 *𝙉𝙤𝙢𝙗𝙧𝙚:* ${user.name}
└───────────
`, m, { mentions: [who] })

}
handler.help = ['addprem <@tag>']
handler.tags = ['owner']
handler.command = ['addprem', 'addpremium', 'darpremium', 'premiar'] 

handler.group = true
handler.rowner = true

export default handler
