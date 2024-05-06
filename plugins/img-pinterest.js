import { pinterest } from '@bochilteam/scraper'

let handler = async(m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `✳️ ¿𝚀𝚞é 𝚒𝚖𝚊𝚐𝚎𝚗 𝚚𝚞𝚒𝚎𝚛𝚎𝚜 𝚚𝚞𝚎 𝚋𝚞𝚜𝚚𝚞𝚎?\n\n📌 Ejemplo  : ${usedPrefix + command} Boruto`
  const json = await pinterest(text)
  conn.sendFile(m.chat, json.getRandom(), 'pinterest.jpg', `
*≽^- ˕ -^≼  𝙿𝚒𝚗𝚝𝚎𝚛𝚎𝚜𝚝:*  ${text}
`.trim(), m)
}
handler.help = ['pinterest']
handler.tags = ['img']
handler.command = ['pinterest1'] 
handler.register = true

export default handler
