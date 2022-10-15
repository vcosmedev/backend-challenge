import express from 'express';
import * as writersUsesCases from '../useCases/writers.use.js';
import {auth} from '../middlewares/auth.js';
import {StatusHttp} from '../libs/errorCustom.js'

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
        next(new StatusHttp(error.message, error.status, error.name))
    }
});


router.get('/', auth, async (request, response, next) => {
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
            data: allWriters
        })
    } catch (error) {
        next(new StatusHttp(error.message, error.status, error.name))
    }
});

router.get('/:id', auth, async (request, response, next) => {
    try {
        const {id} = request.params
        let writer = await writersUsesCases.getById(id)
        if(!writer) writer = {}

        response.json({
            success: true,
            data: writer
        })
    } catch (error) {
        next(new StatusHttp(error.message, error.status, error.name))
    }
});

router.patch('/:id', auth, async(request, response, next) => {
    try {
        const {id} = request.params
        const {body} = request
        await writersUsesCases.updateById(id,body)

        response.json({
            success: true,
            message: '¡Writer actualizado!'
        })
    } catch (error) {
        next(new StatusHttp(error.message, error.status, error.name))
    }
});


router.delete('/:id', auth, async(request, response, next) => {
    try {
        const {id} = request.params
        await writersUsesCases.deleteById(id)

        response.json({
            success: true,
            message: 'Writer eliminado'
        })
    } catch (error) {
        next(new StatusHttp(error.message, error.status, error.name))
    }
});

export default router
