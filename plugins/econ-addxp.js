//import db from '../lib/database.js'

let handler = async (m, { conn, text }) => {
  let who
  if (m.isGroup) who = m.mentionedJid[0]
  else who = m.chat
  if (!who) throw '✳️ Etiqueta al usuario'
  let txt = text.replace('@' + who.split`@`[0], '').trim()
  if (!txt) throw '✳️ Ingresa la cantidad de *XP* que deseas agregar'
  if (isNaN(txt)) throw ' 🔢 sólo números'
  let xp = parseInt(txt)
  let exp = xp

  if (exp < 1) throw '✳️ Mínimo *1*'
  let users = global.db.data.users
  users[who].exp += xp

  await m.reply(`≡ *XP AGREGADO*
┌──────────────
▢  *Total:* ${xp}
└──────────────`)
 conn.fakeReply(m.chat, `▢ Recibió usted \n\n *+${xp} XP*`, who, m.text)
}

handler.help = ['addxp <@user>']
handler.tags = ['economy']
handler.command = ['addxp' , 'agregarxp'] 
handler.rowner = true