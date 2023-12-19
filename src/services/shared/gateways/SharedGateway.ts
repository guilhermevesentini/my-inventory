export default interface SharedGateway {
    obterCategoriasList(): Promise<any>;
    obterFornecedoresList(): Promise<any>;
    obterUnidadesList(): Promise<any>;
    obterTagsList(): Promise<any>;
}