import fs from 'fs'
import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix: _p }) => {
    let img = "https://avatars.githubusercontent.com/u/133716066?s=400&u=0c1975543bb02a959e1787e34886329ee7f8949f&v=4"
let info = `*_𝙼𝙴 𝙼𝙸𝚁𝙰𝚂_*`
await conn.reply(m.chat, info, m, { contextInfo: { mentionedJid: [m.sender],forwardingScore: 256,
      isForwarded: true, externalAdReply: { title: author, body: botname, sourceUrl: fgyt, thumbnail: await conn.getFile(img) }}})
}
handler.customPrefix = /^(tes|tess|test)$/i
handler.command = new RegExp

export default handler
