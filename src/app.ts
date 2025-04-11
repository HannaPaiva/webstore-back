import api from './api/api.js';
import dotenv from 'dotenv';

dotenv.config();

class App {
  private apiPort: string | number;

  constructor() {
    this.apiPort = process.env.API_PORT || 3000;
  }

  public start() {
    api.listen(this.apiPort, () => {
      console.log(`ExpressJS Started | PORT: ${this.apiPort}`);
    });
  }

}

const app = new App();
app.start();
