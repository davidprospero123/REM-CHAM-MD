process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "1";
import "./config.js";
import { createRequire } from "module";
import path, { join } from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { platform } from "process";
import * as ws from "ws";
import {
  readdirSync,
  statSync,
  unlinkSync,
  existsSync,
  readFileSync,
  watch,
  rmSync,
} from "fs";
import yargs from "yargs";
import { spawn } from "child_process";
import lodash from "lodash";
import chalk from "chalk";
import syntaxerror from "syntax-error";
import { tmpdir } from "os";
import { format } from "util";
import { makeWASocket, protoType, serialize } from "./lib/simple.js";
import { Low, JSONFile } from "lowdb";
import pino from "pino";
import { mongoDB, mongoDBV2 } from "./lib/mongoDB.js";
import store from "./lib/store.js";
import { Boom } from "@hapi/boom";
const {
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  MessageRetryMap,
  makeCacheableSignalKeyStore,
  jidNormalizedUser,
  PHONENUMBER_MCC,
} = await import("@whiskeysockets/baileys");
import moment from "moment-timezone";
import NodeCache from "node-cache";
import readline from "readline";
import fs from "fs";
const { CONNECTING } = ws;
const { chain } = lodash;
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000;

protoType();
serialize();

global.__filename = function filename(
  pathURL = import.meta.url,
  rmPrefix = platform !== "win32",
) {
  return rmPrefix
    ? /file:\/\/\//.test(pathURL)
      ? fileURLToPath(pathURL)
      : pathURL
    : pathToFileURL(pathURL).toString();
};
global.__dirname = function dirname(pathURL) {
  return path.dirname(global.__filename(pathURL, true));
};
global.__require = function require(dir = import.meta.url) {
  return createRequire(dir);
};

global.API = (name, path = "/", query = {}, apikeyqueryname) =>
  (name in global.APIs ? global.APIs[name] : name) +
  path +
  (query || apikeyqueryname
    ? "?" +
      new URLSearchParams(
        Object.entries({
          ...query,
          ...(apikeyqueryname
            ? {
                [apikeyqueryname]:
                  global.APIKeys[
                    name in global.APIs ? global.APIs[name] : name
                  ],
              }
            : {}),
        }),
      )
    : "");
// global.Fn = function functionCallBack(fn, ...args) { return fn.call(global.conn, ...args) }
global.timestamp = {
  start: new Date(),
};

const __dirname = global.__dirname(import.meta.url);

global.opts = new Object(
  yargs(process.argv.slice(2)).exitProcess(false).parse(),
);
global.prefix = new RegExp(
  "^[" +
    (opts["prefix"] || "‎z/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.,\\-").replace(
      /[|\\{}()[\]^$+*?.\-\^]/g,
      "\\$&",
    ) +
    "]",
);

//global.opts['db'] = "mongodb+srv://dbdyluxbot:password@cluster0.xwbxda5.mongodb.net/?retryWrites=true&w=majority"

global.db = new Low(
  /https?:\/\//.test(opts["db"] || "")
    ? new cloudDBAdapter(opts["db"])
    : /mongodb(\+srv)?:\/\//i.test(opts["db"])
      ? opts["mongodbv2"]
        ? new mongoDBV2(opts["db"])
        : new mongoDB(opts["db"])
      : new JSONFile(`${opts._[0] ? opts._[0] + "_" : ""}database.json`),
);

global.DATABASE = global.db;
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ)
    return new Promise((resolve) =>
      setInterval(async function () {
        if (!global.db.READ) {
          clearInterval(this);
          resolve(
            global.db.data == null ? global.loadDatabase() : global.db.data,
          );
        }
      }, 1 * 1000),
    );
  if (global.db.data !== null) return;
  global.db.READ = true;
  await global.db.read().catch(console.error);
  global.db.READ = null;
  global.db.data = {
    users: {},
    chats: {},
    stats: {},
    msgs: {},
    sticker: {},
    settings: {},
    ...(global.db.data || {}),
  };
  global.db.chain = chain(global.db.data);
};
loadDatabase();

global.authFile = `session`;
const { state, saveState, saveCreds } = await useMultiFileAuthState(
  global.authFile,
);
const msgRetryCounterMap = (MessageRetryMap) => {};
const msgRetryCounterCache = new NodeCache();
const { version } = await fetchLatestBaileysVersion();
let phoneNumber = global.botNumber;

const methodCodeQR = process.argv.includes("qr");
const methodCode = !!phoneNumber || process.argv.includes("code");
const MethodMobile = process.argv.includes("mobile");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const question = (texto) =>
  new Promise((resolver) => rl.question(texto, resolver));

