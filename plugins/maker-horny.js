let handler = async (m, { conn }) => {
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    conn.sendFile(m.chat, global.API('https://some-random-api.com', '/canvas/misc/horny', {
    avatar: await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/08f43c70269b38fd8ac12.jpg'),
    }), 'hornycard.png', '*tan cachonda 🥵🔥*', m)
    }
    handler.help = ['hornycard', 'hornylicense']
    handler.tags = ['maker'] 
    handler.command = /^(hornycard|license)$/i 
    export default handler
