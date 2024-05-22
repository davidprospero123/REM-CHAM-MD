import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { Server } from 'socket.io';
import { toBuffer } from 'qrcode';
import fetch from 'node-fetch';

function connect(conn, PORT, opts = {}) {
    const app = express();
    const server = createServer(app);
    let _qr = 'invalid';

    conn.ev.on('connection.update', ({ qr }) => {
        if (qr) _qr = qr;
    });

    app.get('/', async (req, res) => {
        res.setHeader('Content-Type', 'image/png');
        res.end(await toBuffer(_qr));
    });

    // Uncomment the following block to enable socket.io functionality
    // const io = new Server(server);
    // io.on('connection', socket => {
    //     const { unpipeEmit } = pipeEmit(conn, socket, 'conn-');
    //     socket.on('disconnect', unpipeEmit);
    // });

    server.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
        if (opts.keepalive) keepAlive();
    });
}

function pipeEmit(event, event2, prefix = '') {
    const originalEmit = event.emit;
    event.emit = function (eventName, ...args) {
        originalEmit.call(event, eventName, ...args);
        event2.emit(`${prefix}${eventName}`, ...args);
    };
    return {
        unpipeEmit() {
            event.emit = originalEmit;
        }
    };
}

function keepAlive() {
    const url = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;
    if (/(\/\/|\.)undefined\./.test(url)) return;
    setInterval(() => {
        fetch(url).catch(console.error);
    }, 5 * 60 * 1000); // 5 minutes interval
}

export default connect;
