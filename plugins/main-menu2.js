import { createHash } from 'crypto'
import moment from 'moment-timezone'

let handler = async (m, { conn, usedPrefix, command }) => {
    let d = new Date(new Date + 3600000)
    let locale = 'en'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender

    if (!(who in global.db.data.users)) throw `✳️ El usuario no se encuentra en mi base de datos.`

    let pp = './Assets/Remlogo.jpg'
    let user = global.db.data.users[who]
    let { name, exp, diamond, role } = global.db.data.users[who]
    let totaluser = Object.values(global.db.data.users).length 
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length 
    let greeting = ucapan()

    let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]
    let str = `
🚀 *_Cinturón de seguridad ${name}, ${greeting}! ¡Nosotros vamos en una aventura!:3_* 🚀

┏━💼 _Usuario:_ 💼━┓
 ┃ 👾  *Etiqueta:* ${taguser} 
 ┃ 🎩  *Nombre:* ${name} 
 ┃ 💎  *Diamantes:* ${diamond} 
 ┃ 🏆  *Rank:* ${role}
 ┃ 🎮  *XP:* ${exp} 
 ┗━━━━━━━━━━━┛

┏━━⏰ _La salsa de hoy!_ ⏰━┓
 ┃ 📆  *Fecha:* ${date} 
 ┗━━━━━━━━━━━━━┛

┏━━🤖 _Estado del Bot:_🤖━━┓
 ┃ 💻  *Plataforma:* Windows 11 
 ┃ 📣  *Prefix:* ${usedPrefix} 
 ┃ 🕓  *Activo:* ${uptime}
 ┃ 💌  *Database:* ${rtotalreg} of ${totaluser} 
 ┃ 📚  *Total Usuarios:* ${totaluser} 
 ┗━━━━━━━━━━━━━┛

💡 *_Recuerde, en caso de duda, utilice ${usedPrefix}lista o ${usedPrefix}help2. ¡Es como mi libro de hechizos mágicos!_* 💡
`

    conn.sendFile(m.chat, pp, 'perfil.jpg', str, m)
}

handler.help = ['main']
handler.tags = ['group']
handler.command = ['menu2', 'help2'] 
handler.register = true

export default handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function ucapan() {
    const time = moment.tz('America/Lima').format('HH')
    let res = "feliz temprano en el día☀️"
    if (time >= 4) {
        res = "Buen día 🌄"
    }
    if (time >= 10) {
        res = "Buenas tardes ☀️"
    }
    if (time >= 15) {
        res = "Buenas tardes 🌇"
    }
    if (time >= 18) {
        res = "Buenas noches 🌙"
    }
    return res
}
