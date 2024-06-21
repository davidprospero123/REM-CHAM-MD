import {
  promises,
  readFileSync
 } from "fs"
 import {
  join
 } from "path"
 import {
  xpRange
 } from "../lib/levelling.js"
 import moment from "moment-timezone"
 import os from "os"

 let groupmenu = `
 ✦ ───『 *𝙂𝙍𝙐𝙋𝙊* 』─── ⚝
🏘️ .𝙷𝚘𝚛𝚊
🏘️ .𝙻𝚒𝚜𝚝𝚘𝚗𝚕𝚒𝚗𝚎
🏘️ .𝚘𝚗𝚕𝚒𝚗𝚎, 𝚕𝚒𝚗𝚎𝚊
🏘️ .𝙶𝚎𝚝𝙱𝚒𝚘 <@𝚞𝚜𝚞𝚊𝚛𝚒𝚘/𝚛𝚎𝚜𝚙𝚘𝚗𝚍𝚎𝚛> Ⓛ
🏘️ .𝙰𝚗𝚒𝚖𝚎𝚀𝚞𝚘𝚝𝚎
🏘️ .𝚂𝚎𝚝𝙳𝚎𝚜𝚌 <𝚝𝚎𝚡𝚝𝚘>
🏘️ .𝚂𝚎𝚝𝙽𝚊𝚖𝚎 <𝚝𝚎𝚡𝚝𝚘>
🏘️ .𝙰𝚍𝚍
🏘️ .𝙳𝚎𝚕𝚎𝚝𝚎
🏘️ .𝙳𝚎𝚕𝚆𝚊𝚛𝚗 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
🏘️ .𝙳𝚎𝚖𝚘𝚝𝚎 (@𝚞𝚜𝚞𝚊𝚛𝚒𝚘)
🏘️ .𝙸𝚗𝚏𝚘𝙶𝙿
🏘️ .𝙷𝚒𝚍𝚎𝚃𝚊𝚐
🏘️ .𝙸𝚗𝚟𝚒𝚝𝚎 <𝟿𝟷𝟽𝚡𝚡𝚡>
🏘️ .𝙺𝚒𝚌𝚔 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
🏘️ .𝙻𝚒𝚗𝚔
🏘️ .𝙿𝚘𝚕𝚕 𝚀𝚞𝚎𝚜𝚝𝚒𝚘𝚗|𝙾𝚙𝚝𝚒𝚘𝚗|𝙾𝚙𝚝𝚒𝚘𝚗
🏘️ .𝙿𝚎𝚛𝚏𝚒𝚕
🏘️ .𝙿𝚛𝚘𝚖𝚘𝚟𝚎𝚛
🏘️ .𝚁𝚎𝚜𝚎𝚝𝙻𝚒𝚗𝚔
🏘️ .𝚂𝚎𝚝𝙱𝚢𝚎 <𝚝𝚎𝚡𝚝𝚘>
🏘️ .𝙶𝚛𝚘𝚞𝚙 𝚘𝚙𝚎𝚗/𝚌𝚕𝚘𝚜𝚎
🏘️ .𝚂𝚎𝚝𝚆𝚎𝚕𝚌𝚘𝚖𝚎 <𝚝𝚎𝚡𝚝𝚘>
🏘️ .𝚂𝚒𝚖𝚞𝚕𝚊𝚝𝚎 <𝚎𝚟𝚎𝚗𝚝𝚘> @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
🏘️ .𝚂𝚝𝚊𝚏𝚏
🏘️ .𝚃𝚊𝚐𝚊𝚕𝚕
🏘️ .𝚃𝚘𝚝𝚊𝚐
🏘️ .𝙰𝚍𝚟𝚎𝚛𝚝𝚒𝚛 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
🏘️ .𝙰𝚍𝚟𝚎𝚛𝚝𝚎𝚗𝚌𝚒𝚊𝚜
🏘️ .𝙼𝚊𝚒𝚗
╰──────────⳹`

let ownermenu = `
✦ ───『 *𝙊𝙒𝙉𝙀𝙍* 』─── ⚝
👨🏻‍💻 .𝙰𝚙𝚘𝚢𝚊𝚛
👨🏻‍💻 .𝙿𝚛𝚎𝚖𝚒𝚊𝚛 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
👨🏻‍💻 .𝙰𝚍𝚍𝙾𝚠𝚗𝚎𝚛 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
👨🏻‍💻 .𝙰𝚕𝚕𝚘𝚠 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
👨🏻‍💻 .𝙷𝚎𝚛𝚘𝚔𝚞
👨🏻‍💻 .𝙱𝚊𝚗 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
👨🏻‍💻 .𝙱𝚊𝚗𝙲𝚑𝚊𝚝
👨🏻‍💻 .𝚃𝚡
👨🏻‍💻 .𝙱𝚛𝚘𝚊𝚍𝚌𝚊𝚜𝚝𝙶𝚛𝚘𝚞𝚙 <𝚝𝚎𝚡𝚝𝚘>
👨🏻‍💻 .𝙱𝙲𝙶𝙲 <𝚝𝚎𝚡𝚝𝚘>
👨🏻‍💻 .𝙲𝚕𝚎𝚊𝚛𝚃𝚖𝚙
👨🏻‍💻 .𝙳𝚎𝚕𝙴𝚡𝚙𝚒𝚛𝚎𝚍
👨🏻‍💻 .𝙳𝚎𝚕𝙿𝚛𝚎𝚖 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
👨🏻‍💻 .𝚁𝚎𝚖𝚘𝚟𝚎𝙾𝚠𝚗𝚎𝚛 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
👨🏻‍💻 .𝚂𝚎𝚝𝙿𝚙𝙱𝚘𝚝𝙵𝚞𝚕𝚕
👨🏻‍💻 .𝙶𝚎𝚝𝙿𝚕𝚞𝚐𝚒𝚗 <𝚗𝚘𝚖𝚋𝚛𝚎 𝚊𝚛𝚌𝚑𝚒𝚟𝚘>
👨🏻‍💻 .𝙶𝚎𝚝𝙵𝚒𝚕𝚎 <𝚗𝚘𝚖𝚋𝚛𝚎 𝚊𝚛𝚌𝚑𝚒𝚟𝚘>
👨🏻‍💻 .𝙹𝚘𝚒𝚗 <𝚌𝚑𝚊𝚝.𝚠𝚑𝚊𝚝𝚜𝚊𝚙𝚙.𝚌𝚘𝚖> <𝚍í𝚊𝚜>
👨🏻‍💻 .𝚁𝚎𝚜𝚎𝚝 <𝟻𝟺𝚡𝚡𝚡>
👨🏻‍💻 .𝚁𝚎𝚜𝚎𝚝𝙿𝚛𝚎𝚏𝚒𝚡
👨🏻‍💻 .𝚁𝚎𝚜𝚝𝚊𝚛𝚝
👨🏻‍💻 .𝚂𝚎𝚝𝙿𝚛𝚎𝚏𝚒𝚡
👨🏻‍💻 .𝚂𝚎𝚝𝙿𝚛𝚎𝚏𝚒𝚡 [𝚜í𝚖𝚋𝚘𝚕𝚘]
👨🏻‍💻 .𝚄𝚗𝚋𝚊𝚗 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
👨🏻‍💻 .𝚄𝚗𝚋𝚊𝚗𝙲𝚑𝚊𝚝
👨🏻‍💻 .𝚄𝚙𝚍𝚊𝚝𝚎
👨🏻‍💻 .𝙲𝚘𝚗𝚏𝚒𝚐
👨🏻‍💻 .𝙻𝚒𝚜𝚝𝙱𝚊𝚗
👨🏻‍💻 .𝙳𝚎𝚕𝚎𝚝𝚎𝙿𝚕𝚞𝚐𝚒𝚗 <𝚗𝚘𝚖𝚋𝚛𝚎>
╰──────────⳹`

