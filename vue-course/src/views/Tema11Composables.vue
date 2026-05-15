<script setup>
import { useCounter, useLocalStorage, useToggle } from '../composables'

// Usando el composable useCounter
const { count: counter1, increment: inc1, decrement: dec1, reset: reset1 } = useCounter(0)
const { count: counter2, increment: inc2, decrement: dec2, reset: reset2 } = useCounter(100)

// Usando el composable useLocalStorage
const { value: theme, setValue: setTheme, clear: clearTheme } = useLocalStorage('vue-course-theme', 'light')

// Usando el composable useToggle
const { isOn: isDarkMode, toggle: toggleDarkMode } = useToggle(false)

function applyTheme() {
  if (isDarkMode.value) {
    setTheme('dark')
  } else {
    setTheme('light')
  }
}
</script>

<template>
  <div class="topic-container">
    <h1>Tema 11: Composables (Extracción de Lógica)</h1>
    
    <div class="info-box">
      <h2>Conceptos Clave</h2>
      <ul>
        <li>Los composables son funciones que extraen lógica reutilizable</li>
        <li>Convención: nombres que empiezan con <code>use</code></li>
        <li>Pueden contener estado reactivo, métodos y ciclo de vida</li>
        <li>Reemplazan a los mixins de Vue 2</li>
        <li>Ideal para compartir lógica entre componentes</li>
      </ul>
    </div>

    <div class="demo-section">
      <h2>Ejemplo Práctico</h2>
      
      <div class="demo-box">
        <h3>useCounter - Múltiples instancias independientes</h3>
        
        <div class="counter-group">
          <div class="counter-card">
            <h4>Contador 1 (inicia en 0)</h4>
            <p class="count">{{ counter1 }}</p>
            <div class="buttons">
              <button @click="dec1" class="btn btn-danger">-</button>
              <button @click="inc1" class="btn btn-primary">+</button>
              <button @click="reset1" class="btn btn-secondary">Reset</button>
            </div>
          </div>

          <div class="counter-card">
            <h4>Contador 2 (inicia en 100)</h4>
            <p class="count">{{ counter2 }}</p>
            <div class="buttons">
              <button @click="dec2" class="btn btn-danger">-</button>
              <button @click="inc2" class="btn btn-primary">+</button>
              <button @click="reset2" class="btn btn-secondary">Reset</button>
            </div>
          </div>
        </div>
      </div>

      <div class="demo-box">
        <h3>useLocalStorage - Persistencia automática</h3>
        <p>Tema actual: <strong>{{ theme }}</strong></p>
        <p class="hint">El valor se guarda en localStorage y persiste al recargar</p>
        <div class="buttons">
          <button @click="setTheme('light')" class="btn btn-light">Light</button>
          <button @click="setTheme('dark')" class="btn btn-dark">Dark</button>
          <button @click="clearTheme" class="btn btn-secondary">Clear</button>
        </div>
      </div>

      <div class="demo-box">
        <h3>useToggle - Interruptor reusable</h3>
        <p>Estado: <strong>{{ isDarkMode ? 'ON' : 'OFF' }}</strong></p>
        <div class="buttons">
          <button @click="toggleDarkMode" class="btn btn-primary">Toggle</button>
          <button @click="applyTheme" class="btn btn-success">Aplicar Tema</button>
        </div>
      </div>

      <div class="code-preview">
        <h3>Código del composable (ejemplo):</h3>
        <pre><code>// composables/useCounter.js
import { ref } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)

  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  function reset() {
    count.value = initialValue
  }

  return { count, increment, decrement, reset }
}

// Uso en componente
const { count, increment, decrement, reset } = useCounter(0)</code></pre>
      </div>
    </div>

    <div class="code-example">
      <h3>Más ejemplos:</h3>
      <pre><code>// useLocalStorage.js
export function useLocalStorage(key, initialValue) {
  const stored = localStorage.getItem(key)
  const value = ref(stored ? JSON.parse(stored) : initialValue)

  function setValue(newValue) {
    value.value = newValue
    localStorage.setItem(key, JSON.stringify(newValue))
  }

  return { value, setValue }
}

// useToggle.js
export function useToggle(initialValue = false) {
  const isOn = ref(initialValue)
  const toggle = () => { isOn.value = !isOn.value }
  return { isOn, toggle }
}

// useFetch.js (para APIs)
export function useFetch(url) {
  const data = ref(null)
  const loading = ref(true)
  const error = ref(null)

  fetch(url)
    .then(res => res.json())
    .then(json => data.value = json)
    .catch(err => error.value = err)
    .finally(() => loading.value = false)

  return { data, loading, error }
}</code></pre>
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

.demo-section {
  background: #fafafa;
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 24px;
}

.demo-box {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.demo-box h3 {
  margin-top: 0;
  color: #42b883;
}

.counter-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.counter-card {
  text-align: center;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
}

.count {
  font-size: 2.5em;
  font-weight: bold;
  color: #42b883;
  margin: 15px 0;
}

.buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: white;
}

.btn-primary { background: #007bff; }
.btn-danger { background: #dc3545; }
.btn-secondary { background: #6c757d; }
.btn-success { background: #28a745; }
.btn-light { background: #f8f9fa; color: #333; border: 1px solid #ddd; }
.btn-dark { background: #343a40; }

.hint {
  color: #666;
  font-style: italic;
  font-size: 0.9em;
  margin: 10px 0;
}

.code-preview {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
}

.code-preview pre {
  background: white;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
}

.code-preview code {
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 0.85em;
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
