// Definición de nuestro servidor (aquí no se levanta, solo se establecen la configuración)

import express from 'express';
import writersRouter from './routers/writers.router.js';


// import authRouter from './routers/auth.router.js'

const server = express();

// Middlewares
server.use(express.json()); // Permite extraer JSON

// Routers
server.use('/writers', writersRouter);
// server.use('auth', authRouter)


// Exportar servidor para que pueda ser usado en index.js
export {server}