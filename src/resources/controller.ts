import { Request, Response, NextFunction } from 'express'
import { getCompletionResponse } from '../services/nodeLlamaService'


const chatCompletions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { model, messages } = req.body;
    // console.log(messages[0].content)
    const result = getCompletionResponse("what is crypto?")

    console.log("result:", result)
    
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}




export default {
  chatCompletions
}
