import axios from 'axios';

let handler = async (m, { conn, text }) => {
  if (!text) throw '✳️ ¿Qué quieres que busque en YouTube?';

  try {
    const query = encodeURIComponent(text);
    const response = await axios.get(`https://weeb-api.vercel.app/ytsearch?query=${query}`);
    const results = response.data;

    if (results.length === 0) {
      throw 'No hay ningun Resultado :c.';
    }

    const firstResult = results[0];

    const message = `
乂 ${firstResult.title}
乂 *Link* : ${firstResult.url}
乂 *Duracion* : ${firstResult.timestamp}
乂 *Publicado :* ${firstResult.ago}
乂 *Visitas:* ${firstResult.views}

    `;

    conn.sendFile(m.chat, firstResult.thumbnail, 'yts.jpeg', message, m);
  } catch (error) {
    console.error(error);
    throw 'Hay un error con el buscador de videos de YouTube.';
  }
};

handler.help = ['ytsearch'];
handler.tags = ['downloader'];
handler.command = ['ytsearch', 'yts'];

export default handler;
