
let handler = async (m, { conn, args, groupMetadata}) => {
        let who
        if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
        else who = m.chat
        if (!who) throw `✳️ Etiqueta o menciona a alguien`
        if (!(who in global.db.data.users)) throw `✳️ El usuario no esta en mi base de datos :c`
       let warn = global.db.data.users[who].warn
       if (warn > 0) {
         global.db.data.users[who].warn -= 1
         m.reply(`⚠️ *DELWARN*
         
▢ Advertencias: *-1*
▢ Advertencias total: *${warn - 1}*`)
         m.reply(`✳️ Un administrador redujo su advertencia, ahora tienes *${warn - 1}*`, who)
         } else if (warn == 0) {
            m.reply('✳️ El usuario no tiene aviso')
        }

}
handler.help = ['delwarn @user']
handler.tags = ['group']
handler.command = ['delwarn', 'unwarn','perdonar','desatvertir'] 
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
