export default interface ReceitasGateway {
    obterReceitas(): Promise<any>;
    obterReceita(id: string): Promise<any>;
    adicionarReceitas(item: any): Promise<any>;
    editarReceitas(id: string, item: any): Promise<any>;
    excluirReceitas(id: string): Promise<any>;
}