import { googleImage } from '@bochilteam/scraper'
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `*🚩 Ingresa que imagen deseas buscar en Google.*`, m,)
await m.react('🕓')
let res = await googleImage(text)
await conn.sendFile(m.chat, res.getRandom(), 'out.png', `*––『ɢᴏᴏɢʟᴇ-ɪᴍᴀɢᴇɴᴇꜱ』––*\n\n*Resultado de ∙* ${text}\n\n𝐑𝐄𝐌 - 𝐁𝐎𝐓 - 𝐁𝐘 - 𝐂𝐔𝐑𝐈`.trim(),)
await m.react('✅')
}
handler.help = ['imagen <texto>']
handler.tags = ['search', 'img']
handler.command = ['googleimagene', 'googleimg', 'imagen'] 

export default handler
