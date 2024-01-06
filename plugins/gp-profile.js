import { createHash } from 'crypto'
import { canLevelUp, xpRange } from '../lib/levelling.js'
import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix, command}) => {

let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
if (!(who in global.db.data.users)) throw `✳️ Este usuario no esta en mis datos`
let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './logo.jpg')
let user = global.db.data.users[who]
let about = (await conn.fetchStatus(who).catch(console.error) || {}).status || ''
let { name, exp, credit, lastclaim, registered, regTime, age, level, role, wealth, warn } = global.db.data.users[who]
let { min, xp, max } = xpRange(user.level, global.multiplier)
let username = conn.getName(who)
let math = max - xp 
let prem = global.prems.includes(who.split`@`[0])
let sn = createHash('md5').update(who).digest('hex')

// • @${who.replace(/@.+/, '')}
let str = `
*P E R F I L  -  U S E R*

┌📍  *Nombre* : ${username}${about ? '\n\n │🎌 *Bio:* ' + about : ''}
│📍  *Numero* : ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
│📍  *Link:* wa.me/${who.split`@`[0]}
│📍  *oro:* ${credit} 
│📍  *Nivel:* ${level}
│📍  *Exp:* ${exp} (${user.exp - min} / ${xp})\n${math <= 0 ? `Listo para *${usedPrefix}levelup*` : `*${math}xp* Te falta mas XP`}
│📍  *rank:* ${role}
│📍  *Premium:* ${prem ? 'Si' : 'No'}
│📍  *Registrado:* ${registered ? 'Si': 'No'}
`
    conn.sendFile(m.chat, pp, 'profil.jpg', str, m, false, { mentions: [who] })
    m.react(done)

}
handler.help = ['profile']
handler.tags = ['group']
handler.command = ['profile','perfil'] 

export default handler