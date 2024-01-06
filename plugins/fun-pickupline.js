import fetch from 'node-fetch';

let pickupLineHandler = async (m, { conn, text }) => {
  try {
    let res = await fetch(`https://api.popcat.xyz/pickuplines`);

    if (!res.ok) {
      throw new Error(`La solicitud de API falló con el estado ${res.status}`);
    }

    let json = await res.json();

    console.log('JSON response:', json);

    let pickupLine = `*Aquí tienes una frase para ligar:*\n\n"${json.pickupline}"\n\nContribuyente: ${json.contributor}`;

    m.reply(pickupLine);
  } catch (error) {
    console.error(error);
    // Handle the error appropriately
  }
};

pickupLineHandler.help = ['pickupline'];
pickupLineHandler.tags = ['fun'];
pickupLineHandler.command = /^(pickupline|pickup)$/i;

export default pickupLineHandler;
