import { Router } from 'express'
import userController from '../resources/controller'

const router: Router = Router()


router.route('/chat/completions').get(userController.chatCompletions)
// router.route('/embeddings').get(userController.getAll)



export default router
