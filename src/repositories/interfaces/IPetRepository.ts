import PetEntity from "../../entities/PetEntity";
import EnumPorte from "../../enum/EnumPorte";

export default interface IPetRepository {
    criaPet(pet: PetEntity): Promise<void> | void;
    listaPets(): PetEntity[] | Promise<PetEntity[]>;
    atualizaPet(id: number, pet: PetEntity): void;
    deletaPet(id: number, pet: PetEntity): void;
    buscaPeloCampoGenerico<T extends keyof PetEntity>(campo: T, valor: PetEntity[T]) : PetEntity[] | Promise<PetEntity[]>;
}