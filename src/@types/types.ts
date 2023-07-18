export interface IProduto {
    id: number
    _id: string
    _id_Produto: string
    nome: string
    descricao: string
    tipo: []
    quantidade: number
    preco: number
    total: number
}

export enum ETipoProduto {
    Mercado = 'Mercado',
    Moda = 'Moda',
    Moveis = 'Móveis',
    MusicaShows = 'Música e Shows',
    Natal = 'Natal',
    Papelaria = 'Papelaria',
    PetShop = 'Pet Shop',
    ReligiaoEspiritualidade = 'Religião e Espiritualidade',
    Relogios = 'Relógios',
    SaudeCuidadosPessoais = 'Saúde e Cuidados Pessoais',
    Servicos = 'Serviços',
    SuplementosAlimentares = 'Suplementos Alimentares',
    TabletsIpadEReaders = 'Tablets, iPads e E-Readers',
    TelefoniaFixa = 'Telefonia Fixa',
    TVVideo = 'TV e Vídeo',
    UtilidadesDomesticas = 'Utilidades Domésticas',
  }
  