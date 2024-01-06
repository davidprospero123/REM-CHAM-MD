import fetch from 'node-fetch';

let gitaVerseHandler = async (m, { conn }) => {
  try {
    // Extract the verse number from the command text.
    let verseNumber = m.text.split(' ')[1];

    if (!verseNumber || isNaN(verseNumber)) {
      verseNumber = Math.floor(Math.random() * 700) + 1;
    }

    let res = await fetch(`https://gita-api.vercel.app/odi/verse/${verseNumber}`);

    if (!res.ok) {
      let error = await res.json(); 
      throw new Error(`La solicitud de API falló con el estado ${res.status} y mensaje ${error.detail[0].msg}`);
    }

    let json = await res.json();

    console.log('JSON responDE:', json);

    let gitaVerse = `
🕉 *Rem-Cham Versiculo: Enseñanzas Sagradas*\n
📜 *Capitulo ${json.chapter_no}: ${json.chapter_name}*\n
Versiculo ${json.verse_no}:\n
" ${json.verse} "\n
*🔮 Traducción:*\n
${json.translation}\n
*🧘‍♂️ Perspicacia espiritual (Significado):*\n
${json.purport}`;

    m.reply(gitaVerse);

   
    if (json.audio_link) {
      conn.sendFile(m.chat, json.audio_link, 'audio.mp3', null, m, true, { type: 'audioMessage', ptt: true });
    }
  } catch (error) {
    console.error(error);
    // Handle the error appropriately
  }
};

gitaVerseHandler.help = ['gita [verse_number]'];
gitaVerseHandler.tags = ['religion'];
gitaVerseHandler.command = ['gita', 'versiculo']

export default gitaVerseHandler;

