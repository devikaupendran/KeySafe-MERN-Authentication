import express from 'express'
import { signup, signin, google } from '../controllers/auth.controller.js'

const router = express.Router()
// Middleware to parse JSON
router.use(express.json());

router.post('/signup',signup)
router.post('/signin',signin)
router.post('/google',google)

export default router