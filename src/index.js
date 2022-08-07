import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use('/public', express.static('public'));

/*

var path = require('path');
res.sendFile(path.resolve('temp/index.html'));
*/

app.get('/app', (req, res) => {
  res.sendFile(resolve('public/index.html'));
});

app.listen(3000, () => {
  console.log('up');
});