let funmenu = `
✦ ───『 *𝙁𝙐𝙉* 』─── ⚝
😎 .𝙰𝙵𝙺 <𝚛𝚊𝚣ó𝚗>
😎 .𝚃𝚘𝙼𝙿𝟹
😎 .𝚃𝚘𝙰𝚅
😎 .Cortana
😎 .𝙲𝚑𝚊𝚛𝚊𝚌𝚝𝚎𝚛 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
😎 .𝙳𝚊𝚛𝚎
😎 .𝙵𝚕𝚒𝚛𝚝
😎 .𝙶𝚊𝚢 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
😎 .𝙿𝚒𝚌𝚔𝚞𝚙𝙻𝚒𝚗𝚎
😎 .𝚀𝚞𝚎𝚜𝚝𝚒𝚘𝚗
😎 .𝚂𝚑𝚊𝚢𝚊𝚛𝚒
😎 .𝚂𝚑𝚒𝚙
😎 .𝚈𝚘𝙼𝚊𝚖𝚊𝙹𝚘𝚔𝚎
😎 .𝚃𝚛𝚞𝚝𝚑
😎 .𝚆𝚊𝚜𝚝𝚎 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
😎 .𝙸𝚖𝚊𝚐𝚎
😎 .𝙼𝚎𝚖𝚎
😎 .𝙲𝚘𝚛𝚝𝚊𝚗𝚊
😎 .𝚀𝚞𝚘𝚝𝚎
╰──────────⳹`

let reactmenu = `
✦ ───『 *𝙍𝙀𝘼𝘾𝘾𝙄𝙊𝙉* 』─── ⚝
✔️ .𝙰𝚌𝚘𝚜𝚊𝚛 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
✔️ .𝙰𝚋𝚛𝚊𝚣𝚊𝚛 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
✔️ .𝙻𝚕𝚘𝚛𝚊𝚛 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
✔️ .𝙰𝚋𝚛𝚊𝚣𝚊𝚛 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
✔️ .𝙰𝚠𝚘𝚘 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
✔️ .𝙱𝚎𝚜𝚊𝚛 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
✔️ .𝙻𝚊𝚖𝚎𝚛 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
✔️ .𝙰𝚌𝚊𝚛𝚒𝚌𝚒𝚊𝚛 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
✔️ .𝙴𝚗𝚐𝚛𝚎í𝚍𝚘 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
✔️ .𝙶𝚘𝚕𝚙𝚎𝚊𝚛 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
✔️ .𝙻𝚊𝚗𝚣𝚊𝚛 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
✔️ .𝚁𝚞𝚋𝚘𝚛𝚒𝚣𝚊𝚛𝚜𝚎 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
✔️ .𝚂𝚘𝚗𝚛𝚎í𝚛 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
✔️ .𝚂𝚊𝚕𝚞𝚍𝚊𝚛 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
✔️ .𝙲𝚑𝚘𝚌𝚊𝚛 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
✔️ .𝚂𝚘𝚜𝚝𝚎𝚗𝚎𝚛 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
✔️ .𝙼𝚘𝚛𝚍𝚎𝚛 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
✔️ .𝙶𝚕𝚘𝚖𝚙 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
✔️ .𝙰𝚋𝚘𝚏𝚎𝚝𝚎𝚊𝚛 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
✔️ .𝙼𝚊𝚝𝚊𝚛 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
✔️ .𝙵𝚎𝚕𝚒𝚣 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
✔️ .𝙶𝚞𝚒ñ𝚊𝚛 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
✔️ .𝚃𝚘𝚌𝚊𝚛 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
✔️ .𝙱𝚊𝚒𝚕𝚊𝚛 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
✔️ .𝙲𝚛𝚒𝚗𝚐𝚎 @𝚞𝚜𝚞𝚊𝚛𝚒𝚘
╰──────────⳹`

let dlmenu = `
✦ ───『 *𝘿𝙀𝙎𝘾𝘼𝙍𝙂𝘼𝙎* 』─── ⚝
⚡ .𝙰𝚙𝚘𝚢𝚊𝚛
⚡ .𝙵𝚊𝚌𝚎𝚋𝚘𝚘𝚔 <𝚄𝚁𝙻>
⚡ .𝙶𝙳𝚛𝚒𝚟𝚎 🅟
⚡ .𝙶𝚒𝚝𝚌𝚕𝚘𝚗𝚎 <𝚄𝚁𝙻>
⚡ .𝙸𝙶𝚂𝚝𝚊𝚕𝚔
⚡ .𝙸𝚗𝚜𝚝𝚊𝚐𝚛𝚊𝚖
⚡ .𝙼𝚎𝚍𝚒𝚊𝚏𝚒𝚛𝚎 <𝚄𝚁𝙻>
⚡ .𝙼𝚎𝚐𝚊
⚡ .𝙼𝚘𝚍𝙰𝙿𝙺
⚡ .𝙰𝚙𝚔 𝚜𝚎𝚊𝚛𝚌𝚑 
⚡ .𝙰𝚙𝚔 𝚍𝚕 <𝙳𝚎𝚜𝚌𝚊𝚛𝚐𝚊>
⚡ .𝙿𝚕𝚊𝚢 <𝙱𝚞𝚜𝚌𝚊𝚛>
⚡ .𝙿𝚕𝚊𝚢𝟸 <𝙰𝙿𝙸-𝙻𝚎𝚗𝚝𝚊>
⚡ .𝙿𝚕𝚊𝚢𝟹 <𝙷𝙳-𝟷𝟶𝟾𝟶-𝚈𝚃𝙼𝙿𝟹>
⚡ .𝙿𝚕𝚊𝚢𝚅𝚒𝚍 <𝚃𝚎𝚡𝚝𝚘>
⚡ .𝚂𝚙𝚘𝚝𝚒𝚏𝚢
⚡ .𝚃𝚒𝚔𝚃𝚘𝚔 <𝚄𝚁𝙻>
⚡ .𝚃𝚒𝚔𝚃𝚘𝚔𝚂𝚝𝚊𝚕𝚔
⚡ .𝚃𝚠𝚒𝚝𝚝𝚎𝚛 <𝚄𝚁𝙻>
⚡ .𝚈𝚃𝙼𝙿𝟹 <𝚄𝚁𝙻>
⚡ .𝚈𝚃𝚂𝚎𝚊𝚛𝚌𝚑
⚡ .𝚈𝚃𝙼𝙿𝟺 <𝚈𝚃-𝙻𝚒𝚗𝚔>
⚡ .𝚆𝚊𝚕𝚕𝚙𝚊𝚙𝚎𝚛 <𝙲𝚘𝚗𝚜𝚞𝚕𝚝𝚊>
⚡ .𝚈𝚃𝙼𝙿𝟺𝙳𝚘𝚌 <𝚈𝚃-𝙻𝚒𝚗𝚔>
⚡ .𝚂𝚙𝚘𝚝𝚒𝚏𝚢𝚂𝚎𝚊𝚛𝚌𝚑 <𝙱𝚞𝚜𝚚𝚞𝚎𝚍𝚊>
⚡ .𝚃𝚒𝚔𝚃𝚘𝚔𝚂𝚎𝚊𝚛𝚌𝚑
╰──────────⳹`

