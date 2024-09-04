import AdotanteEntity from "../../entities/AdotanteEntity";
import EnderecoEntity from "../../entities/EnderecoEntity";

export default interface IAdotanteRepository {
    criarAdotante(adotante: AdotanteEntity): void | Promise<void>;
    listarAdotantes(): AdotanteEntity[] | Promise<AdotanteEntity[]>;
    atualizarAdotante(id: number, newData: AdotanteEntity): void;
    deletarAdotante(id: number): void;
    atualizaEnderecoAdotante (idAdotante: number, endereco: EnderecoEntity): void;

}