import { download } from 'aptoide-scraper';

let handler = async (m, { conn, usedPrefix: prefix, command, text }) => {
  try {
    if (command === 'modapk') {
      if (!text) throw `*[❗] Dame el nombre del apk :3.*`;

      await conn.reply(m.chat, global.wait, m);
      let data = await download(text);

      if (data.size.replace(' MB', '') > 200) {
        return await conn.sendMessage(m.chat, { text: '*[⛔] ESTA DEMASIADO GRANDE.*' }, { quoted: m });
      }

      if (data.size.includes('GB')) {
        return await conn.sendMessage(m.chat, { text: '*[⛔] No  me explotes.*' }, { quoted: m });
      }

      await conn.sendMessage(
        m.chat,
        { document: { url: data.dllink }, mimetype: 'application/vnd.android.package-archive', fileName: data.name + '.apk', caption: null },
        { quoted: m }
      )
    }
  } catch {
    throw `*[❗] Este link esta caido.*`;
  }
};

handler.help = ['modapk']
handler.tags = ['downloader']
handler.command = /^modapk$/i;
export default handler;