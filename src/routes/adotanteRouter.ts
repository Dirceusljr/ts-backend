import express, { RequestHandler }  from 'express';
import AdotanteRepository from '../repositories/AdotanteRepository';
import { appDataSource } from '../config/dataSource';
import AdotanteController from '../controller/AdotanteController';
import { middlewareAdotanteRequestBody } from '../middleware/validators/adotanteRequestBody';
import { middlewareEnderecoRequestBody } from '../middleware/validators/enderecoRequestBody';

const router = express.Router();

const adotanteRepository = new AdotanteRepository(
    appDataSource.getRepository('AdotanteEntity')
);

const adotanteController = new AdotanteController(adotanteRepository);

const validateBodyAdotante:RequestHandler = (req, res, next) => middlewareAdotanteRequestBody(req, res, next);
const validateBodyEndereco:RequestHandler = (req, res, next) => middlewareEnderecoRequestBody(req, res, next);

router
    .post('/', validateBodyAdotante, (req, res) => adotanteController.criaAdotante(req, res))
    .get('/', (req, res) => adotanteController.listaAdotantes(req, res))
    .put('/:id', (req, res) => adotanteController.atualizaAdotante(req, res))
    .delete('/:id', (req, res) => adotanteController.deletaAdotante(req, res))
    .patch('/:id', validateBodyEndereco, (req, res) => adotanteController.atualizaEnderecoAdotante(req, res))

export default router;