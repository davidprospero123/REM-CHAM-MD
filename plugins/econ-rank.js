import { xpRange } from '../lib/levelling.js';
import Canvacord from 'canvacord';

let handler = async (m, { conn }) => {
  let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;

  if (!(who in global.db.data.users)) throw `✳️ 𝙀𝙨𝙩𝙚 𝙪𝙨𝙪𝙖𝙧𝙞𝙤 𝙣𝙤 𝙨𝙚 𝙚𝙣𝙘𝙪𝙚𝙣𝙩𝙧𝙖 𝙚𝙣 𝙢𝙞 𝙗𝙖𝙨𝙚 𝙙𝙚 𝙙𝙖𝙩𝙤𝙨`;

  let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './logo.jpg');
  let user = global.db.data.users[who];
  let { exp, level, role } = global.db.data.users[who];
  let { min, xp } = xpRange(user.level, global.multiplier);
  let username = conn.getName(who);

  let crxp = exp - min
  let customBackground  = './Assets/rankbg.jpg'
  let requiredXpToLevelUp = xp

  const card = await new Canvacord.Rank()
  .setAvatar(pp)
  .setLevel(level)
  .setCurrentXP(crxp) 
  .setRequiredXP(requiredXpToLevelUp) 
  .setProgressBar('#db190b', 'COLOR') // Set progress bar color here
  .setDiscriminator(who.substring(3, 7))
  .setCustomStatusColor('#db190b')
  .setLevelColor('#FFFFFF', '#FFFFFF')
  .setOverlay('#000000')
  .setUsername(username)
  .setBackground('IMAGE', customBackground)
  .setRank(level, 'LEVEL', false)
  .renderEmojis(true)
  .build();

  const str = `🏮 *𝙉𝙤𝙢𝙗𝙧𝙚 𝙙𝙚 𝙪𝙨𝙪𝙖𝙧𝙞𝙤:* ${username}\n\n⭐ *𝙀𝙭𝙥𝙚𝙧𝙞𝙚𝙣𝙘𝙞𝙖:* ${crxp} / ${requiredXpToLevelUp}\n\n🏅 *𝙍𝙖𝙣𝙠:* *${role}*`

  try {
    conn.sendFile(m.chat, card, 'rank.jpg', str, m, false, { mentions: [who] });
    m.react('✅');
  } catch (error) {
    console.error(error);
  }}

handler.help = ['rank'];
handler.tags = ['economy'];
handler.command = ['rank','rango','estatus'];

export default handler;

