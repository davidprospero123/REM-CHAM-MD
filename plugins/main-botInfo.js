import { cpus as _cpus, totalmem, freemem } from 'os';
import util from 'util';
import { performance } from 'perf_hooks';
import { sizeFormatter } from 'human-readable';

let format = sizeFormatter({
  std: 'JEDEC',
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
});

let handler = async (m, { conn, usedPrefix, command }) => {
  const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats);
  const groupsIn = chats.filter(([id]) => id.endsWith('@g.us')); 
  const privateChats = chats.filter(([id]) => !id.endsWith('@g.us'));

  const cpus = _cpus().map(cpu => {
    cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0);
    return cpu;
  });
  const cpu = cpus.reduce((last, cpu, _, { length }) => {
    last.total += cpu.total;
    last.speed += cpu.speed / length;
    last.times.user += cpu.times.user;
    last.times.nice += cpu.times.nice;
    last.times.sys += cpu.times.sys;
    last.times.idle += cpu.times.idle;
    last.times.irq += cpu.times.irq;
    return last;
  }, {
    speed: 0,
    total: 0,
    times: {
      user: 0,
      nice: 0,
      sys: 0,
      idle: 0,
      irq: 0
    }
  });

  let old = performance.now();
  await util.promisify(setTimeout)(2000); 
  let neww = performance.now();
  let elapsedTime = neww - old;

  let target = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;

  if (!(target in global.db.data.users)) throw `𝙴𝚕 𝚞𝚜𝚞𝚊𝚛𝚒𝚘 𝚗𝚘 𝚎𝚜𝚝á 𝚎𝚗 𝚕𝚊 𝚋𝚊𝚜𝚎 𝚍𝚎 𝚍𝚊𝚝𝚘𝚜`;

  let profilePic = await conn.profilePictureUrl(target, 'image').catch(_ => './logo.jpg');
  let user = global.db.data.users[target];

  let botname = "ＲＥＭ－ＢＯＴ";

  let infoMessage = `
╭────〈 ${botname} 〉───
│
│ 📱  𝚄𝚂𝙾 𝙳𝙴𝙻 𝙱𝙾𝚃:
│ ┌── 💬 𝙲𝙷𝙰𝚃 𝚃𝙾𝚃𝙰𝙻𝙴𝚂: ${chats.length}
│ │   └─ 🗨️ 𝙶𝚁𝚄𝙿𝙾𝚂: ${groupsIn.length}
│ │   └─ 📝 𝙿𝚁𝙸𝚅𝙰𝙳𝙾𝚂: ${privateChats.length}
│ ├── 🕒 𝙴𝙹𝙴𝙲𝚄𝙲𝙸𝙾𝙽: ${elapsedTime.toFixed(2)} 𝙼𝚂
│ ├── 🖥️ Uso de CPU:
│ ├── ${cpu.times.sys.toFixed(2)} 𝙼𝚂 (𝚂𝙸𝚂𝚃𝙴𝙼𝙰)
│ ├── ${cpu.times.user.toFixed(2)} 𝙼𝚂 (𝚄𝚂𝚄𝙰𝚁𝙸𝙾)
│ └── 📊 Memoria RAM: Total 
│ └── ${format(totalmem())}, Libre ${format(freemem())}
│
│ 🤖 𝙳𝙴𝚃𝙰𝙻𝙻𝙴𝚂 𝙳𝙴𝙻 𝙱𝙾𝚃:
│ ┌── 👤 𝙾𝚆𝙽𝙴𝚁 𝙾𝙵𝙲: Curi
│ ├── 🛠️ 𝙿𝚁𝙴𝙵𝙸𝙹𝙾: ${usedPrefix}
│ ├── 🌐 𝙿𝙻𝙰𝚃𝙰𝙵𝙾𝚁𝙼𝙰: Linux
│ └── 🏷️ 𝙾𝙿𝙴𝚁𝙰𝙽𝙳𝙾: Público
│
│ 🔗 𝙴𝙽𝙻𝙰𝙲𝙴𝚂:
│ └── 🌐 [𝙿𝙰𝙶𝙸𝙽𝙰 𝚆𝙴𝙱]
│ └── https://remcham-md.vercel.app
│
│ 🔍 𝚄𝚂𝙾 𝙳𝙴 𝙼𝙴𝙼𝙾𝚁𝙸𝙰 𝙽𝙾𝙳𝙴.𝙹𝚂:
│ ${'```' + Object.keys(process.memoryUsage()).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v => v.length)), ' ')}: ${format(process.memoryUsage()[key])}`).join('\n') + '```'}
│
╰────────────────────
`;

  conn.sendFile(m.chat, profilePic, 'perfil.jpg', infoMessage, m, false, { mentions: [target] });
  m.react('✅');
}

handler.help = ['info'];
handler.tags = ['main'];
handler.command = ['info', 'infobot', 'botinfo'];

export default handler;
