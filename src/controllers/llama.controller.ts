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

      res.status(200).json({ content: result });
    } catch (error) {
      next(error);
    }
  };
}

export default LlamaController;
