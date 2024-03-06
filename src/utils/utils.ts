import { Ref } from "vue";

const removerAcentos = (texto: string) => {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const filtrarItems = (lista: any[], filtroAtual: Ref<string>, currentPage: Ref<number>, itemsPerPage: Ref<number>) => {
  try {
      const termoBusca = removerAcentos(filtroAtual.value.trim().toLowerCase());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let filteredItems = lista;
      
      if(filteredItems.length <= 0) return

      if (termoBusca) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          filteredItems = filteredItems.filter((produto: any) => {
              return (
                  removerAcentos(produto.nome).includes(termoBusca)
              );
          });
      }
             
      const startIndex = (currentPage.value - 1) * itemsPerPage.value;
      return filteredItems.slice(startIndex, startIndex + itemsPerPage.value);
  } catch (err) {
      throw new Error(
          'Erro ao carregar os produtos'
      );
  }
};

export {
  removerAcentos,
  filtrarItems
}

