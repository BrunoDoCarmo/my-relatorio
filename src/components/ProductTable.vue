<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Nro da Nota</th>
          <th>Cod. Produto</th>
          <th>Nome Produto</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Valor Total</th>
          <th>Peso Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="index">
          <td>{{ product.invoiceNumber }}</td>
          <td>{{ product.codProd }}</td>
          <td>{{ product.nomeProd }}</td>
          <td>{{ product.qProd }}</td>
          <td>{{ product.vlrUnit }}</td>
          <td>{{ product.vlrTotal }}</td>
          <td>{{ product.qProd * product.multiplicador }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ProductTable',
  props: ['products'],
};
</script>

<style scoped>
.table-container th,
.table-container td {
  width: 10%;
}
.table-container th:nth-child(3),
.table-container td:nth-child(3) {
  width: 40%;
  padding-left: 1rem;
  text-align: left;
}
</style>