let opcion;
if (
  !fs.existsSync(`./${authFile}/creds.json`) &&
  !methodCodeQR &&
  !methodCode
) {
  while (true) {
    opcion = await question(
      "\n\nꨄ︎ ¿𝙲𝙾𝙼𝙾 𝚀𝚄𝙸𝙴𝚁𝙴𝚂 𝙸𝙽𝙸𝙲𝙸𝙰𝚁 𝚂𝙴𝚂𝚂𝙸𝙾𝙽?\n⤷ 1 : 𝙿𝙾𝚁 𝚀𝚁\n⤷ 2 : 𝙼𝙴𝙳𝙸𝙰𝙽𝚃𝙴 𝙲𝙾𝙳𝙸𝙶𝙾\n\n\n",
    );
    if (opcion === "1" || opcion === "2") {
      break;
    } else {
      console.log("\n\n⩇⩇:⩇⩇ 𝙴𝚂𝙲𝚁𝙸𝙱𝙰 𝚄𝙽𝙰 𝙳𝙴 𝙻𝙰𝚂 𝟸 𝙵𝚄𝙽𝙲𝙸𝙾𝙽𝙴𝚂 \n\n 1 o 2\n\n");
    }
  }
  opcion = opcion;
}

const connectionOptions = {
  logger: pino({ level: "silent" }),
  printQRInTerminal: opcion == "1" ? true : false,
  mobile: MethodMobile,
  browser: ["Ubuntu", "Chrome", "20.0.04"],
  auth: {
    creds: state.creds,
    keys: makeCacheableSignalKeyStore(
      state.keys,
      pino({ level: "fatal" }).child({ level: "fatal" }),
    ),
  },
  markOnlineOnConnect: true,
  generateHighQualityLinkPreview: true,
  getMessage: async (clave) => {
    let jid = jidNormalizedUser(clave.remoteJid);
    let msg = await store.loadMessage(jid, clave.id);
    return msg?.message || "";
  },
  msgRetryCounterCache,
  msgRetryCounterMap,
  defaultQueryTimeoutMs: undefined,
  version,
};

//--
global.conn = makeWASocket(connectionOptions);

if (opcion === "2" || methodCode) {
  if (!conn.authState.creds.registered) {
    if (MethodMobile)
      throw new Error("⚠️ 𝚂𝚎 𝚙𝚛𝚘𝚍𝚞𝚓𝚘 𝚞𝚗 𝙴𝚛𝚛𝚘𝚛 𝚎𝚗 𝚕𝚊 𝙰𝙿𝙸 𝚍𝚎 𝚖𝚘𝚟𝚒𝚕");

    let addNumber;
    if (!!phoneNumber) {
      addNumber = phoneNumber.replace(/[^0-9]/g, "");
      if (
        !Object.keys(PHONENUMBER_MCC).some((v) => numeroTelefono.startsWith(v))
      ) {
        console.log(
          chalk.bgBlack(
            chalk.bold.blueBright(
              "\n\n✴️ 𝚂𝚞 𝚗ú𝚖𝚎𝚛𝚘 𝚍𝚎𝚋𝚎 𝚌𝚘𝚖𝚎𝚗𝚣𝚊𝚛  𝚌𝚘𝚗 𝚎𝚕 𝚌𝚘𝚍𝚒𝚐𝚘 𝚍𝚎 𝚙𝚊𝚒𝚜",
            ),
          ),
        );
        process.exit(0);
      }
    } else {
      while (true) {
        addNumber = await question(
          chalk.bgBlack(
            chalk.bold.bgBlueBright(
              "\n\n⌗ 𝙴𝚂𝙲𝚁𝙸𝙱𝙰 𝚂𝚄 𝙽𝚄𝙼𝙴𝚁𝙾\n\n𝙴𝙹𝙴𝙼𝙿𝙻𝙾: 5191xxxxxxx\n\n\n\n",
            ),
          ),
        );
        addNumber = addNumber.replace(/[^0-9]/g, "");

        if (
          addNumber.match(/^\d+$/) &&
          Object.keys(PHONENUMBER_MCC).some((v) => addNumber.startsWith(v))
        ) {
          break;
        } else {
          console.log(
            chalk.bgBlack(
              chalk.bold.bgGreenBright(
                "\n\n✴️ 𝙽𝚘 𝚜𝚎 𝚘𝚕𝚟𝚒𝚍𝚎 𝚍𝚎𝚕 𝚌𝚘𝚍𝚒𝚐𝚘 𝚍𝚎 𝚙𝚊𝚒𝚜",
              ),
            ),
          );
        }
      }
    }

    setTimeout(async () => {
      let codeBot = await conn.requestPairingCode(addNumber);
      codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot;
      console.log(
        chalk.bold.blueBright(`\n\n𖦹ׂ   𝚂𝚄 𝙲𝙾𝙳𝙸𝙶𝙾 𝙴𝚂:  ${codeBot}\n\n`),
      );
      rl.close();
    }, 3000);
  }
}
conn.isInit = false;

