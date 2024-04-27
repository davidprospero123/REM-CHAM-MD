import { execSync } from 'child_process';

let handler = async (m, { conn }) => {
    if (conn.user.jid == conn.user.jid) {
        try {
            execSync('git reset --hard HEAD'); 
            execSync('git clean -fd'); s
            let stdout = execSync('git pull origin main');
            conn.reply(m.chat, stdout.toString(), m);
            conn.reply(m.chat, '𝙿𝚘𝚛 𝚏𝚊𝚟𝚘𝚛 𝚛𝚎𝚒𝚗𝚒𝚌𝚒𝚎 𝚎𝚕 𝚋𝚘𝚝 𝚎𝚗 𝚕𝚊 𝚌𝚘𝚗𝚜𝚘𝚕𝚊 𝚙𝚊𝚛𝚊 𝚝𝚎𝚛𝚖𝚒𝚗𝚊𝚛 𝚝𝚘𝚍𝚘 𝚌𝚘𝚛𝚛𝚎𝚌𝚝𝚊𝚖𝚎𝚗𝚝𝚎 𝚢 𝚚𝚞𝚎 𝚎𝚕 𝚋𝚘𝚝 𝚊𝚗𝚍𝚎 𝚏𝚞𝚗𝚌𝚒𝚘𝚗𝚊𝚕', m);
        } catch (error) {
            conn.reply(m.chat, error.toString(), m);
        }
    }
}

handler.help = ['update'];
handler.tags = ['owner'];
handler.command = ['update', 'actualizar', 'fix', 'fixed'];
handler.owner = true;

export default handler;
