import fs from 'fs'
import os from 'os'
import fetch from 'node-fetch'

let limit = 500
let handler = async (m, { conn, args, isPrems, isOwner, usedPrefix, command }) => {
  let chat = global.db.data.chats[m.chat]
  if (!args || !args[0]) throw `✳️ Ejemplo:\n${usedPrefix + command} https://youtu.be/YzkTFFwxtXI`
  if (!args[0].match(/youtu/gi)) throw `❎ Verifica que el enlace de YouTube sea válido`

  var ggapi = `https://youtube-api-thepapusteam.koyeb.app/api/video?url=${encodeURIComponent(args[0])}`

  const response = await fetch(ggapi)
  if (!response.ok) {
    console.log('Error al obtener los detalles del audio:', response.statusText)
    throw 'Error al obtener los detalles del audio'
  }
  const data = await response.json()

  if (!data.status) throw 'Error al procesar el audio'

  let mp3Url = data.downloads.mp3.url

  try {
    let mp3 = await fetch(mp3Url)
    if (!mp3.ok) throw 'Error al descargar el MP3'

    const mp3Buffer = await mp3.buffer()

    conn.sendFile(m.chat, mp3Buffer, 'audio.mp3', '', m, false, { asDocument: false })
  } catch (error) {
    console.log('Error al descargar o enviar el archivo MP3:', error)
    conn.sendMessage(m.chat, '❌ Error al descargar el archivo MP3', { quoted: m })
  }
}

handler.help = ['ytmp3 <yt-link>']
handler.tags = ['descargador']
handler.command = ['ytmp3', 'audio', 'yta']
handler.diamond = false

export default handler
