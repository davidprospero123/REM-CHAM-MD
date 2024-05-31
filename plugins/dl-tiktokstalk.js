
import fg from 'api-dylux'
let handler = async (m, { conn, text, args }) => {
	
  if (!text) throw `✳️ 𝙸𝚗𝚐𝚛𝚎𝚜𝚊 𝙴𝚕 𝙽𝚘𝚖𝚋𝚛𝚎 𝙳𝚎 𝚄𝚗 𝚄𝚜𝚞𝚊𝚛𝚒𝚘 𝙳𝚎 𝚃𝚒𝚔𝚃𝚘𝚔 `
  let res = await fg.ttStalk(args[0])
  let txt = `
┌──「 *𝚂𝚃𝙰𝙻𝙺 𝚃𝙸𝙺𝚃𝙾𝙺* 
├─ *🔖𝙽𝚘𝚖𝚋𝚛𝚎:* ${res.name}
├─ *🔖𝚄𝚜𝚞𝚊𝚛𝚒𝚘:* ${res.username}
├─ *👥𝚂𝚎𝚐𝚞𝚒𝚍𝚘𝚛𝚎𝚜:* ${res.followers}
├─ *🫂𝚂𝚒𝚐𝚞𝚒𝚎𝚗𝚍𝚘:* ${res.following}
├─ *📌𝙳𝚎𝚜𝚌:* ${res.desc}
├────────────
├─ *🔗 𝙻𝚒𝚗𝚔* : https://tiktok.com/${res.username}
└────────────`
  await conn.sendFile(m.chat, res.profile, 'tt.png', txt, m)
}
handler.help = ['tiktokstalk']
handler.tags = ['downloader']
handler.command = /^t(tstalk|iktokstalk)$/i

export default handler
