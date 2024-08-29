import PetEntity from "../../entities/PetEntity";

export default interface IPetRepository {
    criaPet(pet: PetEntity): void;
    listaPets(): PetEntity[] | Promise<PetEntity[]>;
    atualizaPet(id: number, pet: PetEntity): Promise<{success: boolean; message?: string}> | void;
    deletaPet(id: number, pet: PetEntity): Promise<{success: boolean; message?: string}> | void;
}