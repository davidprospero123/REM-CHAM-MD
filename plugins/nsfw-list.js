let handler = async (m, { conn, usedPrefix }) => {
    if (!global.db.data.chats[m.chat].nsfw) throw `🚫 el grupo no soporta nsfw \n\n habilitarlo con \n*${usedPrefix}enable* nsfw`
    let user = global.db.data.users[m.sender].age
    if (user < 17) throw m.reply(`❎ Minimo debes tener 18 años`) 
   
m.react(rwait)
    let nsfwCommands = ['xnxx', 'xvid',  'genshin', 'swimsuit', 'schoolswimsuit', 'white', 'barefoot', 'touhou', 'gamecg', 'hololive', 'uncensored', 'sunglasses', 'glasses', 'weapon', 'shirtlift', 'chain', 'fingering', 'flatchest', 'torncloth', 'bondage', 'demon', 'wet', 'pantypull', 'headdress', 'headphone', 'tie', 'anusview', 'shorts', 'stockings', 'topless', 'beach', 'bunnygirl', 'bunnyear', 'idol', 'vampire', 'gun', 'maid', 'bra', 'nobra', 'bikini', 'whitehair', 'blonde', 'pinkhair', 'bed', 'ponytail', 'nude', 'dress', 'underwear', 'foxgirl', 'uniform', 'skirt', 'sex', 'sex2', 'sex3', 'breast', 'twintail', 'spreadpussy', 'tears', 'seethrough', 'breasthold', 'drunk', 'fateseries', 'spreadlegs', 'openshirt', 'headband', 'food', 'close', 'tree', 'nipples', 'erectnipples', 'horns', 'greenhair', 'wolfgirl', 'catgirl'];
  
    let message = `
  *NSFW Commands Menu* 
  
  Here is the list of available commands for NSFW content. Use the prefix "${usedPrefix}" followed by the command name:
  
  ${nsfwCommands.map(command => `${usedPrefix}${command}`).join('\n')}
  
  Nota: Estos comandos son solo para mayores de 18 años..
  `;
  
    console.log("Enviando mensaje...");
    await conn.reply(m.chat, message, m);
    console.log("Mensaje enviado.");
  };
  
  handler.help = ['nsfw'];
  handler.tags = ['nsfw'];
  handler.command = ['nsfw'];
  handler.group = true
  handler.register = true;

  export default handler;
  