let gamemenu = `
✦ ───『 *𝙅𝙐𝙀𝙂𝙊𝙎* 』─── ⚝
🎮 .𝚂𝚕𝚘𝚝 <𝙲𝚊𝚗𝚝𝚒𝚍𝚊𝚍>
🎮 .𝙲𝚑𝚎𝚜𝚜 [𝙳𝚎𝚜𝚍𝚎 𝙷𝚊𝚜𝚝𝚊]
🎮 .𝙲𝚑𝚎𝚜𝚜 𝙳𝚎𝚕𝚎𝚝𝚎
🎮 .𝙲𝚑𝚎𝚜𝚜 𝙹𝚘𝚒𝚗
🎮 .𝙲𝚑𝚎𝚜𝚜 𝚂𝚝𝚊𝚛𝚝
🎮 .𝙳𝚎𝚕𝚝𝚝𝚝
🎮 .𝙶𝚞𝚎𝚜𝚜𝚏𝚕𝚊𝚐
🎮 .𝙼𝚊𝚝𝚑𝚜 <𝙼𝚘𝚍𝚘𝚜>
🎮 .𝙿𝙿𝚃 <𝙿𝚒𝚎𝚍𝚛𝚊/𝙿𝚊𝚙𝚎𝚕/𝚃𝚒𝚓𝚎𝚛𝚊𝚜>
🎮 .𝚃𝚒𝚌𝚝𝚊𝚌𝚝𝚘𝚎 <𝙽ú𝚖𝚎𝚛𝚘 𝚍𝚎 𝙴𝚝𝚒𝚚𝚞𝚎𝚝𝚊>
╰──────────⳹`
let logomenu = `
✦ ───『 *𝙁𝘼𝘽𝙍𝙄𝘾𝘼𝙍* 』─── ⚝
🧰 .𝙱𝚕𝚞𝚛
🧰 .𝙳𝚒𝚏𝚞𝚖𝚒𝚗𝚊𝚛𝟸
🧰 .𝙷𝚘𝚛𝚗𝚢𝚌𝚊𝚛𝚍
🧰 .𝙷𝚘𝚛𝚗𝚢𝚕𝚒𝚌𝚎𝚗𝚜𝚎
🧰 .𝙶𝚏𝚡𝟷
🧰 .𝙶𝚏𝚡𝟸
🧰 .𝙶𝚏𝚡𝟹
🧰 .𝙶𝚏𝚡𝟺
🧰 .𝙶𝚏𝚡𝟻
🧰 .𝙶𝚏𝚡𝟼
🧰 .𝙶𝚏𝚡𝟽
🧰 .𝙶𝚏𝚡𝟾
🧰 .𝙶𝚏𝚡𝟿
🧰 .𝙶𝚏𝚡𝟷𝟶
🧰 .𝙶𝚏𝚡𝟷𝟷
🧰 .𝙶𝚏𝚡𝟷𝟸
🧰 .𝚂𝚒𝚖𝚙𝙲𝚊𝚛𝚍
🧰 .𝙸𝚝𝚜𝚜𝚘𝚜𝚝𝚞𝚙𝚒𝚍
🧰 .𝙸𝚜𝚜
🧰 .𝙴𝚜𝚝𝚞𝚙𝚒𝚍𝚘
🧰 .𝚃𝚠𝚎𝚎𝚝 <𝙲𝚘𝚖𝚎𝚗𝚝𝚊𝚛>
🧰 .𝙻𝚘𝚕𝚒𝚌𝚘𝚗
🧰 .𝚈𝚝𝚌𝚘𝚖𝚖𝚎𝚗𝚝 <𝙲𝚘𝚖𝚎𝚗𝚝𝚊𝚛>
╰──────────⳹`

let stickermenu = `
✦ ───『 *𝙎𝙏𝙄𝘾𝙆𝙀𝙍* 』─── ⚝
💙 .𝙴𝚖𝚘𝚓𝚒𝚖𝚒𝚡 <𝙴𝚖𝚘𝚓𝚒+𝙴𝚖𝚘𝚓𝚒>
💙 .𝙶𝚎𝚝𝚂𝚝𝚒𝚌𝚔𝚎𝚛
💙 .𝚂𝚖𝚊𝚔𝚎𝚛
💙 .𝚂𝚝𝚒𝚌𝚔𝚎𝚛𝚆𝚒𝚝𝚑𝙼𝚎 (𝚂𝚞𝚋𝚝í𝚝𝚞𝚕𝚘|𝙼𝚎𝚍𝚒𝚘𝚜 𝚍𝚎 𝚛𝚎𝚜𝚙𝚞𝚎𝚜𝚝𝚊)
💙 .𝚂𝚠𝚖𝚎𝚖𝚎 <𝚄𝚁𝙻>
💙 .𝚂𝚠𝚖(𝚂𝚞𝚋𝚝í𝚝𝚞𝚕𝚘|𝙼𝚎𝚍𝚒𝚘𝚜 𝚍𝚎 𝚛𝚎𝚜𝚙𝚞𝚎𝚜𝚝𝚊)
💙 .𝚂𝚏𝚞𝚕𝚕
💙 .𝚃𝚘𝚒𝚖𝚐 <𝚂𝚝𝚒𝚌𝚔𝚎𝚛>
💙 .𝚃𝚘𝚟𝚒𝚍
💙 .𝚃𝚛𝚒𝚐𝚐𝚎𝚛 <@𝚄𝚜𝚞𝚊𝚛𝚒𝚘>
💙 .𝚃𝚝𝚙
💙 .𝚃𝚝𝚙𝟸
💙 .𝚃𝚝𝚙𝟹
💙 .𝚃𝚝𝚙𝟺
💙 .𝚃𝚝𝚙𝟻
💙 .𝙰𝚝𝚝𝚙
💙 .𝙰𝚝𝚝𝚙𝟸
💙 .𝙰𝚝𝚝𝚙𝟹
💙 .𝚃𝚊𝚔𝚎 <𝙽𝚘𝚖𝚋𝚛𝚎>|<𝙰𝚞𝚝𝚘𝚛>
╰──────────⳹`

let audiomenu = `
✦ ───『 *𝘼𝙐𝘿𝙄𝙊* 』─── ⚝
🔉 .𝙱𝚊𝚜𝚜 [𝚅𝙽]
🔉 .𝙱𝚕𝚘𝚠𝚗 [𝚅𝙽]
🔉 .𝙳𝚎𝚎𝚙 [𝚅𝙽]
🔉 .𝙴𝚊𝚛𝚛𝚊𝚙𝚎 [𝚅𝙽]
🔉 .𝙵𝚊𝚜𝚝 [𝚅𝙽]
🔉 .𝙵𝚊𝚝 [𝚅𝙽]
🔉 .𝙽𝚒𝚐𝚑𝚝𝚌𝚘𝚛𝚎 [𝚅𝙽]
🔉 .𝚁𝚎𝚟𝚎𝚛𝚜𝚎 [𝚅𝙽]
🔉 .𝚁𝚘𝚋𝚘𝚝 [𝚅𝙽]
🔉 .𝚂𝚕𝚘𝚠 [𝚅𝙽]
🔉 .𝚂𝚖𝚘𝚘𝚝𝚑 [𝚅𝙽]
🔉 .𝚃𝚞𝚙𝚊𝚒 [𝚅𝙽]
╰──────────⳹`


