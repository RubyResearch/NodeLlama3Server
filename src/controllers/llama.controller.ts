import { Request, Response, NextFunction } from 'express'
import { getCompletionResponse, getEmbeddingResponse } from '../services/nodeLlamaService'

class LlamaController {
  public chatCompletions = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      console.log("completion method")
      console.log(req.body, req.params, req.originalUrl)
      const message = req.body.messages[0]
      const temperature = req.body.temperature

      // get response from Llama3 model
      const result = await getCompletionResponse({
        answer: message.content,
        temperature: temperature
      })
      const messageContent = `json\`\`\`\n` + `${result}` + `\n\`\`\``

      const sampleRes = {
        "choices": [
          {
            "finish_reason": "stop",
            "index": 0,
            "message": {
              "content": messageContent,
              "role": "assistant"
            },
            "logprobs": null
          }
        ],
        "created": 1677664795,
        "id": "chatcmpl-7QyqpwdfhqwajicIEznoc6Q47XAyW",
        "model": "gpt-4o-mini",
        "object": "chat.completion",
        "usage": {
          "completion_tokens": 17,
          "prompt_tokens": 57,
          "total_tokens": 74
        }
      }

      res.status(200).json(sampleRes);
    } catch (error) {
      next(error);
    }
  };

  public embedding = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      console.log("embedding method")
      console.log(req.body, req.params, req.originalUrl)
      const input = req.body.input

      // get embedding vector of input string.
      const vectorData = await getEmbeddingResponse(input)

      const sampleRes = {
        "object": "list",
        "data": [
          {
            "object": "embedding",
            "index": 0,
            "embedding": vectorData,
          }
        ],
        "model": "text-embedding-3-small",
        "usage": {
          "prompt_tokens": 5,
          "total_tokens": 5
        }
      }
      
      res.status(200).json(sampleRes);
    } catch (error) {
      next(error);
    }
  };
}

export default LlamaController;
