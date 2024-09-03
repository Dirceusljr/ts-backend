import { Request, Response } from "express";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";
import EnumPorte from "../enum/EnumPorte";
import { TypeRequestBodyPet, TypeRequestParamsPet, TypeResponseBodyPet } from "../types/typesPet";

export default class PetController {
    constructor(
        private repository: PetRepository
    ) { }

    async criaPet(req: Request<TypeRequestParamsPet, {}, TypeRequestBodyPet>, res: Response<TypeResponseBodyPet>) {
        const { nome, especie, dataDeNascimento, adotado, porte } = <PetEntity>req.body;

        if (!Object.values(EnumEspecie).includes(especie)) {
            return res.status(400).json({ erros: "Espécie inválida."} );
        }

        if (porte && !(porte in EnumPorte)) {
            return res.status(400).json({ erros: "Porte inválido." });
        }

        const novoPet = new PetEntity(
            nome,
            especie,
            dataDeNascimento,
            adotado,
            porte
        );

        await this.repository.criaPet(novoPet);
        return res.status(201).json({dados: { id: novoPet.id, nome, especie, porte}});
    }

    async listaPets(req: Request<TypeRequestParamsPet, {}, TypeRequestBodyPet>, res: Response<TypeResponseBodyPet>) {
        const listaPets = await this.repository.listaPets();
        const dados = listaPets.map((pet) => {
            return {
                id: pet.id,
                nome: pet.nome,
                especie: pet.especie,
                porte: pet.porte !==null? pet.porte : undefined
            }
        })
        return res.status(200).json({dados});
    }

    async atualizaPet(req: Request<TypeRequestParamsPet, {}, TypeRequestBodyPet>, res: Response<TypeResponseBodyPet>) {
        const { id } = req.params;
        const { success, message } = await this.repository.atualizaPet(
            Number(id),
            req.body as PetEntity
        )

        if (!success) {
            return res.status(404).json({ erros: message })
        }
        return res.sendStatus(204)
    }

    async deletaPet(req: Request<TypeRequestParamsPet, {}, TypeRequestBodyPet>, res: Response<TypeResponseBodyPet>) {
        const { id } = req.params;
        const { success, message } = await this.repository.deletaPet(
            Number(id)
        )

        if (!success) {
            return res.status(404).json({ erros: message })
        }
        return res.sendStatus(204)
    }

    async adotaPet(req: Request<TypeRequestParamsPet, {}, TypeRequestBodyPet>, res: Response<TypeResponseBodyPet>) {
        const { pet_id, adotante_id } = req.params

        const { success, message } = await this.repository.adotaPet(
            Number(pet_id),
            Number(adotante_id)
        )

        if (!success) {
            return res.status(404).json({ erros: message })
        }
        return res.sendStatus(204)
    }

    async buscaPetPeloCampoGenerico(req: Request, res: Response) {
        const { campo, valor } = req.query;
        const listaPets = await this.repository.buscaPeloCampoGenerico(campo as keyof PetEntity, valor as string);
        const dados = listaPets.map((pet) => {
            return {
                id: pet.id,
                nome: pet.nome,
                especie: pet.especie,
                porte: pet.porte !==null? pet.porte : undefined,
                adotado: pet.adotado,
                dataDeNascimento: pet.dataDeNascimento
            }
        })
        return res.status(200).json(dados);
    }
}