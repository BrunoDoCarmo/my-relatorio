<template>
  <div class="modal-overlay">
    <div class="modal">
      <h3>Produtos Únicos</h3>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Cod. Produto</th>
              <th>Nome Produto</th>
              <th>Multiplicador</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in products" :key="index">
              <td>{{ product.codProd }}</td>
              <td>{{ product.nomeProd }}</td>
              <td>
                <input
                  class="multiplica"
                  type="text"
                  v-model.number="product.multiplicador"
                  min="1"
                  @change="updateMultiplicador(product.codProd, product.multiplicador)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-buttons">
        <button class="btn" @click="saveConfig">Salvar</button>
        <button class="btn" @click="closeModal">Fechar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["products"],
  data() {
    return {
      productsWithMultiplicador: this.products.map((product) => ({
        ...product,
        multiplicador: product.multiplicador || '',
      })),
    };
  },
  methods: {
    updateMultiplicador(codProd, multiplicador) {
      this.productsWithMultiplicador.forEach(product => {
        if (product.codProd === codProd) {
          product.multiplicador = multiplicador;
        }
      });
    },
    saveConfig() {
      this.$emit("save", this.productsWithMultiplicador);
      this.closeModal();
    },
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-2);
  z-index: 1;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  width: 80%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease-in-out;
}

.modal h3 {
  color: #333;
  text-align: center;
  text-transform: uppercase;
  font-size: 2rem;
}

.table-container th,
.table-container td {
  width: 10%;
}

.table-container th:nth-child(2),
.table-container td:nth-child(2) {
  width: 80%;
  text-align: left;
  padding-left: 1rem;
}

.multiplica {
  padding: .5rem;
  /* border: .15rem solid #000; */
  /* border-radius: 1rem; */
  text-align: center;
  width: 100%;
  height: 4rem;
  background: transparent;
  font-family: var(--font-2);
  font-size: 2.5rem;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.modal-buttons button {
  background: green;
  color: #fff;
}
.modal-buttons button:nth-child(2) {
  background: var(--orange);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
