import AdotanteEntity from "../../entities/AdotanteEntity";

export default interface IAdotanteRepository {
    criarAdotante(adotante: AdotanteEntity): void | Promise<void>;
    listarAdotantes(): AdotanteEntity[] | Promise<AdotanteEntity[]>;
    atualizarAdotante(id: number, newData: AdotanteEntity): void;
    deletarAdotante(id: number): void;
}