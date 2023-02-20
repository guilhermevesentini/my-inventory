export interface IProduto {
    id: number
    nome: string
    descricao: string
    tipo: string
    quantidade: number
    preco: number,
    total: number
}

export enum ETipoProduto {
    AcessoriosTecnologia = 'Acessórios de Tecnologia',
    ArVentilacao = 'Ar e Ventilação',
    Artesanato = 'Artesanato',
    ArtigosFesta = 'Artigos para Festa',
    Audio = 'Áudio',
    Automotivo = 'Automotivo',
    Bebes = 'Bebês',
    BelezaPerfumaria = 'Beleza & Perfumaria',
    BemEstarSexual = 'Bem-estar Sexual',
    Brinquedos = 'Brinquedos',
    CamaMesaBanho = 'Cama, Mesa e Banho',
    CamerasDrones = 'Câmeras e Drones',
    CasaConstrucao = 'Casa e Construção',
    CasaInteligente = 'Casa Inteligente',
    CelularSmartphone = 'Celular e Smartphone',
    Colchoes = 'Colchões',
    ComercioIndustria = 'Comércio e Indústria',
    Cursos = 'Cursos',
    Decoracao = 'Decoração',
    Eletrodomesticos = 'Eletrodomésticos',
    Eletroportateis = 'Eletroportáteis',
    EsporteLazer = 'Esporte e Lazer',
    Ferramentas = 'Ferramentas',
    FilmesSeries = 'Filmes e Séries',
    FloresJardim = 'Flores e Jardim',
    Games = 'Games',
    Informatica = 'Informática',
    InstrumentosMusicais = 'Instrumentos Musicais',
    Livros = 'Livros',
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
  