import fetch from 'node-fetch'

let handler = m => m
handler.all = async function (m) {
	
	let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : m.sender
	let pp = await this.profilePictureUrl(who, 'image').catch(_ => 'https://i.imgur.com/whjlJSf.jpg')
	
	//Reenvio con link del Grupo
   global.rpl = { contextInfo: { externalAdReply: { mediaUrl: dygp, mediaType: 'VIDEO', description: 'support group', title: packname, body: 'support group', thumbnailUrl: pp, sourceUrl: dygp }}} 
	
	//Reenvio con link de Paypal
    global.rpyp = { contextInfo: { externalAdReply: { mediaUrl: dygp, mediaType: 'VIDEO', description: 'Donate', title: 'YOUTUBE', body: 'Keep bot alive', thumbnailUrl: pp, sourceUrl: fgyt }}}
	
	//Reenvio con link de youtube
    global.rpyt = { contextInfo: { externalAdReply: { showAdAttribution: true, mediaUrl: fgyt, mediaType: 'VIDEO', description: 'Suscribete : ' + fgyt, title: 'YouTube', body: 'learn to create your own bots', thumbnailUrl: pp, sourceUrl: fgyt }}}

	//Reenvio con link del Canal :3
 global.rcanal = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: id_canal, serverMessageId: 100, newsletterName: name_canal, }}},	
} 
export default handler
