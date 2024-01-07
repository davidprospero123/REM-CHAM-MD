import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import { canLevelUp, xpRange } from '../lib/levelling.js'
import fetch from 'node-fetch'
import fs from 'fs'
const { levelling } = '../lib/levelling.js'
import moment from 'moment-timezone'
import { promises } from 'fs'
import { join } from 'path'
const time = moment.tz('Asia/Kolkata').format('HH')
let wib = moment.tz('Asia/Kolkata').format('HH:mm:ss')
//import db from '../lib/database.js'

let handler = async (m, { conn, usedPrefix, command}) => {
    let d = new Date(new Date + 3600000)
    let locale = 'en'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
if (!(who in global.db.data.users)) throw `✳️ El usuario no se encuentra en mi base de datos.`
let pp = './Assets/Gurulogo.jpg'
let user = global.db.data.users[who]
let { name, exp, diamond, lastclaim, registered, regTime, age, level, role, warn } = global.db.data.users[who]
let { min, xp, max } = xpRange(user.level, global.multiplier)
let username = conn.getName(who)
let math = max - xp
let prem = global.prems.includes(who.split`@`[0])
let sn = createHash('md5').update(who).digest('hex')
let totaluser = Object.values(global.db.data.users).length 
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length 
let more = String.fromCharCode(8206)
let readMore = more.repeat(850) 
let greeting = ucapan()
let quote = quotes[Math.floor(Math.random() * quotes.length)];

let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]
let str = `
🚀 *_Cinturón de seguridad ${name}, ${greeting}! ¡Nosotros vamos en una aventura!:3_* 🚀

📜 *_Cita del día: ${quote}_* 📜

┏━💼 _Usuario:_ 💼━┓
 ┃ 👾  *Etiqueta:* ${taguser} 
 ┃ 🎩  *Nombre:* ${name} 
 ┃ 🦸  *Master Mind:* ${author} 
 ┃ 💎  *Diamantes:* ${diamond} 
 ┃ 🏆  *Rank:* ${role}
 ┃ 🎮  *XP:* ${exp} 
 ┗━━━━━━━━━━━┛

 ┏━━⏰ _La salsa de hoy!_ ⏰━┓
 ┃ 📆  *Fecha:* ${date} 
 ┃ ⏲️  *Tiempo Actual:* ${wib} 
 ┗━━━━━━━━━━━━━┛

 ┏━━🤖 _Estado del Bot:_🤖━━┓
 ┃ 🤡  *Nombre del Bot:* ${botname} 
 ┃ 💻  *Plataforma:* Windows 11 
 ┃ 📣  *Prefix:* ${usedPrefix} 
 ┃ 🕓  *Activo:* ${uptime}
 ┃ 💌  *Database:* ${rtotalreg} of ${totaluser} 
 ┃ 📚  *Total Usuarios:* ${totaluser} 
 ┗━━━━━━━━━━━━━┛

💡 *_Recuerde, en caso de duda, utilice ${usedPrefix}lista o ${usedPrefix}help2. ¡Es como mi libro de hechizos mágicos!_* 💡
`


    conn.sendFile(m.chat, pp, 'perfil.jpg', str, m, null, rpyt)
    m.react(done)

}
handler.help = ['main']
handler.tags = ['group']
handler.command = ['menu2', 'help2'] 

