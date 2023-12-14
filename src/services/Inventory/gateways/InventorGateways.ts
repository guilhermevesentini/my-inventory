export default interface InvetoryGateway {
    obterProdutos(): Promise<any>;
    obterProduto(id: string): Promise<any>
    editarProduto(id: string, item: any): Promise<any>
    excluirProduto(id: string): Promise<any>
}