let newsmenu = `
✦ ───『 *𝙉𝙀𝙒𝙎* 』─── ⚝
📥 .ᴛᴇᴄʜɴᴇᴡꜱ (ɪɴɢʟᴇꜱ)
📥 .ɴᴅᴛᴠ (ɪɴɢʟᴇꜱ)
╰──────────⳹
`
let economy = `
✦ ───『 *𝙀𝘾𝙊𝙉𝙊𝙈𝙄𝘼* 』─── ⚝
💹 .𝙳𝚎𝚙𝚘𝚜𝚒𝚝𝚊𝚛 <@𝚄𝚜𝚞𝚊𝚛𝚒𝚘>
💹 .𝙰𝚐𝚛𝚎𝚐𝚊𝚛𝚇𝙿 <@𝚄𝚜𝚞𝚊𝚛𝚒𝚘>
💹 .𝙱𝚊𝚗𝚔
💹 .𝙱𝚊𝚕𝚊𝚗𝚌𝚎
💹 .𝙲𝚘𝚖𝚙𝚛𝚊𝚛𝙿𝚘𝚕𝚕𝚊
💹 .𝙿𝚎𝚕𝚎𝚊𝙳𝚎𝙿𝚘𝚕𝚕𝚊 <𝙲𝚊𝚗𝚝𝚒𝚍𝚊𝚍>
💹 .𝙱𝚞𝚢 <𝚡𝚙>
💹 .𝙱𝚞𝚢𝙰𝚕𝚕
💹 .𝙳𝚊𝚒𝚕𝚢
💹 .𝙼𝚒𝚗𝚊𝚛
💹 .𝚁𝚎𝚝𝚒𝚛𝚊𝚛 <𝙲𝚊𝚗𝚝𝚒𝚍𝚊𝚍>
💹 .𝚁𝚞𝚕𝚎𝚝𝚊 <𝙲𝚊𝚗𝚝𝚒𝚍𝚊𝚍> <𝙲𝚘𝚕𝚘𝚛(𝚛𝚎𝚍/𝚋𝚕𝚊𝚌𝚔)>
💹 .𝙶𝚒𝚟𝚎 𝚌𝚛é𝚍𝚒𝚝𝚘 [𝙲𝚊𝚗𝚝𝚒𝚍𝚊𝚍] [@𝚃𝚊𝚐]
💹 .𝙻𝚎𝚟𝚎𝚕𝚄𝚙
💹 .𝚁𝚊𝚗𝚐𝚘
💹 .𝚁𝚘𝚋𝚊𝚛 <@𝚄𝚜𝚞𝚊𝚛𝚒𝚘>
💹 .𝚁𝚞𝚕𝚎𝚝𝚊 <𝙲𝚊𝚗𝚝𝚒𝚍𝚊𝚍> <𝙲𝚘𝚕𝚘𝚛(𝚛𝚎𝚍/𝚋𝚕𝚊𝚌𝚔)>
💹 .𝚂𝚕𝚘𝚝
💹 .𝙱𝚒𝚕𝚕𝚎𝚝𝚎𝚛𝚊
💹 .𝚁𝚎𝚝𝚒𝚛𝚊𝚛 <𝙲𝚊𝚗𝚝𝚒𝚍𝚊𝚍>
💹 .𝙿𝚛𝚎𝚜𝚝𝚊𝚖𝚘
💹 .𝙿𝚊𝚐𝚘𝚊𝚍𝚎𝚕𝚊𝚗𝚝𝚊𝚍𝚘
💹 .𝙰𝚗𝚝𝚒𝚌𝚒𝚙𝚊𝚛
💹 .𝙿𝚊𝚐𝚊𝚛
💹 .𝚃𝚛𝚊𝚋𝚊𝚓𝚊𝚛
💹 .𝙳𝚊𝚛𝙾𝚛𝚘 <@𝚄𝚜𝚞𝚊𝚛𝚒𝚘>
💹 .𝙳𝚊𝚛𝚇𝙿 <@𝚄𝚜𝚞𝚊𝚛𝚒𝚘>
╰──────────⳹`
let animemenu = `
✦ ───『 *𝘼𝙉𝙄𝙈𝙀* 』─── ⚝
💫 .𝙰𝚙𝚘𝚢𝚊𝚛
💫 .𝚁𝚎𝚖
💫 .𝙰𝚒𝚑𝚘𝚜𝚑𝚒𝚗𝚘
💫 .𝙰𝚗𝚒𝚖𝚎
💫 .𝙰𝚔𝚒𝚛𝚊
💫 .𝙰𝚔𝚒𝚢𝚊𝚖𝚊
💫 .𝙰𝚗𝚗𝚊
💫 .𝙰𝚜𝚞𝚗𝚊
💫 .𝙰𝚢𝚞𝚣𝚊𝚠𝚊
💫 .𝙱𝚘𝚛𝚞𝚝𝚘
💫 .𝙲𝚑𝚒𝚑𝚘
💫 .𝙲𝚑𝚒𝚝𝚘𝚐𝚎
💫 .𝙳𝚎𝚒𝚍𝚊𝚛𝚊
💫 .𝙴𝚛𝚣𝚊
💫 .𝙴𝚕𝚊𝚒𝚗𝚊
💫 .𝙴𝚋𝚊
💫 .𝙴𝚖𝚒𝚕𝚒𝚊
💫 .𝙷𝚎𝚜𝚝𝚒𝚊
💫 .𝙷𝚒𝚗𝚊𝚝𝚊
💫 .𝙸𝚗𝚘𝚛𝚒
💫 .𝙸𝚜𝚞𝚣𝚞
💫 .𝙸𝚝𝚊𝚌𝚑𝚒
💫 .𝙸𝚝𝚘𝚛𝚒
💫 .𝙺𝚊𝚐𝚊
💫 .𝙺𝚊𝚐𝚞𝚛𝚊
💫 .𝙺𝚊𝚘𝚛𝚒
💫 .𝙺𝚎𝚗𝚎𝚔𝚒
💫 .𝙺𝚘𝚝𝚘𝚛𝚒
💫 .𝙺𝚞𝚛𝚞𝚖𝚒
💫 .𝙼𝚊𝚍𝚊𝚛𝚊
💫 .𝙼𝚒𝚔𝚊𝚜𝚊
💫 .𝙼𝚒𝚔𝚞
💫 .𝙼𝚒𝚗𝚊𝚝𝚘
💫 .𝙽𝚊𝚛𝚞𝚝𝚘
💫 .𝙽𝚎𝚣𝚞𝚔𝚘
💫 .𝚂𝚊𝚐𝚒𝚛𝚒
💫 .𝚂𝚊𝚜𝚞𝚔𝚎
💫 .𝚂𝚊𝚔𝚞𝚛𝚊
💫 .𝙼𝚊𝚗𝚑𝚠𝚊
💫 .𝚆𝚊𝚒𝚏𝚞
💫 .𝙽𝚎𝚔𝚘
💫 .𝚉𝚎𝚛𝚘 𝚃𝚠𝚘
💫 .𝙻𝚘𝚕𝚒
💫 .𝙿𝚘𝚔𝚎𝚍𝚎𝚡 <𝙿𝚘𝚔𝚎𝚖𝚘𝚗>
💫 .𝚃𝚛𝚊𝚌𝚎
╰──────────⳹
`
let nsfwmenu = `
✦ ───『 *𝙉𝙎𝙁𝙒* 』─── ⚝
🔞 .𝙼𝚊𝚗𝚑𝚠𝚊 <𝙲ó𝚍𝚒𝚐𝚘>
🔞 .𝙷𝚎𝚗𝚝𝚊𝚒 <𝙱𝚞𝚜𝚌𝚊 𝙷>
🔞 .𝚁𝚞𝚕𝚎𝟹𝟺 <𝙰𝚗𝚒𝚖𝚎>
🔞 .𝙶𝚎𝚗𝚜𝚑𝚒𝚗
🔞 .𝚂𝚠𝚒𝚖𝚜𝚞𝚒𝚝
🔞 .𝚂𝚌𝚑𝚘𝚘𝚕𝚂𝚠𝚒𝚖𝚜𝚞𝚒𝚝
🔞 .𝚆𝚑𝚒𝚝𝚎
🔞 .𝙱𝚊𝚛𝚎𝚏𝚘𝚘𝚝
🔞 .𝚃𝚘𝚞𝚑𝚘𝚞
🔞 .𝙶𝚊𝚖𝚎𝙲𝙶
🔞 .𝙷𝚘𝚕𝚘𝚕𝚒𝚟𝚎
🔞 .𝚄𝚗𝚌𝚎𝚗𝚜𝚘𝚛𝚎𝚍
🔞 .𝚂𝚞𝚗𝚐𝚕𝚊𝚜𝚜𝚎𝚜
🔞 .𝙶𝚕𝚊𝚜𝚜𝚎𝚜
🔞 .𝚆𝚎𝚊𝚙𝚘𝚗
🔞 .𝚂𝚑𝚒𝚛𝚝𝚕𝚒𝚏𝚝
🔞 .𝙲𝚑𝚊𝚒𝚗
🔞 .𝙵𝚒𝚗𝚐𝚎𝚛𝚒𝚗𝚐
🔞 .𝙵𝚕𝚊𝚝𝚌𝚑𝚎𝚜𝚝
🔞 .𝚃𝚘𝚛𝚗𝚌𝚕𝚘𝚝𝚑
🔞 .𝙱𝚘𝚗𝚍𝚊𝚐𝚎
🔞 .𝙳𝚎𝚖𝚘𝚗
🔞 .𝚆𝚎𝚝
🔞 .𝙿𝚊𝚗𝚝𝚢𝚙𝚞𝚕𝚕
🔞 .𝙷𝚎𝚊𝚍𝚍𝚛𝚎𝚜𝚜𝚎𝚜
🔞 .𝙷𝚎𝚊𝚍𝚙𝚑𝚘𝚗𝚎
🔞 .𝚃𝚒𝚎
🔞 .𝙰𝚗𝚞𝚜𝚟𝚒𝚎𝚠
🔞 .𝚂𝚑𝚘𝚛𝚝𝚜
🔞 .𝚂𝚝𝚘𝚌𝚔𝚒𝚗𝚐𝚜
🔞 .𝚃𝚘𝚙𝚕𝚎𝚜𝚜
🔞 .𝙱𝚎𝚊𝚌𝚑
🔞 .𝙱𝚞𝚗𝚗𝚢𝚐𝚒𝚛𝚕
🔞 .𝙱𝚞𝚗𝚗𝚢𝚎𝚊𝚛
🔞 .𝙸𝚍𝚘𝚕
🔞 .𝚅𝚊𝚖𝚙𝚒𝚛𝚎
🔞 .𝙶𝚞𝚗
🔞 .𝙼𝚊𝚒𝚍
🔞 .𝙱𝚛𝚊
🔞 .𝙽𝚘𝚋𝚛𝚊
🔞 .𝙱𝚒𝚔𝚒𝚗𝚒
🔞 .𝚆𝚑𝚒𝚝𝚎𝚑𝚊𝚒𝚛
🔞 .𝙱𝚕𝚘𝚗𝚍𝚎
🔞 .𝙿𝚒𝚗𝚔𝚑𝚊𝚒𝚛
🔞 .𝙱𝚎𝚍
🔞 .𝙿𝚘𝚗𝚢𝚝𝚊𝚒𝚕
🔞 .𝙽𝚞𝚍𝚎
🔞 .𝙳𝚛𝚎𝚜𝚜
🔞 .𝚄𝚗𝚍𝚎𝚛𝚠𝚎𝚊𝚛
🔞 .𝙵𝚘𝚡𝚐𝚒𝚛𝚕
🔞 .𝚄𝚗𝚒𝚏𝚘𝚛𝚖
🔞 .𝚂𝚔𝚒𝚛𝚝
🔞 .𝚂𝚎𝚡
🔞 .𝚂𝚎𝚡𝟸
🔞 .𝚂𝚎𝚡𝟹
🔞 .𝙱𝚛𝚎𝚊𝚜𝚝
🔞 .𝚃𝚠𝚒𝚗𝚝𝚊𝚒𝚕
🔞 .𝚂𝚙𝚛𝚎𝚊𝚍𝚙𝚞𝚜𝚜𝚢
🔞 .𝚃𝚎𝚊𝚛𝚜
🔞 .𝚂𝚎𝚎𝚝𝚑𝚛𝚘𝚞𝚐𝚑
🔞 .𝙱𝚛𝚎𝚊𝚜𝚝𝚑𝚘𝚕𝚍
🔞 .𝙳𝚛𝚞𝚗𝚔
🔞 .𝙵𝚊𝚝𝚎𝚜𝚎𝚛𝚒𝚎𝚜
🔞 .𝚂𝚙𝚛𝚎𝚊𝚍𝚕𝚎𝚐𝚜
🔞 .𝙾𝚙𝚎𝚗𝚜𝚑𝚒𝚛𝚝
🔞 .𝙷𝚎𝚊𝚍𝚋𝚊𝚗𝚍
🔞 .𝙵𝚘𝚘𝚍
🔞 .𝙲𝚕𝚘𝚜𝚎
🔞 .𝚃𝚛𝚎𝚎
🔞 .𝙽𝚒𝚙𝚙𝚕𝚎𝚜
🔞 .𝙴𝚛𝚎𝚌𝚝𝚗𝚒𝚙𝚙𝚕𝚎𝚜
🔞 .𝙷𝚘𝚛𝚗𝚜
🔞 .𝙶𝚛𝚎𝚎𝚗𝚑𝚊𝚒𝚛
🔞 .𝚆𝚘𝚕𝚏𝚐𝚒𝚛𝚕
🔞 .𝙲𝚊𝚝𝚐𝚒𝚛𝚕
🔞 .𝙽𝚂𝙵𝚆
🔞 .𝙰𝚜𝚜
🔞 .𝙱𝚘𝚘𝚋𝚜
🔞 .𝙻𝚎𝚜𝚋𝚒𝚊𝚗
🔞 .𝙿𝚞𝚜𝚜𝚢
🔞 .𝙿𝚊𝚌𝚔
🔞 .𝚡𝚟𝚒𝚍
🔞 .𝚡𝚗𝚡
╰──────────⳹`

