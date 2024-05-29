
let handler = async (m, { conn }) => {
	
	await conn.fetchBlocklist().then(async data => {
		let txt = `*𝚃𝚎𝚗𝚐𝚘 :* ${data.length} 𝚄𝚜𝚞𝚊𝚛𝚒𝚘𝚜 𝙱𝚕𝚘𝚚𝚞𝚎𝚊𝚍𝚘𝚜\n\n✦ ───────── ✦\n`
		for (let i of data) {
			txt += `✦ @${i.split("@")[0]}\n`
		}
		txt += "╰──────────⳹"
		return conn.reply(m.chat, txt, m, { mentions: await conn.parseMention(txt) })
	}).catch(err => {
		console.log(err);
		throw '𝙽𝚘 𝚃𝚎𝚗𝚐𝚘 𝚊 𝙽𝚊𝚍𝚒𝚎 𝙱𝚕𝚘𝚚𝚞𝚎𝚊𝚍𝚘 :𝟹'
	})
}

handler.help = ['blocklist']
handler.tags = ['main']
handler.command = ['blocklist', 'listblock'] 

export default handler
