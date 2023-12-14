import HttpClient from "@/infra/HttpClient";
import InvetoryGateway from "./InventorGateways";

export default class InventoryHttpGateway implements InvetoryGateway {

    constructor(readonly httpClient: HttpClient, readonly BaseUrl: string){}

    async obterProdutos(): Promise<any> {
        return await this.httpClient.get(`${this.BaseUrl}/produtos/`);
    }
    async obterProduto(id: string): Promise<any> {
        return await this.httpClient.get(`${this.BaseUrl}/produtos/${id}`)
    }
    async editarProduto(id: string, item: any): Promise<any> {
        return await this.httpClient.put(`${this.BaseUrl}/produtos/${id}`, item)
    }
    async excluirProduto(id: string): Promise<any> {
        return await this.httpClient.delete(`${this.BaseUrl}/produtos/${id}`)
    }
    
}