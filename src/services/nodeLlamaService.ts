import {fileURLToPath} from "url";
import path from "path";
import {LlamaModel, LlamaContext, LlamaChatSession} from "node-llama-cpp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const model = new LlamaModel({
    // modelPath: path.join(__dirname, "models", "codellama-13b.Q3_K_M.gguf")
    modelPath: path.join(__dirname, "models", "Meta-Llama-3-8B-Instruct.Q2_K.gguf")
});
const context = new LlamaContext({model});
const session = new LlamaChatSession({context});


const getCompletionResponse = async (answer :string) => {
    const response = await session.prompt(answer);
    console.log("AI: " + response);
    return response
}

export {
    getCompletionResponse
}
