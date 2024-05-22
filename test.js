import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import syntaxError from 'syntax-error';
import assert from 'assert';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = require(packageJsonPath);
const folders = ['.', ...Object.keys(packageJson.directories || {})];

const jsFiles = folders.flatMap(folder => {
    const folderPath = path.resolve(__dirname, folder);
    if (fs.existsSync(folderPath)) {
        return fs.readdirSync(folderPath)
            .filter(file => file.endsWith('.js'))
            .map(file => path.resolve(folderPath, file));
    }
    return [];
});

jsFiles.forEach(file => {
    if (file === __filename) return;

    console.error('Checking', file);
    const fileContent = fs.readFileSync(file, 'utf8');
    const error = syntaxError(fileContent, file, {
        sourceType: 'module',
        allowReturnOutsideFunction: true,
        allowAwaitOutsideFunction: true
    });

    if (error) {
        console.error(`Syntax error in file: ${file}\n`, error);
        process.exit(1);
    }

    console.log('Done', file);
});
