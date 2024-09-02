import { Request, Response } from "express";
import AdotanteEntity from "../entities/AdotanteEntity";
import AdotanteRepository from "../repositories/AdotanteRepository";
import EnderecoEntity from "../entities/EnderecoEntity";
import { TypeRequestBodyAdotante, TypeRequestParamsAdotante, TypeResponseBodyAdotante } from "../types/typesAdotante";

export default class AdotanteController {
    constructor(private repository: AdotanteRepository) { }

    async criaAdotante(req: Request<TypeRequestParamsAdotante, {}, TypeRequestBodyAdotante>, res: Response<TypeResponseBodyAdotante>) {
        const { nome, senha, foto, celular, endereco } = <AdotanteEntity>req.body;

        const novoAdotante = new AdotanteEntity(
            nome,
            senha,
            celular,
            endereco,
            foto
        );

        await this.repository.criarAdotante(novoAdotante);
        return res.status(201).json({ data: { id: novoAdotante.id, nome, celular } });
    }

    async listaAdotantes(req: Request<TypeRequestParamsAdotante, {}, TypeRequestBodyAdotante>, res: Response<TypeResponseBodyAdotante>) {
        const listaAdotantes = await this.repository.listarAdotantes();
        const data = listaAdotantes.map((adotante) => {
            return {
                id: adotante.id,
                nome: adotante.nome,
                celular: adotante.celular
            }
        })
        return res.status(200).json({data});
    }

    async atualizaAdotante(req: Request<TypeRequestParamsAdotante, {}, TypeRequestBodyAdotante>, res: Response<TypeResponseBodyAdotante>) {
        const { id } = req.params;
        const { success, message } = await this.repository.atualizarAdotante(
            Number(id),
            req.body as AdotanteEntity
        )

        if (!success) {
            return res.status(404).json({erro: message })
        }
        return res.sendStatus(204)
    }

    async deletaAdotante(req: Request<TypeRequestParamsAdotante, {}, TypeRequestBodyAdotante>, res: Response<TypeResponseBodyAdotante>) {
        const { id } = req.params;
        const { success, message } = await this.repository.deletarAdotante(Number(id))

        if (!success) {
            return res.status(404).json({erro: message })
        }

        return res.sendStatus(204)
    }

    async atualizaEnderecoAdotante(req: Request<TypeRequestParamsAdotante, {}, TypeRequestBodyAdotante>, res: Response<TypeResponseBodyAdotante>) {
        const { id } = req.params;
        const { success, message } = await this.repository.atualizaEnderecoAdotante(
            Number(id),
            req.body.endereco as EnderecoEntity
        )

        if (!success) {
            return res.status(404).json({erro: message })
        }

        return res.sendStatus(204)
    }

}