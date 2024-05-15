import Helper from './helper.js';
import { promises as fs } from 'fs';
import { tmpdir, platform } from 'os';
import { join } from 'path';

const maxtime = 1000 * 60 * 2;

const __dirname = Helper.__dirname(import.meta);

export default async function clearTmp() {
  const tmp = [tmpdir(), join(__dirname, '../tmp')];
  const deletedFiles = []; 

  await Promise.allSettled(
    tmp.map(async (dir) => {
      const files = await fs.readdir(dir);
      for (const file of files) {
        if (!file.endsWith('.file')) {
          const filePath = join(dir, file);
          const stat = await fs.stat(filePath);
          if (stat.isFile() && Date.now() - stat.mtimeMs >= maxtime) {
            // Check if the file can be opened (Windows-specific)
            if (platform() === 'win32') {
              let fileHandle;
              try {
                fileHandle = await fs.open(filePath, 'r+');
              } catch (e) {
                
                console.error('[𝙱𝚘𝚛𝚛𝚊𝚗𝚍𝚘 𝚊𝚛𝚌𝚑𝚒𝚟𝚘𝚜 𝙱𝚊𝚜𝚞𝚛𝚊] Error opening file:', e.message);
                continue;
              } finally {
                await fileHandle?.close();
              }
            }
            
            await fs.unlink(filePath);
            deletedFiles.push(filePath); 
          }
        }
      }
    })
  );

  
  console.log('\x1b[34m%s\x1b[0m', `[𝙱𝚘𝚛𝚛𝚊𝚗𝚍𝚘 𝚊𝚛𝚌𝚑𝚒𝚟𝚘𝚜 𝙱𝚊𝚜𝚞𝚛𝚊] 𝙱𝚘𝚛𝚛𝚊𝚖𝚘𝚜 ${deletedFiles.length} 𝙰𝚛𝚌𝚑𝚒𝚟𝚘𝚜.`);
}
