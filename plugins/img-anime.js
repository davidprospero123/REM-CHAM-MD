import axios from 'axios';
import fetch from 'node-fetch';
const handler = async (m, {command, conn}) => {

await m.react('🕓')
if (command == 'megumin') {
let res = await fetch('https://api.waifu.pics/sfw/megumin')
if (!res.ok) return m.react('❌')
let json = await res.json()
if (!json.url) return m.react('❌')
await conn.sendFile(m.chat, json.url, 'megumin.png', `*––––『 ᴀɴɪᴍᴇ-ɪᴍɢ 』––––*\n\n*Resultado de ∙* Megumin\n\nRem-Cham`,)
await m.react('✅')
}

if (command == 'neko') {
let res = await fetch('https://api.waifu.pics/sfw/neko')
if (!res.ok) return m.react('❌')
let json = await res.json()
if (!json.url) return m.react('❌')
await conn.sendFile(m.chat, json.url, 'neko.png', `*––––『 ᴀɴɪᴍᴇ-ɪᴍɢ 』––––*\n\n*Resultado de ∙* Neko\n\nʀᴇᴍ-ᴄʜᴀᴍ`,)
await m.react('✅')
  }

if (command == 'shinobu') {
let res = await fetch('https://api.waifu.pics/sfw/shinobu')
if (!res.ok) return m.react('❌')
let json = await res.json()
if (!json.url) return m.react('❌')
await conn.sendFile(m.chat, json.url, 'shinobu.png', `*––––『 ᴀɴɪᴍᴇ-ɪᴍɢ 』––––*\n\n*Resultado de ∙* Shinobu\n\nʀᴇᴍ-ᴄʜᴀᴍ`,)
await m.react('✅')
  }

if (command == 'waifu') {
let res = await fetch('https://api.waifu.pics/sfw/waifu')
if (!res.ok) return m.react('❌')
let json = await res.json()
if (!json.url) return m.react('❌')
await conn.sendFile(m.chat, json.url, 'waifu.png', `*––––『 ᴀɴɪᴍᴇ-ɪᴍɢ 』––––*\n\n*Resultado de ∙* Waifu\n\nʀᴇᴍ-ᴄʜᴀᴍ`,)
await m.react('✅')
  }
}
handler.help = ['megumin', 'neko', 'shinobu', 'waifu']
handler.command = ['megumin', 'neko', 'shinobu', 'waifu']
handler.tags = ['img']
export default handler