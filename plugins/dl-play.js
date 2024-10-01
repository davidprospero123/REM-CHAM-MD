import yts from 'yt-search';

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
    if (!text) {
        return conn.reply(m.chat, '*𝙸𝚗𝚐𝚛𝚎𝚜𝚊 𝚎𝚕 𝚗𝚘𝚖𝚋𝚛𝚎 𝚍𝚎 𝚕𝚘 𝚚𝚞𝚎 𝚚𝚞𝚒𝚎𝚛𝚎𝚜 𝚋𝚞𝚜𝚌𝚊𝚛*', m);
    }

    await m.react('🕓');
    let res = await yts(text);
    let play = res.videos[0];

    if (!play) {
        throw `Error: Vídeo no encontrado`;
    }

    let { title, thumbnail, ago, timestamp, views, videoId, url } = play;

    let txt = '```𝚈𝚘𝚞𝚃𝚞𝚋𝚎 𝙳𝚎𝚜𝚌𝚊𝚛𝚐𝚊𝚜```\n';
    txt += '===========================\n';
    txt += `> *𝚃𝚒𝚝𝚞𝚕𝚘* : _${title}_\n`;
    txt += `> *𝙲𝚛𝚎𝚊𝚍𝚘* : _${ago}_\n`;
    txt += `> *𝙳𝚞𝚛𝚊𝚌𝚒𝚘𝚗* : _${timestamp}_\n`;
    txt += `> *𝚅𝚒𝚜𝚒𝚝𝚊𝚜* : _${views.toLocaleString()}_\n`;
    txt += `> *𝙻𝚒𝚗𝚔* : _https://www.youtube.com/watch?v=${videoId}_\n`;
    txt += '===========================\n';
    txt += '*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝙶𝚊𝚋𝚛𝚒𝚎𝚕 𝙲𝚞𝚛𝚒*';

    await conn.sendButton2(m.chat, txt, '𝙍𝙀𝙈-𝘾𝙃𝘼𝙈 𝘽𝙊𝙏', thumbnail, [
        ['ʏᴛᴍᴘ3', `${usedPrefix}ytmp3 ${url}`],
        ['ʏᴛᴍᴘ4', `${usedPrefix}ytmp4 ${url}`],
        ['ʏᴛᴍᴘ4ᴅᴏᴄ', `${usedPrefix}ytmp4doc ${url}`],
        ['ʏᴛᴍᴘ3ᴅᴏᴄ', `${usedPrefix}ytmp3doc ${url}`]
    ], null, [['ᴄᴀɴᴀʟ', 'https://whatsapp.com/channel/0029VaqEpTQBPzjbuTwGDN1U']], m);

    await m.react('✅');
};

handler.help = ['play', 'play2', ];
handler.tags = ['dl'];
handler.command = ['play',];

export default handler;
