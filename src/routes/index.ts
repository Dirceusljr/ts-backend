import express from 'express';
import petRouter from './petRouter'
import adotanteRouter from './adotanteRouter'
import abrigoRouter from './abrigoRouter'

const router = (app:  express.Router) => {
    app.use('/pets', petRouter)
    .use('/adotantes', adotanteRouter)
    .use('/abrigos', abrigoRouter)
    
}

export default router;