let toolsmenu = `
✦ ───『 *𝙏𝙊𝙊𝙇𝙎* 』─── ⚝
⚙️ .𝙽𝚘𝚠𝚊
⚙️ .𝚀𝚛 <𝚃𝚎𝚡𝚝𝚘>
⚙️ .𝚀𝚛𝙲𝚘𝚍𝚎 <𝚃𝚎𝚡𝚝𝚘>
⚙️ .𝚂𝚝𝚢𝚕𝚎 <𝙻𝚕𝚊𝚟𝚎> <𝚃𝚎𝚡𝚝𝚘>
⚙️ .𝚆𝚎𝚊𝚝𝚑𝚎𝚛 <𝙻𝚞𝚐𝚊𝚛>
⚙️ .𝙳𝚎𝚑𝚊𝚣𝚎
⚙️ .𝚁𝚎𝚌𝚘𝚕𝚘𝚛
⚙️ .𝙷𝚍𝚛
⚙️ .𝙻𝚎𝚗𝚐𝚝𝚑 <𝙲𝚊𝚗𝚝𝚒𝚍𝚊𝚍>
⚙️ .𝚃𝚒𝚗𝚢𝚞𝚛𝚕 <𝙻𝚒𝚗𝚔>
⚙️ .𝚂𝚑𝚘𝚛𝚝𝚎𝚗 <𝙻𝚒𝚗𝚔>
⚙️ .𝚃𝚎𝚖𝚙𝚖𝚊𝚒𝚕
⚙️ .𝚂𝚑𝚊𝚣𝚊𝚖
⚙️ .𝙲𝚊𝚕 <𝙴𝚌𝚞𝚊𝚌𝚒ó𝚗>
⚙️ .𝙲𝚊𝚛𝚋𝚘𝚗 <𝙲ó𝚍𝚒𝚐𝚘>
⚙️ .𝙳𝚎𝚏𝚒𝚗𝚎 <𝙼𝚞𝚗𝚍𝚘>
⚙️ .𝙴𝚕𝚎𝚖𝚎𝚗𝚝
⚙️ .𝙶𝚘𝚘𝚐𝚕𝚎
⚙️ .𝚒𝚃𝚞𝚗𝚎𝚜
⚙️ .𝙻𝚢𝚛𝚒𝚌𝚜
⚙️ .𝙸𝙼𝙳𝚋
⚙️ .𝙲𝚘𝚞𝚛𝚜𝚎
⚙️ .𝚁𝚊𝚗𝚍𝚘𝚖𝙲𝚘𝚞𝚛𝚜𝚎
⚙️ .𝚁𝚎𝚊𝚍𝚖𝚘𝚛𝚎 <𝚃𝚎𝚡𝚝𝚘𝟷>|<𝚃𝚎𝚡𝚝𝚘𝟸>
⚙️ .𝚁𝚎𝚊𝚍𝚟𝚘
⚙️ .𝚁𝚎𝚖𝚘𝚟𝚎𝚋𝚐
⚙️ .𝚂𝚂 <𝚄𝚁𝙻>
⚙️ .𝚂𝚂𝙵 <𝚄𝚁𝙻>
⚙️ .𝚂𝚞𝚋𝚛𝚎𝚍𝚍𝚒𝚝
⚙️ .𝚃𝚎𝚕𝚎𝚜𝚝𝚒𝚌𝚔𝚎𝚛 Ⓛ
⚙️ .𝚃𝚘𝚞𝚛𝚕
⚙️ .𝚃𝚛𝚊𝚗𝚜𝚕𝚊𝚝𝚎 <𝙸𝚍𝚒𝚘𝚖𝚊> <𝚃𝚎𝚡𝚝𝚘>
⚙️ .𝚃𝚛𝚞𝚎
⚙️ .𝚃𝚃𝚂 <𝙸𝚍𝚒𝚘𝚖𝚊> <𝚃𝚎𝚡𝚝𝚘>
⚙️ .𝚆𝙰
⚙️ .𝚆𝚒𝚔𝚒𝚙𝚎𝚍𝚒𝚊
╰──────────⳹`

