import { toDataURL } from 'qrcode'

let handler = async (m, { text, conn }) => {
if (!text) return conn.reply(m.chat, `*𝙸𝚗𝚐𝚛𝚎𝚜𝚊 𝚞𝚗 𝚃𝚎𝚡𝚝𝚘 𝙳𝚎 𝚕𝚘 𝚀𝚞𝚎 𝚀𝚞𝚒𝚎𝚛𝚊𝚜 𝙱𝚞𝚜𝚌𝚊𝚛*`, m,)
conn.sendFile(m.chat, await toDataURL(text.slice(0, 2048), { scale: 8 }), 'qrcode.png', null, m, null, rcanal)
}
handler.help = ['qr'].map(v => 'code' + v + ' <texto>')
handler.tags = ['tools']
handler.command = /^qr(code)?$/i

export default handler
