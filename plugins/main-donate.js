let handler = async(m, { conn, usedPrefix, command }) => {

    let don = `
- ᴀᴘᴏʏᴀ ᴀᴍɪ ᴄʀᴇᴀᴅᴏʀ :3
ᴀᴠᴇᴄᴇꜱ ʟᴏꜱ ꜱᴇʀᴠɪᴅᴏʀᴇꜱ ɴᴏꜱ ᴄᴜᴇꜱᴛᴀɴ :c
- 𝙋𝘼𝙔𝙋𝘼𝙇
• *Link :* https://paypal.me/JoseCuri123
- 𝙔𝘼𝙋𝙀
• *Numero :* 913899071
ᴘᴏʀ ꜱᴜ ᴀᴘᴏʏᴏ ʟᴇꜱ ᴏᴛᴏʀɢᴀʀᴇᴍᴏꜱ ᴘʀᴇᴍɪᴜᴍ
ʏ ᴜɴ ᴀᴄᴄᴇꜱᴏ ᴀʟ ʙᴏᴛ ᴀ ᴄᴜᴀʟQᴜɪᴇʀ ɢʀᴜᴘᴏ.
`
let img = 'https://telegra.ph/file/290082cebfe4bb0d435a1.jpg'
conn.sendFile(m.chat, img, 'img.jpg', don, m, null,)
//conn.sendPayment(m.chat, '2000', 'USD', don, m.sender, m)
}

handler.help = ['donate']
handler.tags = ['main']
handler.command = ['apoyar', 'donate', 'donar'] 

export default handler