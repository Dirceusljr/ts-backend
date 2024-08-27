import { Request, Response } from "express";
import type TypePet from "../types/TypePet";

const listaPet: TypePet[] = [];

export default class PetController {
    criaPet(req: Request, res: Response) {
        const {id, nome, especie, idade, adotado } = <TypePet>req.body;
        const novoPet: TypePet = { id, nome, especie, idade, adotado };
        listaPet.push(novoPet);
        return res.status(201).json(novoPet);
    }
}