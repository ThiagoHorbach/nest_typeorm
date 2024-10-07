import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from "@nestjs/common";
import { ProdutoRepository } from "./produto.repository";
import { criaProdutoDTO } from "./dto/criaProduto.dto";
import { ProdutoEntity } from "./produto.entity";
import { v4 as uuid } from 'uuid';
import { listaProdutosDTO } from "./dto/listaProdutos.dto";
import { atualizaProdutoDTO } from "./dto/atualizaProduto.dto";
import { ProdutoService } from "./produto.service";

@Controller('/produtos')
export class ProdutoController {
    constructor(
        private produtoRepository: ProdutoRepository,
        private readonly produtoService: ProdutoService
    ) {}

    @Post()
    async criaProduto(@Body() dadosProduto:criaProdutoDTO) {
        
        //return dadosProduto;

        const produto = new ProdutoEntity();
        produto.id = uuid();
        produto.titulo = dadosProduto.titulo;
        produto.descricao = dadosProduto.descricao;
        produto.valor = dadosProduto.valor;
        produto.ativo = dadosProduto.ativo;

        produto.caracteristicas = dadosProduto.caracteristicas;
        produto.imagens = dadosProduto.imagens;

        //this.produtoRepository.salvar(produtoEntity);
        this.produtoService.criaProduto(produto);

        return {
            produto: produto.titulo,
            message: 'Produto '+ produto.titulo +' Cadastrado com sucesso.'
        }
    }

    @Get()
    async listaProdutos() {
        // const produtosSalvos = await this.produtoRepository.listar();
        // const produtosLista = produtosSalvos.map(
        //     produto => new listaProdutosDTO(
        //         produto.id,
        //         produto.titulo,
        //         produto.descricao,
        //         produto.valor,
        //         produto.ativo
        //     )
        // );
        // return produtosLista;
        const produtosListados = await this.produtoService.listaProdutos();
        return produtosListados;
    }

    @Get('/busca/titulo/:titulo')
    async listaProdutosTitulo(@Param('titulo') titulo: string) {
        //const produtosComEsteTitulo = await this.produtoRepository.listarComEsteTitulo(titulo);
        const produtosComEsteTitulo = await this.produtoService.listaComEsteTitulo(titulo);
        return produtosComEsteTitulo;
    }

    @Put('/:id')
    async atualizaProdutos(@Param('id') id: string, @Body() novosDados:atualizaProdutoDTO) {
        //const produtoAtualizado = await this.produtoRepository.atualiza(id, novosDados);
        const produtoAtualizado = await this.produtoService.atualizaProduto(id, novosDados);        
        
        return {
            produto: produtoAtualizado,
            message: 'Produto Atualizado.'
        }
    }

    @Delete('/:id')
    async deletaProduto(@Param('id') id: string) {
        //const produtoRemovido = await this.produtoRepository.deleta(id);
        const produtoRemovido = await this.produtoService.deletaProduto(id);
        return {
            produto: produtoRemovido,
            message: 'Produto Removido.'
        }
    }

}