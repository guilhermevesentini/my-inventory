import HttpClient from "@/infra/HttpClient";
import InvetoryGateway from "./InventorGateways";

export default class InventoryHttpGateway implements InvetoryGateway {

    constructor(readonly httpClient: HttpClient, readonly BaseUrl: string){}

    async obterProdutos(): Promise<unknown> {
        return await this.httpClient.get(`${this.BaseUrl}/produtos/`);
    }
    async obterProduto(id: string): Promise<unknown> {
        return await this.httpClient.get(`${this.BaseUrl}/produtos/${id}`)
    }
    async editarProduto(id: string, item: unknown): Promise<unknown> {
        return await this.httpClient.put(`${this.BaseUrl}/produtos/${id}`, item)
    }
    async excluirProduto(id: string): Promise<unknown> {
        return await this.httpClient.delete(`${this.BaseUrl}/produtos/${id}`)
    }
    
}