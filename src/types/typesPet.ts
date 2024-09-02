import PetEntity from "../entities/PetEntity";

type TypeRequestBodyPet = Omit<PetEntity, "id">;

type TypeRequestParamsPet = { id?: string, pet_id?: string, adotante_id?: string };

type TypeResponseBodyPet = {
    data?: Pick<PetEntity, "id" | "nome" | "especie" | "porte"> | Pick<PetEntity, "id" | "nome" | "especie" | "porte">[],
    erro?: unknown;
}

export {
    TypeRequestBodyPet,
    TypeResponseBodyPet,
    TypeRequestParamsPet
}