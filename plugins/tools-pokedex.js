import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) throw 'Proporcione un nombre de Pokémon para buscar.';

  const url = `https://some-random-api.com/pokemon/pokedex?pokemon=${encodeURIComponent(text)}`;

  const response = await fetch(url);
  const json = await response.json();

  if (!response.ok) {
    throw `Ocurrió un error: ${json.error}`;
  }

  const message = `
*Nombre:* ${json.name}
*ID:* ${json.id}
*Tipo:* ${json.type}
*Habilidades:* ${json.abilities}
*Height:* ${json.height}
*Weight:* ${json.weight}
*Descripcion:* ${json.description}
`;

  conn.sendMessage(m.chat, { text: message }, 'extendedTextMessage', { quoted: m });
};

handler.help = ['pokedex <pokemon>'];
handler.tags = ['anime'];
handler.command = /^pokedex/i;

export default handler;
