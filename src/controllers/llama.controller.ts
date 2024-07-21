import { Request, Response, NextFunction } from 'express'
import { getCompletionResponse } from '../services/nodeLlamaService'

class LlamaController {
  public chatCompletions = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // const { model, messages } = req.body;

      // get response from Llama3 model
      const result = await getCompletionResponse("what is crypto?")
      const messageContent = `json\`\`\`\n` + `{"user": "r_cubed", "content": "${result}", "action": "ELABORATE" }` + `\n\`\`\``

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

      const sampleRes = {
        "object": "list",
        "data": [
          {
            "object": "embedding",
            "index": 0,
            "embedding": [
              -0.006929283495992422,
              -0.005336422007530928,
              -4.547132266452536e-05,
              -0.024047505110502243
            ],
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
