
let handler = async (m, { conn, args, groupMetadata}) => {
       let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
       if (!(who in global.db.data.users)) throw `✳️ El usuario no esta mi base de datos :c`
       let warn = global.db.data.users[who].warn
       let name = conn.getName(who)
      m.reply(`
 *ADVERTENCIAS*

▢ *Nombre :* ${name} 
▢ *Advertencias :* ${warn}`)
}

handler.help = ['warns']
handler.tags = ['group']
handler.command = ['warns','advertencias'] 
handler.group = true

export default handler
