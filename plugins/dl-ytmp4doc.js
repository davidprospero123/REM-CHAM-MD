import fg from 'api-dylux';

let limit = 320;
let rwait = '💙'; 
let done = '✅'; 

let mssg = {
    example: 'Ejemplo',
    noLink: (platform) => `Enlace no válido. Proporciona un enlace de ${platform}.`,
    size: 'Tamaño',
    quality: 'Calidad',
    limitdl: 'Límite de descarga excedido',
    title: 'Título',
    error: 'Error en la descarga, por favor intenta de nuevo.',
};

let handler = async (m, { conn, args, isPrems, isOwner, usedPrefix, command }) => {
    if (!args || !args[0]) throw `✳️ ${mssg.example} :\n${usedPrefix + command} https://www.youtube.com/EJ9Ohx3z2sw`;
    if (!args[0].match(/youtu/gi)) throw `❎ ${mssg.noLink('YouTube')}`;

    let chat = global.db.data.chats[m.chat];
    m.reply(`${rwait} _𝘾𝙖𝙧𝙜𝙖𝙣𝙙𝙤..._`);

    let q = '360'; 

    try {
        const yt = await fg.ytv(args[0], q);
        let { title, dl_url, quality, size, sizeB } = yt;
        let isLimit = limit * 1024 < sizeB;

        if (!isLimit) {
            conn.sendFile(m.chat, dl_url, title + '.mp4', `
                *ʀᴇᴍ-ᴄʜᴀᴍ-ʙᴏᴛ*

*📌𝘛𝘐𝘛𝘜𝘓𝘖:* ${title}
*🎞️𝘊𝘈𝘓𝘐𝘋𝘈𝘋:* ${quality}
*⚖️𝘛𝘈𝘔𝘈Ñ𝘖:* ${size}
            `.trim(), m, false, { asDocument: true }); 
        } else {
            m.reply(`${mssg.limitdl} +${limit} MB`);
        }

        m.react(done);
    } catch {
        try {
            let yt = await fg.ytmp4(args[0], q);
            let { title, size, sizeB, dl_url, quality } = yt;
            let isLimit = limit * 1024 < sizeB;

            if (!isLimit) {
                conn.sendFile(m.chat, dl_url, title + '.mp4', `
                    *ʀᴇᴍ-ᴄʜᴀᴍ-ʙᴏᴛ*

▢ *📌${mssg.title}* : ${title}
  *🎞️${mssg.quality}:* ${quality}
▢ *⚖️${mssg.size}* : ${size}
                `.trim(), m, false, { asDocument: true }); 
            } else {
                m.reply(`${mssg.limitdl} +${limit} MB`);
            }

            m.react(done);
        } catch {
            m.reply(`❎ ${mssg.error}`);
        }
    }
};

handler.help = ['ytmp4 <link yt>'];
handler.tags = ['dl'];
handler.command = ['ytmp4doc', 'ytdoc'];

export default handler;
