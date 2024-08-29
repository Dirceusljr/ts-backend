import PetEntity from "../../entities/PetEntity";

export default interface IPetRepository {
    criaPet(pet: PetEntity): void;
    listaPets(): PetEntity[];
    atualizaPet(id: number, pet: PetEntity): void;
    deletaPet(id: number, pet: PetEntity): void;
}