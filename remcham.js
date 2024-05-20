process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
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
      "\n\n💙 𝙴𝚂𝙲𝚁𝙸𝙱𝙰 𝚀𝚄𝙴 𝙼𝙴𝚃𝙾𝙳𝙾 𝙳𝙴 𝙸𝙽𝙸𝙲𝙸𝙾 𝙳𝙴 𝚂𝙴𝚂𝚂𝙸𝙾𝙽 𝙳𝙴𝚂𝙴𝙰\n🔺 1 : 𝙿𝙾𝚁 𝚀𝚁\n🔺 2 : 𝙿𝙾𝚁 𝙲𝙾𝙳𝙸𝙶𝙾 (𝚁𝙴𝙲𝙾𝙼𝙴𝙽𝙳𝙰𝙳𝙾)\n\n\n",
    );
    if (opcion === "1" || opcion === "2") {
      break;
    } else {
      console.log("\n\n💙 𝙴𝚂𝙲𝚁𝙸𝙱𝙰 𝚄𝙽𝙰 𝚂𝙾𝙻𝙰 𝙳𝙴 𝙻𝙰𝚂 𝟸 𝙾𝙿𝙲𝙸𝙾𝙽𝙴𝚂 \n\n 1 o 2\n\n");
    }
  }
  opcion = opcion;
}

const connectionOptions = {
  logger: pino({ level: "silent" }),
  printQRInTerminal: opcion == "1" ? true : false,
  mobile: MethodMobile,
  //browser: ['Chrome (Linux)', '', ''],
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
      throw new Error("⚠️ Se produjo un Error en la API de movil");

    let addNumber;
    if (!!phoneNumber) {
      addNumber = phoneNumber.replace(/[^0-9]/g, "");
      if (
        !Object.keys(PHONENUMBER_MCC).some((v) => numeroTelefono.startsWith(v))
      ) {
        console.log(
          chalk.bgBlack(
            chalk.bold.redBright(
              "\n\n𝙴𝙻 𝙽𝚄𝙼𝙴𝚁𝙾 𝙳𝙴𝙱𝙴 𝚃𝙴𝙽𝙴𝚁 𝚂𝚄 𝙲𝙾𝙳𝙸𝙶𝙾 𝙳𝙴 𝙿𝙰𝙸𝚂 𝙴𝙹𝙴𝙼𝙿𝙻𝙾 𝟻𝟷",
            ),
          ),
        );
        process.exit(0);
      }
    } else {
      while (true) {
        addNumber = await question(
          chalk.bgBlack(
            chalk.bold.greenBright(
              "\n\n𝙴𝚂𝙲𝚁𝙸𝙱𝙰 𝚂𝚄 𝙽𝚄𝙼𝙴𝚁𝙾 𝙴𝙽 𝙻𝙰 𝙲𝙾𝙽𝚂𝙾𝙻𝙰\n\n𝙴𝙹𝙴𝙼𝙿𝙻𝙾: 51XXXXXXXXX\n\n\n\n",
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
              chalk.bold.redBright("\n\n𝙽𝙾 𝙾𝙻𝚅𝙸𝙳𝙴 𝙴𝙻 𝙲𝙾𝙳𝙸𝙶𝙾 𝙳𝙴 𝚂𝚄 𝙿𝙰𝙸𝚂"),
            ),
          );
        }
      }
    }

    setTimeout(async () => {
      let codeBot = await conn.requestPairingCode(addNumber);
      codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot;
      console.log(chalk.bold.red(`\n\n🟢   Su Código es:  ${codeBot}\n\n`));
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
      return unlinkSync(file); // 1 minuto
    return false;
  });
}

