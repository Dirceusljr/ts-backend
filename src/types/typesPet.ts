import PetEntity from "../entities/PetEntity";

type TypeRequestBodyPet = Omit<PetEntity, "id">;

type TypeRequestParamsPet = { id?: string, pet_id?: string, adotante_id?: string };

type TypeResponseBodyPet = {
    dados?: Pick<PetEntity, "id" | "nome" | "especie" | "porte"> | Pick<PetEntity, "id" | "nome" | "especie"|  "porte">[]
}

export {
    TypeRequestBodyPet,
    TypeResponseBodyPet,
    TypeRequestParamsPet
}