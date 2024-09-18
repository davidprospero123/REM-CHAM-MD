import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {

  if (!args[0]) return conn.reply(m.chat, `*_Uso incorrecto_*\n\n*Ejemplo:*\n${usedPrefix + command} https://youtu.be/ejemplo`, m)

  let youtubeLink = args[0]

  console.log('URL to fetch:', youtubeLink)

  await conn.loadingMsg(m.chat, '📥 𝘿𝙀𝙎𝘾𝘼𝙍𝙂𝘼𝙉𝘿𝙊', `✅ 𝘿𝙀𝙎𝘾𝘼𝙍𝙂𝘼 𝙀𝘾𝙃𝘼`, ["Cargando.", "Cargando..", "Cargando...", "Cargando....", "Cargando.....", "Cargando......"], m)

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

    const { title, videoUrl, thumbnail } = data.data
    const caption = ` *📌 Titulo:* ${title}`

    await conn.sendMessage(m.chat, {
      video: { url: videoUrl },
      mimetype: 'video/mp4',
      fileName: `${title}.mp4`,
      caption: caption,
      thumbnail: await fetch(thumbnail.url).then(res => res.buffer())
    }, { quoted: m })

  } catch (error) {
    console.error('Error:', error)
    conn.reply(m.chat, `❌ _Error:_ Ocurrió un problema al procesar la solicitud`, m)
  }
}

handler.help = ['ytmp4 <url>']
handler.tags = ['dl']
handler.command = /^video|dlmp4|getvid|yt(v|mp4)?$/i
handler.register = true
export default handler
