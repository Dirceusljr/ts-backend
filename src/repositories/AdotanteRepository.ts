import { Repository } from "typeorm";
import IAdotanteRepository from "./interfaces/IAdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/EnderecoEntity";

export default class AdotanteRepository implements IAdotanteRepository {
    private repository: Repository<AdotanteEntity>;

    constructor (repository: Repository<AdotanteEntity>) {
        this.repository = repository;
    }
    async criarAdotante(adotante: AdotanteEntity): Promise<void> {
        await this.repository.save(adotante);
    }
    async listarAdotantes(): Promise<AdotanteEntity[]> {
        return await this.repository.find();
    }
    async atualizarAdotante(id: number, newData: AdotanteEntity): Promise<{ success: boolean; message?: string; }> {
        try {
            const adotanteToUpdate = await this.repository.findOne({
                where: {
                    id
                }
            })
    
            if(!adotanteToUpdate) {
                return {
                    success: false,
                    message: 'Adotante não encontrado'
                }
            }
    
            Object.assign(adotanteToUpdate, newData);
            await this.repository.save(adotanteToUpdate);
            
            return {
                success: true
            }
        } catch (error) {
            return {
                success: false,
                message: 'Ocorreu um erro ao tentar atualizar o adotante'
            }
        }
    }
    async deletarAdotante(id: number): Promise<{ success: boolean; message?: string; }> {
        try {
            const adotanteToRemove = await this.repository.findOne({
                where: {
                    id
                }
            });
            if (!adotanteToRemove) {
                return {
                    success: false,
                    message: 'Adotante não encontrado'
                }
            }

            await this.repository.remove(adotanteToRemove);
            return {
                success: true
            }
        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: "Ocorreu um erro ao tentar excluir o adotante."
            }
        }
    }
    async atualizaEnderecoAdotante(idAdotante: number, endereco: EnderecoEntity): Promise<{ success: boolean; message?: string}> {
        try {
            const adotante = await this.repository.findOne({
                where: {
                    id: idAdotante
                }
            })

            if(!adotante) {
                return {
                    success: false,
                    message: 'Adotante não encontrado'
                }
            }

            const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado)
            adotante.endereco = novoEndereco;
            await this.repository.save(adotante);

            return {
                success: true
            }
        } catch (error) {
            return {
                success: false,
                message: 'Ocorreu um erro ao tentar atualizar o endereço do adotante'
            }
        }
    }
    
}