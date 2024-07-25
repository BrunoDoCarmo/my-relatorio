<template>
  <header>
    <div class="name">
      <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
      <font-awesome-icon class="icon" :icon="['fas', 'clipboard-list']" />
      <h2>meu relatório</h2>
    </div>
  </header>
  <main>
    <ImportXML msg="Welcome to Your Vue.js App"/>
  </main>
</template>

<script>
import './assets/css/global.css'
import ImportXML from './components/ImportXML'

export default {
  name: 'App',
  components: {
    ImportXML
  }
}
</script>

<style>
header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 5rem;
  padding: .5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(59,59,59);
}
header .name {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-family: var(--font-1);
  text-transform: capitalize;
  font-size: 2rem;
  color: #fff;
}
header .name .icon {
  font-size: 4rem;
}
main {
  width: 100%;
  height: calc(100vh - 5rem);
  position: fixed;
  bottom: 0;
}
</style>
