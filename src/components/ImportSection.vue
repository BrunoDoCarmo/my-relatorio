<template>
    <div class="importacao">
      <h3>Importar XML</h3>
      <a class="btn" @click="triggerFileInput">Carregar XML</a>
      <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none;" accept=".xml" multiple/>
    </div>
  </template>
  
  <script>
  export default {
    data(){
      return {
      }
    },
    methods: {
      triggerFileInput() {
        this.$refs.fileInput.click();
      },
      handleFileUpload(event) {
        this.$emit('file-upload', event.target.files);
      },
    }
  };
  </script>
  
  <style scoped>
  .importacao {
    font-family: var(--font-2);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1rem 9%;
    border-bottom: 0.25rem solid #000;
    font-size: 2rem;
  }
  </style>
  