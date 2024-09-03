import { Repository } from "typeorm";
import IAdotanteRepository from "./interfaces/IAdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/EnderecoEntity";
import { NaoEncontrado, RequisicaoRuim } from "../utils/manipulaErros";

export default class AdotanteRepository implements IAdotanteRepository {
    private repository: Repository<AdotanteEntity>;

    constructor(repository: Repository<AdotanteEntity>) {
        this.repository = repository;
    }

    private async buscaCelularAdotante(celular: string) {
        return await this.repository.findOne({
            where: {
                celular
            }
        })
    }

    async criarAdotante(adotante: AdotanteEntity): Promise<void> {
        if( await this.buscaCelularAdotante(adotante.celular)) {
            throw new RequisicaoRuim('Celular já cadastrado');
        }
        
        await this.repository.save(adotante);
    }
    async listarAdotantes(): Promise<AdotanteEntity[]> {
        return await this.repository.find();
    }
    async atualizarAdotante(id: number, newData: AdotanteEntity) {
        const adotanteToUpdate = await this.repository.findOne({
            where: {
                id
            }
        })

        if (!adotanteToUpdate) {
            throw new NaoEncontrado('Adotante não encontrado');
        }

        Object.assign(adotanteToUpdate, newData);
        await this.repository.save(adotanteToUpdate);

        return {
            success: true
        }
    }
    async deletarAdotante(id: number) {
        const adotanteToRemove = await this.repository.findOne({
            where: {
                id
            }
        });
        if (!adotanteToRemove) {
            throw new NaoEncontrado('Adotante não encontrado');
        }

        await this.repository.remove(adotanteToRemove);
        return {
            success: true
        }
    }
    async atualizaEnderecoAdotante(idAdotante: number, endereco: EnderecoEntity): Promise<{ success: boolean; message?: string }> {
        const adotante = await this.repository.findOne({
            where: {
                id: idAdotante
            }
        })

        if (!adotante) {
            throw new NaoEncontrado('Adotante não encontrado');

        }

        const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado)
        adotante.endereco = novoEndereco;
        await this.repository.save(adotante);

        return {
            success: true
        }
    }

}