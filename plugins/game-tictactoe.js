import TicTacToe from '../lib/tictactoe.js'

let handler = async (m, { conn, usedPrefix, command, text }) => {
    conn.game = conn.game ? conn.game : {}
    if (Object.values(conn.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))) throw `✳️ Aún estás en el juego para reiniciar la sesión escribe : *${usedPrefix}delttt*`
    if (!text) throw `✳️ Pon un número en la habitación`
    let room = Object.values(conn.game).find(room => room.state === 'ESPERANDO' && (text ? room.name === text : true))
    // m.reply('[WIP Feature]')
    if (room) {
        m.reply('✅ Compañero encontrado')
        room.o = m.chat
        room.game.playerO = m.sender
        room.state = 'JUGANDO'
        let arr = room.game.render().map(v => {
            return {
                X: '❎',
                O: '⭕',
                1: '1️⃣',
                2: '2️⃣',
                3: '3️⃣',
                4: '4️⃣',
                5: '5️⃣',
                6: '6️⃣',
                7: '7️⃣',
                8: '8️⃣',
                9: '9️⃣',
            }[v]
        })
        let str = `
Esperando @${room.game.currentTurn.split('@')[0]} Como primer jugador
        
${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}

▢ *ID de habitación* ${room.id}

▢ *Normas*
‣ Haz 3 filas de símbolos vertical, horizontal o diagonalmente para ganar ‣ Escribe *rendirse* para salir del juego y ser declarado derrotado.
`.trim()
        if (room.x !== room.o) await conn.reply(room.x, str, m, {
            mentions: conn.parseMention(str)
        })
        await conn.reply(room.o, str, m, {
            mentions: conn.parseMention(str)
        })
    } else {
        room = {
            id: 'tictactoe-' + (+new Date),
            x: m.chat,
            o: '',
            game: new TicTacToe(m.sender, 'o'),
            state: 'ESPERANDO'
        }
        if (text) room.name = text
        
        conn.reply(m.chat, `⏳ *esperando pareja*\nEscriba el siguiente comando para aceptar
▢ *${usedPrefix + command} ${room.name}*

🎁 Reward:  *4999 XP*`, m, {
            mentions: conn.parseMention(room.name)
        })
        
        conn.game[room.id] = room
    }
    
}

handler.help = ['tictactoe <tag number>']
handler.tags = ['game']
handler.command = ['tictactoe', 'ttc', 'ttt', 'xo']

export default handler
