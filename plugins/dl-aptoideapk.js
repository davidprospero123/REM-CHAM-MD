import { search, download } from 'aptoide-scraper';
import ufs from 'url-file-size';
import { sizeFormatter } from 'human-readable';

const formatSize = async (size) => {
    const format = sizeFormatter({
        std: 'JEDEC',
        decimalPlaces: 2,
        keepTrailingZeroes: false,
        render: (literal, symbol) => `${literal} ${symbol}B`,
    });
    return format(size);
};

const handler = async (m, { conn, usedPrefix, text, command }) => {
    const lister = ['search', 'dl'];
    const [feature, ...inputs] = text.trim().split(' ');
    if (!lister.includes(feature)) return m.reply(`𝙻𝚘 𝚊𝚗𝚍𝚊𝚜 𝚞𝚜𝚊𝚗𝚍𝚘 𝚖𝚊𝚕 𝚝𝚎 𝚐𝚞𝚒𝚊𝚛𝚎 𝚌𝚘𝚖𝚘 𝚑𝚊𝚌𝚎𝚛𝚕𝚘: 𝙿𝚊𝚛𝚊 𝚚𝚞𝚎 𝚋𝚞𝚜𝚚𝚞𝚎𝚜 𝚎𝚕 𝚒𝚍 𝚍𝚎 𝚍𝚒𝚌𝚑𝚊 𝚊𝚙𝚕𝚒𝚌𝚊𝚌𝚒𝚘𝚗: *${usedPrefix + command} 𝚂𝚎𝚊𝚛𝚌𝚑 WhatsApp*. 𝚈 𝚙𝚊𝚛𝚊 𝚚𝚞𝚎 𝚜𝚘𝚕𝚒𝚌𝚒𝚝𝚎𝚜 𝚞𝚗𝚊 𝚍𝚎𝚜𝚌𝚊𝚛𝚐𝚊: *${usedPrefix + command} 𝚍𝚕 𝚆𝚑𝚊𝚝𝚜𝙰𝚙𝚙*`);

    const border = '╔═══════════════════════════╗\n';
    const divider = '╟───────────────────────────╢\n';
    const footer = '╚═══════════════════════════╝';
    const logo = '╠─⊱ ';
    const endLogo = ' ₍ᐢ⸝⸝› ̫ ‹⸝⸝ᐢ₎┤\n';

    const handleSearchCommand = async () => {
        const input = inputs.join(' ');
        if (!input) return m.reply(`𝙻𝚘 𝚊𝚗𝚍𝚊𝚜 𝚞𝚜𝚊𝚗𝚍𝚘 𝚖𝚊𝚕. 𝙴𝚓𝚎𝚖𝚙𝚕𝚘: *${usedPrefix + command} 𝚂𝚎𝚊𝚛𝚌𝚑 𝚃𝚒𝚔𝚃𝚘𝚔*`);
        try {
            const results = await search(input);
            if (!results || !results.length) return m.reply('𝙽𝚘 𝚜𝚎 𝚎𝚗𝚌𝚘𝚗𝚝𝚛𝚊𝚛𝚘𝚗 𝚛𝚎𝚜𝚞𝚕𝚝𝚊𝚍𝚘𝚜.');
            let txt = border;
            for (let i = 0; i < Math.min(15, results.length); i++) {
                txt += `${logo}*𝚁𝚎𝚜𝚞𝚕𝚝𝚊𝚍𝚘*: ${i + 1}${endLogo}`;
                txt += `${logo}*𝙽𝚘𝚖𝚋𝚛𝚎*: ${results[i].name}${endLogo}`;
                txt += `${logo}*𝙿𝚊𝚌𝚔𝚊𝚐𝚎*: ${results[i].package}${endLogo}`;
                txt += `${logo}*𝚃𝚊𝚖𝚊ñ𝚘*: ${results[i].size}${endLogo}`;
                txt += `${logo}*𝚂𝚞𝚋𝚒𝚍𝚘*: ${results[i].lastup}${endLogo}`;
                txt += '║ `𝚁𝙴𝙼-𝙱𝙾𝚃 𝙱𝚢 𝙶𝚊𝚋𝚛𝚒𝚎𝚕 𝙲𝚞𝚛𝚒` ║\n';
                if (i !== Math.min(15, results.length) - 1) txt += divider;
            }
            txt += footer;
            let img = 'https://tinyurl.com/yo6t7fe2';
            await conn.sendFile(m.chat, img, 'ai.jpg', txt, m);
            await m.react('✅');
        } catch (error) {
            console.error('𝙴𝚛𝚛𝚘𝚛 𝚊𝚕 𝚛𝚎𝚊𝚕𝚒𝚣𝚊𝚛 𝚕𝚊 𝚋ú𝚜𝚚𝚞𝚎𝚍𝚊:', error);
            await conn.reply(m.chat, '*𝙱𝚞𝚜𝚚𝚞𝚎𝚍𝚊 𝚗𝚘 𝚛𝚎𝚊𝚕𝚒𝚣𝚊𝚍𝚊.*', m);
            await m.react('❌');
        }
    };

    const handleDownloadCommand = async () => {
        const input = inputs.join(' ');
        if (!input) return m.reply(`𝙻𝚘 𝚊𝚗𝚍𝚊𝚜 𝚞𝚜𝚊𝚗𝚍𝚘 𝚖𝚊𝚕. 𝙴𝚓𝚎𝚖𝚙𝚕𝚘: *${usedPrefix + command} 𝚍𝚕 𝚠𝚑𝚊𝚝𝚜𝚊𝚙𝚙*`);
        try {
            const res = await download(input);
            const size = await formatSize(await ufs(res.dllink));
            const limit = 400;
            let txt = border;
            txt += `${logo}*𝙽𝚘𝚖𝚋𝚛𝚎*: ${res.name}${endLogo}`;
            txt += `${logo}*𝙿𝚊𝚌𝚔𝚊𝚐𝚎*: ${res.package}${endLogo}`;
            txt += `${logo}*𝚃𝚊𝚖𝚊ñ𝚘*: ${size}${endLogo}`;
            txt += `${logo}*𝚂𝚞𝚋𝚒𝚍𝚘*: ${res.lastup}${endLogo}`;
            txt += '║ `𝚁𝙴𝙼-𝙱𝙾𝚃 𝙱𝚢 𝙶𝚊𝚋𝚛𝚒𝚎𝚕 𝙲𝚞𝚛𝚒` ║\n';
            txt += footer;
            if (parseFloat(size.split(' ')[0]) >= limit) {
                await conn.reply(m.chat, `𝙴𝚕 𝚊𝚛𝚌𝚑𝚒𝚟𝚘 𝚙𝚎𝚜𝚊 𝚖𝚊𝚜 𝚍𝚎 ${limit} MB, 𝙿𝚊𝚛𝚊 𝚌𝚞𝚒𝚍𝚊𝚛 𝚕𝚊 𝚒𝚗𝚝𝚎𝚐𝚛𝚒𝚍𝚊𝚍 𝚍𝚎𝚕 𝚜𝚎𝚛𝚟𝚒𝚍𝚘𝚛 𝚜𝚎 𝚘𝚖𝚒𝚝𝚎 𝚕𝚊 𝚍𝚎𝚜𝚌𝚊𝚛𝚐𝚊.`, m);
                return m.react('❌');
            }
            await conn.sendFile(m.chat, res.icon, 'ai.jpg', txt, m);
            await conn.sendMessage(m.chat, { document: { url: res.dllink }, mimetype: 'application/videos.android.package-archive', fileName: `${res.name}.apk` }, { quoted: m });
            await m.react('✅');
        } catch (error) {
            console.error('Error al descargar la aplicación:', error);
            await conn.reply(m.chat, '*𝙻𝚊 𝚊𝚙𝚕𝚒𝚌𝚊𝚌𝚒𝚘𝚗 𝚗𝚘 𝚏𝚞𝚎 𝚍𝚎𝚜𝚌𝚊𝚛𝚐𝚊𝚍𝚊 𝚙𝚘𝚛 𝚞𝚗 𝚎𝚛𝚛𝚘𝚛.*', m);
            await m.react('❌');
        }
    };

    if (feature === 'search') await handleSearchCommand();
    else if (feature === 'dl') await handleDownloadCommand();
};

handler.command = ['apk', 'adpk2', 'dlapk', 'apkdl', 'modapk', 'aptoide'];
handler.tags = ['downloader'];
handler.help = ['aptoide search <nombre>', 'aptoide dl <ID>'];
handler.register = true;

export default handler;
