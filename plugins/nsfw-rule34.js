import { googleImage, pinterest } from '@bochilteam/scraper'
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!global.db.data.chats[m.chat].nsfw) return conn.reply(m.chat, `❎ En este grupo no esta permitido el contenido *+18*`, m,).then(_ => m.react('✖️'))

if (!text) return conn.reply(m.chat, `*🚩 Ingresa un texto junto al comando.*`, m,)
await m.react('🕓')
const res = await (await googleImage('rule34 ' + text)).getRandom()
await conn.sendFile(m.chat, res, 'error.jpg', `*––––『 ɴꜱꜰᴡ ʀᴜʟᴇ34 』––––*\n\n*Resultado de ∙* ${text ? text.capitalize() : false}\n\n𝙍𝙚𝙢-𝘾𝙝𝙖𝙢`,)
await m.react('✅')
}
handler.help = ['rule34 <texto>']
handler.tags = ['nsfw', 'img']
handler.command = ['rule34']
handler.gold = 5
handler.group = true 
export default handler