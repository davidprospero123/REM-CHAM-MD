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
🏘️ .ɢᴇᴛʙɪᴏ <@ᴛᴀɢ/ʀᴇꜱᴘᴏɴᴅᴇʀ>  Ⓛ
🏘️ .ᴀɴɪᴍᴇQᴜᴏᴛᴇ
🏘️ .ꜱᴇᴛᴅᴇꜱᴄ <ᴛᴇxᴛᴏ>
🏘️ .ꜱᴇᴛɴᴀᴍᴇ <ᴛᴇxᴛᴏ>
🏘️ .ᴀᴅᴅ
🏘️ .ᴅᴇʟᴇᴛᴇ
🏘️ .ᴅᴇʟᴡᴀʀɴ @ᴜꜱᴇʀ
🏘️ .ᴅᴇᴍᴏᴛᴇ (@ᴛᴀɢ)
🏘️ .ɪɴꜰᴏɢᴘ
🏘️ .ʜɪᴅᴇᴛᴀɢ
🏘️ .ɪɴᴠɪᴛᴇ <917xxx>
🏘️ .ᴋɪᴄᴋ @ᴜꜱᴇʀ
🏘️ .ʟɪɴᴋ
🏘️ .ᴘᴏʟʟ Qᴜᴇꜱᴛɪᴏɴ|ᴏᴘᴛɪᴏɴ|ᴏᴘᴛɪᴏɴ
🏘️ .ᴘᴇʀꜰɪʟ
🏘️ .ᴘʀᴏᴍᴏᴠᴇʀ
🏘️ .ʀᴇꜱᴇᴛʟɪɴᴋ
🏘️ .ꜱᴇᴛʙʏᴇ <ᴛᴇxᴛᴏ>
🏘️ .ɢʀᴏᴜᴘ *ᴏᴘᴇɴ/ᴄʟᴏꜱᴇ*
🏘️ .ꜱᴇᴛᴡᴇʟᴄᴏᴍᴇ <ᴛᴇxᴛᴏ>
🏘️ .ꜱɪᴍᴜʟᴀᴛᴇ <ᴇᴠᴇɴᴛ> @ᴜꜱᴇʀ
🏘️ .ꜱᴛᴀꜰꜰ
🏘️ .ᴛᴀɢᴀʟʟ 
🏘️ .ᴛᴏᴛᴀɢ
🏘️ .ᴀᴅᴠᴇʀᴛɪʀ @ᴜꜱᴇʀ
🏘️ .ᴀᴅᴠᴇʀᴛᴇɴᴄɪᴀꜱ
🏘️ .ᴍᴀɪɴ
╰──────────⳹`

let ownermenu = `
✦ ───『 *𝘾𝙐𝙍𝙄* 』─── ⚝
👨🏻‍💻 .ᴀᴘᴏʏᴀʀ
👨🏻‍💻 .ᴘʀᴇᴍɪᴀʀ <@ᴛᴀɢ>
👨🏻‍💻 .ᴀᴅᴅᴏᴡɴᴇʀ @ᴜꜱᴜᴀʀɪᴏ
👨🏻‍💻 .ᴀʟʟᴏᴡ <@ᴛᴀɢ>
👨🏻‍💻 .ʜᴇʀᴏᴋᴜ
👨🏻‍💻 .ʙᴀɴ @ᴜꜱᴜᴀʀɪᴏ
👨🏻‍💻 .ʙᴀɴᴄʜᴀᴛ
👨🏻‍💻 .ᴛx
👨🏻‍💻 .ʙʀᴏᴀᴅᴄᴀꜱᴛɢʀᴏᴜᴘ <ᴛᴇxᴛᴏ>
👨🏻‍💻 .ʙᴄɢᴄ <ᴛᴇxᴛ>
👨🏻‍💻 .ᴄʟᴇᴀʀᴛᴍᴘ
👨🏻‍💻 .ᴅᴇʟᴇxᴘɪʀᴇᴅ
👨🏻‍💻 .ᴅᴇʟᴘʀᴇᴍ @ᴜꜱᴇʀ
👨🏻‍💻 .ʀᴇᴍᴏᴠᴇᴏᴡɴᴇʀ @ᴜꜱᴇʀ
👨🏻‍💻 .ꜱᴇᴛᴘᴘʙᴏᴛꜰᴜʟʟ
👨🏻‍💻 .ɢᴇᴛᴘʟᴜɢɪɴ <ɴᴀᴍᴇ ꜰɪʟᴇ>
👨🏻‍💻 .ɢᴇᴛꜰɪʟᴇ <ɴᴀᴍᴇ ꜰɪʟᴇ>
👨🏻‍💻 .ᴊᴏɪɴ <ᴄʜᴀᴛ.ᴡʜᴀᴛꜱᴀᴘᴘ.ᴄᴏᴍ> <ᴅɪᴀꜱ>
👨🏻‍💻 .ʀᴇꜱᴇᴛ <54xxx>
👨🏻‍💻 .ʀᴇꜱᴇᴛᴘʀᴇꜰɪx
👨🏻‍💻 .ʀᴇꜱᴛᴀʀᴛ
👨🏻‍💻 .ꜱᴇᴛᴘʀᴇꜰɪx
👨🏻‍💻 .ꜱᴇᴛᴘʀᴇꜰɪx [ꜱɪᴍʙᴏʟᴏ]
👨🏻‍💻 .ᴜɴʙᴀɴ @ᴜꜱᴜᴀʀɪᴏ
👨🏻‍💻 .ᴜɴʙᴀɴᴄʜᴀᴛ
👨🏻‍💻 .ᴜᴘᴅᴀᴛᴇ
👨🏻‍💻 .ᴄᴏɴꜰɪɢ
👨🏻‍💻 .ʟɪꜱᴛʙᴀɴ
👨🏻‍💻 .ᴅᴇʟᴇᴛᴇᴘʟᴜɢɪɴ <ɴᴏᴍʙʀᴇ>
╰──────────⳹`

let funmenu = `
✦ ───『 *𝙁𝙐𝙉* 』─── ⚝
😎 .ᴀꜰᴋ <ʀᴀᴢᴏɴ>
😎 .ᴛᴏᴍᴘ3
😎 .ᴛᴏᴀᴠ
😎 .ʙᴏᴛ
😎 .ᴄʜᴀʀᴀᴄᴛᴇʀ @ᴛᴀɢ
😎 .ᴅᴀʀᴇ
😎 .ꜰʟɪʀᴛ
😎 .ɢᴀʏ @ᴜꜱᴜᴀʀɪᴏ
😎 .ᴘɪᴄᴋᴜᴘʟɪɴᴇ
😎 .Qᴜᴇꜱᴛɪᴏɴ
😎 .ꜱʜᴀʏᴀʀɪ
😎 .ꜱʜɪᴘ
😎 .ʏᴏᴍᴀᴍᴀᴊᴏᴋᴇ
😎 .ᴛʀᴜᴛʜ
😎 .ᴡᴀꜱᴛᴇ @ᴜꜱᴇʀ
😎 .ɪᴍᴀɢᴇ
😎 .ᴍᴇᴍᴇ
😎 .Qᴜᴏᴛᴇ
╰──────────⳹`

let reactmenu = `
✦ ───『 *𝙍𝙀𝘼𝘾𝘾𝙄𝙊𝙉* 』─── ⚝
✔️ .ʙᴜʟʟʏ @ᴇᴛɪQᴜᴇᴛᴀ
✔️ .ᴄᴜᴅᴅʟᴇ @ᴇᴛɪQᴜᴇᴛᴀ
✔️ .ᴄʀʏ @ᴇᴛɪQᴜᴇᴛᴀ
✔️ .ʜᴜɢ @ᴇᴛɪQᴜᴇᴛᴀ
✔️ .ᴀᴡᴏᴏ @ᴇᴛɪQᴜᴇᴛᴀ
✔️ .ᴋɪꜱꜱ @ᴇᴛɪQᴜᴇᴛᴀ
✔️ .ʟɪᴄᴋ @ᴇᴛɪQᴜᴇᴛᴀ
✔️ .ᴘᴀᴛ @ᴇᴛɪQᴜᴇᴛᴀ
✔️ .ꜱᴍᴜɢ @ᴇᴛɪQᴜᴇᴛᴀ
✔️ .ʙᴏɴᴋ @ᴇᴛɪQᴜᴇᴛᴀ
✔️ .ʏᴇᴇᴛ @ᴇᴛɪQᴜᴇᴛᴀ
✔️ .ʙʟᴜꜱʜ @ᴇᴛɪQᴜᴇᴛᴀ
✔️ .ꜱᴍɪʟᴇ @ᴇᴛɪQᴜᴇᴛᴀ
✔️ .ᴡᴀᴠᴇ @ᴇᴛɪQᴜᴇᴛᴀ
✔️ .ʜɪɢʜꜰɪᴠᴇ @ᴇᴛɪQᴜᴇᴛᴀ
✔️ .ʜᴀɴᴅʜᴏʟᴅ @ᴇᴛɪQᴜᴇᴛᴀ
✔️ .ɴᴏᴍ @ᴇᴛɪQᴜᴇᴛᴀ
✔️ .ʙɪᴛᴇ @ᴇᴛɪQᴜᴇᴛᴀ
✔️ .ɢʟᴏᴍᴘ @ᴇᴛɪQᴜᴇᴛᴀ
✔️ .ꜱʟᴀᴘ @ᴇᴛɪQᴜᴇᴛᴀ
✔️ .ᴋɪʟʟ @ᴇᴛɪQᴜᴇᴛᴀ
✔️ .ʜᴀᴘᴘʏ @ᴇᴛɪQᴜᴇᴛᴀ
✔️ .ᴡɪɴᴋ @ᴇᴛɪQᴜᴇᴛᴀ
✔️ .ᴘᴏᴋᴇ @ᴇᴛɪQᴜᴇᴛᴀ
✔️ .ᴅᴀɴᴄᴇ @ᴇᴛɪQᴜᴇᴛᴀ
✔️ .ᴄʀɪɴɢᴇ @ᴇᴛɪQᴜᴇᴛᴀ
╰──────────⳹`

let dlmenu = `
✦ ───『 *𝘿𝙀𝙎𝘾𝘼𝙍𝙂𝘼𝙎* 』─── ⚝
⚡ .ᴀᴘᴏʏᴀʀ
⚡ .ꜰᴀᴄᴇʙᴏᴏᴋ <ᴜʀʟ>
⚡ .ɢᴅʀɪᴠᴇ 🅟
⚡ .ɢɪᴛᴄʟᴏɴᴇ <ᴜʀʟ>
⚡ .ɪɢꜱᴛᴀʟᴋ
⚡ .ɪɴꜱᴛᴀɢʀᴀᴍ
⚡ .ᴍᴇᴅɪᴀꜰɪʀᴇ <ᴜʀʟ>
⚡ .ᴍᴇɢᴀ
⚡ .ᴍᴏᴅᴀᴘᴋ
⚡ .ᴘʟᴀʏ <ʙᴜꜱᴄᴀʀ>
⚡ .ᴘʟᴀʏ2 <ᴀᴘɪ-ʟᴇɴᴛᴀ>
⚡ .ᴘʟᴀʏᴠɪᴅ <ᴛᴇxᴛᴏ>
⚡ .ꜱᴘᴏᴛɪꜰʏ
⚡ .ᴛɪᴋᴛᴏᴋ <ᴜʀʟ>
⚡ .ᴛɪᴋᴛᴏᴋꜱᴛᴀʟᴋ
⚡ .ᴛᴡɪᴛᴛᴇʀ <ᴜʀʟ>
⚡ .ʏᴛᴍᴘ3 <ᴜʀʟ>
⚡ .ʏᴛꜱᴇᴀʀᴄʜ
⚡ .ʏᴛᴍᴘ4 <ʏᴛ-ʟɪɴᴋ>
⚡ .ᴡᴀʟʟᴘᴀᴘᴇʀ <ᴄᴏɴꜱᴜʟᴛᴀ>
⚡ .ʏᴛᴍᴘ4ᴅᴏᴄ <ʏᴛ-ʟɪɴᴋ>
╰──────────⳹`

let gamemenu = `
✦ ───『 *𝙅𝙐𝙀𝙂𝙊𝙎* 』─── ⚝
🎮 .ꜱʟᴏᴛ <ᴄᴀɴᴛɪᴅᴀᴅ>
🎮 .ᴄʜᴇꜱꜱ [ᴅᴇꜱᴅᴇ ʜᴀꜱᴛᴀ]
🎮 .ᴄʜᴇꜱꜱ ᴅᴇʟᴇᴛᴇ
🎮 .ᴄʜᴇꜱꜱ ᴊᴏɪɴ
🎮 .ᴄʜᴇꜱꜱ ꜱᴛᴀʀᴛ
🎮 .ᴅᴇʟᴛᴛᴛ
🎮 .ɢᴜᴇꜱꜱꜰʟᴀɢ
🎮 .ᴍᴀᴛʜꜱ <ᴍᴏᴅᴏꜱ>
🎮 .ᴘᴘᴛ <ᴘɪᴇᴅʀᴀ/ᴘᴀᴘᴇʟ/ᴛɪᴊᴇʀᴀꜱ>
🎮 .ᴛɪᴄᴛᴀᴄᴛᴏᴇ <ɴÚᴍᴇʀᴏ ᴅᴇ ᴇᴛɪQᴜᴇᴛᴀ>
╰──────────⳹`
let logomenu = `
✦ ───『 *𝙁𝘼𝘽𝙍𝙄𝘾𝘼𝙍* 』─── ⚝
🧰 .ʙʟᴜʀ
🧰 .ᴅɪꜰᴜᴍɪɴᴀʀ2
🧰 .ʜᴏʀɴʏᴄᴀʀᴅ
🧰 .ʜᴏʀɴʏʟɪᴄᴇɴꜱᴇ
🧰 .ɢꜰx1
🧰 .ɢꜰx2
🧰 .ɢꜰx3
🧰 .ɢꜰx4
🧰 .ɢꜰx5
🧰 .ɢꜰx6
🧰 .ɢꜰx7
🧰 .ɢꜰx8
🧰 .ɢꜰx9
🧰 .ɢꜰx10
🧰 .ɢꜰx11
🧰 .ɢꜰx12
🧰 .ꜱɪᴍᴘᴄᴀʀᴅ
🧰 .ɪᴛꜱꜱᴏꜱᴛᴜᴘɪᴅ
🧰 .ɪꜱꜱ
🧰 .ᴇꜱᴛᴜᴘɪᴅᴏ
🧰 .ᴛᴡᴇᴇᴛ <ᴄᴏᴍᴇɴᴛᴀʀ>
🧰 .ʟᴏʟɪᴄᴏɴ
🧰 .ʏᴛᴄᴏᴍᴍᴇɴᴛ <ᴄᴏᴍᴇɴᴛᴀʀ>
╰──────────⳹`

let stickermenu = `
✦ ───『 *𝙎𝙏𝙄𝘾𝙆𝙀𝙍* 』─── ⚝
💙 .ᴇᴍᴏᴊɪᴍɪx <ᴇᴍᴏᴊɪ+ᴇᴍᴏᴊɪ>
💙 .ɢᴇᴛꜱᴛɪᴄᴋᴇʀ
💙 .ꜱᴍᴀᴋᴇʀ
💙 .ꜱᴛɪᴄᴋᴇʀᴡɪᴛʜᴍᴇᴍᴇ (ꜱᴜʙᴛÍᴛᴜʟᴏ|ᴍᴇᴅɪᴏꜱ ᴅᴇ ʀᴇꜱᴘᴜᴇꜱᴛᴀ)
💙 .ꜱᴡᴍᴇᴍᴇ <ᴜʀʟ>
💙 .ꜱᴡᴍ(ꜱᴜʙᴛÍᴛᴜʟᴏ|ᴍᴇᴅɪᴏꜱ ᴅᴇ ʀᴇꜱᴘᴜᴇꜱᴛᴀ)
💙 .ꜱꜰᴜʟʟ
💙 .ᴛᴏɪᴍɢ <ꜱᴛɪᴄᴋᴇʀ>
💙 .ᴛᴏᴠɪᴅ
💙 .ᴛʀɪɢɢᴇʀ <@ᴜꜱᴇʀ>
💙 .ᴛᴛᴘ
💙 .ᴛᴛᴘ2
💙 .ᴛᴛᴘ3
💙 .ᴛᴛᴘ4
💙 .ᴛᴛᴘ5
💙 .ᴀᴛᴛᴘ
💙 .ᴀᴛᴛᴘ2
💙 .ᴀᴛᴛᴘ3
💙 .ᴛᴀᴋᴇ <ɴᴏᴍʙʀᴇ>|<ᴀᴜᴛᴏʀ>
╰──────────⳹`

let audiomenu = `
✦ ───『 *𝘼𝙐𝘿𝙄𝙊* 』─── ⚝
🔉 .ʙᴀꜱꜱ [ᴠɴ]
🔉 .ʙʟᴏᴡɴ [ᴠɴ]
🔉 .ᴅᴇᴇᴘ [ᴠɴ]
🔉 .ᴇᴀʀʀᴀᴘᴇ [ᴠɴ]
🔉 .ꜰᴀꜱᴛ [ᴠɴ]
🔉 .ꜰᴀᴛ [ᴠɴ]
🔉 .ɴɪɢʜᴛᴄᴏʀᴇ [ᴠɴ]
🔉 .ʀᴇᴠᴇʀꜱᴇ [ᴠɴ]
🔉 .ʀᴏʙᴏᴛ [ᴠɴ]
🔉 .ꜱʟᴏᴡ [ᴠɴ]
🔉 .ꜱᴍᴏᴏᴛʜ [ᴠɴ]
🔉 .ᴛᴜᴘᴀɪ [ᴠɴ]
╰──────────⳹`


let newsmenu = `
✦ ───『 *𝙉𝙀𝙒𝙎* 』─── ⚝
📥 .ᴛᴇᴄʜɴᴇᴡꜱ (ɪɴɢʟᴇꜱ)
📥 .ɴᴅᴛᴠ (ɪɴɢʟᴇꜱ)
╰──────────⳹
`
let economy = `
✦ ───『 *𝙀𝘾𝙊𝙉𝙊𝙈𝙄𝘼* 』─── ⚝
💹 .ᴅᴇᴘᴏꜱɪᴛᴀʀ <@ᴜꜱᴜᴀʀɪᴏ>
💹 .ᴀɢʀᴇɢᴀʀxᴘ <@ᴜꜱᴜᴀʀɪᴏ>
💹 .ʙᴀɴᴋ
💹 .ʙᴀʟᴀɴᴄᴇ
💹 .ᴄᴏᴍᴘʀᴀʀᴘᴏʟʟᴏ
💹 .ᴘᴇʟᴇᴀᴅᴇᴘᴏʟʟᴏ <ᴄᴀɴᴛɪᴅᴀᴅ>
💹 .ʙᴜʏ
💹 .ʙᴜʏᴀʟʟ
💹 .ᴅᴀɪʟʏ
💹 .ʀᴇᴛɪʀᴀʀ <ᴄᴀɴᴛɪᴅᴀᴅ>
💹 .ɢᴀᴍʙʟᴇ <ᴄᴀɴᴛɪᴅᴀᴅ> <ᴄᴏʟᴏʀ(ʀᴇᴅ/ʙʟᴀᴄᴋ)>
💹 .ɢɪᴠᴇ ᴄʀᴇᴅɪᴛ [ᴄᴀɴᴛɪᴅᴀᴅ] [@ᴛᴀɢ]
💹 .ʟᴇᴠᴇʟᴜᴘ
💹 .ʀᴀɴɢᴏ
💹 .ʀᴏʙᴀʀ <@ᴜꜱᴜᴀʀɪᴏ>
💹 .ʀᴜʟᴇᴛᴀ <ᴄᴀɴᴛɪᴅᴀᴅ> <ᴄᴏʟᴏʀ(ʀᴇᴅ/ʙʟᴀᴄᴋ)>
💹 .ʙɪʟʟᴇᴛᴇʀᴀ
💹 .ᴡɪᴛʜᴅʀᴀᴡ
💹 .ᴛʀᴀʙᴀᴊᴀʀ
╰──────────⳹`
let animemenu = `
✦ ───『 *𝘼𝙉𝙄𝙈𝙀* 』─── ⚝
💫.ᴀᴘᴏʏᴀʀ
💫 .ᴀɴɪᴍᴇ
💫 .ᴀᴋɪʀᴀ
💫 .ᴀᴋɪʏᴀᴍᴀ
💫 .ᴀɴɴᴀ
💫 .ᴀꜱᴜɴᴀ
💫 .ᴀʏᴜᴢᴀᴡᴀ
💫 .ʙᴏʀᴜᴛᴏ
💫 .ᴄʜɪʜᴏ
💫 .ᴄʜɪᴛᴏɢᴇ
💫 .ᴅᴇɪᴅᴀʀᴀ
💫 .ᴇʀᴢᴀ
💫 .ᴇʟᴀɪɴᴀ
💫 .ᴇʙᴀ
💫 .ᴇᴍɪʟɪᴀ
💫 .ʜᴇꜱᴛɪᴀ
💫 .ʜɪɴᴀᴛᴀ
💫 .ɪɴᴏʀɪ
💫 .ɪꜱᴜᴢᴜ
💫 .ɪᴛᴀᴄʜɪ
💫 .ɪᴛᴏʀɪ
💫 .ᴋᴀɢᴀ
💫 .ᴋᴀɢᴜʀᴀ
💫 .ᴋᴀᴏʀɪ
💫 .ᴋᴇɴᴇᴋɪ
💫 .ᴋᴏᴛᴏʀɪ
💫 .ᴋᴜʀᴜᴍɪ
💫 .ᴍᴀᴅᴀʀᴀ
💫 .ᴍɪᴋᴀꜱᴀ
💫 .ᴍɪᴋᴜ
💫 .ᴍɪɴᴀᴛᴏ
💫 .ɴᴀʀᴜᴛᴏ
💫 .ɴᴇᴢᴜᴋᴏ
💫 .ꜱᴀɢɪʀɪ
💫 .ꜱᴀꜱᴜᴋᴇ
💫 .ꜱᴀᴋᴜʀᴀ
💫 .ᴍᴀɴʜᴡᴀ
💫 .ᴡᴀɪꜰᴜ
💫 .ɴᴇᴋᴏ
💫 .ᴢᴇʀᴏᴛᴡᴏ
💫 .ʟᴏʟɪ
💫 .ᴘᴏᴋᴇᴅᴇx <ᴘᴏᴋᴇᴍᴏɴ>
💫 .ᴛʀᴀᴄᴇ
╰──────────⳹
`
let nsfwmenu = `
✦ ───『 *𝙉𝙎𝙁𝙒* 』─── ⚝
🔞 .ᴍᴀɴʜᴡᴀ <ᴄᴏᴅɪɢᴏ>
🔞 .ʜᴇɴᴛᴀɪ <ʙᴜꜱᴄᴀ ʜ>
🔞 .ʀᴜʟᴇ34 <ᴀɴɪᴍᴇ>
🔞 .ɢᴇɴꜱʜɪɴ
🔞 .ꜱᴡɪᴍꜱᴜɪᴛ
🔞 .ꜱᴄʜᴏᴏʟꜱᴡɪᴍꜱᴜɪᴛ
🔞 .ᴡʜɪᴛᴇ
🔞 .ʙᴀʀᴇꜰᴏᴏᴛ
🔞 .ᴛᴏᴜʜᴏᴜ
🔞 .ɢᴀᴍᴇᴄɢ
🔞 .ʜᴏʟᴏʟɪᴠᴇ
🔞 .ᴜɴᴄᴇɴꜱᴏʀᴇᴅ
🔞 .ꜱᴜɴɢʟᴀꜱꜱᴇꜱ
🔞 .ɢʟᴀꜱꜱᴇꜱ
🔞 .ᴡᴇᴀᴘᴏɴ
🔞 .ꜱʜɪʀᴛʟɪꜰᴛ
🔞 .ᴄʜᴀɪɴ
🔞 .ꜰɪɴɢᴇʀɪɴɢ
🔞 .ꜰʟᴀᴛᴄʜᴇꜱᴛ
🔞 .ᴛᴏʀɴᴄʟᴏᴛʜ
🔞 .ʙᴏɴᴅᴀɢᴇ
🔞 .ᴅᴇᴍᴏɴ
🔞 .ᴡᴇᴛ
🔞 .ᴘᴀɴᴛʏᴘᴜʟʟ
🔞 .ʜᴇᴀᴅᴅʀᴇꜱꜱ
🔞 .ʜᴇᴀᴅᴘʜᴏɴᴇ
🔞 .ᴛɪᴇ
🔞 .ᴀɴᴜꜱᴠɪᴇᴡ
🔞 .ꜱʜᴏʀᴛꜱ
🔞 .ꜱᴛᴏᴋɪɴɢꜱ
🔞 .ᴛᴏᴘʟᴇꜱꜱ
🔞 .ʙᴇᴀᴄʜ
🔞 .ʙᴜɴɴʏɢɪʀʟ
🔞 .ʙᴜɴɴʏᴇᴀʀ
🔞 .ɪᴅᴏʟ
🔞 .ᴠᴀᴍᴘɪʀᴇ
🔞 .ɢᴜɴ
🔞 .ᴍᴀɪᴅ
🔞 .ʙʀᴀ
🔞 .ɴᴏʙʀᴀ
🔞 .ʙɪᴋɪɴɪ
🔞 .ᴡʜɪᴛᴇʜᴀɪʀ
🔞 .ʙʟᴏɴᴅᴇ
🔞 .ᴘɪɴᴋʜᴀɪʀ
🔞 .ʙᴇᴅ
🔞 .ᴘᴏɴʏᴛᴀɪʟ
🔞 .ɴᴜᴅᴇ
🔞 .ᴅʀᴇꜱꜱ
🔞 .ᴜɴᴅᴇʀᴡᴇᴀʀ
🔞 .ꜰᴏxɢɪʀʟ
🔞 .ᴜɴɪꜰᴏʀᴍ
🔞 .ꜱᴋɪʀᴛ
🔞 .ꜱᴇx
🔞 .ꜱᴇx2
🔞 .ꜱᴇx3
🔞 .ʙʀᴇᴀꜱᴛ
🔞 .ᴛᴡɪɴᴛᴀɪʟ
🔞 .ꜱᴘʀᴇᴀᴅᴘᴜꜱꜱʏ
🔞 .ᴛᴇᴀʀꜱ
🔞 .ꜱᴇᴇᴛʜʀᴏᴜɢʜ
🔞 .ʙʀᴇᴀꜱᴛʜᴏʟᴅ
🔞 .ᴅʀᴜɴᴋ
🔞 .ꜰᴀᴛᴇꜱᴇʀɪᴇꜱ
🔞 .ꜱᴘʀᴇᴀᴅʟᴇɢꜱ
🔞 .ᴏᴘᴇɴꜱʜɪʀᴛ
🔞 .ʜᴇᴀᴅʙᴀɴᴅ
🔞 .ꜰᴏᴏᴅ
🔞 .ᴄʟᴏꜱᴇ
🔞 .ᴛʀᴇᴇ
🔞 .ɴɪᴘᴘʟᴇꜱ
🔞 .ᴇʀᴇᴄᴛɴɪᴘᴘʟᴇꜱ
🔞 .ʜᴏʀɴꜱ
🔞 .ɢʀᴇᴇɴʜᴀɪʀ
🔞 .ᴡᴏʟꜰɢɪʀʟ
🔞 .ᴄᴀᴛɢɪʀʟ
🔞 .ɴꜱꜰᴡ
🔞 .ᴀꜱꜱ
🔞 .ʙᴏᴏʙꜱ
🔞 .ʟᴇꜱʙɪᴀɴ
🔞 .ᴘᴜꜱꜱʏ
🔞 .ᴘᴀᴄᴋ
🔞 .xᴠɪᴅ
🔞 .xɴxx
╰──────────⳹`

let toolsmenu = `
✦ ───『 *𝙏𝙊𝙊𝙇𝙎* 』─── ⚝
⚙️ .ɴᴏᴡᴀ
⚙️ .Qʀ <ᴛᴇxᴛᴏ>
⚙️ .Qʀᴄᴏᴅᴇ <ᴛᴇxᴛᴏ>
⚙️ .ꜱᴛʏʟᴇ <ʟʟᴀᴠᴇ> <ᴛᴇxᴛᴏ>
⚙️ .ᴡᴇᴀᴛʜᴇʀ *<ʟᴜɢᴀʀ>*
⚙️ .ᴅᴇʜᴀᴢᴇ
⚙️ .ʀᴇᴄᴏʟᴏʀ
⚙️ .ʜᴅʀ
⚙️ .ʟᴇɴɢᴛʜ <ᴄᴀɴᴛɪᴅᴀᴅ>
⚙️ .ᴛɪɴʏᴜʀʟ <ʟɪɴᴋ>
⚙️ .ꜱʜᴏʀᴛᴇɴ <ʟɪɴᴋ>
⚙️ .ᴛᴇᴍᴘᴍᴀɪʟ
⚙️ .ꜱʜᴀᴢᴀᴍ
⚙️ .ᴄᴀʟ <ᴇᴄᴜᴀᴄɪᴏɴ>
⚙️ .ᴄᴀʀʙᴏɴ <ᴄᴏᴅɪɢᴏ>
⚙️ .ᴅᴇꜰɪɴᴇ <ᴍᴜɴᴅᴏ>
⚙️ .ᴇʟᴇᴍᴇɴᴛ
⚙️ .ɢᴏᴏɢʟᴇ
⚙️ .ɪᴛᴜɴᴇꜱ
⚙️ .ʟʏʀɪᴄꜱ
⚙️ .ɪᴍᴅʙ
⚙️ .ᴄᴏᴜʀꜱᴇ
⚙️ .ʀᴀɴᴅᴏᴍᴄᴏᴜʀꜱᴇ
⚙️ .ʀᴇᴀᴅᴍᴏʀᴇ <ᴛᴇxᴛᴏ1>|<ᴛᴇxᴛᴏ2>
⚙️ .ʀᴇᴀᴅᴠᴏ
⚙️ .ʀᴇᴍᴏᴠᴇʙɢ
⚙️ .ꜱꜱ <ᴜʀʟ>
⚙️ .ꜱꜱꜰ <ᴜʀʟ>
⚙️ .ꜱᴜʙʀᴇᴅᴅɪᴛ
⚙️ .ᴛᴇʟᴇꜱᴛɪᴄᴋᴇʀ  Ⓛ
⚙️ .ᴛᴏᴜʀʟ
⚙️ .ᴛʀᴀɴꜱʟᴀᴛᴇ <ɪᴅɪᴏᴍᴀ> <ᴛᴇxᴛᴏ>
⚙️ .ᴛʀᴜᴇ
⚙️ .ᴛᴛꜱ <ɪᴅɪᴏᴍᴀ> <ᴛᴇxᴛᴏ>
⚙️ .ᴡᴀ
⚙️ .ᴡɪᴋɪᴘᴇᴅɪᴀ
╰──────────⳹`

let Aimenu = `
✦ ───『 *𝙄𝘼* 』─── ⚝
⚛️ .ʙɪɴɢ
⚛️ .ᴅᴀʟʟᴇ
⚛️ .ᴄʜᴀᴛɢᴘᴛ
⚛️ .ᴛᴏᴀɴɪᴍᴇ
⚛️ .ʀᴇᴍɢᴘᴛ
⚛️ .ᴛᴏᴄᴀʀᴛᴏᴏɴ
⚛️ .ᴀɪ
⚛️ .ʙᴀʀᴅ
⚛️ .ʀᴇᴍ <ᴘʀᴇɢᴜɴᴛᴀᴍᴇ>
⚛️ .ʙɪɴɢɪᴍɢ
⚛️ .ɢᴇᴍɪɴɪ
⚛️ .ʙᴏᴛ
╰──────────⳹
`
let religionmenu = `
✦ ───『𝙍𝙚𝙡𝙞𝙜𝙞𝙤𝙣』─── ⚝
🕊️ .gita [verse_number]
🕊️ .quran [surah_number|surah_name]
╰──────────⳹`

let botmenu = `
✦ ───『 *𝘽𝙊𝙏 𝙈𝙀𝙉𝙐* 』─── ⚝
🤖 .ᴘɪɴɢ
🤖 .ʀᴜɴᴛɪᴍᴇ
🤖 .ꜱᴄʀɪᴘᴛ
🤖 .ꜱᴇʀᴠᴇʀ
🤖 .ʙʟᴏᴄᴋʟɪꜱᴛ
🤖 .ᴀʟɪᴠᴇ
🤖 .ɪɴꜰᴏ
🤖 .ᴄʟɪᴍᴀ
🤖 .ᴄʀᴇᴀᴅᴏʀ
🤖 .ᴛᴏᴛᴀʟꜰᴇᴀᴛᴜʀᴇ
🤖 .ʟɪꜱᴛ
🤖 .ᴍᴇꜱꜱɪ
🤖 .ᴄʀɪꜱᴛɪᴀɴᴏʀᴏɴᴀʟᴅᴏ
🤖 .ᴄʀ7
🤖 .ᴘᴘᴄᴏᴜᴘʟᴇ
🤖 .ᴘᴘᴄᴘ
🤖 .ᴘɪɴᴛᴇʀᴇꜱᴛ
🤖 .ʀᴇɢ <ɴᴏᴍʙʀᴇ.ᴀÑᴏꜱ>
🤖 .ᴍʏꜱɴ
🤖 .ᴜɴʀᴇɢ
╰──────────⳹
`
let pluginmenu = `
✦ ───『 *𝙋𝙇𝙐𝙂𝙄𝙉* 』─── ⚝
🖋️ .plugins
🖋️ .install <Gist URL>
╰──────────⳹
`
let serbot = `
✦ ───『 *𝙅𝘼𝘿𝙄𝘽𝙊𝙏* 』─── ⚝
🤖 .ꜱᴇʀʙᴏᴛ
🤖 .ᴊᴀᴅɪʙᴏᴛ
🤖 .ꜱᴛᴏᴘ
🤖 .ɪɴꜰᴏ
╰──────────⳹
`
let imganime = `
✦ ───『 *𝙄𝙈𝙂 𝘼𝙉𝙄𝙈𝙀* 』─── ⚝
❤️ .ᴍᴇɢᴜᴍɪɴ
❤️ .ɴᴇᴋᴏ
❤️ .ꜱʜɪɴᴏʙᴜ
❤️ .ᴡᴀɪꜰᴜ
❤️ .ɢᴏᴏɢʟᴇɪᴍɢ <ᴀɴɪᴍᴇ>
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

  conn.gurumenu = conn.gurumenu ? conn.gurumenu : {};


  global.fcontact = { key: { fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: 'status@broadcast' }, message: { contactMessage: { displayName: `${name}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
  const infoText = `
  ${botname} あ⁩ 」\n
  𝙃𝙤𝙡𝙖 ${name} 𝙎𝙚𝙣𝙥𝙖𝙞 :𝟛

  *${ucpn}* 

  乂───『𝙐𝙎𝙐𝘼𝙍𝙄𝙊』───乂
  🆔 *ɴᴏᴍʙʀᴇ:* ${name}
  🪙 *ᴏʀᴏ:* ${credit}
  🗞️ *ʀᴏʟ:* ${role}
  🆙 *ʟᴇᴠᴇʟ:* ${level}
  🕹️ *xᴘ:* ${exp}
  ╰──────────⳹

  乂───『𝙄 𝙉 𝙁 𝙊』───乂
  💙 *ɴᴏᴍʙʀᴇ:* ${botname}
  🖥️ *ᴍᴏᴅᴏ:* ${mode}
  ☁️ *ᴘʟᴀᴛᴀꜰᴏʀᴍᴀ:* ${platform}
  🈂️ *ᴛɪᴘᴏ:* NodeJs
  🆓 *ʙᴀɪʟᴇʏꜱ:* ᴍᴜʟᴛɪ ᴅɪꜱᴘᴏꜱɪᴛɪᴠᴏ
  💡 *ᴘʀᴇꜰɪx:* [ *${usedPrefix}* ]
  ⏱️ *ᴜᴘᴛɪᴍᴇ:* ${muptime}
  📝 *ᴅᴀᴛᴀʙᴀꜱᴇ:*  ${totalreg}
  👑 *ᴄʀᴇᴀᴅᴏʀ:* ᴄᴜʀɪ
  ╰──────────⳹

  乂───『𝙄 𝙉 𝙁 𝙊  𝘾 𝙈 𝘿』───乂 
  │ *274* ᴄᴏᴍᴀɴᴅᴏꜱ
  ╰──────────⳹
   ${readMore}

  乂───『 *𝙄𝙉𝙁𝙊*』───乂 
│ᴘᴀʀᴀ ᴠᴇʀ ʟᴏꜱ ᴅᴇᴍᴀꜱ ᴄᴏᴍᴀɴᴅᴏꜱ
│ʀᴇꜱᴘᴏɴᴅᴀ ᴇꜱᴛᴇ ᴍᴇɴꜱᴀᴊᴇ
│ᴄᴏɴ ʟᴏꜱ ɴᴜᴍᴇʀᴏꜱ Qᴜᴇ ꜱᴇ
│ᴇɴᴄᴜᴇɴᴛʀᴀɴ
│ᴇɴ ʟᴀ ʟɪꜱᴛᴀ ᴅᴇ ᴀʙᴀᴊᴏ.
╰───────⳹
╭───────⳹
│ *1.* 𝘽𝙤𝙩 𝙢𝙚𝙣𝙪
│ *2.* 𝘾𝙪𝙧𝙞 𝙢𝙚𝙣𝙪
│ *3.* 𝙈𝙚𝙣𝙪 𝙙𝙚 𝙂𝙧𝙪𝙥𝙤𝙨
│ *4.* 𝙁𝙪𝙣 𝙈𝙚𝙣𝙪
│ *5.* 𝙍𝙚𝙖𝙘𝙘𝙞𝙤𝙣 𝙈𝙚𝙣𝙪
│ *6.* 𝘿𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙨 𝙈𝙚𝙣𝙪
│ *7.* 𝙅𝙪𝙚𝙜𝙤𝙨 𝙈𝙚𝙣𝙪
│ *8.* 𝙇𝙤𝙜𝙤 𝙈𝙚𝙣𝙪
│ *9.* 𝙎𝙩𝙞𝙘𝙠𝙚𝙧 𝙈𝙚𝙣𝙪
│ *10.* 𝘼𝙪𝙙𝙞𝙤 𝙈𝙚𝙣𝙪
│ *11.* 𝙉𝙤𝙩𝙞𝙘𝙞𝙖𝙨 𝙈𝙚𝙣𝙪
│ *12.* 𝙀𝙘𝙤𝙣𝙤𝙢𝙞𝙖 𝙈𝙚𝙣𝙪
│ *13.* 𝘼𝙣𝙞𝙢𝙚 𝙈𝙚𝙣𝙪
│ *14.* 𝙉𝙎𝙁𝙒 𝙈𝙚𝙣𝙪
│ *15.* 𝙏𝙤𝙤𝙡𝙨 𝙈𝙚𝙣𝙪
│ *16.* 𝙄𝘼 𝙈𝙚𝙣𝙪
│ *17.* 𝙍𝙚𝙡𝙞𝙜𝙞𝙤𝙣 𝙈𝙚𝙣𝙪
│ *18.* 𝙋𝙡𝙪𝙜𝙞𝙣 𝙈𝙚𝙣𝙪
│ *19.* 𝙎𝙚𝙧 𝘽𝙤𝙩
│ *20.* 𝙄𝙈𝘼𝙂𝙀𝙉-𝘼𝙉𝙄𝙈𝙀
╰───────⳹
${readMore}
𝘾𝙧𝙚𝙖𝙙𝙤𝙧-𝙘𝙪𝙧𝙞
` 
;


const { result, key, timeout } = await conn.sendMessage(m.chat, { video: { url: menuvid }, caption: infoText.trim(),  gifPlayback: true,
gifAttribution: 0}, { quoted: fcontact })

// Save the menu options to gurumenu
conn.gurumenu[m.sender] = {
  result,
  key,
  timeout: setTimeout(() => {
    conn.sendMessage(m.chat, {
        delete: key
    });
    delete conn.gurumenu[m.sender];
}, 30 * 60 * 1000),
};
};


handler.before = async (m, { conn }) => {
  conn.gurumenu = conn.gurumenu ? conn.gurumenu : {};
  if (m.isBaileys || !(m.sender in conn.gurumenu)) return;
  const { result, key, timeout } = conn.gurumenu[m.sender];
  if (!m.quoted || m.quoted.id !== key.id || !m.text) return;
const choice = m.text.trim();

if (choice === "1") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/625c9ff019e9636ad1de1.jpg' },
      caption: botmenu
    }, { quoted:fcontact });
    } else if (choice === "2") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/d8535031e1807bf0969df.jpg' },
      caption: ownermenu
    }, { quoted:fcontact });
    } else if (choice === "3") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/77ea091931549913d7f4d.jpg' },
      caption: groupmenu
    }, { quoted:fcontact });
    } else if (choice === "4") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/3fd1dfbdcb0b8829f0c36.jpg' },
      caption: funmenu
    }, { quoted:fcontact });
    } else if (choice === "5") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/861d4dde6b2fd5f808183.jpg' },
      caption: reactmenu
    }, { quoted:fcontact });
    } else if (choice === "6") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/4bf6202c1fc9d8510cd86.jpg' },
      caption: dlmenu
    }, { quoted:fcontact });
    } else if (choice === "7") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/22cfacba51062930f9070.jpg' },
      caption: gamemenu
    }, { quoted:fcontact });
    } else if (choice === "8") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/861d4dde6b2fd5f808183.jpg' },
      caption: logomenu
    }, { quoted:fcontact });
    } else if (choice === "9") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/861d4dde6b2fd5f808183.jpg' },
      caption: stickermenu
    }, { quoted:fcontact });
    } else if (choice === "10") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/861d4dde6b2fd5f808183.jpg' },
      caption: audiomenu
    }, { quoted:fcontact });
    } else if (choice === "11") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/861d4dde6b2fd5f808183.jpg' },
      caption: newsmenu
    }, { quoted:fcontact });
    } else if (choice === "12") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/861d4dde6b2fd5f808183.jpg' },
      caption: economy
    }, { quoted:fcontact });
    } else if (choice === "13") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/861d4dde6b2fd5f808183.jpg' },
      caption: animemenu
    }, { quoted:fcontact });
    } else if (choice === "14") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/5e1674f1f89e742ee7ccb.jpg' },
      caption: nsfwmenu
    }, { quoted:fcontact });
    } else if (choice === "15") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/1465f362a248888d89674.jpg' },
      caption: toolsmenu
    }, { quoted:fcontact });
    } else if (choice === "16") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/6c4f644b526bb2c9486df.jpg' },
      caption: Aimenu
    }, { quoted:fcontact });
    } else if (choice === "17") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/861d4dde6b2fd5f808183.jpg' },
      caption: religionmenu
    }, { quoted:fcontact });
    } else if (choice === "18") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/861d4dde6b2fd5f808183.jpg' },
      caption: pluginmenu
    }, { quoted:fcontact });
        } else if (choice === "19") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/7e753e455c844c0c087e5.jpg' },
      caption: serbot
    }, { quoted:fcontact });
         } else if (choice === "20") {
      await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/f890e82eec9e56542c9f4.jpg' },
      caption: imganime
    }, { quoted:fcontact });
    } else {
      m.reply('ᴇʟᴇᴄᴄɪÓɴ ɴᴏ ᴠÁʟɪᴅᴀ. ᴘᴏʀ ꜰᴀᴠᴏʀ ʀᴇꜱᴘᴏɴᴅᴀ ᴄᴏɴ ᴜɴ ɴÚᴍᴇʀᴏ ᴠÁʟɪᴅᴏ.');
    }

};


handler.help = ["play"];
handler.tags = ["downloader"];
handler.command = /^(menu)$/i;
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
  return [ye, " *Years 🗓️*\n", mo, " *Month 🌙*\n", d, " *Days ☀️*\n", h, " *Hours 🕐*\n", m, " *Minute ⏰*\n", s, " *Second ⏱️*"].map(v => v.toString().padStart(2, 0)).join("")
 }

 function ucapan() {
  const time = moment.tz("America/Lima").format("HH")
  let res = "𝔹𝕦𝕖𝕟𝕠𝕤 𝔻𝕚𝕒𝕤 ☀️"
  if (time >= 4) {
   res = "𝔹𝕦𝕖𝕟𝕠𝕤 𝔻𝕚𝕒𝕤 ☀️"
  }
  if (time >= 10) {
   res = "𝔹𝕦𝕖𝕟𝕒𝕤 𝕥𝕒𝕣𝕕𝕖𝕤 ☀️"
  }
  if (time >= 15) {
   res = "𝔹𝕦𝕖𝕟𝕒𝕤 𝕥𝕒𝕣𝕕𝕖𝕤 🌇"
  }
  if (time >= 18) {
   res = "𝔹𝕦𝕖𝕟𝕒𝕤 𝕟𝕠𝕔𝕙𝕖𝕤 🌙"
  }
  return res
 }

