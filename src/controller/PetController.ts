import { Request, Response } from "express";
import type TypePet from "../types/TypePet";
import EnumEspecie from "../enum/EnumEspecie";

const listaPet: TypePet[] = [];

let id = 0;
function geraId() {
  id = id + 1;
  return id;
}

export default class PetController {
    criaPet(req: Request, res: Response) {
        const { nome, especie, dataDeNascimento, adotado } = <TypePet>req.body;
        if(!Object.values(EnumEspecie).includes(especie)) {
            return res.status(400).json({ message: "Espécie inválida." });
        }
        const novoPet: TypePet = { id: geraId(), nome, especie, dataDeNascimento, adotado };
        listaPet.push(novoPet);
        return res.status(201).json(novoPet);
    }

    listaPets(req: Request, res: Response) {
        return res.status(200).json(listaPet);
    }

    atualizaPet(req: Request, res: Response) {
        const { id } = req.params;
        const { nome, especie, adotado, dataDeNascimento } = req.body as TypePet;

        const pet = listaPet.find((pet) => pet.id === Number(id));
        if(!pet) {
            return res.status(404).json({ message: "Pet não encontrado." });
        }

        pet.nome = nome;
        pet.especie = especie;
        pet.adotado = adotado;
        pet.dataDeNascimento = dataDeNascimento;

        return res.status(200).json(pet);
    }

    deletaPet(req: Request, res: Response) {
        const { id } = req.params;
        const pet = listaPet.find((pet) => pet.id === Number(id));
        if(!pet) {
            return res.status(404).json({ message: "Pet não encontrado." });
        }

        const index = listaPet.indexOf(pet);
        listaPet.splice(index, 1);
        return res.status(200).json({ message: "Pet deletado com sucesso." });
    }
}