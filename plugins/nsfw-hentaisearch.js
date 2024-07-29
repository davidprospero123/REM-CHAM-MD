let handler = async (m, { conn, text, usedPrefix, command, args }) => {
    if (!global.db.data.chats[m.chat].nsfw) throw `🚫 𝙽𝚘 𝙴𝚜𝚝𝚊 𝙰𝚌𝚝𝚒𝚟𝚊𝚍𝚘 𝙴𝚕 𝙽𝚂𝙵𝚆 𝙴𝚗 𝙴𝚜𝚝𝚎 𝙶𝚛𝚞𝚙𝚘\n\n 𝙰𝚌𝚝𝚒𝚟𝚊𝚕𝚘 𝚄𝚜𝚊𝚗𝚍𝚘 \n*${usedPrefix}𝙴𝚗𝚊𝚋𝚕𝚎 𝚗𝚜𝚏𝚠`
    let user = global.db.data.users[m.sender].age
    if (user < 17) throw m.reply(`❎ 𝙽𝚎𝚌𝚎𝚜𝚒𝚝𝚊𝚜 𝚃𝚎𝚗𝚎𝚛 +𝟷𝟾 𝙿𝚊𝚛𝚊 𝚄𝚜𝚊𝚛 𝙴𝚜𝚝𝚎 𝙲𝚘𝚖𝚊𝚗𝚍𝚘`)
    
    if (!text) return m.reply(`*𝙸𝚗𝚐𝚛𝚎𝚜𝚊 𝙴𝚕 𝚃𝚎𝚡𝚝𝚘 𝙳𝚎 𝙰𝚕𝚐𝚞𝚗 𝙷𝚎𝚗𝚝𝚊𝚒 𝚀𝚞𝚎 𝚀𝚞𝚒𝚎𝚛𝚊𝚜 𝙱𝚞𝚜𝚌𝚊𝚛*`)
    try {
    m.reply(global.wait)
    let res = await fetch(`https://api.lolhuman.xyz/api/nhentaisearch?apikey=${lolkeysapi}&query=${text}`)    
    let json = await res.json()
    let aa = json.result[0].id
    let aa2 = json.result[0].title_native
    let res2 = await fetch(`https://api.lolhuman.xyz/api/nhentaipdf/${aa}?apikey=${lolkeysapi}`)
    let json2 = await res2.json()
    let aa3 = json2.result
    await conn.sendMessage(m.chat, { document: { url: aa3 }, mimetype: 'application/pdf', fileName: `${aa2}.pdf` }, { quoted: m })
    } catch {
    throw `𝙾𝚌𝚞𝚛𝚛𝚒𝚘 𝚄𝚗 𝙴𝚛𝚛𝚘𝚛 𝙸𝚗𝚎𝚜𝚙𝚎𝚛𝚊𝚍𝚘 :(`
    }}
handler.help = ['hentai <texto>']
handler.tags = ['nsfw']
handler.command = ['hentai', 'hentaisearch']

export default handler
