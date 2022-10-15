// Definición de nuestro servidor (aquí no se levanta, solo se establecen la configuración)

import express from 'express';
// import cors from 'cors'
import writersRouter from './routers/writers.router.js';
import {errorHandle} from './middlewares/errorHandle.js'
import postsRouter from './routers/posts.router.js'
import commentsRouter from './routers/comments.router.js'
import authRouter from './routers/auth.router.js'


const server = express();

// Middlewares
server.use(express.json()); // Permite extraer JSON

// Routers
server.use('/posts', postsRouter)
server.use('/writers', writersRouter);
server.use('/auth', authRouter)
server.use('/comments', commentsRouter)

// Middleware para manejar errores - Middleware handleErros
server.use(errorHandle)

// Exportar servidor para que pueda ser usado en index.js
export {server}






// apartir de aqui irian los middlewares