setInterval(async () => {
  await clearTmp();
  //console.log(chalk.cyan(`✅  Auto clear  | Se limpio la carpeta tmp`))
}, 60000); //1 munto

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

  conn.welcome = "𝙷𝙾𝙻𝙰𝙰, @user\n𝙱𝙸𝙴𝙽𝚅𝙴𝙽𝙸𝙳𝙾 𝙰 𝙴𝚂𝚃𝙰 𝙷𝚄𝙼𝙸𝙻𝙳𝙴 𝙵𝙰𝙼𝙸𝙻𝙸𝙰 @group";
  conn.bye = "𝚂𝙰𝚈𝙾𝙽𝙰𝚁𝙰 :𝙲 @user";
  conn.spromote = "@user 𝙰𝙷𝙾𝚁𝙰 𝙴𝚂 𝙰𝙳𝙼𝙸𝙽";
  conn.sdemote = "@user YA NO ES ADMIN";
  conn.sDesc = "𝙻𝙰 𝙳𝙴𝚂𝙲𝚁𝙸𝙿𝙲𝙸𝙾𝙽 𝙵𝚄𝙴 𝙲𝙰𝙼𝙱𝙸𝙰𝙳𝙰 𝙰 \n@desc";
  conn.sSubject = "𝙴𝙻 𝙽𝙾𝙼𝙱𝚁𝙴 𝙳𝙴𝙻 𝙶𝚁𝚄𝙿𝙾 𝙵𝚄𝙴 𝙲𝙰𝙼𝙱𝙸𝙰𝙳𝙾 𝙰 \n@group";
  conn.sIcon = "𝙴𝙻 𝙸𝙲𝙾𝙽𝙾 𝙳𝙴𝙻 𝙶𝚁𝚄𝙿𝙾 𝙵𝚄𝙴 𝙲𝙰𝙼𝙱𝙸𝙰𝙳𝙾 𝙰";
  conn.sRevoke = "𝙴𝙻 𝙴𝙽𝙻𝙰𝙲𝙴 𝙵𝚄𝙴 𝙲𝙰𝙼𝙱𝙸𝙰𝙳𝙾 𝙰 \n@revoke";
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
        conn.logger.info(`🌟 Plugin Actualizado - '${filename}'`);
      else {
        conn.logger.warn(`🗑️ Plugin Eliminado - '${filename}'`);
        return delete global.plugins[filename];
      }
    } else conn.logger.info(`✨ Nuevo plugin - '${filename}'`);
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
      "𝚁𝙴𝙲𝚄𝙴𝚁𝙳𝙴 𝙸𝙽𝚂𝚃𝙰𝙻𝙰𝚁 𝙵𝙵𝙼𝙿𝙴𝙶 (𝙴𝙽 𝙴𝙻 𝚁𝙴𝙰𝙳𝙼𝙴 𝙳𝙰𝙼𝙾𝚂 𝙻𝙰 𝙸𝙽𝙳𝙸𝙲𝙰𝙲𝙸𝙾𝙽)",
    );
  if (s.ffmpeg && !s.ffmpegWebp)
    conn.logger.warn(
      "Stickers may not animated without libwebp on ffmpeg𝙻𝚊𝚜 𝚙𝚎𝚐𝚊𝚝𝚒𝚗𝚊𝚜 𝚗𝚘 𝚙𝚞𝚎𝚍𝚎𝚗 𝚊𝚗𝚒𝚖𝚊𝚛𝚜𝚎 𝚜𝚒𝚗 𝚕𝚒𝚋𝚠𝚎𝚋𝚙 𝚎𝚗 𝚏𝚏𝚖𝚙𝚎𝚐 (--enable-ibwebp while compiling ffmpeg)",
    );
  if (!s.convert && !s.magick && !s.gm)
    conn.logger.warn(
      "𝙴𝚜 𝚙𝚘𝚜𝚒𝚋𝚕𝚎 𝚚𝚞𝚎 𝚕𝚊𝚜 𝚙𝚎𝚐𝚊𝚝𝚒𝚗𝚊𝚜 𝚗𝚘 𝚏𝚞𝚗𝚌𝚒𝚘𝚗𝚎𝚗 𝚜𝚒𝚗 𝚒𝚖𝚊𝚐𝚎𝚖𝚊𝚐𝚒𝚌𝚔 𝚜𝚒 𝚕𝚒𝚋𝚠𝚎𝚋𝚙 𝚎𝚗 𝚏𝚏𝚖𝚙𝚎𝚐 𝚗𝚘 𝚎𝚜𝚝á 𝚍𝚒𝚜𝚙𝚘𝚗𝚒𝚋𝚕𝚎 (pkg install imagemagick)",
    );
}

_quickTest()
  .then(() => conn.logger.info("💙 𝙿𝚁𝚄𝙴𝙱𝙰 𝚁𝙰𝙿𝙸𝙳𝙰 𝚃𝙴𝚁𝙼𝙸𝙽𝙰𝙳𝙰"))
  .catch(console.error);
