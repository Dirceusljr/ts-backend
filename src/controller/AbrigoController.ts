import e, { Request, Response } from "express";
import AbrigoEntity from "../entities/AbrigoEntity";
import AbrigoRepository from "../repositories/AbrigoRepository";
import EnderecoEntity from "../entities/EnderecoEntity";
import { TypeRequestBodyAbrigo, TypeRequestParamsAbrigo, TypeResponseBodyAbrigo } from "../types/typesAbrigo";
import { EnumHttpStatusCode } from "../enum/EnumHttpStatusCode";

export default class AbrigoController {
    constructor(private repository: AbrigoRepository) { }

    async criaAbrigo(req: Request<TypeRequestParamsAbrigo, {}, TypeRequestBodyAbrigo>, res: Response<TypeResponseBodyAbrigo>) {
        const { nome, senha, email, celular } = <AbrigoEntity>req.body;

        const novoAbrigo = new AbrigoEntity(
            nome,
            email,
            senha,
            celular
        );

        await this.repository.criarAbrigo(novoAbrigo);
        return res.status(201).json({ dados: { id: novoAbrigo.id, nome, celular, email } });
    }

    async listaAbrigos(req: Request<TypeRequestParamsAbrigo, {}, TypeRequestBodyAbrigo>, res: Response<TypeResponseBodyAbrigo>) {
        const listaAbrigos = await this.repository.listarAbrigos();
        const dados = listaAbrigos.map((abrigo) => {
            return {
                id: abrigo.id,
                nome: abrigo.nome,
                celular: abrigo.celular,
                endereco: abrigo.endereco,
                email: abrigo.email
            }
        })
        return res.status(200).json({ dados });
    }

    async atualizaAbrigo(req: Request<TypeRequestParamsAbrigo, {}, TypeRequestBodyAbrigo>, res: Response<TypeResponseBodyAbrigo>) {
        const { id } = req.params;
        await this.repository.atualizarAbrigo(
            Number(id),
            req.body as AbrigoEntity
        )

        return res.sendStatus(204)
    }

    async deletaAbrigo(req: Request<TypeRequestParamsAbrigo, {}, TypeRequestBodyAbrigo>, res: Response<TypeResponseBodyAbrigo>) {
        const { id } = req.params;
        await this.repository.deletarAbrigo(Number(id))

        return res.sendStatus(204)
    }

    async atualizaEnderecoAbrigo(req: Request<TypeRequestParamsAbrigo, {}, EnderecoEntity>, res: Response<TypeResponseBodyAbrigo>) {
        const { id } = req.params;
        await this.repository.atualizaEnderecoAbrigo(
            Number(id),
            req.body
        )

        return res.sendStatus(EnumHttpStatusCode.NO_CONTENT)
    }

}