import AbrigoEntity from "../entities/AbrigoEntity";

type TypeRequestBodyAbrigo = Omit<AbrigoEntity, "id" | "pets">;

type TypeRequestParamsAbrigo = { id?: string };

type TypeResponseBodyAbrigo = {
    dados?: Pick<AbrigoEntity, "id" | "nome" | "email"| "celular" | "endereco" > | Pick<AbrigoEntity, "id" | "nome" | "email" | "celular" | "endereco">[]
}

export {
    TypeRequestBodyAbrigo,
    TypeResponseBodyAbrigo,
    TypeRequestParamsAbrigo
}