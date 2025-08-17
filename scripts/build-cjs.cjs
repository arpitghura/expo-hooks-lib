// scripts/build-cjs.cjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = readFileSync(`${__dirname}/../dist/index.js`, 'utf8');
const cjs = src
  .replaceAll('export {', 'module.exports = {')
  .replaceAll('export const ', 'const ')
  .replace('export default', 'module.exports.default =');
mkdirSync(`${__dirname}/../dist`, { recursive: true });
writeFileSync(`${__dirname}/../dist/index.cjs`, cjs);