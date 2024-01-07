let handler = async (m, { conn, isROwner, text }) => {
    const delay = time => new Promise(res => setTimeout(res, time))
    let getGroups = await conn.groupFetchAllParticipating()
    let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
    let anu = groups.map(v => v.id)
    var pesan = m.quoted && m.quoted.text ? m.quoted.text : text
    if(!pesan) throw '*INGRESE EL MENSAJE QUE DESEA TRANSMITIR*'
    for (let i of anu) {
    await delay(500)
    conn.relayMessage(i, 
{ liveLocationMessage: {
  degreesLatitude: 35.685506276233525,
  degreesLongitude: 139.75270667105852,
  accuracyInMeters: 0,
degreesClockwiseFromMagneticNorth: 2,
caption: '[ATENCION]\n\n' + pesan + '\n\nESTA ES UNA DECLARACIÓN OFICIAL',
sequenceNumber: 2,
timeOffset: 3,
contextInfo: m,
}}, {}).catch(_ => _)
    }
  m.reply(`*MENSAJE ENVIADO A ${anu.length} GRUPOS*\n\n*NOTA: ESTE COMANDO PUEDE FALLAR Y NO ENVIARSE A TODOS LOS CHATS, LO SIENTO POR EL MOMENTO*`)
}
handler.help = ['broadcastgroup', 'bcgc'].map(v => v + ' <text>')
handler.tags = ['owner']
handler.command = ['avisar', 'broadcastgroup', 'bcgc']
handler.owner = true

export default handler