if (!opts["test"]) {
  setInterval(async () => {
    if (global.db.data) await global.db.write().catch(console.error);
    if (opts["autocleartmp"])
      try {
        clearTmp();
      } catch (e) {
        console.error(e);
      }
  }, 60 * 1000);
}

if (opts["server"]) (await import("./server.js")).default(global.conn, PORT);

/* Clear */
async function clearTmp() {
  const tmp = [tmpdir(), join(__dirname, "./tmp")];
  const filename = [];
  tmp.forEach((dirname) =>
    readdirSync(dirname).forEach((file) => filename.push(join(dirname, file))),
  );

  //---
  return filename.map((file) => {
    const stats = statSync(file);
    if (stats.isFile() && Date.now() - stats.mtimeMs >= 1000 * 60 * 1)
      return unlinkSync(file);
    return false;
  });
}

setInterval(async () => {
  await clearTmp();
}, 60000);

async function connectionUpdate(update) {
  const { connection, lastDisconnect, isNewLogin } = update;
  if (isNewLogin) conn.isInit = true;
  const code =
    lastDisconnect?.error?.output?.statusCode ||
    lastDisconnect?.error?.output?.payload?.statusCode;
  if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
    console.log(await global.reloadHandler(true).catch(console.error));
    global.timestamp.connect = new Date();
  }

  if (global.db.data == null) loadDatabase();
} //-- cu

process.on("uncaughtException", console.error);
// let strQuot = /(["'])(?:(?=(\\?))\2.)*?\1/

let isInit = true;
let handler = await import("./handler.js");
global.reloadHandler = async function (restatConn) {
  try {
    const Handler = await import(`./handler.js?update=${Date.now()}`).catch(
      console.error,
    );
    if (Object.keys(Handler || {}).length) handler = Handler;
  } catch (e) {
    console.error(e);
  }
  if (restatConn) {
    const oldChats = global.conn.chats;
    try {
      global.conn.ws.close();
    } catch {}
    conn.ev.removeAllListeners();
    global.conn = makeWASocket(connectionOptions, { chats: oldChats });
    isInit = true;
  }
  if (!isInit) {
    conn.ev.off("messages.upsert", conn.handler);
    conn.ev.off("group-participants.update", conn.participantsUpdate);
    conn.ev.off("groups.update", conn.groupsUpdate);
    conn.ev.off("message.delete", conn.onDelete);
    conn.ev.off("connection.update", conn.connectionUpdate);
    conn.ev.off("creds.update", conn.credsUpdate);
  }

  conn.welcome = `
╭───[ 𝙱𝙸𝙴𝙽𝚅𝙴𝙽𝙸𝙳𝙾 ]────
│ 𝙷𝚘𝚕𝚊 :𝟹, @user
│ 𝙱𝚒𝚎𝚗𝚟𝚎𝚗𝚒𝚍𝚘 𝚊 @group
│ 𝙼𝚎 𝚊𝚕𝚎𝚐𝚛𝚊 𝚝𝚎𝚗𝚎𝚛𝚝𝚎
╰─────────═┅═───────`;
  conn.bye = `
╭───[ 𝙰𝙳𝙸Ó𝚂 ]──────
│ 𝙰𝚍𝚒𝚘𝚜 @user
│ 𝚎𝚜𝚙𝚎𝚛𝚊𝚖𝚘𝚜 𝚗𝚘 𝚟𝚘𝚕𝚟𝚎𝚛
│ 𝚊 𝚊𝚟𝚎𝚛𝚝𝚎
╰─────────┄━┄───────`;
  conn.spromote = "@user promovió a admin";
  conn.sdemote = "@user degradado";
  conn.sDesc = "La descripción ha sido cambiada a \n@desc";
  conn.sSubject = "El nombre del grupo ha sido cambiado a \n@group";
  conn.sIcon = "El icono del grupo ha sido cambiado";
  conn.sRevoke = "El enlace del grupo ha sido cambiado a \n@revoke";
  conn.handler = handler.handler.bind(global.conn);
  conn.participantsUpdate = handler.participantsUpdate.bind(global.conn);
  conn.groupsUpdate = handler.groupsUpdate.bind(global.conn);
  conn.onDelete = handler.deleteUpdate.bind(global.conn);
  conn.connectionUpdate = connectionUpdate.bind(global.conn);
  conn.credsUpdate = saveCreds.bind(global.conn, true);

  conn.ev.on("messages.upsert", conn.handler);
  conn.ev.on("group-participants.update", conn.participantsUpdate);
  conn.ev.on("groups.update", conn.groupsUpdate);
  conn.ev.on("message.delete", conn.onDelete);
  conn.ev.on("connection.update", conn.connectionUpdate);
  conn.ev.on("creds.update", conn.credsUpdate);
  isInit = false;
  return true;
};

