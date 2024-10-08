import { join, dirname } from 'path'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import { setupMaster, fork } from 'cluster'
import { watchFile, unwatchFile } from 'fs'
import figlet from 'figlet'
import { createInterface } from 'readline'
import yargs from 'yargs'
import chalk from 'chalk'
import { promises as fsPromises } from 'fs'

let __dirname = dirname(fileURLToPath(import.meta.url))
let require = createRequire(__dirname)
let rl = createInterface(process.stdin, process.stdout)

figlet.text('REM CHAM', {
    font: 'Standard', 
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true
}, function(err, data) {
    if (err) {
        console.log('Algo salió mal con figlet...');
        console.dir(err);
        return;
    }
    console.log(chalk.cyanBright(data));
});

var isRunning = false

async function start(files) {
  if (isRunning) return
  isRunning = true
  
  for (const file of files) {
    const currentFilePath = new URL(import.meta.url).pathname
    let args = [join(__dirname, file), ...process.argv.slice(2)]

    setupMaster({
      exec: args[0],
      args: args.slice(1),
    })
    
    let p = fork()
    p.on('message', data => {
      console.log('[RECEIVED]', data)
      switch (data) {
        case 'reset':
          p.process.kill()
          isRunning = false
          start(files)
          break
        case 'uptime':
          p.send(process.uptime())
          break
      }
    })
    
    p.on('exit', (_, code) => {
      isRunning = false
      console.error('Ocurrió un error inesperado:', code)
      start(files)

      if (code === 0) return
      watchFile(args[0], () => {
        unwatchFile(args[0])
        start(files)
      })
    })
    
    let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
    if (!opts['test'])
      if (!rl.listenerCount()) rl.on('line', line => {
        p.emit('message', line.trim())
      })
  }
}

start(['remcham.js'])
