

let handler = async(m, { conn, text, usedPrefix, command }) => {

    // Sound
    let name = m.pushName || conn.getName(m.sender)
    var vn = "https://raw.githubusercontent.com/davidprospero123/Musica/main/Re_Zero%20Rem%20AMV%20Edit%20_%20After%20Effects%20Edit.mp3"
    let url = "https://github.com/davidprospero123/REM-CHAM"
    let murl = "https://www.youtube.com/watch?v=QIr_XOKyah0"
    let img = "https://i.imgur.com/APg4Nl7.jpg"
    let con = { key: { fromMe: false, participant: `${m.sender.split`@`[0]}@s.whatsapp.net`, ...(m.chat ? { remoteJid: '16504228206@s.whatsapp.net' } : {}) }, message: { contactMessage: { displayName: `${name}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
    let doc = {
        audio: {
          url: vn
        },
        mimetype: 'audio/mp4',
        ptt: true,
        waveform:  [100, 0, 100, 0, 100, 0, 100],
        fileName: "Curi",

        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
          title: "𝙴𝚂𝚃𝙾𝚈 𝚅𝙸𝚅𝙰 𝚈 𝙲𝙾𝙻𝙴𝙰𝙽𝙳𝙾 :𝟹",
          body: "ʀᴇᴍ-ᴄʜᴀᴍ",
          thumbnailUrl: img,
          sourceUrl: 'https://chat.whatsapp.com/BXf0v0ReIUUHpxVZAK7Xa5',
          mediaType: 1,
          renderLargerThumbnail: true
          }}
      };

      await conn.sendMessage(m.chat, doc, { quoted: con });

    }

    handler.help = ['Vives']
    handler.tags = ['main']
    handler.command = /^(vives)$/i 

    export default handler;
