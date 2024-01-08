let handler = async (m, { conn, usedPrefix, command}) => {
  let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  if (!(who in global.db.data.users)) throw `✳️ 𝙀𝙡 𝙪𝙨𝙪𝙖𝙧𝙞𝙤 𝙣𝙤 𝙨𝙚 𝙚𝙣𝙘𝙪𝙚𝙣𝙩𝙧𝙖 𝙚𝙣 𝙢𝙞 𝙗𝙖𝙨𝙚 𝙙𝙚 𝙙𝙖𝙩𝙤𝙨`;

  let pp = './Assets/Curilogo.jpg'
  let more = String.fromCharCode(8206);
  let readMore = more.repeat(850); 

  let lkr;
  switch (command) {
    case 'list':
lkr = "*𝙋𝙧𝙚𝙥á𝙧𝙖𝙩𝙚 𝙥𝙖𝙧𝙖 𝙚𝙡 𝙫𝙞𝙖𝙟𝙚, 𝙚𝙨𝙩𝙖𝙨 𝙨𝙤𝙣 𝙩𝙪𝙨 𝙤𝙥𝙘𝙞𝙤𝙣𝙚𝙨 𝙙𝙚 𝙗𝙤𝙡𝙚𝙩𝙤𝙨:*\n\n" +
"🤖 *" + usedPrefix + "botmenu* - ᴇʟ ᴘᴀɴᴇʟ ᴅᴇ ᴄᴏɴᴛʀᴏʟ ꜱᴇᴄʀᴇᴛᴏ ᴅᴇʟ ʙᴏᴛ. ¿ᴄᴜÁʟ ᴇꜱ ᴛᴜ ᴏʀᴅᴇɴ, ᴏʜ ɢᴇɴɪᴀʟ?\n\n" +
"👑 *" + usedPrefix + "ownermenu* - ᴇʟ ᴘᴇʀɢᴀᴍɪɴᴏ ꜱᴀɢʀᴀᴅᴏ ꜱÓʟᴏ ᴘᴀʀᴀ ᴇʟ ᴇʟᴇɢɪᴅᴏ. ¡ꜱÍ, ᴇꜱᴇ ᴇʀᴇꜱ ᴛÚ, ᴊᴇꜰᴇ!\n\n" +
"🧑‍🤝‍🧑 *" + usedPrefix + "groupmenu* - ¡ᴛʀᴀᴠᴇꜱᴜʀᴀꜱ ɢʀᴜᴘᴀʟᴇꜱ ᴄᴇɴᴛʀᴀʟᴇꜱ! ¡Úɴᴇᴛᴇ, ᴄʜᴀʀʟᴀ, ᴄᴏɴQᴜɪꜱᴛᴀ!\n\n" +
"📥 *" + usedPrefix + "dlmenu* - 'ᴅʟ' ꜱɪɢɴɪꜰɪᴄᴀ 'ʙᴏᴛÍɴ ᴅᴇʟɪᴄɪᴏꜱᴏ'. ¡ᴠᴇɴ ᴀ ʙᴜꜱᴄᴀʀ ᴛᴜꜱ ᴅᴇʟɪᴄɪᴀꜱ!\n\n" +
"🎉 *" + usedPrefix + "funmenu* - ᴇʟ ɢᴏʀʀᴏ ᴅᴇ ꜰɪᴇꜱᴛᴀ ᴅᴇʟ ʀᴏʙᴏᴛ. ᴊᴜᴇɢᴏꜱ, ᴄʜɪꜱᴛᴇꜱ ʏ ʀᴏꜰʟ ɪɴꜱᴛᴀɴᴛÁɴᴇᴏꜱ. ¡ᴠᴀᴍᴏꜱ ᴀ ᴇᴍᴘᴇᴢᴀʀ ᴇꜱᴛᴀ ꜰɪᴇꜱᴛᴀ!\n\n" +
"💰 *" + usedPrefix + "economIAmenu* - ¡ʙʟɪɴɢ, ʙʀɪʟʟᴏ! ᴛᴜ ʙÓᴠᴇᴅᴀ ᴘᴇʀꜱᴏɴᴀʟ ᴅᴇ ᴇᴄᴏɴᴏᴍÍᴀ ᴠɪʀᴛᴜᴀʟ. ¿ɢᴀꜱᴛᴀʀ ᴏ ᴀʜᴏʀʀᴀʀ? ¡ᴇʟᴇɢɪʀ ꜱᴀʙɪᴀᴍᴇɴᴛᴇ!\n\n" +
"🎮 *" + usedPrefix + "juegosmenu* - ɪɴɢʀᴇꜱᴇ ᴀʟ ᴄᴀᴍᴘᴏ ᴅᴇ ʟᴏꜱ ᴊᴜᴇɢᴏꜱ. ¡ʟᴀꜱ ᴘʀᴏʙᴀʙɪʟɪᴅᴀᴅᴇꜱ ᴘᴜᴇᴅᴇɴ ᴇꜱᴛᴀʀ ꜱɪᴇᴍᴘʀᴇ ᴀ ᴛᴜ ꜰᴀᴠᴏʀ\n\n" +
"🎨 *" + usedPrefix + "stickermenu* - ᴜɴ ᴀʀᴄᴏÍʀɪꜱ ᴅᴇ ᴘᴇɢᴀᴛɪɴᴀꜱ ᴘᴀʀᴀ ᴇʟ ᴀʀᴛɪꜱᴛᴀ Qᴜᴇ ʟʟᴇᴠᴀꜱ ᴅᴇɴᴛʀᴏ. ¡ʜᴀᴢ Qᴜᴇ ᴛᴜꜱ ᴄʜᴀᴛꜱ ᴅᴇꜱᴛᴀQᴜᴇɴ!\n\n" +
"🧰 *" + usedPrefix + "toolmenu* - Tu práctico kit de herramientas. ¿Cuál es tu elección, genio?\n\n" +
"🎩 *" + usedPrefix + "logomenu* - ᴄʀᴇᴀ ᴜɴ ʟᴏɢᴏᴛɪᴘᴏ Qᴜᴇ ɢʀɪᴛᴇ ᴛÚ. ᴏ ꜱᴜꜱᴜʀʀᴏꜱ. ᴛÚ ᴇʟɪɢᴇꜱ ᴇʟ ᴠᴏʟᴜᴍᴇɴ.\n\n" +
"🌙 *" + usedPrefix + "nsfwmenu* - ᴇʟ ᴍᴇɴÚ ᴅᴇꜱᴘᴜÉꜱ ᴅᴇʟ ᴀɴᴏᴄʜᴇᴄᴇʀ. ᴘᴇʀᴏ ʀᴇᴄᴜᴇʀᴅᴇ, ᴄᴏᴍᴘᴀʀᴛɪʀ ꜱᴇᴄʀᴇᴛᴏꜱ ᴅᴇ ᴀᴅᴜʟᴛᴏꜱ ᴅᴇʙᴇ ʙᴀꜱᴀʀꜱᴇ ᴇɴ ᴇʟ ᴄᴏɴꜱᴇɴᴛɪᴍɪᴇɴᴛᴏ.";
break;





    case 'botmenu':
      lkr = `❀° ┄──•••───╮
      𝘽𝙊𝙏 𝙈𝙀𝙉𝙐  
╰───•••──┄ °❀     
┏━━━ʕ•㉨•ʔ━━━┓
⎪⌲👑 _${usedPrefix}rem_
⎪⌲👑 _${usedPrefix}ping_
⎪⌲👑 _${usedPrefix}uptime_
⎪⌲👑 _${usedPrefix}bot_
⎪⌲👑 _${usedPrefix}creador_
⎪⌲👑 _${usedPrefix}script_
⎪⌲👑 _${usedPrefix}runtime_
⎪⌲👑 _${usedPrefix}infobot_
⎪⌲👑 _${usedPrefix}apoyar_
⎪⌲👑 _${usedPrefix}gropos_
⎪⌲👑 _${usedPrefix}blocklist_
⎪⌲👑 _${usedPrefix}listprem_
⎪⌲👑    Curi
┗━━━ʕ•㉨•ʔ━━━┛`; // Your bot menu message here
      break;
    case 'ownermenu':
      lkr = `❀° ┄──•••───╮
      𝘾𝙪𝙧𝙞 𝙈𝙚𝙣𝙪
 ╰───•••──┄ °❀     
 ┏━━━ʕ•㉨•ʔ━━━┓
 ⎪⌲👑 _${usedPrefix}banchat_
 ⎪⌲👑 _${usedPrefix}unbanchat_
 ⎪⌲👑 _${usedPrefix}banuser_
 ⎪⌲👑 _${usedPrefix}unbanuser_
 ⎪⌲👑 _${usedPrefix}Broadcast_
 ⎪⌲👑 _${usedPrefix}Broadcastgc_
 ⎪⌲👑 _${usedPrefix}join_
 ⎪⌲👑 _${usedPrefix}setppbot_
 ⎪⌲👑 _${usedPrefix}setprefix_
 ⎪⌲👑 _${usedPrefix}resetprefix_
 ⎪⌲👑 _${usedPrefix}getfile_
 ⎪⌲👑 _${usedPrefix}getplugin_
 ┗━━━ʕ•㉨•ʔ━━━┛`; // 
      break;
      case 'groupmenu':
      lkr = `❀° ┄──•••───╮
      𝙂𝙧𝙪𝙥𝙤 𝙈𝙚𝙣𝙪
╰───•••──┄ °❀     
┏━━━ʕ•㉨•ʔ━━━┓
⎪⌲💎_${usedPrefix}kick *<@tag>*_
⎪⌲💎_${usedPrefix}promover *<@tag>*_
⎪⌲💎 _${usedPrefix}demote *<@tag>*_
⎪⌲💎 _${usedPrefix}infogropo_
⎪⌲💎 _${usedPrefix}resetlink_
⎪⌲💎 _${usedPrefix}link_
⎪⌲💎 _${usedPrefix}setpp *<image>*_
⎪⌲💎 _${usedPrefix}setname *<text>*_
⎪⌲💎 _${usedPrefix}setdesc *<text>*_
⎪⌲💎 _${usedPrefix}setwelcome *<text>*_
⎪⌲💎 _${usedPrefix}setbye *<text>*_
⎪⌲💎 _${usedPrefix}hidetag *<text/image/audio/vid>*_
⎪⌲💎 _${usedPrefix}warn *<@tag>*_
⎪⌲💎 _${usedPrefix}unwarn *<@tag>*_
⎪⌲💎 _${usedPrefix}group *<open/close>*_
⎪⌲💎 _${usedPrefix}enable
┗━━━ʕ•㉨•ʔ━━━┛`; // 
      break;
      case 'downloadermenu':
        case 'dlmenu' :
      lkr = `❀° ┄──•••───╮
      𝘿𝙇 𝙈𝙀𝙉𝙐 
╰───•••──┄ °❀     
┏━━━ʕ•㉨•ʔ━━━┓
⎪⌲💎_${usedPrefix}play_
⎪⌲💎_${usedPrefix}song_
⎪⌲💎 _${usedPrefix}yta <link>_
⎪⌲💎 _${usedPrefix}ytv <link>_
⎪⌲💎 _${usedPrefix}ytmp3 <link>_
⎪⌲💎 _${usedPrefix}ytmp4 <link>_
⎪⌲💎 _${usedPrefix}gimage_
⎪⌲💎 _${usedPrefix}pinterest_
⎪⌲💎 _${usedPrefix}mediafire <link>_
⎪⌲💎 _${usedPrefix}gdrive <link>_
⎪⌲💎 _${usedPrefix}gitclone <link>_
⎪⌲💎 _${usedPrefix}twitter <link>_
⎪⌲💎 _${usedPrefix}tiktok <link>_
⎪⌲💎 _${usedPrefix}tiktokstalk_
⎪⌲💎 _${usedPrefix}instagram <link>_
⎪⌲💎 _${usedPrefix}spotify_
⎪⌲💎 _${usedPrefix}facebook <link>_
┗━━━ʕ•㉨•ʔ━━━┛`; // 
      break;
      case 'economymenu':
      lkr = `❀° ┄──•••───╮
      𝙀𝙘𝙤𝙣𝙤𝙢𝙞𝙖 
╰───•••──┄ °❀     
┏━━━ʕ•㉨•ʔ━━━┓
⎪⌲👑 _${usedPrefix}claim/daily_
⎪⌲👑 _${usedPrefix}weekly_
⎪⌲👑 _${usedPrefix}monthly_
⎪⌲👑 _${usedPrefix}leaderboard_
⎪⌲👑 _${usedPrefix}bet_
⎪⌲👑 _${usedPrefix}heal_
⎪⌲👑 _${usedPrefix}craft_
⎪⌲👑 _${usedPrefix}balance_
⎪⌲👑 _${usedPrefix}shop_
⎪⌲👑 _${usedPrefix}sell_
⎪⌲👑 _${usedPrefix}adventure_
⎪⌲👑 _${usedPrefix}opencrate_
⎪⌲👑 _${usedPrefix}trabajar_
⎪⌲👑 _${usedPrefix}transferir_
⎪⌲👑 _${usedPrefix}todiamond_
⎪⌲👑 _${usedPrefix}tomoney_
┗━━━ʕ•㉨•ʔ━━━┛`; // 
      break;
      case 'funmenu':
      lkr = `❀° ┄──•••───╮
      𝙁𝙐𝙉 𝙈𝙀𝙉𝙐
╰───•••──┄ °❀     
┏━━━ʕ•㉨•ʔ━━━┓
⎪⌲👑 _${usedPrefix}character_
⎪⌲👑 _${usedPrefix}truth_
⎪⌲👑 _${usedPrefix}dare_
⎪⌲👑 _${usedPrefix}flirt_
⎪⌲👑 _${usedPrefix}gay_
⎪⌲👑 _${usedPrefix}shayeri_
⎪⌲👑 _${usedPrefix}ship_
⎪⌲👑 _${usedPrefix}waste_
⎪⌲👑 _${usedPrefix}simpcard_
⎪⌲👑 _${usedPrefix}hornycard_
⎪⌲👑 _${usedPrefix}ytcomment_
⎪⌲👑 _${usedPrefix}stupid_
⎪⌲👑 _${usedPrefix}lolicon_
┗━━━ʕ•㉨•ʔ━━━┛`; // 
      break;
      case 'animemenu':
      lkr = `❀° ┄──•••───╮
      𝐴𝑁𝐼𝑀𝐸 𝑀𝐸𝑁𝑈
╰───•••──┄ °❀     
┏━━━ʕ•㉨•ʔ━━━┓
⎪⌲👑 _${usedPrefix}waifu_
⎪⌲👑 _${usedPrefix}neko_
⎪⌲👑 _${usedPrefix}loli_
⎪⌲👑 _${usedPrefix}couplepp_
⎪⌲👑 _${usedPrefix}toanime_
⎪⌲👑 _${usedPrefix}naruto_
⎪⌲👑 _${usedPrefix}itachi_
⎪⌲👑 _${usedPrefix}akira_
⎪⌲👑 _${usedPrefix}asuna_
⎪⌲👑 _${usedPrefix}akiyama_
⎪⌲👑 _${usedPrefix}boruto_
⎪⌲👑 _${usedPrefix}hornycard_
⎪⌲👑 _${usedPrefix}ayuzawa_
⎪⌲👑 _${usedPrefix}anna_
⎪⌲👑 _${usedPrefix}chiho_
⎪⌲👑 _${usedPrefix}chitoge_
⎪⌲👑 _${usedPrefix}deidara_
⎪⌲👑 _${usedPrefix}erza_
⎪⌲👑 _${usedPrefix}elaina_
⎪⌲👑 _${usedPrefix}emilia_
⎪⌲👑 _${usedPrefix}hestia_
⎪⌲👑 _${usedPrefix}hinata_
⎪⌲👑 _${usedPrefix}inori_
⎪⌲👑 _${usedPrefix}isuzu_
⎪⌲👑 _${usedPrefix}kagura_
⎪⌲👑 _${usedPrefix}kaori_
⎪⌲👑 _${usedPrefix}keneki_
⎪⌲👑 _${usedPrefix}kurumi_
⎪⌲👑 _${usedPrefix}madara_
⎪⌲👑 _${usedPrefix}mikasa_
⎪⌲👑 _${usedPrefix}miku_
⎪⌲👑 _${usedPrefix}minato_
⎪⌲👑 _${usedPrefix}nezuko_
⎪⌲👑 _${usedPrefix}sagiri_
⎪⌲👑 _${usedPrefix}sasuke_
⎪⌲👑 _${usedPrefix}sakura_
⎪⌲👑 _${usedPrefix}kotori_
┗━━━ʕ•㉨•ʔ━━━┛
`; 
      break;
      case 'gamemenu':
      lkr = `❀° ┄──•••───╮
      𝙅𝙐𝙀𝙂𝙊𝙎 𝙈𝙀𝙉𝙐 
╰───•••──┄ °❀     
┏━━━ʕ•㉨•ʔ━━━┓
⎪⌲👑 _${usedPrefix}tictactoe_
⎪⌲👑 _${usedPrefix}delttt_
⎪⌲👑 _${usedPrefix}math_
⎪⌲👑 _${usedPrefix}math answer_
⎪⌲👑 _${usedPrefix}ppt_
⎪⌲👑 _${usedPrefix}slot_
⎪⌲👑 _${usedPrefix}casino_
⎪⌲👑 _${usedPrefix}yourmom_
⎪⌲👑 _${usedPrefix}teri mummy_
┗━━━ʕ•㉨•ʔ━━━┛`; // 
      break;
      case 'stickermenu':
      lkr = `❀° ┄──•••───╮
      𝙎𝙏𝙄𝘾𝙆𝙀𝙍 𝙈𝙀𝙉𝙐
 ╰───•••──┄ °❀     
 ┏━━━ʕ•㉨•ʔ━━━┓
 ⎪⌲👑 _${usedPrefix}sticker_
 ⎪⌲👑 _${usedPrefix}take_
 ⎪⌲👑 _${usedPrefix}scircle_
 ⎪⌲👑 _${usedPrefix}smaker_
 ⎪⌲👑 _${usedPrefix}sremovebg_
 ⎪⌲👑 _${usedPrefix}getsticker_
 ⎪⌲👑 _${usedPrefix}emojimix_
 ⎪⌲👑 _${usedPrefix}toimg_
 ⎪⌲👑 _${usedPrefix}tovid_
 ⎪⌲👑 _${usedPrefix}ttp_
 ⎪⌲👑 _${usedPrefix}telesticker_
 ⎪⌲👑 _${usedPrefix}attp_
 ⎪⌲👑 _${usedPrefix}attp2_
 ⎪⌲👑 _${usedPrefix}attp3_
 ┗━━━ʕ•㉨•ʔ━━━┛`; 
      break;
      case 'herramientasmenu':
      lkr = `❀° ┄──•••───╮
      𝐇𝐞𝐫𝐫𝐚𝐦𝐢𝐞𝐧𝐭𝐚𝐬
 ╰───•••──┄ °❀     
 ┏━━━ʕ•㉨•ʔ━━━┓
 ⎪⌲👑 _${usedPrefix}autosticker_
 ⎪⌲👑 _${usedPrefix}pdf_
 ⎪⌲👑 _${usedPrefix}whatmusic_
 ⎪⌲👑 _${usedPrefix}calc_
 ⎪⌲👑 _${usedPrefix}google_
 ⎪⌲👑 _${usedPrefix}lyrics_
 ⎪⌲👑 _${usedPrefix}readmore_
 ⎪⌲👑 _${usedPrefix}ssweb_
 ⎪⌲👑 _${usedPrefix}tts_
 ⎪⌲👑 _${usedPrefix}translate_
 ⎪⌲👑 _${usedPrefix}tourl_
 ⎪⌲👑 _${usedPrefix}wikipedia_
 ⎪⌲👑 _${usedPrefix}nowa_
 ⎪⌲👑 _${usedPrefix}qrmaker_
 ⎪⌲👑 _${usedPrefix}readqr_
 ⎪⌲👑 _${usedPrefix}fancy_
 ⎪⌲👑 _${usedPrefix}weather_
 ⎪⌲👑 _${usedPrefix}siri_
 ⎪⌲👑 _${usedPrefix}alexa_
 ⎪⌲👑 _${usedPrefix}dalle_
 ⎪⌲👑 _${usedPrefix}tocartoon_
 ⎪⌲👑 _${usedPrefix}quote_
 ⎪⌲👑 _${usedPrefix}technews_
 ⎪⌲👑 _${usedPrefix}define_
 ⎪⌲👑 _${usedPrefix}pokedex_
 ⎪⌲👑 _${usedPrefix}removebg_
 ⎪⌲👑 _${usedPrefix}apk_
 ⎪⌲👑 _${usedPrefix}tinyurl/shorturl_
 ⎪⌲👑 _${usedPrefix}readvo_
 ⎪⌲👑 _${usedPrefix}true_
 ┗━━━ʕ•㉨•ʔ━━━┛`; // 
      break;
      case 'nsfwmenu':
      lkr = `Use este comando ${usedPrefix}nsfw`; // 
      break;
      case 'logomenu':
      lkr = `Use ${usedPrefix}logo para ver todas las opciones \ngfx cmd hasta 12`; // 
      break;
    default:
      lkr = `Comando inválido. Tipo ${usedPrefix}lista para ver opciones disponibles.`;
  }

  conn.sendFile(m.chat, pp, 'perfil.jpg', lkr, m, false, { mentions: [who] });

  let done = '👍';
  m.react(done);
};

handler.help = ['list', 'botmenu', 'ownermenu', 'groupmenu', 'dlmenu', 'downloadermenu', 'economymenu', 'funmenu', 'gamemenu', 'stickermenu', 'nsfwmenu', 'logomenu', 'toolmenu'];
handler.tags = ['main'];
handler.command = ['list', 'botmenu', 'ownermenu', 'groupmenu', 'dlmenu', 'downloadermenu', 'economiamenu', 'funmenu', 'juegosmenu', 'stickermenu', 'nsfwmenu', 'logomenu', 'toolmenu'];

export default handler

