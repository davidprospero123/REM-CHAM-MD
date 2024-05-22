import fetch from 'node-fetch';
import GIFBufferToVideoBuffer from '../lib/Gifbuffer.js';

const getBuffer = async (url) => {
  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer);
  } catch (error) {
    console.error("Error al obtener el buffer", error);
    throw new Error("Error al obtener el buffer");
  }
}

const translateGoogle = async (text, sourceLang, targetLang) => {
  const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
  const result = await response.json();
  return result[0][0][0];
}

const commandMapping = {
  'acosar': 'bully',
  'abrazar': 'cuddle',
  'llorar': 'cry',
  'abrazar': 'hug',
  'awoo': 'awoo',
  'besar': 'kiss',
  'lamer': 'lick',
  'acariciar': 'pat',
  'engreído': 'smug',
  'golpear': 'bonk',
  'lanzar': 'yeet',
  'ruborizarse': 'blush',
  'sonreír': 'smile',
  'saludar': 'wave',
  'chocar': 'highfive',
  'sostener': 'handhold',
  'morder': 'bite',
  'glomp': 'glomp',
  'abofetear': 'slap',
  'matar': 'kill',
  'feliz': 'happy',
  'guiñar': 'wink',
  'tocar': 'poke',
  'bailar': 'dance',
  'cringe': 'cringe'
};

let handler = async (message, { conn, args, usedPrefix, command }) => {
  let target;
  if (message.isGroup) {
    target = message.mentionedJid[0] ? message.mentionedJid[0] : message.quoted ? message.quoted.sender : false;
  } else {
    target = message.chat;
  }

  if (!target) throw `Por favor, etiqueta o menciona a alguien\n\nEjemplo: ${usedPrefix + command} @usuario`;

  let senderName = conn.getName(message.sender);
  let targetName = conn.getName(target);
  message.react(rwait);

  let englishCommand = commandMapping[command.toLowerCase()];

  if (!englishCommand) throw `El comando '${command}' no está soportado.`;

  let reaction = await fetch(`https://api.waifu.pics/sfw/${englishCommand}`);
  if (!reaction.ok) throw "Reacción no encontrada";

  let json = await reaction.json();
  let { url } = json;
  const gifBuffer = await getBuffer(url);
  const gifToVideoBuffer = await GIFBufferToVideoBuffer(gifBuffer);

  let translatedCommand = await translateGoogle(englishCommand, 'en', 'es');

  conn.sendMessage(
    message.chat,
    { video: gifToVideoBuffer, caption: `(${senderName}) ${translatedCommand} ${targetName}`, gifPlayback: true, gifAttribution: 0 },
    { quoted: message }
  );

  message.react('☺️'); 
}

handler.tags = ['reacción'];
handler.help = [
  'acosar @usuario',
  'abrazar @usuario',
  'llorar @usuario',
  'abrazar @usuario',
  'awoo @usuario',
  'besar @usuario',
  'lamer @usuario',
  'acariciar @usuario',
  'engreído @usuario',
  'golpear @usuario',
  'lanzar @usuario',
  'ruborizarse @usuario',
  'sonreír @usuario',
  'saludar @usuario',
  'chocar @usuario',
  'sostener @usuario',
  'morder @usuario',
  'glomp @usuario',
  'abofetear @usuario',
  'matar @usuario',
  'feliz @usuario',
  'guiñar @usuario',
  'tocar @usuario',
  'bailar @usuario',
  'cringe @usuario'
];

handler.command = /^(acosar|abrazar|llorar|abrazar|awoo|besar|lamer|acariciar|engreído|golpear|lanzar|ruborizarse|sonreír|saludar|chocar|sostener|morder|glomp|abofetear|matar|feliz|guiñar|tocar|bailar|cringe)$/i;
handler.group = true;

export default handler;
