import { IProduto } from "@/@types/types";

export default interface InvetoryGateway {
    obterProdutos(): Promise<any>;
    obterProduto(id: string | number): Promise<any>
    editarProduto(id: string | number, item: any): Promise<any>
    excluirProduto(id: string): Promise<any>
    salvarProduto(body: IProduto): Promise<any>
}