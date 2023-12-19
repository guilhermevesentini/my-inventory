import HttpClient from "@/infra/HttpClient";
import InvetoryGateway from "./InventorGateways";
import { IProduto } from "@/@types/types";

export default class InventoryHttpGateway implements InvetoryGateway {

    constructor(readonly httpClient: HttpClient, readonly BaseUrl: string){}

    async salvarProduto(body: IProduto): Promise<unknown> {
        return await this.httpClient.post(`${this.BaseUrl}/produtos/`, body);
    }

    async obterProdutos(): Promise<unknown> {
        return await this.httpClient.get(`${this.BaseUrl}/produtos/`);
    }
    async obterProduto(id: string | number): Promise<unknown> {
        return await this.httpClient.get(`${this.BaseUrl}/produtos/${id}`)
    }
    async editarProduto(id: string | number, item: unknown): Promise<unknown> {
        return await this.httpClient.put(`${this.BaseUrl}/produtos/${id}`, item)
    }
    async excluirProduto(id: string): Promise<unknown> {
        return await this.httpClient.delete(`${this.BaseUrl}/produtos/${id}`)
    }
    
}