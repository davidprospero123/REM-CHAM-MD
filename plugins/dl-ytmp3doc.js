import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) return conn.reply(m.chat, `*_Uso incorrecto_*\n\n*Ejemplo:*\n${usedPrefix + command} https://youtu.be/ejemplo`, m)
  let youtubeLink = args[0]
  console.log('URL to fetch:', youtubeLink)
  await conn.loadingMsg(m.chat, '💙 𝘿𝙀𝙎𝘾𝘼𝙍𝙂𝘼𝙉𝘿𝙊', `✅ 𝘿𝙀𝙎𝘾𝘼𝙍𝙂𝘼 𝙀𝙓𝙄𝙏𝙊𝙎𝘼`, [
    "▰▱▱▱▱ ᴄᴀʀɢᴀɴᴅᴏ ...",
    "▰▰▱▱▱ ᴄᴀʀɢᴀɴᴅᴏ ...",
    "▰▰▰▱▱ ᴄᴀʀɢᴀɴᴅᴏ ...",
    "▰▰▰▰▱ ᴄᴀʀɢᴀɴᴅᴏ ...",
    "▰▰▰▰▰ ᴄᴀʀɢᴀɴᴅᴏ ..."
  ], m)  
  try {
    if (typeof youtubeLink !== 'string' || !youtubeLink.startsWith('http')) {
      throw new Error('URL inválida proporcionada')
    }
    const fetchUrl = `https://rembotapi.vercel.app/api/yt?url=${encodeURIComponent(youtubeLink)}`
    console.log('Fetch URL:', fetchUrl)
    const response = await fetch(fetchUrl)
    const data = await response.json()
    if (!data.status) {
      return conn.reply(m.chat, `❌ _Error:_ ${data.message || 'No se encontró el video'}`, m)
    }
    const { title, audioUrl, thumbnail } = data.data
    const caption = ` *📌 Titulo:* ${title}`
    await conn.sendMessage(m.chat, {
      document: { url: audioUrl },
      mimetype: 'audio/mp3',
      fileName: `${title}.mp3`,
      caption: caption,
      thumbnail: await fetch(thumbnail.url).then(res => res.buffer())
    }, { quoted: m })
  } catch (error) {
    console.error('Error:', error)
    conn.reply(m.chat, `❌ _Error:_ Ocurrió un problema al procesar la solicitud`, m)
  }
}

handler.help = ['yt mp3 <url>']
handler.tags = ['dl']
handler.command = ['ytmp3doc', 'ytaudio']
handler.register = true

export default handler
