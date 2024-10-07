import { InjectRepository } from "@nestjs/typeorm";
import { ProdutoEntity } from "./produto.entity";
import { Like, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { atualizaProdutoDTO } from "./dto/atualizaProduto.dto";
import { listaProdutosDTO } from "./dto/listaProdutos.dto";

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(ProdutoEntity)
        private readonly produtoRepository: Repository<ProdutoEntity>
    ) {}

    async criaProduto(produtoEntity: ProdutoEntity) {
        await this.produtoRepository.save(produtoEntity);
    }

    async atualizaProduto(id: string, produtoEntity: atualizaProdutoDTO) {
        this.produtoRepository.update(id, produtoEntity);
    }

    async listaProdutos(){
        const produtosSalvos = await this.produtoRepository.find();
        const produtosLista = produtosSalvos.map(
            (produto) => new listaProdutosDTO(
                produto.id,
                produto.titulo, 
                produto.descricao,
                produto.valor,
                produto.ativo
            )
        )
        return produtosLista;
    }

    async listaComEsteTitulo(titulo: string){
        const produtosSalvos = await this.produtoRepository.find({ where: { titulo: Like(`%${titulo}%`) } })
        const produtosLista = produtosSalvos.map(
            (produto) => new listaProdutosDTO(
                produto.id,
                produto.titulo, 
                produto.descricao,
                produto.valor,
                produto.ativo
            )
        )
        return produtosLista;
    }

    async deletaProduto(id:string) {
        this.produtoRepository.delete(id);
    }

}
