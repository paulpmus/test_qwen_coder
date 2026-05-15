<script setup>
import { ref } from 'vue'

const count = ref(0)
const message = ref('¡Hola Vue.js!')

function increment() {
  count.value++
}

function decrement() {
  count.value--
}

function reset() {
  count.value = 0
}
</script>

<template>
  <div class="topic-container">
    <h1>Tema 1: Reactividad con ref y reactive</h1>
    
    <div class="info-box">
      <h2>Conceptos Clave</h2>
      <ul>
        <li><code>ref()</code>: Crea una variable reactiva que se accede con <code>.value</code></li>
        <li><code>reactive()</code>: Crea un objeto reactivo (no necesita .value)</li>
        <li>Las variables reactivas actualizan la vista automáticamente cuando cambian</li>
      </ul>
    </div>

    <div class="demo-section">
      <h2>Ejemplo Práctico</h2>
      
      <div class="counter">
        <p class="count-display">Contador: {{ count }}</p>
        <div class="buttons">
          <button @click="decrement" class="btn btn-danger">-</button>
          <button @click="increment" class="btn btn-primary">+</button>
          <button @click="reset" class="btn btn-secondary">Reset</button>
        </div>
      </div>

      <div class="message-box">
        <p>Mensaje reactivo: <strong>{{ message }}</strong></p>
        <input 
          v-model="message" 
          type="text" 
          placeholder="Escribe para ver la reactividad en acción"
          class="input-field"
        />
      </div>
    </div>

    <div class="code-example">
      <h3>Código de ejemplo:</h3>
      <pre><code>&lt;script setup&gt;
import { ref, reactive } from 'vue'

// Variable reactiva con ref
const count = ref(0)

// Objeto reactivo
const state = reactive({
  name: 'Vue Course',
  version: 3
})

function increment() {
  count.value++  // ¡Importante usar .value en refs!
}
&lt;/script&gt;</code></pre>
    </div>
  </div>
</template>

<style scoped>
.topic-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.info-box {
  background: #f0f9ff;
  border-left: 4px solid #0ea5e9;
  padding: 16px;
  margin-bottom: 24px;
  border-radius: 4px;
}

.info-box code {
  background: #e0f2fe;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: monospace;
}

.demo-section {
  background: #fafafa;
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 24px;
}

.counter {
  text-align: center;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.count-display {
  font-size: 2em;
  font-weight: bold;
  color: #42b883;
  margin-bottom: 16px;
}

.buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.btn {
  padding: 10px 20px;
  font-size: 1.2em;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: transform 0.1s;
}

.btn:hover {
  transform: scale(1.05);
}

.btn-primary {
  background: #42b883;
  color: white;
}

.btn-danger {
  background: #c9302c;
  color: white;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.message-box {
  margin-top: 24px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.input-field {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
}

.input-field:focus {
  outline: none;
  border-color: #42b883;
}

.code-example {
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
}

.code-example pre {
  margin: 0;
}

.code-example code {
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 0.9em;
}
</style>
