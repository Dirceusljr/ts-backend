import AdotanteEntity from "../../entities/AdotanteEntity";

export default interface IAdotanteRepository {
    criarAdotante(adotante: AdotanteEntity): void | Promise<void>;
    listarAdotantes(): AdotanteEntity[] | Promise<AdotanteEntity[]>;
    atualizarAdotante(id: number, newData: AdotanteEntity): Promise<{success: boolean; message?: string}> | void;
    deletarAdotante(id: number): Promise<{success: boolean; message?: string}> | void;
}