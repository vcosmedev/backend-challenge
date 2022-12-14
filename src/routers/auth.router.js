import express from 'express'
import * as authUseCases from '../useCases/auth.use.js'

const router = express.Router()

router.post('/login', async (request, response, next) => {
    try {
        const {email, password} = request.body
        const token = await authUseCases.login(email, password)
        response.json({
            success: true,
            token
        })
    } catch (error) {
        next(error)
    }
})



export default router