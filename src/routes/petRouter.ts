import express from 'express';
import PetController from '../controller/PetController';

const router = express.Router();

const petController = new PetController();

router
    .post('/', petController.criaPet)
    .get('/', petController.listaPets)
    .put('/:id', petController.atualizaPet)
    .delete('/:id', petController.deletaPet)

export default router;
