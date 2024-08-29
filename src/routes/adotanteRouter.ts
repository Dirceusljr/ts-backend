import express  from 'express';
import AdotanteRepository from '../repositories/AdotanteRepository';
import { appDataSource } from '../config/dataSource';
import AdotanteController from '../controller/AdotanteController';

const router = express.Router();

const adotanteRepository = new AdotanteRepository(
    appDataSource.getRepository('AdotanteEntity')
);

const adotanteController = new AdotanteController(adotanteRepository);

router
    .post('/', (req, res) => adotanteController.criaAdotante(req, res))
    .get('/', (req, res) => adotanteController.listaAdotantes(req, res))
    .put('/:id', (req, res) => adotanteController.atualizaAdotante(req, res))
    .delete('/:id', (req, res) => adotanteController.deletaAdotante(req, res))
    .patch('/:id', (req, res) => adotanteController.atualizaEnderecoAdotante(req, res))

export default router;