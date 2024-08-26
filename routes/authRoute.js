import express from 'express'
import {
  registerController,
  loginController, // Correct spelling here
  testController,
} from '../controllers/authControllers.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'

// Router object
const router = express.Router()

// Routing
// Register || Method POST
router.post('/register', registerController)

// LOGIN || POST
router.post('/login', loginController) // Correct spelling here

// Test route
router.get('/test', requireSignIn, isAdmin, testController)

export default router
