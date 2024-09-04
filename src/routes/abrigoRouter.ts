import express, { RequestHandler }  from 'express';
import AbrigoRepository from '../repositories/AbrigoRepository';
import { appDataSource } from '../config/dataSource';
import AbrigoController from '../controller/AbrigoController';
import { middlewareEnderecoRequestBody } from '../middleware/validators/enderecoRequestBody';
import { middlewareAbrigoRequestBody } from '../middleware/validators/abrigoRequestBody';
import { verificaId } from '../middleware/verificaId';

const router = express.Router();

const adotanteRepository = new AbrigoRepository(
    appDataSource.getRepository('AbrigoEntity')
);

const adotanteController = new AbrigoController(adotanteRepository);

const validateBodyAbrigo:RequestHandler = (req, res, next) => middlewareAbrigoRequestBody(req, res, next);
const validateBodyEndereco:RequestHandler = (req, res, next) => middlewareEnderecoRequestBody(req, res, next);

router
    .post('/', validateBodyAbrigo, (req, res) => adotanteController.criaAbrigo(req, res))
    .get('/', (req, res) => adotanteController.listaAbrigos(req, res))
    .put('/:id', verificaId, (req, res) => adotanteController.atualizaAbrigo(req, res))
    .delete('/:id', verificaId, (req, res) => adotanteController.deletaAbrigo(req, res))
    .patch('/:id', verificaId, validateBodyEndereco, (req, res) => adotanteController.atualizaEnderecoAbrigo(req, res))

export default router;