let aimenu = `
✦ ───『 *𝙄𝘼* 』─── ⚝
⚛️ .𝙱𝚒𝚗𝚐
⚛️ .𝙳𝚊𝚕𝚕𝚎
⚛️ .𝙲𝚑𝚊𝚝𝙶𝙿𝚃
⚛️ .𝚃𝚘𝙰𝚗𝚒𝚖𝚎
⚛️ .𝚁𝚎𝚖𝙶𝙿𝚃
⚛️ .𝚃𝚘𝚌𝚊𝚛𝚝𝚘𝚘𝚗
⚛️ .𝙰𝙸
⚛️ .𝙱𝚊𝚛𝚍
⚛️ .𝚁𝚎𝚖 <𝙿𝚛𝚎𝚐ú𝚗𝚝𝚊𝚖𝚎>
⚛️ .𝙱𝚒𝚗𝚐𝙸𝚖𝚐
⚛️ .𝙶𝚎𝚖𝚒𝚗𝚒
⚛️ .𝙱𝚘𝚝
╰──────────⳹
`

let botmenu = `
✦ ───『 *𝘽𝙊𝙏 𝙈𝙀𝙉𝙐* 』─── ⚝
🤖 .𝙿𝚒𝚗𝚐
🤖 .𝚁𝚞𝚗𝚝𝚒𝚖𝚎
🤖 .𝚂𝚌𝚛𝚒𝚙𝚝
🤖 .𝚂𝚎𝚛𝚟𝚎𝚛
🤖 .𝙱𝚕𝚘𝚌𝚔𝚕𝚒𝚜𝚝
🤖 .𝙰𝚕𝚒𝚟𝚎
🤖 .𝙸𝚗𝚏𝚘
🤖 .𝙲𝚕𝚒𝚖𝚊
🤖 .𝙲𝚛𝚎𝚊𝚍𝚘𝚛
🤖 .𝚃𝚘𝚝𝚊𝚕𝙵𝚎𝚊𝚝𝚞𝚛𝚎
🤖 .𝙻𝚒𝚜𝚝
🤖 .𝙼𝚎𝚜𝚜𝚒
🤖 .𝙲𝚛𝚒𝚜𝚝𝚒𝚊𝚗𝚘𝚁𝚘𝚗𝚊𝚕𝚍𝚘
🤖 .𝙲𝚁𝟽
🤖 .𝙿𝙿𝙲𝚘𝚞𝚙𝚕𝚎
🤖 .𝙿𝙿𝙲𝙿
🤖 .𝙴𝚗𝚊𝚋𝚕𝚎 <𝙾𝚙𝚌𝚒𝚘𝚗𝚎𝚜>
🤖 .𝚁𝚎𝚐 <𝙽𝚘𝚖𝚋𝚛𝚎.𝙰ñ𝚘𝚜>
🤖 .𝙼𝚢𝚂𝙽
🤖 .𝚄𝚗𝚛𝚎𝚐
╰──────────⳹
`
let pluginmenu = `
✦ ───『 *𝙋𝙇𝙐𝙂𝙄𝙉* 』─── ⚝
🖋️.𝚙𝚕𝚞𝚐𝚒𝚗𝚜
🖋️.𝚒𝚗𝚜𝚝𝚊𝚕𝚕 <𝙶𝚒𝚜𝚝 𝚄𝚁𝙻>
╰──────────⳹
`
let serbot = `
✦ ───『 *𝙅𝘼𝘿𝙄𝘽𝙊𝙏* 』─── ⚝
🤖 .𝚂𝚎𝚛𝚋𝚘𝚝𝚌𝚘𝚍𝚎
🤖 .𝙹𝚊𝚍𝚒𝚋𝚘𝚝𝚌𝚘𝚍𝚎
🤖 .𝙲𝚘𝚍𝚎
🤖 .𝚂𝚝𝚘𝚙
🤖 .𝙸𝚗𝚏𝚘
╰──────────⳹
`
let imganime = `
✦ ───『 *𝙄𝙈𝙂 𝘼𝙉𝙄𝙈𝙀* 』─── ⚝
❤️ .𝙿𝚒𝚗𝚝𝚎𝚛𝚎𝚜𝚝
❤️ .𝙿𝚒𝚗𝚝𝚎𝚛𝚎𝚜𝚝𝟷
❤️ .𝙼𝚎𝚐𝚞𝚖𝚒𝚗
❤️ .𝙽𝚎𝚔𝚘
❤️ .𝚂𝚑𝚒𝚗𝚘𝚋𝚞
❤️ .𝚆𝚊𝚒𝚏𝚞
❤️ .𝙶𝚘𝚘𝚐𝚕𝚎𝙸𝚖𝚐 <𝙰𝚗𝚒𝚖𝚎>
`

