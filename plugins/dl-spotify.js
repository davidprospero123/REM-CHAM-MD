import pkg from 'sanzy-spotifydl'
let { downloadTrack, downloadAlbum, search } = pkg
import fetch from 'node-fetch'
import pkg2 from 'fluid-spotify.js'
let { Spotify } = pkg2

let handler = async (m, { conn, text }) => {
 if (!text) throw ` Ingresa el enlace de algún Track, PlayList o Álbum de Spotify.`; 
 let isSpotifyUrl = text.match(/^(https:\/\/open\.spotify\.com\/(album|track|playlist)\/[a-zA-Z0-9]+)/i);
 if (!isSpotifyUrl && !text) throw ` Ingresa el enlace de algún Track, Playlist o Álbum de Spotify.`
let user = global.db.data.users[m.sender]
await m.react('🕓')
try {
if (isSpotifyUrl) {
if (isSpotifyUrl[2] === 'album') {
let album = await downloadAlbum(isSpotifyUrl[0])
let img = await (await fetch(`${album.metadata.cover}`)).buffer()
let txt = `*°ᡣ𐭩 . ° 𝚂𝙿𝙾𝚃𝙸𝙵𝚈 𝙳𝙴𝚂𝙲𝙰𝚁𝙶𝙰𝚂*\n\n`
    txt += `	‹𝟹  *Album* : ${album.metadata.title}\n`
    txt += `	‹𝟹   *Artista* :${album.metadata.artists}\n`
    txt += `	‹𝟹   *Publicado* : ${album.metadata.releaseDate}\n`   
    txt += `	‹𝟹   *Tracks totales* : ${album.trackList.length}\n\n`   
await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m)
for (let i = 0; i < album.trackList.length; i++) {
await conn.sendFile(m.chat, album.trackList[i].audioBuffer, album.trackList[i].metadata.name + '.mp3', null, m, false, { mimetype: 'audio/mpeg', asDocument: user.useDocument })
await m.react('✅')
}
} else if (isSpotifyUrl[2] === 'track') {
let track = await downloadTrack(isSpotifyUrl[0])
let dlspoty = track.audioBuffer
let img = await (await fetch(`${track.imageUrl}`)).buffer()
let txt = `*°ᡣ𐭩 . ° 𝚂𝙿𝙾𝚃𝙸𝙵𝚈 𝙳𝙴𝚂𝙲𝙰𝚁𝙶𝙰𝚂*\n\n`
    txt += `	‹𝟹   *Título* : ${track.title}\n`
    txt += `	‹𝟹  *Artista* : ${track.artists}\n`
    txt += `	‹𝟹   *Duración* : ${track.duration}\n`
    txt += `	‹𝟹   *Album* : ${track.album.name}\n`                 
    txt += `	‹𝟹  *Publicado* : ${track.album.releasedDate}\n\n`   
await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m)
await conn.sendFile(m.chat, dlspoty, track.title + '.mp3', null, m, false, { mimetype: 'audio/mpeg', asDocument: user.useDocument })
await m.react('✅')
} else if (isSpotifyUrl[2] === 'playlist') {
let infos = new Spotify({
clientID: "7fb26a02133d463da465671222b9f19b",
clientSecret: "d4e6f8668f414bb6a668cc5c94079ca1",
})
let playlistId = isSpotifyUrl[0].split('/').pop()
let playlistInfoByID = await infos.getPlaylist(playlistId)
let tracks = playlistInfoByID.tracks.items
let img = await (await fetch(`${playlistInfoByID.images[0].url}`)).buffer()
let txt = `*°ᡣ𐭩 . ° 𝚂𝙿𝙾𝚃𝙸𝙵𝚈 𝙳𝙴𝚂𝙲𝙰𝚁𝙶𝙰𝚂*\n\n`
    txt += `	‹𝟹   *Playlist* : ${playlistInfoByID.name}\n`
    txt += `	‹𝟹   *Tracks totales* : ${tracks.length}\n\n`
await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m)
let target = m.chat
if (m.isGroup && tracks.length > 20) {
target = m.sender;
}
for (let i = 0; i < tracks.length; i++) {
let track = await downloadTrack(tracks[i].track.external_urls.spotify)
await conn.sendFile(m.chat, track.audioBuffer, tracks[i].track.name + '.mp3', null, m, false, { mimetype: 'audio/mpeg', asDocument: user.useDocument })
await m.react('✅')
}}
} else {
let searchTrack = await downloadTrack(text)
let dlspoty = searchTrack.audioBuffer
let img = await (await fetch(`${searchTrack.imageUrl}`)).buffer()
let txt = `*°ᡣ𐭩 . ° S P O T I F Y  -  D O W N L O A D*\n\n`
    txt += `	‹𝟹   *Título* : ${searchTrack.title}\n`
    txt += `	‹𝟹   *Artista* : ${searchTrack.artists}\n`
    txt += `	‹𝟹   *Duración* : ${searchTrack.duration}\n`
    txt += `	‹𝟹   *Album* : ${searchTrack.album.name}\n`                 
    txt += `	‹𝟹   *Publicado* : ${searchTrack.album.releasedDate}\n\n`   
await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m)
await conn.sendFile(m.chat, dlspoty, searchTrack.title + '.mp3', null, m, false, { mimetype: 'audio/mpeg', asDocument: user.useDocument })
await m.react('✅')
}  
} catch {
await m.react('✖️')
}}
handler.tags = ['downloader']
handler.help = ['spotify']
handler.command = ['spotify']
handler.register = true
export default handler
