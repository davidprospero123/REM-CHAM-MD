let handler = async (m, { conn, text, usedPrefix, command }) => {
    let who
        if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
        else who = m.chat
        let user = global.db.data.users[who]
        if (!who) throw `✳️ Etiqueta o menciona a alguien\n\n📌 Ejemplo : ${usedPrefix + command} @user`
    if (global.allowed.includes(who.split`@`[0])) throw 'El usuario mencionado ya tiene permiso para usar el bot en DM '
    global.allowed.push(`${who.split`@`[0]}`)
    
    conn.reply(m.chat, ` @${who.split`@`[0]} Obtuve el pase definitivo para usar el bot en DM`, m, { mentions: [who] })
    
    }
    handler.help = ['allow <@tag>']
    handler.tags = ['owner']
    handler.command = ['permitir', 'makeallow', 'al', 'allow'] 
    
    handler.group = true
    handler.rowner = true
    
    export default handler
