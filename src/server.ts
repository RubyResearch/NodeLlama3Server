import App from './app'
import LlamaRoute from './routes/llama.route';

const app = new App([new LlamaRoute()]);

app.listen();
