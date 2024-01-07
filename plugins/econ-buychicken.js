let handler = async (m, { conn, command, args, usedPrefix }) => {
    let user = global.db.data.users[m.sender]


   
    
    if (user.chicken > 0) return m.reply('Ya tienes esto')
    if (user.credit < 500) return m.reply(`🟥 *No tienes suficiente cantidad de oro en tu billetera para comprar un pollo*`)

    user.credit -= 1000
    user.chicken += 1
    m.reply(`🎉 ¡Has comprado con éxito un pollo para pelear! usa el comando ${usedPrefix}peleadepollo <cantidad>`)
}

handler.help = ['buych']
handler.tags = ['economy']
handler.command = ['buy-chicken', 'buych','comprarpollo','comprarchicken'] 

handler.group = true

export default handler