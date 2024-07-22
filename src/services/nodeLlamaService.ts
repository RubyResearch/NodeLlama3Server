import {fileURLToPath} from "url";
import path from "path";
// import {LlamaModel, LlamaContext, LlamaChatSession, LlamaJsonSchemaGrammar} from "node-llama-cpp";
import {getLlama, LlamaChatSession, LlamaJsonSchemaGrammar} from "node-llama-cpp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface GrammarData {
    content: String
}


const getCompletionResponse = async ({answer, temperature}) => {
    const llama = await getLlama();
    const model = await llama.loadModel({
        modelPath: path.join(__dirname, "models", "Meta-Llama-3-8B-Instruct.Q2_K.gguf")
    });
    const context = await model.createContext();
    const session = new LlamaChatSession({
        contextSequence: context.getSequence()
    });
    const grammar = new LlamaJsonSchemaGrammar(llama, {
        "type": "object",
        "properties": {
            "user": {
                "type": "string"
            },
            "content": {
                "type": "string"
            },
            "action": {
                "type": "string"
            }
        }
    });

    const response = await session.prompt(answer, {
        grammar,
        temperature: Number(temperature)
    });

    const parsedResponse: GrammarData = grammar.parse(response);


    console.log("AI: " + parsedResponse);
    return parsedResponse
}

const getEmbeddingResponse = async (input :string) => {
    const llama = await getLlama();
    const model = await llama.loadModel({
        modelPath: path.join(__dirname, "models", "Meta-Llama-3-8B-Instruct.Q2_K.gguf")
    });
    const embeddingContext = await model.createEmbeddingContext();

    const embedding = await embeddingContext.getEmbeddingFor(input);
    return embedding?.vector
}

export {
    getCompletionResponse,
    getEmbeddingResponse
}
