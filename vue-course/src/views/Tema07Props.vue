<script setup>
import { ref, reactive } from 'vue'
import Tema07PropsHijo from './Tema07PropsHijo.vue';

const titulo = ref("")
const contador = ref()
const estado = ref()
const etiquetas = reactive([])
const usuario = reactive({})

// Para agregar una nueva etiqueta
const nuevaEtiqueta = ref('')

function agregarEtiqueta() {
  if (nuevaEtiqueta.value.trim()) {
    etiquetas.push(nuevaEtiqueta.value)
    nuevaEtiqueta.value = ''
  }
}

function eliminarEtiqueta(index) {
  etiquetas.splice(index, 1)
}
</script>

<template>
  <!--Componente padre-->
  <div class="formulario-contenedor">
    <h3>Componente padre</h3>
    
    <div class="form-group">
      <label>Título:</label>
      <input v-model="titulo" type="text" placeholder="Ingresa un título" />
    </div>

    <div class="form-group">
      <label>Contador:</label>
      <input v-model.number="contador" type="number" />
    </div>

    <div class="form-group">
      <label>Estado (Activo):</label>
      <input v-model="estado" type="checkbox" />
    </div>

    <div class="form-group">
      <label>Etiquetas:</label>
      <div class="tags-list">
        <span v-for="(tag, index) in etiquetas" :key="index" class="tag">
          {{ tag }}
          <button @click="eliminarEtiqueta(index)" class="btn-remove">✕</button>
        </span>
      </div>
      <div class="add-tag">
        <input v-model="nuevaEtiqueta" type="text" placeholder="Nueva etiqueta" />
        <button @click="agregarEtiqueta" class="btn-add">Agregar</button>
      </div>
    </div>

    <div class="form-group">
      <label>Usuario - Nombre:</label>
      <input v-model="usuario.name" type="text" />
    </div>

    <div class="form-group">
      <label>Usuario - Email:</label>
      <input v-model="usuario.email" type="email" />
    </div>
  </div>

  <!-- Componente hijo recibe los props -->
  <Tema07PropsHijo :title="titulo" :count="contador" :is-active="estado" :tags="etiquetas" :user="usuario" />
</template>

<style scoped>
.formulario-contenedor {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  max-width: 500px;
  margin: 0 auto;
}

.formulario-contenedor h2 {
  margin-bottom: 20px;
  color: #35495e;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="number"] {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
  box-sizing: border-box;
}

.form-group input[type="checkbox"] {
  margin-right: 10px;
  cursor: pointer;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
}

.tag {
  background: #42b883;
  color: white;
  padding: 6px 10px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9em;
}

.btn-remove {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-weight: bold;
  padding: 0;
}

.add-tag {
  display: flex;
  gap: 8px;
}

.add-tag input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9em;
}

.btn-add {
  background: #42b883;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.btn-add:hover {
  background: #369070;
}
</style>
