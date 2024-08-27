import { Request, Response } from "express";

const listaPet = [];

export default class PetController {
    criaPet(req: Request, res: Response) {
        const novoPet = req.body;
        listaPet.push(novoPet);
        return res.status(201).json(novoPet);
    }
}