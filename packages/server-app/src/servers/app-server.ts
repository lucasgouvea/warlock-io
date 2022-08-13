import AppContext from '../app-context';

class AppServer {
  constructor() {
    const context = new AppContext();
    setInterval(() => console.log('tick'), 20);
  }
}

export default AppServer;
