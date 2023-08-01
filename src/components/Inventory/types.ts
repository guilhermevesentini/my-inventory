export interface ICadastroItem {
    id: number;
    nome: string;
    // Adicione outras propriedades comuns se existirem
  }
  
 export  interface IListaDeCadastros {
    categorias: Array<ICadastroItem>;
    fornecedores: Array<ICadastroItem>;
    unidades: Array<ICadastroItem>;
    tags: Array<ICadastroItem>;
  }