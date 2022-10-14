import express from 'express';
import * as writersUsesCases from '../useCases/writers.use.js';
import {auth} from '../middlewares/auth.js';

const router = express.Router();
// La comunicación de fuera hacia dentro
// Endpoint -> Casos de uso -> Modelos

router.post('/', async(request, response, next) => {
    try {
        const {body: newWriter} = request
        await writersUsesCases.create(newWriter)

        response.json({
            success: true,
            message: '¡Writer creado!'
        })
    } catch (error) {
        // PENDING: reemplazar por el middleware del handleErrors -----------------------------
        // response.status(400)
        // response.json({
        //     success: false,
        //     message: error.message
        // })
        next(error)
    }
});


router.get('/', async (request, response, next) => {
    try {
        let allWriters;
        const page = request.query.page
        const limit = request.query.limit
        if(page && limit) {
            // console.log("1");
            allWriters = await writersUsesCases.getAllByPage(page, limit);
        } else {
            // console.log("2");
            allWriters = await writersUsesCases.getAll();
        }
        response.json({
            success: true,
            data: {
                writers: allWriters
            }
        })
    } catch (error) {
        // PENDING: reemplazar por el middleware del handleErrors -----------------------------
        // response.status(400)
        // response.json({
        //     success: false,
        //     message: error.message
        // })
        next(error)
    }
});

router.get('/:id', async (request, response, next) => {
    try {
        const {id} = request.params
        const writer = writersUsesCases.getById(id)

        response.json({
            success: true,
            data: {
                writer
            }
        })
    } catch (error) {
        // PENDING: reemplazar por el middleware del handleErrors -----------------------------
        // response.status(400)
        // response.json({
        //     success: false,
        //     message: error.message
        // })
        next(error)
    }
});

router.patch('/:id',  async (request, response, next) => {
    try {
        const {id} = request.params
        const {body} = request
        const writerUpdated = writersUsesCases.updateById(id,body)

        response.json({
            success: true,
            data: {
                writer: writerUpdated
            }
        })
    } catch (error) {
        // PENDING: reemplazar por el middleware del handleErrors -----------------------------
        // response.status(400)
        // response.json({
        //     success: false,
        //     message: error.message
        // })
        next(error)
    }
});


router.delete('/:id',  async(request, response, next) => {
    try {
        const {id} = request.params
        await writersUsesCases.deleteById(id)

        response.json({
            success: true,
            message: 'Writer eliminado'
        })
    } catch (error) {
        // PENDING: reemplazar por el middleware del handleErrors -----------------------------
        // response.status(400)
        // response.json({
        //     success: false,
        //     message: error.message
        // })
        next(error)
    }
});

export default router