const handler = async (m, {
  conn,
  command,
  text,
  args,
  usedPrefix
}) => {


 let glb = global.db.data.users
 let usrs = glb[m.sender]
 let tag = `@${m.sender.split("@")[0]}`
 let mode = global.opts["self"] ? "Private" : "Public"

 let {
age,
exp,
limit,
level,
role,
registered,
credit
 } = glb[m.sender]
 let {
min,
xp,
max
 } = xpRange(level, global.multiplier)
 let name = await conn.getName(m.sender)
 let premium = glb[m.sender].premiumTime
 let prems = `${premium > 0 ? "Premium": "Free"}`
 let platform = os.platform()


 let ucpn = `${ucapan()}`

 let _uptime = process.uptime() * 1000
 let _muptime
 if (process.send) {
process.send("uptime")
_muptime = await new Promise(resolve => {
process.once("message", resolve)
setTimeout(resolve, 1000)
}) * 1000
 }
 let muptime = clockString(_muptime)
 let uptime = clockString(_uptime)


 let totalfeatures = Object.values(global.plugins).filter((v) => v.help && v.tags).length;
 let totalreg = Object.keys(glb).length

  conn.remmenu = conn.remmenu ? conn.remmenu : {};


  global.fcontact = { key: { fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: 'status@broadcast' }, message: { contactMessage: { displayName: `${name}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
  const infoText = `
  ${botname} ‹𝟹⁩ 」\n
  𝙱𝚄𝙴𝙽𝙰𝚂 ${name} 𝙴𝚂𝙿𝙴𝚁𝙰𝙽𝙳𝙾 𝚀𝚄𝙴 𝙴𝚂𝚃𝙴 𝙱𝙸𝙴𝙽 :𝟛

  *${ucpn}* 

  乂───『𝚄𝚂𝚄𝙰𝚁𝙸𝙾』───乂
  🆔 *𝙽𝙾𝙼𝙱𝚁𝙴:* ${name}
  🪙 *𝙾𝚁𝙾:* ${credit}
  🗞️ *𝚁𝙾𝙻:* ${global.rpg.role(level)}
  🆙 *𝙻𝙴𝚅𝙴𝙻:* ${level}
  🕹️ *𝚇𝙿:* ${exp}
  ╰──────────⳹

  乂───『𝙸𝙽𝙵𝙾』───乂
  💙 *𝙽𝙾𝙼𝙱𝚁𝙴:* ${botname}
  🖥️ *𝙼𝙾𝙳𝙾:* ${mode}
  ☁️ *𝙿𝙻𝙰𝚃𝙰𝙵𝙾𝚁𝙼𝙰:* ${platform}
  🈂️ *𝚃𝙸𝙿𝙾:* 𝙽𝚘𝚍𝚎𝙹𝚜
  🆓 *𝙱𝙰𝙸𝙻𝙴𝚈𝚂:* 𝙼𝚄𝙻𝚃𝙸
  💡 *𝙿𝚁𝙴𝙵𝙸𝚇:* [ *${usedPrefix}* ]
  ⏱️ *𝚄𝙿𝚃𝙸𝙼𝙴:* ${muptime}
  📝 *𝚄𝚂𝚄𝙰𝚁𝙸𝙾𝚂:*  ${totalreg}
  👑 *𝙾𝚆𝙽𝙴𝚁 𝙾𝙵𝙲:* \`𝙶𝙰𝙱𝚁𝙸𝙴𝙻 𝙲𝚄𝚁𝙸\`
  ╰──────────⳹

  乂───『𝙸𝙽𝙵𝙾 𝙲𝙼𝙳』───乂 
  │ *${totalfeatures}* 𝙲𝙾𝙼𝙰𝙽𝙳𝙾𝚂
  ╰──────────⳹
   ${readMore}

  乂───『 *𝙸𝙽𝙵𝙾*』───乂 
│𝙿𝙰𝚁𝙰 𝚅𝙴𝚁 𝙴𝙻 𝙼𝙴𝙽𝚄 𝙳𝙴 𝙰𝙱𝙰𝙹𝙾
│𝚁𝙴𝚂𝙿𝙾𝙽𝙳𝙴 𝙴𝚂𝚃𝙴 𝙼𝙴𝙽𝚂𝙰𝙹𝙴
│𝙲𝙾𝙽 𝚄𝙽 𝙽𝚄𝙼𝙴𝚁𝙾
│𝙳𝙴 𝙻𝙰 𝙻𝙸𝚂𝚃𝙰 𝙳𝙴
│𝙰𝙱𝙰𝙹𝙾, 𝙾𝙹𝙾  
│𝙴𝙻 𝚀𝚄𝙸𝙴𝙽 𝚂𝙰𝙲𝙾 𝙴𝙻
│𝙼𝙴𝙽𝚄 𝙳𝙴𝙱𝙴 𝚁𝙴𝚂𝙿𝙾𝙽𝙳𝙴𝚁
│𝚂𝙰𝙲𝙰 𝚃𝚄 𝙿𝚁𝙾𝙿𝙸𝙾 𝙼𝙴𝙽𝚄.
╰───────⳹
╭───────⳹
│ \`𝟷.\` \`𝙱𝙾𝚃 𝙼𝙴𝙽Ú\`
│ \`𝟸.\` \`𝙾𝚆𝙽𝙴𝚁 𝙼𝙴𝙽Ú\`
│ \`𝟹.\` \`𝙼𝙴𝙽Ú 𝙳𝙴 𝙶𝚁𝚄𝙿𝙾𝚂\`
│ \`𝟺.\` \`𝙵𝚄𝙽 𝙼𝙴𝙽Ú\`
│ \`𝟻.\` \`𝚁𝙴𝙰𝙲𝙲𝙸Ó𝙽 𝙼𝙴𝙽Ú\`
│ \`𝟼.\` \`𝙳𝙴𝚂𝙲𝙰𝚁𝙶𝙰𝚂 𝙼𝙴𝙽Ú\`
│ \`𝟽.\` \`𝙹𝚄𝙴𝙶𝙾𝚂 𝙼𝙴𝙽Ú\`
│ \`𝟾.\` \`𝙻𝙾𝙶𝙾 𝙼𝙴𝙽Ú\`
│ \`𝟿.\` \`𝚂𝚃𝙸𝙲𝙺𝙴𝚁 𝙼𝙴𝙽Ú\`
│ \`𝟷𝟶.\` \`𝙰𝚄𝙳𝙸𝙾 𝙼𝙴𝙽Ú\`
│ \`𝟷𝟷.\` \`𝙽𝙾𝚃𝙸𝙲𝙸𝙰𝚂 𝙼𝙴𝙽Ú\`
│ \`𝟷𝟸.\` \`𝙴𝙲𝙾𝙽𝙾𝙼Í𝙰 𝙼𝙴𝙽Ú\`
│ \`𝟷𝟹.\` \`𝙰𝙽𝙸𝙼𝙴 𝙼𝙴𝙽Ú\`
│ \`𝟷𝟺.\` \`𝙽𝚂𝙵𝚆 𝙼𝙴𝙽Ú\`
│ \`𝟷𝟻.\` \`𝚃𝙾𝙾𝙻𝚂 𝙼𝙴𝙽Ú\`
│ \`𝟷𝟼.\` \`𝙸𝙰 𝙼𝙴𝙽Ú\`
│ \`𝟷𝟾.\` \`𝙿𝙻𝚄𝙶𝙸𝙽 𝙼𝙴𝙽Ú\`
│ \`𝟷𝟾.\` \`𝚂𝙴𝚁𝙱𝙾𝚃\`
│ \`𝟷𝟿.\` \`𝙸𝙼𝙰𝙶𝙴𝙽-𝙰𝙽𝙸𝙼𝙴\`
╰───────⳹
${readMore}
\`𝙾𝚆𝙽𝙴𝚁 𝙲𝚄𝚁𝙸\`
` 
;


const { result, key, timeout } = await conn.sendMessage(
  m.chat,
  { video: { url: menuvid }, caption: infoText.trim(),
  contextInfo: {
    mentionedJid: [m.sender],
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: id_canal,
      newsletterName: name_canal,
      serverMessageId: -1,
    },
    forwardingScore: 999,
    externalAdReply: {
      title: 'ＲＥＭ－ＢＯＴ',
      body: '𝙼𝙴𝙽𝚄',
      thumbnailUrl: 'https://telegra.ph/file/daaf1d574dc2264307c5c.jpg',
      sourceUrl: 'https://github.com/davidprospero123/REM-CHAM-MD.git',
      mediaType: 1,
      renderLargerThumbnail: false,
    },
  },

  gifPlayback: true, gifAttribution: 0 },
  { quoted: fcontact }
)

conn.remmenu[m.sender] = {
  result,
  key,
  timeout: setTimeout(() => {
    conn.sendMessage(m.chat, {
      delete: key,
    })
    delete conn.remmenu[m.sender]
  }, 3600 * 1000),
}
}


handler.before = async (m, { conn }) => {
  conn.remmenu = conn.remmenu ? conn.remmenu : {};
  if (m.isBaileys || !(m.sender in conn.remmenu)) return;
  const { result, key, timeout } = conn.remmenu[m.sender];
  if (!m.quoted || m.quoted.id !== key.id || !m.text) return;
const choice = m.text.trim();

if (choice === "1") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/625c9ff019e9636ad1de1.jpg' },
      caption: botmenu,
contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: id_canal,
          newsletterName: name_canal,
          serverMessageId: -1,
        },
      }
    }, { quoted:fcontact });
    } else if (choice === "2") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/d8535031e1807bf0969df.jpg' },
      caption: ownermenu,
contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: id_canal,
          newsletterName: name_canal,
          serverMessageId: -1,
        },
      }
    }, { quoted:fcontact });
    } else if (choice === "3") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/77ea091931549913d7f4d.jpg' },
      caption: groupmenu,
contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: id_canal,
          newsletterName: name_canal,
          serverMessageId: -1,
        },
      }
    }, { quoted:fcontact });
    } else if (choice === "4") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/3fd1dfbdcb0b8829f0c36.jpg' },
      caption: funmenu,
contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: id_canal,
          newsletterName: name_canal,
          serverMessageId: -1,
        },
      }
    }, { quoted:fcontact });
    } else if (choice === "5") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/861d4dde6b2fd5f808183.jpg' },
      caption: reactmenu,
contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: id_canal,
          newsletterName: name_canal,
          serverMessageId: -1,
        },
      }
    }, { quoted:fcontact });
    } else if (choice === "6") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/4bf6202c1fc9d8510cd86.jpg' },
      caption: dlmenu,
contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: id_canal,
          newsletterName: name_canal,
          serverMessageId: -1,
        },
      }
    }, { quoted:fcontact });
    } else if (choice === "7") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/22cfacba51062930f9070.jpg' },
      caption: gamemenu,
contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: id_canal,
          newsletterName: name_canal,
          serverMessageId: -1,
        },
      }
    }, { quoted:fcontact });
    } else if (choice === "8") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/861d4dde6b2fd5f808183.jpg' },
      caption: logomenu,
contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: id_canal,
          newsletterName: name_canal,
          serverMessageId: -1,
        },
      }
    }, { quoted:fcontact });
    } else if (choice === "9") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/861d4dde6b2fd5f808183.jpg' },
      caption: stickermenu,
contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: id_canal,
          newsletterName: name_canal,
          serverMessageId: -1,
        },
      }
    }, { quoted:fcontact });
    } else if (choice === "10") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/861d4dde6b2fd5f808183.jpg' },
      caption: audiomenu,
contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: id_canal,
          newsletterName: name_canal,
          serverMessageId: -1,
        },
      }
    }, { quoted:fcontact });
    } else if (choice === "11") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/861d4dde6b2fd5f808183.jpg' },
      caption: newsmenu,
contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: id_canal,
          newsletterName: name_canal,
          serverMessageId: -1,
        },
      }
    }, { quoted:fcontact });
    } else if (choice === "12") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/861d4dde6b2fd5f808183.jpg' },
      caption: economy,
contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: id_canal,
          newsletterName: name_canal,
          serverMessageId: -1,
        },
      }
    }, { quoted:fcontact });
    } else if (choice === "13") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/861d4dde6b2fd5f808183.jpg' },
      caption: animemenu,
contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: id_canal,
          newsletterName: name_canal,
          serverMessageId: -1,
        },
      }
    }, { quoted:fcontact });
    } else if (choice === "14") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/5e1674f1f89e742ee7ccb.jpg' },
      caption: nsfwmenu,
contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: id_canal,
          newsletterName: name_canal,
          serverMessageId: -1,
        },
      }
    }, { quoted:fcontact });
    } else if (choice === "15") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/1465f362a248888d89674.jpg' },
      caption: toolsmenu,
contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: id_canal,
          newsletterName: name_canal,
          serverMessageId: -1,
        },
      }
    }, { quoted:fcontact });
    } else if (choice === "16") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/6c4f644b526bb2c9486df.jpg' },
      caption: aimenu,
contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: id_canal,
          newsletterName: name_canal,
          serverMessageId: -1,
        },
      }
    }, { quoted:fcontact });
    } else if (choice === "17") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/861d4dde6b2fd5f808183.jpg' },
      caption: pluginmenu,
contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: id_canal,
          newsletterName: name_canal,
          serverMessageId: -1,
        },
      }
    }, { quoted:fcontact });
        } else if (choice === "18") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/7e753e455c844c0c087e5.jpg' },
      caption: serbot,
contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: id_canal,
          newsletterName: name_canal,
          serverMessageId: -1,
        },
      }
    }, { quoted:fcontact });
         } else if (choice === "19") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/f890e82eec9e56542c9f4.jpg' },
      caption: imganime,
contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: id_canal,
          newsletterName: name_canal,
          serverMessageId: -1,
        },
      }
    }, { quoted:fcontact });
    } else {
      m.reply('𝙽𝙾 𝙴𝚂 𝚄𝙽 𝙽𝚄𝙼𝙴𝚁𝙾 𝙳𝙴 𝙻𝙰 𝙻𝙸𝚂𝚃𝙰 𝙿𝙾𝚁 𝙵𝙰𝚅𝙾𝚁 𝙴𝙽𝚅𝙸𝙰 𝚄𝙽 𝙽𝚄𝙼𝙴𝚁𝙾 𝙳𝙴 𝙻𝙰 𝙻𝙸𝚂𝚃𝙰 𝙳𝙴 𝙼𝙴𝙽𝚄.');
    }

};


handler.help = ["play"];
handler.tags = ["downloader"];
handler.command = /^(menu|help)$/i;
handler.limit = true;
export default handler;




function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
 }

 const more = String.fromCharCode(8206)
 const readMore = more.repeat(4001)

 function clockString(ms) {
  let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60
  return [h, " H ", m, " M ", s, " S "].map(v => v.toString().padStart(2, 0)).join("")
 }

 function clockStringP(ms) {
  let ye = isNaN(ms) ? "--" : Math.floor(ms / 31104000000) % 10
  let mo = isNaN(ms) ? "--" : Math.floor(ms / 2592000000) % 12
  let d = isNaN(ms) ? "--" : Math.floor(ms / 86400000) % 30
  let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60
  return [ye, " *Años 🗓️*\n", mo, " *Meses 🌙*\n", d, " *Dias ☀️*\n", h, " *Horas 🕐*\n", m, " *Minutos ⏰*\n", s, " *Segundos ⏱️*"].map(v => v.toString().padStart(2, 0)).join("")
 }

 function ucapan() {
  const time = moment.tz("America/Lima").format("HH");
  let res = "¡𝙷𝚘𝚕𝚊! :𝟹 ¿𝙲ó𝚖𝚘 𝚎𝚜𝚝á𝚜 𝚑𝚘𝚢?";
  
  if (time >= 4 && time < 6) {
    res = "¡𝙱𝚞𝚎𝚗𝚘𝚜 𝚍í𝚊𝚜! 𝙰𝚖𝚊𝚗𝚎𝚌𝚎 𝚝𝚎𝚖𝚙𝚛𝚊𝚗𝚘, ¿𝚌ó𝚖𝚘 𝚝𝚎 𝚜𝚒𝚎𝚗𝚝𝚎𝚜 :𝟹? ☀️";
  } else if (time >= 6 && time < 10) {
    res = "¡𝙱𝚞𝚎𝚗𝚘𝚜 𝚍í𝚊𝚜! ¿𝙲ó𝚖𝚘 𝚎𝚖𝚙𝚒𝚎𝚣𝚊 𝚝𝚞 𝚖𝚊ñ𝚊𝚗𝚊? ☀️";
  } else if (time >= 10 && time < 12) {
    res = "¡𝙷𝚘𝚕𝚊! ¿𝚀𝚞é 𝚝𝚊𝚕 𝚝𝚞 𝚖𝚊ñ𝚊𝚗𝚊 𝚑𝚊𝚜𝚝𝚊 𝚊𝚑𝚘𝚛𝚊? 🌤️";
  } else if (time >= 12 && time < 15) {
    res = "¡𝙱𝚞𝚎𝚗𝚊𝚜 𝚝𝚊𝚛𝚍𝚎𝚜! ¿𝙲ó𝚖𝚘 𝚟𝚊 𝚝𝚞 𝚍í𝚊 𝚍𝚎𝚜𝚙𝚞é𝚜 𝚍𝚎𝚕 𝚖𝚎𝚍𝚒𝚘𝚍í𝚊? 🌤️";
  } else if (time >= 15 && time < 18) {
    res = "¡𝙱𝚞𝚎𝚗𝚊𝚜 𝚝𝚊𝚛𝚍𝚎𝚜! ¿𝚀𝚞é 𝚝𝚊𝚕 𝚝𝚞 𝚝𝚊𝚛𝚍𝚎 𝚑𝚊𝚜𝚝𝚊 𝚊𝚑𝚘𝚛𝚊? 🌇";
  } else if (time >= 18 && time < 20) {
    res = "¡𝙱𝚞𝚎𝚗𝚊𝚜 𝚗𝚘𝚌𝚑𝚎𝚜! ¿𝙲ó𝚖𝚘 𝚑𝚊 𝚜𝚒𝚍𝚘 𝚝𝚞 𝚝𝚊𝚛𝚍𝚎? 🌙";
  } else if (time >= 20 && time < 24) {
    res = "¡𝙱𝚞𝚎𝚗𝚊𝚜 𝚗𝚘𝚌𝚑𝚎𝚜! ¿𝙲ó𝚖𝚘 𝚑𝚊 𝚜𝚒𝚍𝚘 𝚝𝚞 𝚗𝚘𝚌𝚑𝚎 𝚑𝚊𝚜𝚝𝚊 𝚊𝚑𝚘𝚛𝚊? 🌙";
  } else if (time >= 0 && time < 4) {
    res = "¡𝙷𝚘𝚕𝚊! ¿𝙲ó𝚖𝚘 𝚎𝚜𝚝á𝚜 𝚎𝚜𝚝𝚊 𝚖𝚊𝚍𝚛𝚞𝚐𝚊𝚍𝚊? 🌙";
  }
  
  return res;
}

export { ucapan };
