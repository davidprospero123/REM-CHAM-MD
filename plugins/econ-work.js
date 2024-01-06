import axios from 'axios'

let handler = async (m, { conn, usedPrefix, command }) => {

  let earn = Math.floor(Math.random() * 2000)
  let time = global.db.data.users[m.sender].lastwork + 600000
  if (new Date - global.db.data.users[m.sender].lastwork < 600000) throw `⏱️ 𝙉𝙤 𝙥𝙪𝙚𝙙𝙚𝙨 𝙩𝙧𝙖𝙗𝙖𝙟𝙖𝙧 𝙝𝙖𝙨𝙩𝙖 ${msToTime(time - new Date())}`

    let anu = (await axios.get('https://raw.githubusercontent.com/davidprospero123/work/a0e9d634f44bef4e547cfcb9aeda09cca9ef5169/work.json')).data
    let res = pickRandom(anu)
 global.db.data.users[m.sender].credit += earn

  m.reply(`
‣ ${res.wrk} ${earn} gold
`)
  global.db.data.users[m.sender].lastwork = new Date * 1
}
handler.help = ['work']
handler.tags = ['economy']
handler.command = ['work', 'w','trabajar']

handler.group = true

export default handler

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds

  return minutes + " minutos " + seconds + " segundos" 
}
function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
