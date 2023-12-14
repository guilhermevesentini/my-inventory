import HttpClient from "@/infra/HttpClient";
import ReceitasGateway from "./ReceitasGateway";

export default class ReceitasHttpGateway implements ReceitasGateway {

    constructor(readonly httpClient: HttpClient, readonly BaseUrl: string){}

    async obterReceitas(): Promise<any> {
        return await this.httpClient.get(`${this.BaseUrl}/receitas`);
    }
    async obterReceita(id: string): Promise<any> {
        return await this.httpClient.get(`${this.BaseUrl}/receitas/${id}`);
    }
    async adicionarReceitas(item: any): Promise<any> {
        return await this.httpClient.post(`${this.BaseUrl}/receitas`, item);
    }
    async editarReceitas(id: any, item: any): Promise<any> {
        return await this.httpClient.put(`${this.BaseUrl}/receitas/${id}`, item)
    }
    async excluirReceitas(id: string): Promise<any> {
        return await this.httpClient.delete(`${this.BaseUrl}/receitas/${id}`);
    }
    
}