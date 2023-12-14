import ReceitasGateway from "./ReceitasGateway";

export default class ReceitasFakeHttpGateway implements ReceitasGateway {
    receitas: any;

    constructor() {
        this.receitas = [{
            "id": "82dfe3b9b02f9352f555a29e4cf0081b",
            "nome": "awdwadwad",
            "descricao": "wadwadd",
            "valor": 1561652,
            "previsao": "",
            "recorrente": "Sim",
            "frequencia": "Semanal",
            "observacao": "awdwadwadd"
          },
          {
            "id": "5229ef1283805a3d24a96503b22c90a5",
            "nome": "awdwad",
            "descricao": "awdwad",
            "valor": 123,
            "previsao": "2023-12-09",
            "recorrente": "Não",
            "frequencia": "",
            "observacao": "awdwad"
          }];
    }

    obterReceitas(): Promise<any> {
        return this.receitas;
    }
    obterReceita(id: string): Promise<any> {
        return this.receitas.find((t: any) => t.id == id);
    }
    adicionarReceitas(item: any): Promise<any> {
        return this.receitas.push(item);
    }
    editarReceitas(id: string, item: any): Promise<any> {
        const index = this.receitas.findIndex((t: any) => t.id === id);
        if (index !== -1) {
            this.receitas.splice(index, 1, item);
            return Promise.resolve(item);
        } else {
            return Promise.reject(new Error('Item não encontrado'));
        }
    }
    excluirReceitas(id: string): Promise<any> {
        return this.receitas.splice(id);
    }
    
}