let handler = async (m, { conn, text, participants, isAdmin, isOwner, groupMetadata }) => {
    let users = participants.map(u => u.id).filter(v => v !== conn.user.jid)
    m.reply(`▢ Grupo : *${groupMetadata.subject}*\n▢ Miembros : *${participants.length}*${text ? `\n▢ Mensaje : ${text}\n` : ''}\n┌───⊷ *MENTIONS*\n` + users.map(v => '▢ @' + v.replace(/@.+/, '')).join`\n` + '\n└──✪ CURI ┃ ᴮᴼᵀ ✪──', null, {
        mentions: users
    })
}

handler.help = ['tagall']
handler.tags = ['group']
handler.command = ['tagall','all']
handler.admin = true
handler.group = true

export default handler
