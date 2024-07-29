import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!global.db.data.chats[m.chat].nsfw) throw `🚫 𝙽𝚘 𝙴𝚜𝚝𝚊 𝙰𝚌𝚝𝚒𝚟𝚊𝚍𝚘 𝙴𝚕 𝙽𝚂𝙵𝚆 𝙴𝚗 𝙴𝚜𝚝𝚎 𝙶𝚛𝚞𝚙𝚘\n\n 𝙰𝚌𝚝𝚒𝚟𝚊𝚕𝚘 𝚄𝚜𝚊𝚗𝚍𝚘 \n*${usedPrefix}𝙴𝚗𝚊𝚋𝚕𝚎 𝚗𝚜𝚏𝚠`
let user = global.db.data.users[m.sender].age
if (user < 17) throw m.reply(`❎ 𝙽𝚎𝚌𝚎𝚜𝚒𝚝𝚊𝚜 𝚃𝚎𝚗𝚎𝚛 +𝟷𝟾 𝙿𝚊𝚛𝚊 𝚄𝚜𝚊𝚛 𝙴𝚜𝚝𝚎 𝙲𝚘𝚖𝚊𝚗𝚍𝚘`)

let res = await fetch(`https://fantox-apis.vercel.app/${command}`)
if (!res.ok) throw await res.text()
let json = await res.json()
if (!json.url) throw 'Ocurrio Un Error'
conn.sendFile(m.chat, json.url, 'img.jpg', `✨ Rᴀɴᴅᴏᴍ ${command}`, m, null, rcanal)
}
handler.help = ['genshin', 'swimsuit', 'schoolswimsuit', 'white', 'barefoot', 'touhou', 'gamecg', 'hololive', 'uncensored', 'sunglasses', 'glasses', 'weapon', 'shirtlift', 'chain', 'fingering', 'flatchest', 'torncloth', 'bondage', 'demon', 'wet', 'pantypull', 'headdress', 'headphone', 'tie', 'anusview', 'shorts','stokings', 'topless', 'beach', 'bunnygirl', 'bunnyear', 'idol', 'vampire', 'gun', 'maid', 'bra', 'nobra', 'bikini', 'whitehair', 'blonde', 'pinkhair', 'bed', 'ponytail', 'nude', 'dress', 'underwear', 'foxgirl', 'uniform', 'skirt', 'sex', 'sex2', 'sex3', 'breast', 'twintail', 'spreadpussy', 'tears', 'seethrough', 'breasthold', 'drunk', 'fateseries', 'spreadlegs', 'openshirt', 'headband', 'food', 'close', 'tree', 'nipples', 'erectnipples', 'horns', 'greenhair', 'wolfgirl', 'catgirl']
handler.tags = ['nsfw'] 
handler.command = ['genshin', 'swimsuit', 'schoolswimsuit', 'white', 'barefoot', 'touhou', 'gamecg', 'hololive', 'uncensored', 'sunglasses', 'glasses', 'weapon', 'shirtlift', 'chain', 'fingering', 'flatchest', 'torncloth', 'bondage', 'demon', 'wet', 'pantypull', 'headdress', 'headphone', 'tie', 'anusview', 'shorts','stokings', 'topless', 'beach', 'bunnygirl', 'bunnyear', 'idol', 'vampire', 'gun', 'maid', 'bra', 'nobra', 'bikini', 'whitehair', 'blonde', 'pinkhair', 'bed', 'ponytail', 'nude', 'dress', 'underwear', 'foxgirl', 'uniform', 'skirt', 'sex', 'sex2', 'sex3', 'breast', 'twintail', 'spreadpussy', 'tears', 'seethrough', 'breasthold', 'drunk', 'fateseries', 'spreadlegs', 'openshirt', 'headband', 'food', 'close', 'tree', 'nipples', 'erectnipples', 'horns', 'greenhair', 'wolfgirl', 'catgirl']
handler.register = true


export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
