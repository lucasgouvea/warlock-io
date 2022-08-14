import { WebSocketServer } from 'ws';
import AppContext from './app-context';

class WsServer {
  private readonly perMessageDeflate = {
    zlibDeflateOptions: {
      // See zlib defaults.
      chunkSize: 1024,
      memLevel: 7,
      level: 3,
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024,
    },
    // Other options settable:
    clientNoContextTakeover: true, // Defaults to negotiated value.
    serverNoContextTakeover: true, // Defaults to negotiated value.
    serverMaxWindowBits: 10, // Defaults to negotiated value.
    // Below options specified as default values.
    concurrencyLimit: 10, // Limits zlib concurrency for perf.
    threshold: 1024, // Size (in bytes) below which messages
    // should not be compressed if context takeover is disabled.
  };

  constructor(context: AppContext) {
    const wss = new WebSocketServer({
      port: 8888,
      path: '/player',
      perMessageDeflate: this.perMessageDeflate,
    });

    wss.on('connection', (ws, message) => {
      /* const id = ws.url.split('/player?id=')[1]; */
      ws.on('message', (data) => {
        console.log('received: %s', data);
      });

      setInterval(() => {
        ws.send(context.serialize());
      }, 20);
    });
  }
}

export default WsServer;
