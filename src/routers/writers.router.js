import express from 'express';
import * as writersUsesCases from '../useCases/writers.use.js';
import {auth} from '../middlewares/auth.js';

const router = express.Router();
// La comunicación de fuera hacia dentro
// Endpoint -> Casos de uso -> Modelos

router.post('/', async(request, response, next) => {
    try {
        const {body: newKoder} = request
        await writersUsesCases.create(newKoder)

        response.json({
            success: true,
            message: '¡Writer creado!'
        })
    } catch (error) {
        // PENDING: reemplazar por el middleware del handleErrors
        response.status(400)
        response.json({
            success: false,
            message: error.message
        })
    }
});

router.get('/', auth, async (request, response, next) => {
    try {
        const allKoders = await kodersUsesCases.getAll()
        response.json({
            success: true,
            data: {
                koders: allKoders
            }
        })
    } catch (error) {
        // PENDING: reemplazar por el middleware del handleErrors
        response.status(400)
        response.json({
            success: false,
            message: error.message
        })
    }
})

router.get('/:id', auth, async (request, response, next) => {
    try {
        const {id} = request.params
        const koder = kodersUsesCases.getById(id)

        response.json({
            success: true,
            data: {
                koder
            }
        })
    } catch (error) {
        // PENDING: reemplazar por el middleware del handleErrors
        response.status(400)
        response.json({
            success: false,
            message: error.message
        })
    }
})

router.patch('/:id',auth,  async (request, response, next) => {
    try {
        const {id} = request.params
        const {body} = request
        const koderUpdated = kodersUsesCases.updateById(id,body)

        response.json({
            success: true,
            data: {
                koder: koderUpdated
            }
        })
    } catch (error) {
        // PENDING: reemplazar por el middleware del handleErrors
        response.status(400)
        response.json({
            success: false,
            message: error.message
        })
    }
})


router.delete('/:id',auth,  async(request, response) => {
    try {
        const {id} = request.params
        await kodersUsesCases.deleteById(id)

        response.json({
            success: true,
            message: 'Koder eliminado'
        })
    } catch (error) {
        // PENDING: reemplazar por el middleware del handleErrors
        response.status(400)
        response.json({
            success: false,
            message: error.message
        })
    }
})


export default router


