import express, { RequestHandler } from 'express';
import PetController from '../controller/PetController';
import PetRepository from '../repositories/PetRepository';
import { appDataSource } from '../config/dataSource';
import { middlewarePetRequestBody } from "../middleware/validators/petRequestBody"; 
import { verificaId } from '../middleware/verificaId';

const router = express.Router();

const petRepository = new PetRepository(
    appDataSource.getRepository('PetEntity'),
    appDataSource.getRepository('PetEntity')    
    );

const petController = new PetController(petRepository);


const validateBodyPet:RequestHandler = (req, res, next) => middlewarePetRequestBody(req, res, next);

router
    .post('/',validateBodyPet, (req, res) => petController.criaPet(req, res))
    .get('/', (req, res) => petController.listaPets(req, res))
    .put('/:id', verificaId, (req, res) => petController.atualizaPet(req, res))
    .delete('/:id', verificaId, (req, res) => petController.deletaPet(req, res))
    .put('/:pet_id/:adotante_id', verificaId, (req, res) => petController.adotaPet(req, res))
    .get('/filtro', (req, res) => petController.buscaPetPeloCampoGenerico(req, res))

export default router;
