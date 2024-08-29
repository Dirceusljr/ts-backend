import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import IPetRepository from "./interfaces/IPetRepository";

export default class PetRepository implements IPetRepository {
    private repository: Repository<PetEntity>;

    constructor(repository: Repository<PetEntity>) {
        this.repository = repository;
    }

    criaPet(pet: PetEntity): void {
        this.repository.save(pet);
    }
    listaPets(): PetEntity[] {
        throw new Error("Method not implemented.");
    }
    atualizaPet(id: number, pet: PetEntity): void {
        throw new Error("Method not implemented.");
    }
    deletaPet(id: number, pet: PetEntity): void {
        throw new Error("Method not implemented.");
    }

}