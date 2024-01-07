
import fg from 'api-dylux' 
let handler = async (m, { conn, args, usedPrefix, command }) => {

	if (!args[0]) throw `✳️ Ingresa un link de Google Drive\n\n✔️ Ejemplo :\n*${usedPrefix + command}* https://drive.google.com/file`

	m.react(rwait) 
	try {
	let res = await fg.GDriveDl(args[0])
	 await m.reply(`
≡ *Google Drive DL*

▢ *Number:* ${res.fileName}
▢ *Size:* ${res.fileSize}
▢ *type:* ${res.mimetype}`)
		
	conn.sendMessage(m.chat, { document: { url: res.downloadUrl }, fileName: res.fileName, mimetype: res.mimetype }, { quoted: m })
	m.react(done)
   } catch {
	m.reply('Error: Checa bien el link o prueba con otro') 
  }
}
handler.help = ['gdrive']
handler.tags = ['downloader', 'premium']
handler.command = ['gdrive']
handler.credit = true
handler.premium = true

export default handler
