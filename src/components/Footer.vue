<template>
  <div class="rodape">
    <div class="campo">
      <input type="text" :value="totalProduto" readonly />
      <div class="nomeCampo">
        <label for="">Total NF-e</label>
      </div>
    </div>
    <div class="campo">
      <input type="text" :value="totalPeso" readonly />
      <div class="nomeCampo">
        <label for="">Total Peso</label>
      </div>
    </div>
    <div class="campo">
      <input type="text" :value="totalProdImportado" readonly />
      <div class="nomeCampo">
        <label for="">Total Prod. importado</label>
      </div>
    </div>
    <div class="campo">
      <input type="text" :value="uniqueInvoicesCount" readonly />
      <div class="nomeCampo">
        <label for="">Total NF-e importado</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooTer',
  props: {
    totalProduto: {
      type: Number,
      required: true
    },
    totalPeso: {
      type: Number,
      required: true
    },
    totalProdImportado: {
      type: Number,
      required: true
    },
    uniqueInvoicesCount: {
      type: Number,
      required: true
    }
  }
};
</script>

<style scoped>
.rodape {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  position: absolute;
  border-top: 0.25rem solid #000;
  width: 100%;
  bottom: 0;
  padding: 1.5rem 2rem;
  border-radius: 0 0 1rem 1rem; 
}

.campo {
  position: relative;
  width: 100%;
}

.campo input[type="text"] {
  width: 100%;
  padding: 10px;
  height: 3.6rem;
  font-size: 2rem;
  border: 0.18rem solid #000;
  text-align: right;
  border-radius: 1rem;
  font-weight: bold;
  color: var(--orange);
}

.campo .nomeCampo {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  transition: all 0.3s ease;
  font-size: 1rem;
  color: #999;
  pointer-events: none;
}

.campo input[type="text"]:focus + .nomeCampo label,
.campo input[type="text"]:not(:placeholder-shown) + .nomeCampo label {
  font-family: var(--font-2);
  text-transform: uppercase;
  position: relative;
  width: 100%;
  top: -18px;
  left: 10px;
  background-color: white;
  border: 0.18rem solid #000;
  border-radius: 0.5rem;
  padding: 0 5px;
  font-size: 1.25rem;
  font-weight: bold;
  color: #000;
}
</style>
