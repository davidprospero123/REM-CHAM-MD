//Guru ka Maal Hai 
//Made For Guru Bot
//created on Diwali(12th Nov)
//copy with credits
//lodusheks stay away



let handler = m => m
handler.all = async function (m, conn) {
    var vn = "https://raw.githubusercontent.com/davidprospero123/Re-cha-guru/main/Guru1.mp3"
    let url = "https://github.com/davidprospero123"
    let murl = "https://www.instagram.com/Josecurisoto"
    let hash = global.botname
    let img = "https://telegra.ph/file/338aeac0a302502463562.jpg"
    let num = "51913091648"

    let doc = {
        audio: {
          url: vn
        },
        mimetype: 'audio/mpeg',
        ptt: true,
        waveform: [0,99,0,99,0,99,0],
        fileName: "Guru1",

        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
          title: "¿ꜱᴀʙɪᴀꜱ Qᴜᴇ ᴇʟ ᴀɴɪᴍᴇ ꜰᴀᴠᴏʀɪᴛᴏ ᴅᴇ ᴍɪ ᴄʀᴇᴀᴅᴏʀ ᴇꜱ ʙᴏʀᴜᴛᴏ?",
          body: hash,
          thumbnailUrl: img,
          sourceUrl: url,
          mediaType: 2,
          mediaUrl: murl,
         // renderLargerThumbnail: true,
          showAdAttribution: true
          }}
      };

    let phoneNumber = '';
    if (m.mentionedJid && m.mentionedJid[0]) {
        phoneNumber = m.mentionedJid[0].replace(/[^0-9]/g, '');
        if (phoneNumber === num) {
          return this.sendMessage(m.chat, doc, { quoted: m });
        }
      } else {
        return
      }
}
export default handler