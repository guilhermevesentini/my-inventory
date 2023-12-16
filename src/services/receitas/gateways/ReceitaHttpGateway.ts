import HttpClient from "@/infra/HttpClient";
import ReceitasGateway from "./ReceitasGateway";

export default class ReceitasHttpGateway implements ReceitasGateway {

    constructor(readonly httpClient: HttpClient, readonly BaseUrl: string){}

    async obterReceitas(): Promise<unknown> {
        return await this.httpClient.get(`${this.BaseUrl}/receitas`);
    }
    async obterReceita(id: string): Promise<unknown> {
        return await this.httpClient.get(`${this.BaseUrl}/receitas/${id}`);
    }
    async adicionarReceitas(item: unknown): Promise<unknown> {
        return await this.httpClient.post(`${this.BaseUrl}/receitas`, item);
    }
    async editarReceitas(id: unknown, item: unknown): Promise<unknown> {
        return await this.httpClient.put(`${this.BaseUrl}/receitas/${id}`, item)
    }
    async excluirReceitas(id: string): Promise<unknown> {
        return await this.httpClient.delete(`${this.BaseUrl}/receitas/${id}`);
    }
    
}