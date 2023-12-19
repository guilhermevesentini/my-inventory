import HttpClient from "@/infra/HttpClient";
import SharedGateway from "./SharedGateway";

export default class SharedHttpGateway implements SharedGateway {

    constructor(readonly httpClient: HttpClient, readonly BaseUrl: string){}

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async obterTagsList(): Promise<any> {
        return await this.httpClient.get(`${this.BaseUrl}/tags`);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async obterUnidadesList(): Promise<any> {
        return await this.httpClient.get(`${this.BaseUrl}/unidades`);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async obterFornecedoresList(): Promise<any> {
        return await this.httpClient.get(`${this.BaseUrl}/fornecedores`);
    }
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async obterCategoriasList(): Promise<any> {
        return await this.httpClient.get(`${this.BaseUrl}/categorias`);
    }
}
