export async function all(m) {
	
  // when someone sends a group link to the bot's dm
  if ((m.mtype === 'groupInviteMessage' || m.text.startsWith('https://chat') || m.text.startsWith('open this link')) && !m.isBaileys && !m.isGroup) {
   this.sendMessage(m.chat,{text:`𝙷𝚘𝚕𝚊 @${m.sender.split('@')[0]}\n𝚟𝚎𝚘 𝚚𝚞𝚎 𝚎𝚜𝚝𝚊𝚜 𝚒𝚗𝚝𝚎𝚗𝚝𝚊𝚍𝚘 𝚞𝚗𝚒𝚛 𝚎𝚕 𝚋𝚘𝚝 𝚊 𝚞𝚗 𝚐𝚛𝚞𝚙𝚘 𝚢 𝚎𝚜𝚝𝚊 𝚋𝚒𝚎𝚗 𝚙𝚎𝚛𝚘 𝚙𝚊𝚛𝚊 𝚎𝚕𝚕𝚘 𝚍𝚎𝚋𝚎𝚜 𝚌𝚘𝚖𝚞𝚗𝚒𝚌𝚊𝚛𝚝𝚎 𝚌𝚘𝚗 𝚖𝚒 𝚌𝚛𝚎𝚊𝚍𝚘𝚛 𝚘 𝚎𝚕 𝚚𝚞𝚎 𝚎𝚜𝚝𝚊 𝚎𝚓𝚎𝚌𝚞𝚝𝚊𝚗𝚍𝚘 𝚎𝚕 𝚋𝚘𝚝 :𝚌\n\n_𝚄𝚜𝚊 𝚎𝚜𝚝𝚎 𝚌𝚘𝚖𝚊𝚗𝚍𝚘 𝚙𝚊𝚛𝚊 𝚑𝚊𝚋𝚕𝚊𝚛 𝚌𝚘𝚗 𝚖𝚒 𝚙𝚛𝚘𝚙𝚒𝚎𝚝𝚊𝚛𝚒𝚘 :𝟹_\n*HACI* \`\`\`.owner\`\`\` *𝚝𝚎 𝚍𝚊𝚛𝚎 𝚎𝚕 𝚌𝚘𝚗𝚝𝚊𝚌𝚝𝚘*`.trim()}, {quoted:m});
   /*this.sendButton(m.chat, `*Invite bot to a group*      
    Hallo @${m.sender.split('@')[0]} 
    you can rent the bot to join a group or contact owner 
    more info click on the button
  `.trim(), igfg, null, [['Rent', '/buyprem']] , m, { mentions: [m.sender] })*/
   m.react('💎')
} 

 return !0
}
