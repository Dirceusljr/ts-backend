import AbrigoEntity from "../../entities/AbrigoEntity";
import EnderecoEntity from "../../entities/EnderecoEntity";

export default interface IAbrigoRepository {
    criarAbrigo(abrigo: AbrigoEntity): void | Promise<void>;
    listarAbrigos(): AbrigoEntity[] | Promise<AbrigoEntity[]>;
    atualizarAbrigo(id: number, newData: AbrigoEntity): void;
    deletarAbrigo(id: number): void;
    atualizaEnderecoAbrigo (idAbrigo: number, endereco: EnderecoEntity): void;
}