import { Type } from "class-transformer";
import { IsDecimal, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { ProdutoEntity } from "../produto.entity";


export class CaracteristicaProdutoDTO {
    
    id: string;
    
    @IsString()
    @IsNotEmpty({ message: 'Nome da caracteristica não pode estar em branco'})
    nome: string;

    @IsString()
    @IsNotEmpty({ message: 'descricao da caracteristica não pode estar em branco'})
    descricao: string;

    produto: ProdutoEntity;
}

export class ImagemProdutoDTO {

    id: string;

    @IsString()
    @IsNotEmpty({ message: 'URL da imagem não pode estar em branco'})
    url: string;

    @IsString()
    @IsNotEmpty({ message: 'descricao da imagem não pode estar em branco'})
    descricao: string;

    produto: ProdutoEntity;
}

export class criaProdutoDTO {
    
    @IsNotEmpty({ message: 'O campo titulo não pode ficar em branco'})
    titulo: string;

    @IsNotEmpty({ message: 'O campo descricao não pode ficar em branco'})
    descricao: string;

    @IsNotEmpty({ message: 'O campo valor não pode ficar em branco'})
    valor: number;
    
    @IsNotEmpty({ message: 'O campo ativo não pode ficar em branco'})
    ativo: boolean;

    @ValidateNested({ each: true })
    @Type(() => CaracteristicaProdutoDTO)
    caracteristicas: CaracteristicaProdutoDTO[];

    @ValidateNested({ each: true })
    @Type(() => ImagemProdutoDTO)
    imagens: ImagemProdutoDTO[];

}