
export async function all(m) {
    if (!m.isGroup)
        return
    let chats = global.db.data.chats[m.chat]
    if (!chats.expired)
        return !0
    if (+new Date() > chats.expired) {
        await this.reply(m.chat, `🔴 𝙰𝚍𝚒𝚘𝚜 :𝚌 *${this.user.name}* 𝙼𝚎 𝚜𝚊𝚕𝚍𝚛𝚎 𝚍𝚎𝚕 𝚐𝚛𝚞𝚙𝚘 \n\n𝙰𝚌𝚊𝚋𝚘 𝚜𝚞 𝚛𝚎𝚗𝚝𝚊`)
        await this.groupLeave(m.chat)
        chats.expired = null
    }
}
