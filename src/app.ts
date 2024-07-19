import express, { Application, Request, Response } from 'express'
import * as os from 'os'
import { IRoute } from './definitions/IRoute'

const PORT = process.env.PORT || "8080"

class App {
  app: express.Application;

  constructor(routes: IRoute[]) {
    this.app = express();
    this.initializeRoutes(routes);
  }

  private initializeRoutes(routes: IRoute[]) {
    routes.forEach((route) => {
      this.app.use("/api/", route.router);
    });
  }

  listen() {
    this.app.listen(PORT, () =>
      console.log(`🚀 Llama3 Model Local Server started at http://${os.hostname()}:${PORT}`)
    );
  }

  get server() {
    return this.app;
  }
}

export default App;

