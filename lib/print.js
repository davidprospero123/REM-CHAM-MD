import chalk from "chalk";
import { watchFile } from "fs";

const terminalImage = global.opts["img"] ? require("terminal-image") : "";
const urlRegex = (await import("url-regex-safe")).default({ strict: false });

const botname = "ＲＥＭ－ＢＯＴ";
const remDecor = {
  heart: chalk.redBright("❤"),
  star: chalk.yellowBright("⭐"),
  wave: chalk.blueBright("~"),
  title: chalk.magenta.bold(botname),
  line: chalk.greenBright("────────────────────────────────────────"),
  time: () => chalk.cyanBright(new Date().toLocaleTimeString()),
};

const log = (text, error = false) =>
  console.log(
    `\n${remDecor.line}`,
    `\n╭────〈 ${remDecor.title} 〉───`,
    `\n│ ${remDecor.time()}`,
    `\n│ ${chalk[error ? "red" : "blue"]("[𝙸𝙽𝙵𝙾𝚁𝙼𝙰𝙲𝙸𝙾𝙽]")}`,
    `\n│ ${chalk[error ? "redBright" : "greenBright"](text)}`,
    `\n│ ${remDecor.heart} ${remDecor.star} ${remDecor.wave}`,
    `\n${remDecor.line}\n`,
  );

export default async function (m, conn = { user: {} }) {
  let senderName = await conn.getName(m.sender);

  let chatName = "";
  if (m.chat && m.chat !== m.sender) {
    if (!m.chat.endsWith("@g.us")) {
      chatName = "𝙿𝚛𝚒𝚟𝚊𝚍𝚘";
    } else {
      chatName = await conn.getName(m.chat);
      chatName = chatName ? `${chatName} ` : "";
    }
  } else {
    chatName = "𝙿𝚛𝚒𝚟𝚊𝚍𝚘";
  }

  if (m.isCommand) {
    let commandText = m.text.split(" ")[0];
    const cmdtxt = chalk.cyanBright("𝙲𝚘𝚖𝚊𝚗𝚍𝚘");
    const cmd = chalk.yellowBright(`${commandText}`);
    const from = chalk.greenBright("𝚍𝚎");
    const username = chalk.yellowBright(`${senderName}`);
    const ins = chalk.greenBright("𝚎𝚗");
    const grp = chalk.blueBright(chatName);
    log(
      `\n│ ${remDecor.wave} ${cmdtxt} ${cmd} ${from} ${username} ${ins} ${grp} ${remDecor.wave}`,
    );
  } else {
    const msg = chalk.cyanBright("𝙼𝚎𝚗𝚜𝚊𝚓𝚎");
    const from = chalk.greenBright("𝚍𝚎");
    const username = chalk.yellowBright(`${senderName}`);
    const ins = chalk.greenBright("𝚎𝚗");
    const grp = chalk.blueBright(chatName);
    log(
      `\n│ ${remDecor.wave} ${msg} ${from} ${username} ${ins} ${grp} ${remDecor.wave}`,
    );
  }
}

let file = global.__filename(import.meta.url);
watchFile(file, () => {
  log(chalk.redBright("Update 'lib/print.js'"), false);
});
