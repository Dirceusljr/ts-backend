import EnumEspecie from "../enum/EnumEspecie";

type TypePet = {
    id: number,
    nome: string,
    especie: EnumEspecie,
    idade: number,
    adotado: boolean
}

export default TypePet;