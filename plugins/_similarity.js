
import didyoumean from 'didyoumean'

import similarity from 'similarity'

export async function before(m, { conn, match, usedPrefix, command }) {

       if ((usedPrefix = (match[0] || '')[0])) {
    let noPrefix = m.text.replace(usedPrefix, '')
    let args = noPrefix.trim().split` `.slice(1)
    let text = args.join` `
    let help = Object.values(plugins).filter(v => v.help && !v.disabled).map(v => v.help).flat(1)
         if (help.includes(noPrefix)) return
    let mean = didyoumean(noPrefix, help)
    let sim = similarity(noPrefix, mean)
    let som = sim * 100
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let name = await conn.getName(who)

    let caption = `𝙴𝚙𝚊𝚊𝚊 ${name} 𝚚𝚞𝚎𝚛𝚒𝚍𝚘 :3 ¿𝙳𝚎 𝚌𝚊𝚜𝚞𝚊𝚕𝚒𝚍𝚊𝚍 𝚗𝚘 𝚎𝚜𝚝𝚊𝚛𝚊𝚜 𝚚𝚞𝚎𝚛𝚒𝚎𝚗𝚍𝚘 𝚞𝚜𝚊𝚛?  *${usedPrefix + mean} ?*`
 if (mean) this.reply(m.chat, `${caption}`, m)
      }
}
export const disabled = false

