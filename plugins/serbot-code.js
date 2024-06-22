import pkg from "@whiskeysockets/baileys";
import moment from "moment-timezone";
import NodeCache from "node-cache";
import readline from "readline";
import qrcode from "qrcode";
import crypto from "crypto";
import fs from "fs";
import pino from "pino";
import * as ws from "ws";
const { CONNECTING } = ws;
import { Boom } from "@hapi/boom";
import { makeWASocket } from "../lib/simple.js";

const {
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  jidNormalizedUser,
  PHONENUMBER_MCC,
} = pkg;

if (!Array.isArray(global.conns)) global.conns = [];

const mssg = {
  nobbot: "𝙽𝚘 𝚙𝚞𝚎𝚍𝚎𝚜 𝚞𝚜𝚊𝚛 𝚎𝚕 𝚋𝚘𝚝 𝚛𝚎𝚖.",
  recon: "𝚁𝙴𝙲𝙾𝙽𝙴𝙲𝚃𝙰𝙽𝙳𝙾 𝚁𝙴𝙼 𝙱𝙾𝚃",
  sesClose: "𝙻𝙰 𝚂𝙴𝚂𝚂𝙸𝙾𝙽 𝙵𝚄𝙴 𝙲𝙴𝚁𝚁𝙰𝙳𝙰",
  botqr: `𝚄𝚂𝙰 𝙴𝚂𝚃𝙴 𝙲𝙾𝙳𝙸𝙶𝙾 𝙿𝙰𝚁𝙰 𝚂𝙴𝚁 𝚂𝚄𝙱 𝙱𝙾𝚃.\n
> *\`𝙶𝚄𝙸𝙰:\`* \n
> *\`1\`* : 𝙷𝚊𝚐𝚊 𝚌𝚕𝚒𝚌𝚔 𝚎𝚗 𝚕𝚘𝚜 𝟹 𝚙𝚞𝚗𝚝𝚘𝚜\n
> *\`2\`* : 𝚃𝚘𝚚𝚞𝚎 𝚍𝚒𝚜𝚙𝚘𝚜𝚒𝚝𝚒𝚟𝚘𝚜 𝚟𝚒𝚗𝚌𝚞𝚕𝚊𝚍𝚘𝚜\n
> *\`3\`* : 𝚂𝚎𝚕𝚎𝚌𝚌𝚒𝚘𝚗𝚊 *𝚅𝚒𝚗𝚌𝚞𝚕𝚊𝚛 𝚌𝚘𝚗 𝚎𝚕 𝚗ú𝚖𝚎𝚛𝚘 𝚍𝚎 𝚝𝚎𝚕é𝚏𝚘𝚗𝚘*\n
> *\`4\`* : 𝙴𝚜𝚌𝚛𝚒𝚋𝚊 𝚎𝚕 𝙲𝚘𝚍𝚒𝚐𝚘\n\n
> \`Nota :\` 𝙴𝚜𝚝𝚎 𝙲ó𝚍𝚒𝚐𝚘 𝚜𝚘𝚕𝚘 𝚏𝚞𝚗𝚌𝚒𝚘𝚗𝚊 𝚎𝚗 𝚎𝚕 𝚗ú𝚖𝚎𝚛𝚘 𝚚𝚞𝚎 𝚕𝚘 𝚜𝚘𝚕𝚒𝚌𝚒𝚝𝚘`,
  connet: "𝙲𝙾𝙽𝙴𝚇𝙸𝙾𝙽 𝙴𝚂𝚃𝙰𝙱𝙻𝙴𝙲𝙸𝙳𝙰 𝙲𝙾𝙽 𝙴𝚇𝙸𝚃𝙾",
  connID: "𝙲𝙾𝙽𝙴𝚇𝙸𝙾𝙽 𝙴𝚂𝚃𝙰𝙱𝙻𝙴𝙲𝙸𝙳𝙰 𝙲𝙾𝙽 𝙴𝚇𝙸𝚃𝙾",
  connMsg: "𝙴𝙻 𝙱𝙾𝚃 𝚂𝙴 𝙰𝙷 𝙲𝙾𝙽𝙴𝙲𝚃𝙰𝙳𝙾 𝙴𝚇𝙸𝚃𝙾𝚂𝙰𝙼𝙴𝙽𝚃𝙴.",
};

