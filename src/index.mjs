import express from 'express';
import { resolve } from 'path';

const app = express();

app.use('/public', express.static('public'));

app.get('/app', (req, res) => {
  res.sendFile(resolve('public/index.html'));
});

app.listen(3000, () => {
  console.log('up');
});
