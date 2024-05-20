import chalk from "chalk";
import { spawn } from "child_process";
import express from "express";
import figlet from "figlet";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pino from "pino";
import pkg from "@whiskeysockets/baileys";

const { makeWASocket, useSingleFileAuthState, DisconnectReason } = pkg;

function printBanner(text, color) {
  figlet(
    text,
    {
      font: "AMC Razor",
      horizontalLayout: "default",
      verticalLayout: "default",
    },
    (err, data) => {
      if (err) {
        console.error(chalk.red("Figlet error:", err));
        return;
      }
      console.log(chalk[color](data));
    },
  );
}

const app = express();
const port = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "Assets")));

app.get("/", (req, res) => {
  res.redirect("/Curi.html");
});

app.listen(port, () => {
  console.log(chalk.green(`🟢 Port ${port} escuchando al Servidor`));
  console.log(chalk.yellow("🚀 Servidor INICIANDO"));
});

let isRunning = false;

async function start(file) {
  if (isRunning) return;
  isRunning = true;

  const currentFilePath = new URL(import.meta.url).pathname;
  const args = [
    path.join(path.dirname(currentFilePath), file),
    ...process.argv.slice(2),
  ];
  const p = spawn(process.argv[0], args, {
    stdio: ["inherit", "inherit", "inherit", "ipc"],
  });

  p.on("message", (data) => {
    console.log(chalk.bgCyanBright(` ENVIANDO MENU :3 ${data}`));
    switch (data) {
      case "reset":
        p.kill();
        isRunning = false;
        start.apply(this, arguments);
        break;
      case "By Gabriel Curi":
        p.send(process.uptime());
        break;
    }
  });

  p.on("exit", (code) => {
    isRunning = false;
    console.error(chalk.blue(`💔 Salida de codigo: ${code}`));

    if (code === 0) return;

    fs.watchFile(args[0], () => {
      fs.unwatchFile(args[0]);
      start("remcham.js");
    });
  });

  p.on("error", (err) => {
    console.error(chalk.red(`❌ Error: ${err}`));
    p.kill();
    isRunning = false;
    start("remcham.js");
  });

  const pluginsFolder = path.join(path.dirname(currentFilePath), "plugins");
  fs.readdir(pluginsFolder, async (err, files) => {
    if (err) {
      console.error(chalk.red(`❌ Error en este Plugin: ${err}`));
      return;
    }
    console.log(chalk.green(`✅ Instalamos ${files.length} plugins`));

    try {
      const { default: baileys } = await import("@whiskeysockets/baileys");
      const version = (await baileys.fetchLatestBaileysVersion()).version;
      console.log(chalk.green(`🚀 Usando Baileys ${version}`));
    } catch (e) {
      console.error(chalk.red("❌ Error en la instalacion de Baileys"));
    }
  });
}

start("remcham.js");

process.on("unhandledRejection", (reason, promise) => {
  console.error(
    chalk.red("❌ Unhandled Rejection at:", promise, "reason:", reason),
  );
  start("remcham.js");
});

process.on("exit", (code) => {
  console.error(chalk.red(`❌ Salida por codigo: ${code}`));
  console.error(chalk.red(`🔄 REM-BOT REINICIANDO...`));
  start("remcham.js");
});

printBanner("REM - BOT ", "cyan");
printBanner("BY GABRIEL :)", "green");

console.log(chalk.yellow("==============================================="));
console.log(chalk.yellow("🔥 REM---BOT BY Gabriel Curi! 🔥"));
console.log(chalk.yellow("==============================================="));
console.log(chalk.yellow("🚀 VAMOSSS CON TODO :3 🚀"));
console.log(chalk.yellow("==============================================="));

async function connectToWhatsApp() {
  const { state, saveCreds } = await useSingleFileAuthState("./auth_info.json");
  const sock = makeWASocket({
    logger: pino({ level: "silent" }),
    auth: state,
    printQRInTerminal: true,
  });

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) {
        console.log(chalk.greenBright("🔄 Reconectando a WhatsApp..."));
        connectToWhatsApp();
      } else {
        console.log(chalk.red("Conexion cerrada y no pudimos reconectar"));
      }
    } else if (connection === "open") {
      console.log(chalk.green("Conexion abierta"));
    }
  });

  sock.ev.on("creds.update", saveCreds);

  return sock;
}

connectToWhatsApp().catch((err) => console.log("error inesperado: " + err));
