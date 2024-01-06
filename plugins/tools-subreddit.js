import fetch from 'node-fetch';

let subredditHandler = async (m, { conn, text }) => {
  if (!text) throw 'Por favor proporcione un nombre de subreddit';

  try {
    let res = await fetch(`https://api.popcat.xyz/subreddit/${encodeURIComponent(text)}`);

    if (!res.ok) {
      throw new Error(`La solicitud de API falló con el estado ${res.status}`);
    }

    let json = await res.json();

    console.log('JSON response:', json);

    let subredditInfo = 
    `*Subreddit Information:*\n
     • *Nombre:* ${json.name}\n
     • *Titulo:* ${json.title}\n
     • *Usuarios Activos:* ${json.active_users}\n
     • *Mienbros:* ${json.members}\n
     • *Descripcion:* ${json.description}\n
     • *Videos:* ${json.allow_videos ? 'Yes' : 'No'}\n
     • * Images:* ${json.allow_images ? 'Yes' : 'No'}\n
     • *Over 18:* ${json.over_18 ? 'Yes' : 'No'}\n
     • *URL:* ${json.url}`;

    // if icon is not null or undefined, send it along with the subreddit information as caption
    // otherwise, only send the subreddit information
    if (json.icon) {
      await conn.sendFile(m.chat, json.icon, 'icon.jpg', subredditInfo, m);
    } else {
      m.reply(subredditInfo);
    }

  } catch (error) {
    console.error(error);
    // Handle the error appropriately
  }
};

subredditHandler.help = ['subreddit'];
subredditHandler.tags = ['tools'];
subredditHandler.command = /^(subreddit|reddit)$/i;

export default subredditHandler;
