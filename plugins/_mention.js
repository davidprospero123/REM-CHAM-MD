
let handler = m => m
handler.all = async function (m, conn) {
    var vn = "https://raw.githubusercontent.com/davidprospero123/Musica/main/Re_Zero%20Rem%20AMV%20Edit%20_%20After%20Effects%20Edit.mp3"
    let url = "https://github.com/davidprospero123"
    let murl = "https://www.instagram.com/Josecurisoto"
    let hash = global.botname
    let img = "https://i.pinimg.com/564x/1b/d2/10/1bd2103a57609748edb8e84ee671edfa.jpg"
    let num = "51913091648"

    let doc = {
        audio: {
          url: vn
        },
        mimetype: 'audio/mpeg',
        ptt: true,
        waveform: [0,99,0,99,0,99,0],
        fileName: "Rem4",

        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
          title: "˚₊· ͟͟͞͞➳❥ 𝙈𝙄 𝘾𝙍𝙀𝘼𝘿𝙊𝙍 𝙀𝙎 𝘾𝙐𝙍𝙄 :3",
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
