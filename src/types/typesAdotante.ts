import AdotanteEntity from "../entities/AdotanteEntity";

type TypeRequestBodyAdotante = Omit<AdotanteEntity, "id">;

type TypeRequestParamsAdotante = { id?: string };

type TypeResponseBodyAdotante = {
    data?: Pick<AdotanteEntity, "id" | "nome" | "celular"> | Pick<AdotanteEntity, "id" | "nome" | "celular">[],
    erro?: unknown;
}

export {
    TypeRequestBodyAdotante,
    TypeResponseBodyAdotante,
    TypeRequestParamsAdotante
}