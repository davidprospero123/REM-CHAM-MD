import { areJidsSameUser } from '@whiskeysockets/baileys'
let handler = async (m, { conn, args }) => {
    let group = m.chat
    if (/^[0-9]{5,16}-?[0-9]+@g\.us$/.test(args[0])) group = args[0]
    if (!/^[0-9]{5,16}-?[0-9]+@g\.us$/.test(group)) throw '⚠️ Sólo se puede utilizar en grupos.'
    let groupMetadata = await conn.groupMetadata(group)
    if (!groupMetadata) throw 'GroupMetadata no está definido :\\'
    if (!('participantes' in groupMetadata)) throw 'Los participantes no están definidos :('
    let me = groupMetadata.participants.find(user => areJidsSameUser(user.id, conn.user.id))
    if (!me) throw '✳️ no estoy en ese grupo :('
    if (!me.admin) throw '✳️ Yo no soy adminitrador'
    m.reply('https://chat.whatsapp.com/' + await conn.groupInviteCode(group))
}
handler.help = ['link']
handler.tags = ['group']
handler.command = ['link', 'linkgroup'] 

export default handler
