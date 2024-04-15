const xpPerCredit = 100; 
const goldPerXP = 100 / xpPerCredit; 

let handler = async (m, { conn, command, args }) => {
    let user = global.db.data.users[m.sender];
    let count = command.replace(/^buyxp/i, ''); 
    count = count ? /all/i.test(count) ? Math.floor(user.credit / goldPerXP) : parseInt(count) : args[0] ? parseInt(args[0]) : 1;
    count = Math.max(1, count);

    
    if (user.credit >= goldPerXP * count) {
        user.credit -= goldPerXP * count; 
        user.exp += count; 
        conn.reply(m.chat, `
┌─「 *COMPRA DE XP* 」
‣ *XP adquirida*: +${count}
‣ *Oro gastado*: -${goldPerXP * count} 💰
└──────────────`, m);
    } else {
        conn.reply(m.chat, `❎ Lo siento, no tienes suficiente *oro* para comprar *${count}* XP\n\nPuedes obtener más *oro* participando en juegos y actividades del menú`, m);
    }
}

handler.help = ['buyxp', 'buyxpa'];
handler.tags = ['rpg', 'economy'];
handler.command = ['buyxp', 'buyxpa']; 

handler.disabled = false;

export default handler;
