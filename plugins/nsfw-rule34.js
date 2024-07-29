import { googleImage, pinterest } from '@bochilteam/scraper'
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!global.db.data.chats[m.chat].nsfw) throw `🚫 𝙽𝚘 𝙴𝚜𝚝𝚊 𝙰𝚌𝚝𝚒𝚟𝚊𝚍𝚘 𝙴𝚕 𝙽𝚂𝙵𝚆 𝙴𝚗 𝙴𝚜𝚝𝚎 𝙶𝚛𝚞𝚙𝚘\n\n 𝙰𝚌𝚝𝚒𝚟𝚊𝚕𝚘 𝚄𝚜𝚊𝚗𝚍𝚘 \n*${usedPrefix}𝙴𝚗𝚊𝚋𝚕𝚎 𝚗𝚜𝚏𝚠`
let user = global.db.data.users[m.sender].age
if (user < 17) throw m.reply(`❎ 𝙽𝚎𝚌𝚎𝚜𝚒𝚝𝚊𝚜 𝚃𝚎𝚗𝚎𝚛 +𝟷𝟾 𝙿𝚊𝚛𝚊 𝚄𝚜𝚊𝚛 𝙴𝚜𝚝𝚎 𝙲𝚘𝚖𝚊𝚗𝚍𝚘`)
  
if (!text) return conn.reply(m.chat, `*𝙸𝚗𝚐𝚛𝚎𝚜𝚊 𝙴𝚕 𝚃𝚎𝚡𝚝𝚘 𝙳𝚎 𝚕𝚘 𝚀𝚞𝚎 𝚀𝚞𝚒𝚎𝚛𝚊𝚜 𝙱𝚞𝚜𝚌𝚊𝚛*`, m,)
await m.react('🕓')
const res = await (await googleImage('rule34 ' + text)).getRandom()
await conn.sendFile(m.chat, res, 'error.jpg', `*––––『 ɴꜱꜰᴡ ʀᴜʟᴇ34 』––––*\n\n*Resultado de :* ${text ? text.capitalize() : false}`, m, null, rcanal)
await m.react('✅')
}
handler.help = ['rule34 <texto>']
handler.tags = ['nsfw', 'img']
handler.command = ['rule34']
handler.gold = 5

export default handler
