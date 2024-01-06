//import db from '../lib/database.js'

let handler = async (m, { text, usedPrefix, command }) => {
    global.db.data.sticker = global.db.data.sticker || {}
    if (!m.quoted) throw `✳️Responder a un mensaje con *${usedPrefix + command}*`
    if (!m.quoted.fileSha256) throw '⚠️ Menciona el Mensaje'
    if (!text) throw `✳️ Falla el Comando`
    let sticker = global.db.data.sticker
    let hash = m.quoted.fileSha256.toString('base64')
    if (sticker[hash] && sticker[hash].locked) throw '⚠️ No tienes permiso para cambiar este comando de pegatina'
    sticker[hash] = {
        text,
        mentionedJid: m.mentionedJid,
        creator: m.sender,
        at: + new Date,
        locked: false,
    }
    m.reply(`✅ comando guardado`)
}


handler.help = ['cmd'].map(v => 'set' + v + ' <txt>')
handler.tags = ['cmd']
handler.command = ['setcmd']
handler.owner = true

export default handler
