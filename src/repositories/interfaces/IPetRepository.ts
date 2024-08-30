import PetEntity from "../../entities/PetEntity";
import EnumPorte from "../../enum/EnumPorte";

export default interface IPetRepository {
    criaPet(pet: PetEntity): Promise<void> | void;
    listaPets(): PetEntity[] | Promise<PetEntity[]>;
    atualizaPet(id: number, pet: PetEntity): Promise<{success: boolean; message?: string}> | void;
    deletaPet(id: number, pet: PetEntity): Promise<{success: boolean; message?: string}> | void;
    buscaPetPeloPorte(porte: EnumPorte): PetEntity[] | Promise<PetEntity[]>;
}