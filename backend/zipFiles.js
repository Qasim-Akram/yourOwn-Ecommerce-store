import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

const outputDir = path.resolve('./');
const zipFilePrefix = 'ecommerce-backend-';

const getNextZipId = () => {
  const files = fs.readdirSync(outputDir);
  const zipFiles = files.filter(file => file.startsWith(zipFilePrefix) && file.endsWith('.zip'));
  const ids = zipFiles.map(file => parseInt(file.replace(zipFilePrefix, '').replace('.zip', ''), 10)).filter(Number.isInteger);
  return ids.length > 0 ? Math.max(...ids) + 1 : 1;
};

const zipId = getNextZipId();
const zipFileName = `${zipFilePrefix}${zipId}.zip`;
const output = fs.createWriteStream(path.join(outputDir, zipFileName));
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log(`${zipFileName} has been created. Total size: ${archive.pointer()} bytes`);
});

archive.on('error', err => {
  throw err;
});

archive.pipe(output);

archive.glob('**/*', {
  cwd: outputDir,
  dot: true,
  ignore: [
    'node_modules/**',
    'database.sqlite',
    `${zipFilePrefix}*.zip`
  ]
});

archive.finalize();
