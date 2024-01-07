const xppercredit = 1
let handler = async (m, { conn, command, args }) => {
    let count = command.replace(/^(wt|withdraw)/i, '')
    count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].bank / xppercredit) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
    count = Math.max(1, count)
    if (global.db.data.users[m.sender].bank >= xppercredit * count) {
      global.db.data.users[m.sender].bank -= xppercredit * count
      global.db.data.users[m.sender].credit += count
      conn.reply(m.chat, `Transferido 🪙 ${count} gold a tu billetera`, m)
    } else conn.reply(m.chat, `🟥 *No tienes suficiente cantidad de oro en tu banco para realizar esta transacción*`, m)
  }
  handler.help = ['withdraw']
  handler.tags = ['economy']
  handler.command = ['withdraw', 'with', 'withdrawall', 'withall', 'wt' , 'wtall','retirar'] 
  
  handler.disabled = false
  
  export default handler