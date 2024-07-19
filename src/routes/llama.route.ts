import BaseRoute from "./base.route";
import LlamaController from "../controllers/llama.controller";

class LlamaRoute extends BaseRoute {
  public path = "";
  public controller = new LlamaController();

  constructor() {
    super();

    this.routes = [
      {
        method: "post",
        route: "/chat/completions",
        controller: this.controller.chatCompletions,
        middlewares: [],
      }
    ];

    this.initializeRoutes();
  }
}

export default LlamaRoute;
