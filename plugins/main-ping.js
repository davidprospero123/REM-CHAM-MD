import { exec } from 'child_process'
import speed from 'performance-now'

let handler = async (m, { conn }) => {

  let pingMsg = await conn.sendMessage(m.chat, {text: '𝙲𝚊𝚛𝚐𝚊𝚗𝚍𝚘 𝙿𝚒𝚗𝚐...'})

  let timestamp = speed()

  await exec('neofetch --stdout', async (error, stdout) => {

    let latency = (speed() - timestamp).toFixed(4)

    await conn.relayMessage(m.chat, {
      protocolMessage: {
        key: pingMsg.key,
        type: 14,
        editedMessage: {
          conversation: `*𝙼𝚒 𝙿𝚒𝚗𝚐 𝙴𝚜 𝙳𝚎:* ${latency} _𝚖𝚜_` 
        }
      }
    }, {})

  })

}

handler.help = ['ping']
handler.tags = ['main']
handler.command = ['ping', 'speed'] 

export default handler
