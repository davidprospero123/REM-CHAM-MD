let handler = async (m, { conn, text }) => {
  let who
  if (m.isGroup) who = m.mentionedJid[0]
  else who = m.chat
  if (!who) throw '✳️ Etiquetar al usuario'
  let txt = text.replace('@' + who.split`@`[0], '').trim()
  if (!txt) throw '✳️ Ingresa la cantidad de *Oro* que deseas agregar'
  if (isNaN(txt)) throw '🔢 sólo números'
  let dmt = parseInt(txt)
  let diamond = dmt

  if (diamond < 1) throw '✳️ Minimo *1*'
  let users = global.db.data.users
 users[who].credit += dmt

  await m.reply(`≡ *Gold Agregado*
┌──────────────
▢ *Total:* ${dmt}
└──────────────`)
 conn.fakeReply(m.chat, `▢ Recibió usted \n\n *+${dmt}* Gold`, who, m.text)
}

handler.help = ['addgold <@user>']
handler.tags = ['economy']
handler.command = ['addgold','depositar','depositgold','deposit'] 
handler.rowner = true

export default handler