const pluginFolder = global.__dirname(join(__dirname, "./plugins/index"));
const pluginFilter = (filename) => /\.js$/.test(filename);
global.plugins = {};
async function filesInit() {
  for (let filename of readdirSync(pluginFolder).filter(pluginFilter)) {
    try {
      let file = global.__filename(join(pluginFolder, filename));
      const module = await import(file);
      global.plugins[filename] = module.default || module;
    } catch (e) {
      conn.logger.error(e);
      delete global.plugins[filename];
    }
  }
}
filesInit()
  .then((_) => console.log(Object.keys(global.plugins)))
  .catch(console.error);

global.reload = async (_ev, filename) => {
  if (pluginFilter(filename)) {
    let dir = global.__filename(join(pluginFolder, filename), true);
    if (filename in global.plugins) {
      if (existsSync(dir))
        conn.logger.info(`🌟 𝙿𝙻𝚄𝙶𝙸𝙽 𝙰𝙲𝚃𝚄𝙰𝙻𝙸𝚉𝙰𝙳𝙾 - '${filename}'`);
      else {
        conn.logger.warn(`🗑️ 𝙿𝙻𝚄𝙶𝙸𝙽 𝙴𝙻𝙸𝙼𝙸𝙽𝙰𝙳𝙾 - '${filename}'`);
        return delete global.plugins[filename];
      }
    } else conn.logger.info(`✨ 𝙽𝚄𝙴𝚅𝙾 𝙿𝙻𝚄𝙶𝙸𝙽 - '${filename}'`);
    let err = syntaxerror(readFileSync(dir), filename, {
      sourceType: "module",
      allowAwaitOutsideFunction: true,
    });
    if (err)
      conn.logger.error(
        `syntax error while loading '${filename}'\n${format(err)}`,
      );
    else
      try {
        const module = await import(
          `${global.__filename(dir)}?update=${Date.now()}`
        );
        global.plugins[filename] = module.default || module;
      } catch (e) {
        conn.logger.error(`error require plugin '${filename}\n${format(e)}'`);
      } finally {
        global.plugins = Object.fromEntries(
          Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)),
        );
      }
  }
};
Object.freeze(global.reload);
watch(pluginFolder, global.reload);
await global.reloadHandler();

// Quick Test
async function _quickTest() {
  let test = await Promise.all(
    [
      spawn("ffmpeg"),
      spawn("ffprobe"),
      spawn("ffmpeg", [
        "-hide_banner",
        "-loglevel",
        "error",
        "-filter_complex",
        "color",
        "-frames:v",
        "1",
        "-f",
        "webp",
        "-",
      ]),
      spawn("convert"),
      spawn("magick"),
      spawn("gm"),
      spawn("find", ["--version"]),
    ].map((p) => {
      return Promise.race([
        new Promise((resolve) => {
          p.on("close", (code) => {
            resolve(code !== 127);
          });
        }),
        new Promise((resolve) => {
          p.on("error", (_) => resolve(false));
        }),
      ]);
    }),
  );
  let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test;
  console.log(test);
  let s = (global.support = {
    ffmpeg,
    ffprobe,
    ffmpegWebp,
    convert,
    magick,
    gm,
    find,
  });
  // require('./lib/sticker').support = s
  Object.freeze(global.support);

  if (!s.ffmpeg)
    conn.logger.warn(
      "Please install ffmpeg for sending videos (pkg install ffmpeg)",
    );
  if (s.ffmpeg && !s.ffmpegWebp)
    conn.logger.warn(
      "Stickers may not animated without libwebp on ffmpeg (--enable-ibwebp while compiling ffmpeg)",
    );
  if (!s.convert && !s.magick && !s.gm)
    conn.logger.warn(
      "Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)",
    );
}

_quickTest()
  .then(() => conn.logger.info("𝙲𝙷𝙴𝚀𝚄𝙴𝙾 𝙻𝙸𝚂𝚃𝙾 𝙸𝙽𝙸𝙲𝙸𝙰𝙽𝙳𝙾 𝚁𝙴𝙼 𝙱𝙾𝚃"))
  .catch(console.error);
