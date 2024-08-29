import express from 'express';
import petRouter from './petRouter'
import adotanteRouter from './adotanteRouter'

const router = (app:  express.Router) => {
    app.use('/pets', petRouter)
    .use('/adotantes', adotanteRouter)
    
}

export default router;