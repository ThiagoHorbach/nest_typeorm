import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProdutoCaracteristicaEntity } from "./produto-caracteristica.entity";
import { ProdutoImagemEntity } from "./produto-imagem.entity";



@Entity({ name: 'produtos'})
export class ProdutoEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'titulo', length: 100, nullable: false})
    titulo: string;
    
    @Column({ name: 'descricao', length: 100, nullable: false})
    descricao: string;
    
    @Column({ name: 'valor', nullable: false})
    valor: number;
    
    @Column({ name: 'ativo', nullable: false})
    ativo: boolean;

    @OneToMany(() => ProdutoCaracteristicaEntity, (produtoCaracteristicaEntity) => produtoCaracteristicaEntity.produto, { cascade: true, eager: true })
    caracteristicas: ProdutoCaracteristicaEntity[];

    @OneToMany(() => ProdutoImagemEntity, (produtoImagemEntity) => produtoImagemEntity.produto, { cascade: true, eager: true })
    imagens: ProdutoImagemEntity[];

    @CreateDateColumn({ name: 'created_at'})
    createdAt: string;
    
    @UpdateDateColumn({ name: 'updated_at'})
    updatedAt: string;

    @DeleteDateColumn({ name: 'delete_at'})
    deletedAt: string;

}