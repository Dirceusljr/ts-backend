import { Repository } from "typeorm";
import AbrigoEntity from "../entities/AbrigoEntity";
import EnderecoEntity from "../entities/EnderecoEntity";
import { NaoEncontrado, RequisicaoRuim } from "../utils/manipulaErros";
import IAbrigoRepository from "./interfaces/IAbrigoRepository";

export default class AbrigoRepository implements IAbrigoRepository {
    private repository: Repository<AbrigoEntity>;

    constructor(repository: Repository<AbrigoEntity>) {
        this.repository = repository;
    }

    private async buscaCelularAbrigo(celular: string) {
        return await this.repository.findOne({
            where: {
                celular
            }
        })
    }

    private async buscaEmailAbrigo(email: string) {
        return await this.repository.findOne({
            where: {
                email
            }
        })
    }

    async criarAbrigo(adotante: AbrigoEntity): Promise<void> {
        if( await this.buscaCelularAbrigo(adotante.celular)) {
            throw new RequisicaoRuim('Celular já cadastrado');
        }

        if( await this.buscaEmailAbrigo(adotante.email)) {
            throw new RequisicaoRuim('Email já cadastrado');
        }
        
        await this.repository.save(adotante);
    }
    async listarAbrigos(): Promise<AbrigoEntity[]> {
        return await this.repository.find();
    }
    async atualizarAbrigo(id: number, newData: AbrigoEntity) {
        const abrigoToUpdate = await this.repository.findOne({
            where: {
                id
            }
        })

        if (!abrigoToUpdate) {
            throw new NaoEncontrado('Abrigo não encontrado');
        }

        Object.assign(abrigoToUpdate, newData);
        await this.repository.save(abrigoToUpdate);

        return {
            success: true
        }
    }
    async deletarAbrigo(id: number) {
        const abrigoToRemove = await this.repository.findOne({
            where: {
                id
            }
        });
        if (!abrigoToRemove) {
            throw new NaoEncontrado('Abrigo não encontrado');
        }

        await this.repository.remove(abrigoToRemove);
        return {
            success: true
        }
    }
    async atualizaEnderecoAbrigo(idAbrigo: number, endereco: EnderecoEntity) {
        const abrigo = await this.repository.findOne({
            where: {
                id: idAbrigo
            }
        })

        if (!abrigo) {
            throw new NaoEncontrado('Abrigo não encontrado');

        }

        const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado)
        abrigo.endereco = novoEndereco;
        await this.repository.save(abrigo);

        return {
            success: true
        }
    }

}