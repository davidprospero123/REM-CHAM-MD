
import fetch from 'node-fetch'
import { mediafiredl } from '@bochilteam/scraper'

let handler = async (m, { conn, args, usedPrefix, command, isOwner, isPrems }) => {
  var limit
     if((isOwner || isPrems)) limit = 1200
     else limit = 100
   if (!args[0]) throw `✳️ 𝙸𝚗𝚐𝚛𝚎𝚜𝚎 𝚎𝚕 𝚎𝚗𝚕𝚊𝚌𝚎 𝚍𝚎 𝚖𝚎𝚍𝚒𝚊𝚏𝚒𝚛𝚎 𝚊𝚕 𝚕𝚊𝚍𝚘 𝚍𝚎𝚕 𝚌𝚘𝚖𝚊𝚗𝚍𝚘`
    if (!args[0].match(/mediafire/gi)) throw `❎ 𝙻𝚒𝚗𝚔 𝚒𝚗𝚌𝚘𝚛𝚛𝚎𝚌𝚝𝚘`
    m.react(rwait)
    let full = /f$/i.test(command)
    let u = /https?:\/\//.test(args[0]) ? args[0] : 'https://' + args[0]
    let ss = await (await fetch(`https://image.thum.io/get/fullpage/${u}`)).buffer()
    let res = await mediafiredl(args[0])
    let { url, url2, filename, ext, aploud, filesize, filesizeH } = res
    let isLimit = (isPrems || isOwner ? limit : limit) * 1012 < filesize
    let caption = `
   ≡ *𝙼𝙴𝙳𝙸𝙰𝙵𝙸𝚁𝙴*

▢ *𝙽𝙾𝙼𝙱𝚁𝙴:* ${filename}
▢ *𝙿𝙴𝚂𝙾:* ${filesizeH}
▢ *𝙴𝚇𝚃𝙴𝙽𝙲𝙸𝙾𝙽:* ${ext}
▢ *𝙿𝚄𝙱𝙻𝙸𝙲𝙰𝙳𝙾:* ${aploud}
${isLimit ? `\n▢ 𝙴𝚜𝚝𝚎 𝚊𝚛𝚌𝚑𝚒𝚟𝚘 𝚎𝚡𝚌𝚎𝚍𝚎 𝚕𝚘 𝚕𝚒𝚖𝚒𝚝𝚎𝚜 *+${limit} MB*\n𝙼𝚎𝚓𝚘𝚛𝚊𝚝𝚎 𝚊 𝚙𝚛𝚎𝚖 𝚢 𝚍𝚎𝚜𝚌𝚊𝚛𝚐𝚊𝚛𝚊𝚜 𝚑𝚊𝚜𝚝𝚊 *900 MB*` : ''} 
`.trim()
    await conn.sendFile(m.chat, ss, 'ssweb.png', caption, m)

    if(!isLimit) await conn.sendFile(m.chat, url, filename, '', m, null, { mimetype: ext, asDocument: true })
    m.react(done)
}
handler.help = ['mediafire <url>']
handler.tags = ['downloader', 'premium']
handler.command = ['mediafire', 'mfire'] 
handler.register = true
handler.premium = false

export default handler
