import { promises } from 'fs';
import { join } from 'path';
import axios from 'axios'; 

let handler = async function (m, { conn, __dirname }) {
  const githubRepoURL = 'https://github.com/User/Name';

  try {
  
    const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);

    const response = await axios.get(`https://api.github.com/repos/davidprospero123/REM-CHAM-MD`);

    if (response.status === 200) {
      const repoData = response.data;

      
      const formattedInfo = `
📂 𝚁𝚎𝚙𝚘𝚜𝚒𝚝𝚘𝚛𝚒𝚘: ${repoData.name}
📝 𝙳𝚎𝚜𝚌𝚛𝚒𝚙𝚌𝚒ó𝚗: ${repoData.description}
👤 𝙲𝚛𝚎𝚊𝚍𝚘𝚛: ${repoData.owner.login}
⭐ 𝙴𝚜𝚝𝚛𝚎𝚕𝚕𝚊𝚜: ${repoData.stargazers_count}
🍴 𝙵𝚘𝚛𝚔𝚜: ${repoData.forks_count}
🌐 𝚄𝚁𝙻: ${repoData.html_url}
      `.trim();

      
      const decoration = `
╭─────────────────────
│ *_𝙳𝚎𝚝𝚊𝚕𝚕𝚎𝚜 𝚍𝚎𝚕 𝚁𝚎𝚙𝚘𝚜𝚒𝚝𝚘𝚛𝚒𝚘_*
│─────────────────────
│${formattedInfo}
│─────────────────────
╰─────────────────────`.trim();

      
      await conn.relayMessage(m.chat,  {
        requestPaymentMessage: {
          currencyCodeIso4217: 'REM',
          amount1000: 69000,
          requestFrom: m.sender,
          noteMessage: {
          extendedTextMessage: {
          text: decoration,
          contextInfo: {
          externalAdReply: {
          showAdAttribution: true
          }}}}}}, {})
    } else {

      await conn.reply(m.chat, 'No se puede recuperar la información del repositorio.', m);
    }
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, 'Se produjo un error al obtener la información del repositorio.', m);
  }
};

handler.help = ['script'];
handler.tags = ['main'];
handler.command = ['sc', 'repo', 'script', 'repositorio'];

export default handler;
