import express from 'express';
import { resolve } from 'path';
import AppServer from './servers/app-server';

import WsServer from './servers/ws-server';

const app = express();
const ws = new WsServer();
app.use('/public', express.static('public'));

app.get('/app', (req, res) => {
  res.sendFile(resolve('public/index.html'));
});

app.listen(3000, () => {
  console.log('up');
});

const appServer = new AppServer();
