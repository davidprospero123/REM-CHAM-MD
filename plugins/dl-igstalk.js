
import fg from 'api-dylux'
let handler= async (m, { conn, args, text, usedPrefix, command }) => {
	
    if (!args[0]) throw `✳️ 𝙸𝚗𝚐𝚛𝚎𝚜𝚊 𝚎𝚕 𝚗𝚘𝚖𝚋𝚛𝚎 𝚍𝚎𝚕 𝚞𝚜𝚞𝚊𝚛𝚒𝚘\n\n📌𝙴𝚓𝚎𝚖𝚙𝚕𝚘: ${usedPrefix + command} Josecuri_12` 
    let res = await fg.igStalk(args[0])
    let te = `
┌──「 *𝚂𝚃𝙰𝙻𝙺 𝙸𝙽𝚂𝚃𝙰𝙶𝚁𝙰𝙼* 
├─ *🔖𝙽𝚞𝚖𝚎𝚛𝚘:* ${res.name} 
├─ *🔖𝙽𝚘𝚖𝚋𝚛𝚎:* ${res.username}
├─ *👥𝚂𝚎𝚐𝚞𝚒𝚍𝚘𝚛𝚎𝚜:* ${res.followersH}
├─ *🫂𝚂𝚎𝚐𝚞𝚒𝚍𝚘𝚜:* ${res.followingH}
├─ *📌𝙱𝚒𝚘:* ${res.description}
├─ *🏝️𝙿𝚘𝚜𝚝𝚜:* ${res.postsH}
├─────────────
├─ *🔗 𝙻𝚒𝚗𝚔* : https://instagram.com/${res.username.replace(/^@/, '')}
└────────────`

     await conn.sendFile(m.chat, res.profilePic, 'tt.png', te, m)
     
}
handler.help = ['igstalk']
handler.tags = ['downloader']
handler.command = ['igstalk'] 

export default handler
