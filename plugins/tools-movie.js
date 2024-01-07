import fetch from 'node-fetch';

let imdbHandler = async (m, { conn, text }) => {
  if (!text) throw 'Por favor proporcione el título de la película.';

  try {
    let res = await fetch(`https://api.popcat.xyz/imdb?q=${encodeURIComponent(text)}`);

    if (!res.ok) {
      throw new Error(`La solicitud de API falló con el estado ${res.status}`);
    }

    let json = await res.json();

    console.log('JSON response:', json);

    let ratings = json.ratings.map(rating => `• *${rating.source}:* ${rating.value}`).join('\n');

    let movieInfo = 
    `*Movie Information:*\n
     • *Titulo:* ${json.title}\n
     • *Año:* ${json.year}\n
     • *Temporadas:* ${json.totalseasons}\n
     • *Rated:* ${json.rated}\n
     • *Released:* ${json.released}\n
     • *Runtime:* ${json.runtime}\n
     • *Generos:* ${json.genres}\n
     • *Director:* ${json.director}\n
     • *Writer:* ${json.writer}\n
     • *Actores:* ${json.actors}\n
     • *Plot:* ${json.plot}\n
     • *Lenguajes:* ${json.languages}\n
     • *Country:* ${json.country}\n
     • *Awards:* ${json.awards}\n
     • *Metascore:* ${json.metascore}\n
     • *Rating:* ${json.rating}\n
     • *Votos:* ${json.votes}\n
     • *IMDB ID:* ${json.imdbid}\n
     • *Tipo:* ${json.type}\n
     • *DVD:* ${json.dvd}\n
     • *Box Office:* ${json.boxoffice}\n
     • *Produccion:* ${json.production}\n
     • *Website:* ${json.website}\n\n
     *Ratings:*\n${ratings}`;

    // send the movie poster along with the movie information as caption
    await conn.sendFile(m.chat, json.poster, 'poster.jpg', movieInfo, m);
  } catch (error) {
    console.error(error);
    // Handle the error appropriately
  }
};

imdbHandler.help = ['imdb'];
imdbHandler.tags = ['tools'];
imdbHandler.command = /^(imdb|movie)$/i;

export default imdbHandler;
