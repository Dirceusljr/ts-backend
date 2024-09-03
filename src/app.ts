import "express-async-errors"
import express from "express";
import router from "./routes";
import "reflect-metadata"
import { appDataSource } from "./config/dataSource";
import { erroMiddleware } from "./middleware/erroMiddleware";

const app = express();
app.use(express.json());
router(app);

app.get('/teste', (req, res) => {
    throw new Error('Erro ao acessar a rota raiz');
})

app.use(erroMiddleware);

appDataSource.initialize()
    .then(() => {
        console.log('Banco de dados conectado.');
    })
    .catch((erro) => {
        console.log(erro)
    })

export default app;
