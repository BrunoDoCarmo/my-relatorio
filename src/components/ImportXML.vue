<template>
  <div>
    <ImportSection @file-upload="handleFileUpload"/>
    <InvoiceSection
      :products="products"
      :searchInvoiceNumber="searchInvoiceNumber"
      :selectedFilter="selectedFilter"
      @search-invoice="searchInvoice"
      @clear-products="clearProducts"
      @open-modal="openModal"
    />
    <ProductTable :products="filteredProducts"/>
    <Footer :totalProduto="totalProduto" :totalPeso="totalPeso" :totalProdImportado="totalProdImportado" :uniqueInvoicesCount="uniqueInvoicesCount"/>
    <UniqueProductsModal
      :products="uniqueProducts"
      v-if="isModalOpen"
      @save="saveConfig"
      @close="closeModal"
    />
  </div>
</template>

<script>
import ImportSection from './ImportSection.vue';
import ProductTable from './ProductTable.vue';
import UniqueProductsModal from './UniqueProductsModal.vue';
import Footer from './Footer.vue';
import InvoiceSection from './InvoiceSection.vue';

export default {
  name: 'ImportXML',
  components: {
    ImportSection,
    ProductTable,
    UniqueProductsModal,
    Footer,
    InvoiceSection
  },
  data() {
    return {
      products: [],
      invoices: [],
      isModalOpen: false,
      searchInvoiceNumber: '',
      selectedFilter: 'invoiceNumber' // Filtro padrão
    };
  },
  computed: {
    filteredProducts() {
      if (this.searchInvoiceNumber) {
        return this.products.filter(product => {
          switch (this.selectedFilter) {
            case 'invoiceNumber':
              return product.invoiceNumber.includes(this.searchInvoiceNumber);
            case 'codProd':
              return product.codProd.includes(this.searchInvoiceNumber);
            case 'nomeProd':
              return product.nomeProd.includes(this.searchInvoiceNumber);
            default:
              return false;
          }
        });
      }
      return this.products;
    },
    totalProdImportado() {
      return this.filteredProducts.length;
    },
    totalProduto() {
      const totalProduto = this.filteredProducts.reduce((sum, product) => {
        const vlrTotal = parseFloat(product.vlrTotal.replace(/[^\d,-]/g, '').replace(',', '.'));
        return sum + (isNaN(vlrTotal) ? 0 : vlrTotal);
      }, 0);
      return totalProduto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    },
    totalPeso() {
      return this.filteredProducts.reduce((sum, product) => {
        const peso = product.qProd * (product.multiplicador || '');
        return sum + peso;
      }, 0);
    },
    uniqueProducts() {
      const unique = {};
      this.filteredProducts.forEach(product => {
        if (!unique[product.codProd]) {
          unique[product.codProd] = product;
        }
      });
      return Object.values(unique);
    },
    uniqueInvoicesCount() {
      const uniqueInvoices = new Set(this.invoices.map(inv => inv.numero));
      return uniqueInvoices.size;
    }
  },

  methods: {
    handleFileUpload(files) {
      this.products = [];
      this.invoices = [];
      for (let file of files) {
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            try {
              const parser = new DOMParser();
              const xml = parser.parseFromString(e.target.result, "text/xml");
              this.parseXML(xml);
            } catch (error) {
              console.error("Error parsing XML:", error);
            }
          };
          reader.readAsText(file);
        }
      }
    },
    parseXML(xml) {
      const items = xml.getElementsByTagName("det");
      const newProducts = [];
      const invoiceNumber = xml.getElementsByTagName("ide")[0]?.getElementsByTagName("nNF")[0]?.textContent.trim() || 'Desconhecido';

      for (let item of items) {
        const prod = item.getElementsByTagName("prod")[0];
        const qProd = parseFloat(prod.getElementsByTagName("qCom")[0]?.textContent.trim() || 0);
        const vlrUnit = parseFloat(prod.getElementsByTagName("vUnCom")[0]?.textContent.trim() || 0);
        const vlrTotal = qProd * vlrUnit;

        const product = {
          codProd: prod.getElementsByTagName("cProd")[0]?.textContent.trim() || '',
          nomeProd: prod.getElementsByTagName("xProd")[0]?.textContent.trim() || '',
          qProd: qProd,
          vlrUnit: vlrUnit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
          vlrTotal: vlrTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
          multiplicador: 0, // Adiciona o multiplicador inicial
          invoiceNumber: invoiceNumber // Adiciona o número da nota ao produto
        };

        newProducts.push(product);
      }

      if (!this.invoices.some(inv => inv.numero === invoiceNumber)) {
        this.invoices.push({ numero: invoiceNumber });
      }

      this.products = [...this.products, ...newProducts];
    },
    searchInvoice({ query, filter }) {
      this.searchInvoiceNumber = query;
      this.selectedFilter = filter; // Atualiza o filtro selecionado
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    clearProducts() {
      this.products = [];
      this.invoices = [];
      this.searchInvoiceNumber = ''; // Limpa o campo de busca
      this.selectedFilter = 'invoiceNumber'; // Reseta o filtro para o padrão
      this.$emit('clear-products');
      this.closeModal(); // Fecha o modal se estiver aberto
    },
    saveConfig(productsWithMultiplicador) {
      this.products = this.products.map(product => {
        const multiplicador = productsWithMultiplicador.find(p => p.codProd === product.codProd)?.multiplicador || '';
        return {
          ...product,
          multiplicador
        };
      });
    }
  }
};
</script>

<style scoped>
.btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
