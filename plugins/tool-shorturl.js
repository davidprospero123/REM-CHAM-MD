import fetch from 'node-fetch';

let handler = async (m, { conn, args, text }) => {
  if (!text) throw '*Proporcione una URL o un enlace para acortar.*';

  let shortUrl1 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
  
  if (!shortUrl1) throw `*Error: no se pudo generar una URL corta.*`;

  let done = `*URL CORTA CREADA!!*\n\n*Original Link:*\n${text}\n*Shortened URL:*\n${shortUrl1}`.trim();
  
  m.reply(done);
};

handler.help = ['tinyurl', 'shorten'].map(v => v + ' <link>');
handler.tags = ['tools'];
handler.command = /^(tinyurl|short|acortar|corto)$/i;
handler.fail = null;

export default handler;
