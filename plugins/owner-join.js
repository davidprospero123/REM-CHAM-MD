//need fix
let handler = async (m, { conn, text, usedPrefix, command, args, participants, isOwner }) => {

  if (!isOwner) return conn.sendMessage(m.chat,{text:`*Invite bot to a group*\n\nHello @${m.sender.split('@')[0]}\nyou can rent the bot to join a group\n\n_For more info you can DM the owner_\n*Type* \`\`\`.owner\`\`\` *to DM the owner*`.trim()}, {quoted:m});
   /*if (!isOwner) return conn.sendButton(m.chat, `*Invite bot to a group*\n\nHello @${m.sender.split('@')[0]}\nyou can rent the bot to join a group\n\n_more info click on the button_`.trim(), igfg, null, [
    ['Alquilar', `${usedPrefix}buyprem`]] , m, { mentions: [m.sender] })*/

  let time = global.db.data.users[m.sender].lastjoin + 86400000
  let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
  let delay = time => new Promise(res => setTimeout(res, time))

  let name = m.sender 
  let [_, code] = text.match(linkRegex) || []
  if (!args[0]) throw `✳️ Enviar el enlace del grupo\n\n 📌 Ejemplo:\n *${usedPrefix + command}* <linkwa> <dias>\n\n_el número son los días que el bot estará en el grupo_` 
  if (!code) throw `✳️ Link invalido`
  if (!args[1]) throw `📌 Número de días faltantes\n\n Ejemplo:\n *${usedPrefix + command}* <linkwa> 2`
  if (isNaN(args[1])) throw `✳️ Solo número, que representa los días que el bot estará en el grupo.!`
  let owbot = global.owner[1] 
  m.reply(`𝙀𝙨𝙥𝙚𝙧𝙖 3 𝙨𝙚𝙜𝙪𝙣𝙙𝙤𝙨 𝙢𝙞 𝙘𝙧𝙚𝙖𝙙𝙤𝙧 𝙮𝙖 𝙢𝙚 𝙪𝙣𝙤 𝙖𝙡 𝙜𝙧𝙪𝙥𝙤 :3`)
  await delay(3000)
  try {
  let res = await conn.groupAcceptInvite(code)
  let b = await conn.groupMetadata(res)
  let d = b.participants.map(v => v.id)
  let member = d.toString()
  let e = await d.filter(v => v.endsWith(owbot + '@s.whatsapp.net'))
  let nDays = 86400000 * args[1]  
  let now = new Date() * 1
  if (now < global.db.data.chats[res].expired) global.db.data.chats[res].expired += nDays
  else global.db.data.chats[res].expired = now + nDays
  if (e.length) await m.reply(`✅ I se unió exitosamente al grupo \n\n≡ información del grupo \n\n *Nombre :* ${await conn.getName(res)}\n\nEl bot saldrá automáticamente después \n\n${msToDate(global.db.data.chats[res].expired - now)}`)

 if (e.length) await conn.reply(res, `🏮 Hola chicos Soy Rem-Bot un bot creado por curi :3

@${owbot} el es mi creador si tienes alguna duda
fui invitado por *${m.name}*`, m, {
    mentions: d
     }).then(async () => {
     await delay(7000)
     }).then( async () => {
     await conn.reply(res, `ok todos relájense 🤭`, 0)
     await conn.reply(global.owner[1]+'@s.whatsapp.net', `≡ *INVITACIÓN DE GRUPO*\n\n@${m.sender.split('@')[0]} ha invitado a *${conn.user.name}* al grupo\n\n*${await conn.getName(res)}*\n\n*ID* : ${res}\n\n📌 Link : ${args[0]}\n\nEl bot saldrá automáticamente después \n\n${msToDate(global.db.data.chats[res].expired - now)}`, null, {mentions: [m.sender]})
     })
     if (!e.length) await conn.reply(global.owner[1]+'@s.whatsapp.net', `≡ *INVITACIÓN A GRUPO*\n\n@${m.sender.split('@')[0]} ha invitado *${conn.user.name}* el grupo\n\n*${await conn.getName(res)}*\n\n*ID* : ${res}\n\n📌 link : ${args[0]}\n\nEl bot saldrá automáticamente despuésr\n\n ${msToDate(global.db.data.chats[res].expired - now)}`, null, {mentions: [m.sender]})
     if (!e.length) await m.reply(`✳️ Invitar exitosamente al bot al grupo\n\n${await conn.getName(res)}\n\nEl bot saldrá automáticamente después *${msToDate(global.db.data.chats[res].expired - now)}*`).then(async () => {
     let mes = `Hii 👋🏻

*${conn.user.name}* es uno de los bots de WhatsApp multidispositivo creado con Node.js, *${conn.user.name}* Recién invitado por *${m.name}*

para ver el menú del bot escribe /menu

${usedPrefix}help
@${conn.user.jid.split('@')[0]} saldrá automáticamente después \n\n${msToDate(global.db.data.chats[res].expired - now)}`
  await conn.sendMessage(m.chat, mes,  m, {
  mentions: d
   })
     })
    } catch (e) {
      conn.reply(global.owner[1]+'@s.whatsapp.net', e)
      throw `✳️ 𝙃𝙪𝙗𝙤 𝙪𝙣 𝙚𝙧𝙧𝙤𝙧 :𝙘`
      }
}
handler.help = ['join <chat.whatsapp.com> <dias>']
handler.tags = ['owner']
handler.command = ['join', 'invite','unete'] 

//handler.owner = true

export default handler

function msToDate(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [d, ' *Dias*\n ', h, ' *Horas*\n ', m, ' *Minutos*\n ', s, ' *Segundos* '].map(v => v.toString().padStart(2, 0)).join('')
}
