<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

const count = ref(0)
const message = ref('')
const timer = ref(null)
const seconds = ref(0)
const isRunning = ref(false)
const mountTime = ref(null)
const unmountWarning = ref(false)

let intervalId = null

watch(count, (newValue, oldValue) => {
  console.log(`Count cambió de ${oldValue} a ${newValue}`)
})

watch(message, (newValue) => {
  if (newValue.length > 10) {
    console.log('Mensaje largo detectado')
  }
}, { immediate: true })

watch([count, message], ([newCount, newMessage]) => {
  console.log('Múltiples valores cambiaron:', { count: newCount, message: newMessage })
})

function startTimer() {
  isRunning.value = true
  intervalId = setInterval(() => {
    seconds.value++
  }, 1000)
}

function stopTimer() {
  isRunning.value = false
  clearInterval(intervalId)
}

function resetTimer() {
  stopTimer()
  seconds.value = 0
}

onMounted(() => {
  mountTime.value = new Date().toLocaleTimeString()
  console.log('Componente montado')
})

onUnmounted(() => {
  unmountWarning.value = true
  clearInterval(intervalId)
  console.log('Componente desmontado')
})
</script>

<template>
  <div class="topic-container">
    <h1>Tema 10: Efectos y Ciclo de Vida</h1>
    
    <div class="info-box">
      <h2>Conceptos Clave</h2>
      <ul>
        <li><code>watch()</code>: Observa cambios en variables reactivas</li>
        <li><code>watchEffect()</code>: Ejecta automáticamente cuando cambian dependencias</li>
        <li><code>onMounted()</code>: Se ejecuta cuando el componente se monta en el DOM</li>
        <li><code>onUnmounted()</code>: Limpieza antes de destruir el componente</li>
        <li>Ciclo de vida: mounted → updated → unmounted</li>
      </ul>
    </div>

    <div class="demo-section">
      <h2>Ejemplo Práctico</h2>
      
      <div class="demo-box">
        <h3>Watch en acción</h3>
        <p>Incrementa el contador para ver los logs en consola:</p>
        <div class="counter">
          <button @click="count--" class="btn">-</button>
          <span class="count-value">{{ count }}</span>
          <button @click="count++" class="btn">+</button>
        </div>
        
        <input v-model="message" type="text" placeholder="Escribe algo (watch con immediate)" />
        <p class="hint">Abre la consola del navegador para ver los logs</p>
      </div>

      <div class="demo-box">
        <h3>Timer con onUnmounted</h3>
        <p class="timer-display">{{ seconds }}s</p>
        <div class="timer-controls">
          <button v-if="!isRunning" @click="startTimer" class="btn btn-success">Start</button>
          <button v-else @click="stopTimer" class="btn btn-warning">Stop</button>
          <button @click="resetTimer" class="btn btn-secondary">Reset</button>
        </div>
        <p class="hint">El timer se limpia automáticamente al desmontar</p>
      </div>

      <div class="demo-box">
        <h3>Información del ciclo de vida</h3>
        <p><strong>Montado en:</strong> {{ mountTime || 'Esperando...' }}</p>
        <p v-if="unmountWarning" class="warning">⚠️ El componente fue desmontado (ver consola)</p>
      </div>
    </div>

    <div class="code-example">
      <h3>Código de ejemplo:</h3>
      <pre><code>&lt;script setup&gt;
import { ref, watch, watchEffect, onMounted, onUnmounted } from 'vue'

const count = ref(0)
const name = ref('Vue')

// Watch básico
watch(count, (newVal, oldVal) => {
  console.log(`De ${oldVal} a ${newVal}`)
})

// Watch con immediate (se ejecuta inmediatamente)
watch(name, (val) => {
  console.log('Nombre:', val)
}, { immediate: true })

// WatchEffect (auto-detecta dependencias)
watchEffect(() => {
  console.log('Count es:', count.value)
})

// Hooks del ciclo de vida
onMounted(() => {
  console.log('Componente montado')
  // Ideal para llamadas a API
})

onUnmounted(() => {
  console.log('Componente desmontado')
  // Limpieza: timers, event listeners
})
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

.counter {
  display: flex;
  align-items: center;
  gap: 15px;
  justify-content: center;
  margin: 15px 0;
}

.count-value {
  font-size: 2em;
  font-weight: bold;
  min-width: 60px;
  text-align: center;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.2em;
}

.btn-success { background: #28a745; color: white; }
.btn-warning { background: #ffc107; color: #333; }
.btn-secondary { background: #6c757d; color: white; }

input[type="text"] {
  width: 100%;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
  box-sizing: border-box;
}

.hint {
  margin-top: 10px;
  color: #666;
  font-style: italic;
  font-size: 0.9em;
}

.timer-display {
  font-size: 3em;
  font-weight: bold;
  text-align: center;
  color: #42b883;
  font-family: monospace;
}

.timer-controls {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 15px;
}

.warning {
  color: #dc3545;
  font-weight: bold;
  padding: 10px;
  background: #ffe6e6;
  border-radius: 4px;
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