let handler = async (
  m,
  { conn: _conn, args, usedPrefix, command, isOwner },
) => {
  let parent = _conn;

  async function bbts() {
    let authFolderB = crypto.randomBytes(10).toString("hex").slice(0, 8);

    if (!fs.existsSync("./rembots/" + authFolderB)) {
      fs.mkdirSync("./rembots/" + authFolderB, { recursive: true });
    }
    if (args[0]) {
      fs.writeFileSync(
        "./rembots/" + authFolderB + "/creds.json",
        JSON.stringify(
          JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")),
          null,
          "\t",
        ),
      );
    }

    const { state, saveState, saveCreds } = await useMultiFileAuthState(
      `./rembots/${authFolderB}`,
    );
    const msgRetryCounterCache = new NodeCache();
    const { version } = await fetchLatestBaileysVersion();
    let phoneNumber = m.sender.split("@")[0];

    const methodCodeQR = process.argv.includes("qr");
    const methodCode = !!phoneNumber || process.argv.includes("code");
    const MethodMobile = process.argv.includes("mobile");

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    const question = (texto) =>
      new Promise((resolver) => rl.question(texto, resolver));

    const connectionOptions = {
      logger: pino({ level: "silent" }),
      printQRInTerminal: false,
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
      defaultQueryTimeoutMs: undefined,
      version,
    };

    let conn = makeWASocket(connectionOptions);

    if (methodCode && !conn.authState.creds.registered) {
      if (!phoneNumber) {
        process.exit(0);
      }
      let cleanedNumber = phoneNumber.replace(/[^0-9]/g, "");
      if (
        !Object.keys(PHONENUMBER_MCC).some((v) => cleanedNumber.startsWith(v))
      ) {
        process.exit(0);
      }

      setTimeout(async () => {
        let codeBot = await conn.requestPairingCode(cleanedNumber);
        codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot;
        parent.sendButton2(
          m.chat,
          `‹𝟹 𝙲𝙾𝙳𝙴: *${codeBot}*\n\n${mssg.botqr}`,
          mssg.ig,
          "https://i.ibb.co/0cdWZb5/105d0d0c0f05348828ee14fae199297c.jpg",
          [],
          codeBot,
          null,
          m,
        );
        rl.close();
      }, 3000);
    }

    conn.isInit = false;

    let isInit = true;

    async function connectionUpdate(update) {
      const { connection, lastDisconnect, isNewLogin, qr } = update;
      if (isNewLogin) conn.isInit = true;

      const code =
        lastDisconnect?.error?.output?.statusCode ||
        lastDisconnect?.error?.output?.payload?.statusCode;
      if (
        code &&
        code !== DisconnectReason.loggedOut &&
        conn?.ws.socket == null
      ) {
        let i = global.conns.indexOf(conn);
        if (i < 0)
          return console.log(await creloadHandler(true).catch(console.error));
        delete global.conns[i];
        global.conns.splice(i, 1);

        if (code !== DisconnectReason.connectionClosed) {
          parent.sendMessage(
            conn.user.jid,
            { text: `⚠️ ${mssg.recon}` },
            { quoted: m },
          );
        } else {
          parent.sendMessage(
            m.chat,
            { text: `⛔ ${mssg.sesClose}` },
            { quoted: m },
          );
        }
      }

      if (global.db.data == null) loadDatabase();

      if (connection == "open") {
        conn.isInit = true;
        global.conns.push(conn);
        await parent.sendMessage(
          m.chat,
          { text: args[0] ? `ᡣ𐭩 ${mssg.connet}` : `ᡣ𐭩 ${mssg.connID}` },
          { quoted: m },
        );
        await sleep(5000);
        if (args[0]) return;
        await parent.sendMessage(
          conn.user.jid,
          { text: `ᡣ𐭩 ${mssg.connMsg}` },
          { quoted: m },
        );
        parent.sendMessage(
          conn.user.jid,
          {
            text:
              usedPrefix +
              command +
              " " +
              Buffer.from(
                fs.readFileSync("./rembots/" + authFolderB + "/creds.json"),
                "utf-8",
              ).toString("base64"),
          },
          { quoted: m },
        );
      }
    }

    setInterval(async () => {
      if (!conn.user) {
        try {
          conn.ws.close();
        } catch {}
        conn.ev.removeAllListeners();
        let i = global.conns.indexOf(conn);
        if (i < 0) return;
        delete global.conns[i];
        global.conns.splice(i, 1);
      }
    }, 60000);

    let handler = await import("../handler.js");
    let creloadHandler = async function (restatConn) {
      try {
        const Handler = await import(
          `../handler.js?update=${Date.now()}`
        ).catch(console.error);
        if (Object.keys(Handler || {}).length) handler = Handler;
      } catch (e) {
        console.error(e);
      }
      if (restatConn) {
        try {
          conn.ws.close();
        } catch {}
        conn.ev.removeAllListeners();
        conn = makeWASocket(connectionOptions);
        isInit = true;
      }

      if (!isInit) {
        conn.ev.off("messages.upsert", conn.handler);
        conn.ev.off("group-participants.update", conn.participantsUpdate);
        conn.ev.off("groups.update", conn.groupsUpdate);
        conn.ev.off("message.delete", conn.onDelete);
        conn.ev.off("call", conn.onCall);
        conn.ev.off("connection.update", conn.connectionUpdate);
        conn.ev.off("creds.update", conn.credsUpdate);
      }

      conn.welcome = global.conn.welcome + "";
      conn.bye = global.conn.bye + "";
      conn.spromote = global.conn.spromote + "";
      conn.sdemote = global.conn.sdemote + "";

      conn.handler = handler.handler.bind(conn);
      conn.participantsUpdate = handler.participantsUpdate.bind(conn);
      conn.groupsUpdate = handler.groupsUpdate.bind(conn);
      conn.onDelete = handler.deleteUpdate.bind(conn);
      conn.connectionUpdate = connectionUpdate.bind(conn);
      conn.credsUpdate = saveCreds.bind(conn, true);

      conn.ev.on("messages.upsert", conn.handler);
      conn.ev.on("group-participants.update", conn.participantsUpdate);
      conn.ev.on("groups.update", conn.groupsUpdate);
      conn.ev.on("message.delete", conn.onDelete);
      conn.ev.on("connection.update", conn.connectionUpdate);
      conn.ev.on("creds.update", conn.credsUpdate);
      isInit = false;
      return true;
    };
    creloadHandler(false);
  }
  bbts();
};
handler.help = ["botclone"];
handler.tags = ["bebot"];
handler.command = ["code", "serbotcode", "jadibotcode"];
handler.rowner = false;
handler.register = true;
export default handler;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
