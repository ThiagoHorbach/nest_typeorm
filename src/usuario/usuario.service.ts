import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsuarioEntity } from "./usuario.entity";
import { Repository } from "typeorm";
import { ListaUsuarioDTO } from "./dto/listaUsuario.dto";
import { atualizaProdutoDTO } from "src/produto/dto/atualizaProduto.dto";
import { atualizaUsuarioDTO } from "./dto/atualizaUsuario.dto";


@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>
    ) {}

    async criarUsuario(usuarioEntity: UsuarioEntity){
        await this.usuarioRepository.save(usuarioEntity);
    }
    
    async listaUsuarios(){
        const usuariosSalvos = await this.usuarioRepository.find();
        const usuariosLista = usuariosSalvos.map(
            (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome)
        );
        return usuariosLista;
    }

    async atualizaUsuario(id: string, usuarioEntity: atualizaUsuarioDTO){
        this.usuarioRepository.update(id, usuarioEntity);
    }

    async deletaUsuario(id: string){
        this.usuarioRepository.delete(id);
    }

    
}