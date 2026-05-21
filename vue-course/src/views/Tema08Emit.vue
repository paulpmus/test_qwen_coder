<script setup>
import { ref } from 'vue'
import Tema08EmitHijo from './Tema08EmitHijo.vue';

const eventosRegistrados = ref([])

function registrarEvento(nombre, datos) {
  eventosRegistrados.value.unshift({
    nombre,
    datos,
    hora: new Date().toLocaleTimeString()
  })
}
</script>

<template>
  <div class="padre-container">
    <h2>Vista Padre</h2>
    <p>Escuchando los eventos del componente hijo...</p>
    <div class="log-container" v-if="eventosRegistrados.length > 0">
      <h3>Registro de Eventos en el Padre:</h3>
      <div v-for="(evento, index) in eventosRegistrados" :key="index" class="log-item">
        <span class="hora">{{ evento.hora }}</span>
        <span class="nombre-evento">{{ evento.nombre }}</span>
        <pre>{{ JSON.stringify(evento.datos, null, 2) }}</pre>
      </div>
    </div>
  </div>
  <!-- Escuchamos los eventos emitidos por el hijo -->
  <Tema08EmitHijo 
    @update="(data) => registrarEvento('update', data)"
    @delete="(data) => registrarEvento('delete', data)"
    @save="(data) => registrarEvento('save', data)"
    @custom-event="(data) => registrarEvento('custom-event', data)"
  />
</template>

<style scoped>
.padre-container {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.log-container {
  margin-top: 30px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.log-item {
  border-left: 4px solid #42b883;
  background: #f8f9fa;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
}

.hora {
  font-size: 0.85em;
  color: #666;
  margin-right: 10px;
}

.nombre-evento {
  font-weight: bold;
  color: #42b883;
  display: block;
  margin-bottom: 5px;
}

pre {
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 10px;
  border-radius: 4px;
  font-size: 0.9em;
  overflow-x: auto;
  margin: 0;
}
</style>
