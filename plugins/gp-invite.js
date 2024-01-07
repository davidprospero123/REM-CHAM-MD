
let handler = async (m, { conn, args, text, usedPrefix, command }) => {
if (!text) throw `✳️ Ingrese el número al que desea enviar una invitación grupal to\n\n📌 Example :\n*${usedPrefix + command}*51985165654`
if (text.includes('+')) throw  `Introduzca el número sin *+*`
if (isNaN(text)) throw ' 📌 Ingrese solo números sin el código de su país sin espacios'
let group = m.chat
let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group)
 
      await conn.reply(text+'@s.whatsapp.net', `≡ *INVITATION TO GROUP*\n\nUn usuario te invitó a unirte a este grupo. \n\n${link}`, m, {mentions: [m.sender]})
        m.reply(`✅ Se envió un enlace de invitación al usuario.`) 

}
handler.help = ['invite <917xxx>']
handler.tags = ['group']
handler.command = ['invite','invitar'] 
handler.group = true
handler.admin = false
handler.botAdmin = true

export default handler
