import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import EnderecoEntity from "./EnderecoEntity";
import PetEntity from "./PetEntity";
import criaSenhaCriptografada from "../utils/senhaCriptografada";

@Entity()
export default class AdotanteEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome: string;
    @Column()
    senha: string;
    @Column({ unique: true })
    celular: string;
    @Column({ nullable: true })
    foto?: string;
    @OneToOne(() => EnderecoEntity, { nullable: true, cascade: true, eager: true })
    @JoinColumn()
    endereco?: EnderecoEntity;
    @OneToMany(() => PetEntity, (pet) => pet.adotante)
    pets!: PetEntity[]

    constructor(
        nome: string,
        senha: string,
        celular: string,
        endereco?: EnderecoEntity,
        foto?: string
    ) {
        this.nome = nome;
        this.senha = senha;
        this.celular = celular;
        this.endereco = endereco;
        this.foto = foto;
    }

    @BeforeInsert()
    @BeforeUpdate()
    private async criptografaSenha(senha: string) {
        this.senha = criaSenhaCriptografada(this.senha);
    }
}