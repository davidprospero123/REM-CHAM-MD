let handler = async (m, { conn }) => {
  if (global.conn.user.jid === conn.user.jid) {
  } else {
    await conn.reply(m.chat, '*`𝙳𝚎𝚜𝚌𝚘𝚗𝚎𝚌𝚝𝚊𝚗𝚍𝚘 𝚊 𝚝𝚞 𝚜𝚞𝚋𝚋𝚘𝚝 𝚁𝚎𝚖`*', m)
    conn.ws.close()
  }
}
handler.help = ['stop']
handler.tags = ['serbot']
handler.command = ['stop', 'stopbot', 'stopbebot']
handler.owner = true

export default handler
