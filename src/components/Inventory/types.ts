export interface ICadastroItem {
    id: number | string;
    nome: string;
    // Adicione outras propriedades comuns se existirem
  }
  
 export  interface IListaDeCadastros {
    categorias: Array<ICadastroItem>;
    fornecedores: Array<ICadastroItem>;
    unidades: Array<ICadastroItem>;
    tags: Array<ICadastroItem>;
  }

  export enum ETipos {
    categorias = 'categoria',
    fornecedores = 'fornecedor',
    unidades = 'unidade',
    tags = 'tag',
  }

  export interface IStandardList {
    id: string,
    nome: string
  }