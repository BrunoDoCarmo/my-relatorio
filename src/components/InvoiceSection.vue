<template>
  <div class="invoice-section">
    <div class="filters">
      <select v-model="localSelectedFilter" class="filter-select" @change="handleFilterChange" :disabled="products.length === 0">
        <option value="invoiceNumber">NRO DA NF-E</option>
        <option value="codProd">COD DO PROD</option>
        <option value="nomeProd">NOME DO PROD</option>
      </select>
      <input
        ref="searchInput"
        class="pesquisanro"
        :disabled="products.length === 0"
        type="text"
        v-model="internalSearchQuery"
        @input="onInput"
        placeholder="Pesquisa"
      />
    </div>
    <div class="botoes">
      <button class="btn" @click="$emit('open-modal')" :disabled="products.length === 0">Ver Produtos</button>
      <button class="btn" @click="clearProducts" :disabled="products.length === 0">Limpar Tabela</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InvoiceSection',
  props: {
    searchInvoiceNumber: {
      type: String,
      default: ''
    },
    selectedFilter: {
      type: String,
      default: 'invoiceNumber'
    },
    products: Array
  },
  data() {
    return {
      internalSearchQuery: this.searchInvoiceNumber.toUpperCase(), // Inicializa em maiúsculas
      localSelectedFilter: this.selectedFilter // Adiciona localSelectedFilter para o select
    };
  },
  watch: {
    searchInvoiceNumber(newVal) {
      this.internalSearchQuery = newVal.toUpperCase(); // Atualiza em maiúsculas
    },
    selectedFilter(newVal) {
      this.localSelectedFilter = newVal;
    }
  },
  methods: {
    onInput(event) {
      // Força a conversão para maiúsculas
      this.internalSearchQuery = event.target.value.toUpperCase();
      this.emitSearch();
    },
    emitSearch() {
      this.$emit('search-invoice', {
        query: this.internalSearchQuery,
        filter: this.localSelectedFilter // Usa o valor localSelectedFilter para emitir
      });
    },
    clearProducts() {
      this.internalSearchQuery = ''; // Limpa o campo de busca internamente
      this.localSelectedFilter = 'invoiceNumber'; // Reset the filter to default
      this.$emit('clear-products'); // Emite um evento para limpar produtos
      this.emitSearch(); // Emit a search event with the reset filter
    },
    handleFilterChange() {
      this.internalSearchQuery = ''; // Limpa o campo de pesquisa ao mudar o filtro
      this.$nextTick(() => {
        this.$refs.searchInput.focus(); // Define o foco no campo de entrada
      });
      this.emitSearch(); // Emite um evento com o filtro atualizado e query limpa
    }
  }
};
</script>

<style scoped>
.invoice-section {
  display: flex;
  gap: 1rem;
  padding: 2rem 9%;
}
.filters {
  display: flex;
  gap: 1rem;
  align-items: center;
  width: 100%;
}
.filter-select,
.pesquisanro {
  font-size: 1.5rem;
  font-family: var(--font-2);
  border: .15rem solid #000;
  border-radius: 1rem;
  padding: 1rem;
}
.filter-select {
  width: auto;
}
.pesquisanro {
  width: 100%;
}
.pesquisanro::placeholder {
  text-transform: uppercase;
}
.botoes {
  display: flex;
  gap: 1rem;
}
section:disabled,
.pesquisanro:disabled,
.btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  color: #b7b7b7;
  border-color: #b7b7b7;
}
</style>
