import EnumEspecie from "../enum/EnumEspecie";

type TypePet = {
    id: number,
    nome: string,
    especie: EnumEspecie,
    dataDeNascimento: Date,
    adotado: boolean
}

export default TypePet;