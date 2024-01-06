//import db from '../lib/database.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
   let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    else who = m.chat
    let user = global.db.data.users[who]
    if (!who) throw `✳️ Mencioname a alguien mi creador curi o moderador\n\n📌 Ejemplo : ${usedPrefix + command} @user`
    let users = global.db.data.users
    users[who].banned = true
    conn.reply(m.chat, `
✅ ¿𝙌𝙪𝙚 𝙝𝙞𝙘𝙞𝙨𝙩𝙚 𝙥𝙖𝙧𝙖 𝙦𝙪𝙚 𝙢𝙞 𝙘𝙧𝙚𝙖𝙙𝙤𝙧 𝙤 𝙢𝙤𝙙𝙚𝙧𝙖𝙙𝙤𝙧 𝙨𝙚 𝙢𝙤𝙡𝙚𝙨𝙩𝙖𝙧𝙖 𝙘𝙤𝙣𝙩𝙞𝙜𝙤 :𝙘 ? 𝙀𝙨𝙩𝙖𝙨 𝙗𝙖𝙣𝙚𝙖𝙙𝙤

───────────
@${who.split`@`[0]} 𝙉𝙤 𝙥𝙤𝙙𝙧𝙖𝙨 𝙪𝙨𝙖𝙧 𝙢𝙞𝙨 𝙘𝙤𝙢𝙖𝙣𝙙𝙤𝙨 `, m, { mentions: [who] })
}
handler.help = ['ban @user']
handler.tags = ['owner']
handler.command = /^ban$/i
handler.rowner = true

export default handler