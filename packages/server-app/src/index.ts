import express from 'express';
import { resolve } from 'path';
import AppContext from './app-context';

import WsServer from './ws-server';

const app = express();
const context = new AppContext();
const ws = new WsServer(context);
app.use('/public', express.static('public'));

app.get('/app', (req, res) => {
  res.sendFile(resolve('public/index.html'));
});

app.listen(3000, () => {
  console.log('up');
});
