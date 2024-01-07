
let war = global.maxwarn
let handler = async (m, { conn, text, args, groupMetadata, usedPrefix, command }) => {      
        let who
        if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
        else who = m.chat
        if (!who) throw `✳️ 𝙀𝙩𝙞𝙦𝙪𝙚𝙩𝙖 𝙤 𝙢𝙚𝙣𝙘𝙞𝙤𝙣𝙖 𝙖 𝙖𝙡𝙜𝙪𝙞𝙚𝙣\n\n📌 Ejemplo : ${usedPrefix + command} @user`
        if (!(who in global.db.data.users)) throw `✳️𝙀𝙡 𝙪𝙨𝙪𝙖𝙧𝙞𝙤 𝙣𝙤 𝙚𝙨𝙩𝙖 𝙚𝙣 𝙢𝙞 𝙗𝙖𝙨𝙚 𝙙𝙚 𝙙𝙖𝙩𝙤𝙨`
        let name = conn.getName(m.sender)
        let warn = global.db.data.users[who].warn
        if (warn < war) {
            global.db.data.users[who].warn += 1
            m.reply(`
⚠️ *𝘼𝙙𝙫𝙚𝙧𝙩𝙚𝙣𝙘𝙞𝙖𝙨 𝙙𝙚 𝙪𝙨𝙪𝙖𝙧𝙞𝙤-* ⚠️

▢ *Admin:* ${name}
▢ *Usuario:* @${who.split`@`[0]}
▢ *Advertencias:* ${warn + 1}/${war}
▢ *Razon:* ${text}`, null, { mentions: [who] }) 
            m.reply(`
⚠️ *OJITO* ⚠️
𝘾𝙪𝙢𝙥𝙡𝙚 𝙡𝙖𝙨 𝙧𝙚𝙜𝙡𝙖𝙨 :𝙘

▢ *Avertencias:* ${warn + 1}/${war} 
𝙎𝙞 𝙧𝙚𝙘𝙞𝙗𝙚𝙨*${war}* 𝙢𝙖𝙨 𝙖𝙙𝙫𝙚𝙧𝙩𝙚𝙣𝙘𝙞𝙖𝙨 𝙨𝙚𝙧𝙖𝙨 𝙨𝙖𝙘𝙖𝙙𝙤 𝙙𝙚𝙡 𝙜𝙧𝙪𝙥𝙤`, who)
        } else if (warn == war) {
            global.db.data.users[who].warn = 0
            m.reply(`⛔ El usuario excedió el *${war}* Por lo tanto, se eliminarán las advertencias.`)
            await time(3000)
            await conn.groupParticipantsUpdate(m.chat, [who], 'eliminar')
            m.reply(`♻️ Fuiste eliminado del grupo *${groupMetadata.subject}* porque has sido advertidod *${war}* tiempos`, who)
        }
}
handler.help = ['warn @user']
handler.tags = ['group']
handler.command = ['advertir'] 
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler

const time = async (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
