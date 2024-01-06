import { createHash } from 'crypto'
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  if (user.registered === true) throw `✳️ Usted ya está registrado\n\n¿Quieres volver a registrarte?\n\n 📌 Utilice este comando para eliminar su registro \n*${usedPrefix}unreg* <Serial number>`
  if (!Reg.test(text)) throw `⚠️ Formato incorrecto\n\n ✳️ Usa este comando: *${usedPrefix + command} nombre.años*\n📌Ejemplo : *${usedPrefix + command}* ${name2}.16`
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw '✳️ El nombre no puede estar vacío'
  if (!age) throw '✳️ la edad no puede estar vacía'
  if (name.length >= 30) throw '✳️El nombre es muy largo' 
  age = parseInt(age)
  if (age > 100) throw '👴🏻 Un viejito quiere jugar al bot'
  if (age < 5) throw '🚼  Chistosito jsjsj '
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
  m.reply(`
┌─「 *Registrado* 」─
▢ *NOMBRE:* ${name}
▢ *AÑOS* : ${age} Años
▢ *SERIEL NUMBER* :
${sn}
└──────────────

 *${usedPrefix}help* Para  ver el menu de comandos
`.trim())
}
handler.help = ['reg'].map(v => v + ' <name.age>')
handler.tags = ['rg']

handler.command = ['verify', 'reg', 'register', 'registrar'] 

export default handler