export default handler
function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}
    
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
    const quotes = [
      "No soy perezoso, simplemente estoy en modo de ahorro de energía.",
        "La vida es corta, sonríe mientras aún tengas dientes.",
        "Puede que sea una mala influencia, ¡pero soy divertido!",
        "Estoy a dieta de whisky. Ya he perdido tres días.",
        "¿Por qué algunas parejas no van al gimnasio? Porque algunas relaciones no funcionan.",
        "Le dije a mi esposa que debía aceptar sus errores... Ella me dio un abrazo.",
        "Soy excelente realizando múltiples tareas. Puedo perder el tiempo, ser improductivo y posponer las cosas al mismo tiempo.",
        "Sabes que te estás haciendo viejo cuando te agachas para atarte los cordones de los zapatos y te preguntas qué más podrías hacer mientras estás ahí abajo.",
        "Soy tan bueno durmiendo que puedo hacerlo con los ojos cerrados.",
        "Si crees que a nadie le importa si estás vivo, intenta faltar a un par de pagos.",
        "Solía ​​pensar que estaba indeciso, pero ahora no estoy tan seguro.",
        "Si no puedes convencerlos, confundelos.",
        "Le dije a mi esposa que estaba levantando demasiado las cejas. Parecía sorprendida.",
        "No soy torpe, solo tengo la misión de probar la gravedad.",
        "Le dije a mi esposa que debería hacer más flexiones. Ella dijo: '¡Podría hacer cien!' Entonces conté hasta diez y me detuve.",
        "La vida es como una caja de bombones; no dura mucho si tienes hambre.",
        "No digo que sea la Mujer Maravilla, sólo digo que nadie nos ha visto nunca a la Mujer Maravilla y a mí juntas en la misma habitación".
        "¿Por qué le llaman sueño reparador cuando te despiertas como un troll?",
        "No siempre pierdo mi teléfono, pero cuando lo hago, siempre está en silencio.",
        "Mi cama es un lugar mágico donde de repente recuerdo todo lo que debía hacer.",
        "Me encanta el sonido que haces cuando te callas.",
        "No estoy discutiendo, sólo estoy explicando por qué tengo razón.",
        "No soy un completo idiota, faltan algunas partes.",
        "Cuando la vida te dé limones, échale a alguien un chorro en el ojo.",
        "No necesito controlar la ira. Sólo tienes que dejar de hacerme enojar.",
        "No estoy diciendo que sea Batman. Sólo digo que nadie nos ha visto nunca a Batman y a mí juntos en la misma habitación".
      "No estoy diciendo que sea Superman. Sólo digo que nadie nos ha visto nunca a Superman y a mí juntos en la misma habitación".
        "No estoy diciendo que sea Spider-Man. Sólo digo que nadie nos ha visto nunca a Spider-Man y a mí juntos en la misma habitación.",
        "No digo que sea un superhéroe. Sólo digo que nadie me ha visto nunca a mí y a un superhéroe juntos en la misma habitación".
        "El que madruga puede tener el gusano porque los gusanos son asquerosos y las mañanas estúpidas.",
        "Si la vida te da limones, haz limonada. Luego busca a alguien cuya vida le haya dado vodka y ¡haz una fiesta!",
        "El camino hacia el éxito siempre está en construcción.",
        "Soy tan inteligente que a veces no entiendo ni una sola palabra de lo que digo.",
        "Algunas personas simplemente necesitan chocar esos cinco. En la cara. Con una silla.",
        "No digo que sea perfecto, pero estoy bastante cerca.",
        "Un día sin sol es como, ya sabes, noche.",
        "La mejor manera de predecir el futuro es crearlo.",
     "Si no puedes ser un buen ejemplo, entonces tendrás que ser una horrible advertencia.",
     "No sé por qué sigo presionando el botón de escape. Sólo estoy tratando de salir de aquí.",
     "No soy perezoso. Estoy en modo de ahorro de energía.",
     "No necesito un peluquero, mi almohada me da un peinado nuevo cada mañana.",
    "No tengo mala letra, tengo mi propia fuente.",
    "No soy torpe. Es sólo que el suelo me odia, la mesa y las sillas son matones y las paredes se interponen en mi camino.",
    "No estoy diciendo que sea Batman. Sólo digo que nadie nos ha visto nunca a Batman y a mí juntos en la misma habitación".
    "No estoy diciendo que sea la Mujer Maravilla. Sólo digo que nadie nos ha visto nunca a la Mujer Maravilla y a mí juntos en la misma habitación.",
    "No estoy diciendo que sea Superman. Sólo digo que nadie nos ha visto nunca a Superman y a mí juntos en la misma habitación".
    "No estoy diciendo que sea Spider-Man. Sólo digo que nadie nos ha visto nunca a Spider-Man y a mí juntos en la misma habitación.",
    "No digo que sea un superhéroe. Sólo digo que nadie me ha visto nunca a mí y a un superhéroe juntos en la misma habitación".
    "El tiempo nos enseña mucho, especialmente cuando no tenemos tiempo.",
    "La vida es como un libro, cada día cambia una nueva página. A veces reímos, a veces lloramos, ¡pero la historia de todos está incompleta!",
    "Si estudias, tu corazón no se involucra; si estudias, tu cerebro no se involucra.",
    "Haz que tu amistad sea tan profunda que se instale en tu corazón, mantén tu amistad de tal manera que nosotros también nos sintamos orgullosos de ser tu amigo.",
    "Amigo, te extraño mucho, cada vez que tengo hambre, extraño mucho esas samosas.",
    "La verdadera alegría de la vida llega cuando otros intentan vivir tu vida.",
    "Algunas personas desperdician tanto que son incapaces de vivir sus propias vidas e interferir en las vidas de los demás".
];