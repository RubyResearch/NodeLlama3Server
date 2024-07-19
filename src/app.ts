import express, { Application, Request, Response } from 'express'
import bodyParser from "body-parser";
import * as os from 'os'
import { IRoute } from './definitions/IRoute'

const PORT = process.env.PORT || "8080"

class App {
  app: express.Application;

  constructor(routes: IRoute[]) {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
  }

  private initializeMiddlewares() {
    this.app.use(
      bodyParser.json()
    );
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

