

export enum ETipos {
  categorias = 'categoria',
  fornecedores = 'fornecedor',
  unidades = 'unidade',
  tags = 'tag',
}

export interface ICadastroItem {
  id: number | string;
  nome: string;
}

export  interface IListaDeCadastros {
  categorias: Array<ICadastroItem>;
  fornecedores: Array<ICadastroItem>;
  unidades: Array<ICadastroItem>;
  tags: Array<ICadastroItem>;
}

export interface ICadastrosList {
  categorias: [],
  fornecedores: [],
  unidades: [],
  tags: [],
}