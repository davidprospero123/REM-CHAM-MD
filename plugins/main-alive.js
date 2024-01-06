

let handler = async(m, { conn, text, usedPrefix, command }) => {

    // Sound
    let name = m.pushName || conn.getName(m.sender)
    var vn = "https://raw.githubusercontent.com/Kai0071/A17/master/Assets/audio/🔥.mp3"
    let url = "https://github.com/davidprospero123/REM-CHAM"
    let murl = "https://youtu.be/DibiLc17dh0?si=xp9bQ-_frEyDB1-i"
    let img = "https://telegra.ph/file/068ad375f7c4b256bd786.jpg"
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
          title: "Estoy vivo",
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
    handler.command = /^(alive)$/i 

    export default handler;