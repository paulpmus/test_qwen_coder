<script setup>
import { ref } from 'vue'

const emit = defineEmits(['update', 'delete', 'save', 'custom-event'])

const itemName = ref('Nuevo Item')

function handleUpdate() {
  emit('update', itemName.value)
}

function handleDelete() {
  emit('delete', { id: 1, name: itemName.value })
}

function handleSave() {
  emit('save', { success: true, data: { id: Date.now(), name: itemName.value } })
}

function handleCustom() {
  emit('custom-event', { type: 'custom', timestamp: new Date().toISOString() })
}

const eventsLog = ref([])

function logEvent(eventName, data) {
  eventsLog.value.unshift({ event: eventName, data, time: new Date().toLocaleTimeString() })
}
</script>

<template>
  <div class="topic-container">
    <h1>Tema 8: Comunicación con emit</h1>
    
    <div class="info-box">
      <h2>Conceptos Clave</h2>
      <ul>
        <li><code>defineEmits()</code>: Define eventos personalizados que el componente puede emitir</li>
        <li>Los hijos notifican a los padres mediante eventos</li>
        <li>Flujo: Hijo → emit() → Padre escucha con @evento</li>
        <li>Pasar datos como argumentos del emit</li>
      </ul>
    </div>

    <div class="demo-section">
      <h2>Ejemplo Práctico</h2>
      
      <div class="child-component">
        <h3>Componente Hijo (emite eventos)</h3>
        <input v-model="itemName" type="text" placeholder="Nombre del item" />
        
        <div class="button-group">
          <button @click="handleUpdate" class="btn btn-primary">Emitir update</button>
          <button @click="handleDelete" class="btn btn-danger">Emitir delete</button>
          <button @click="handleSave" class="btn btn-success">Emitir save</button>
          <button @click="handleCustom" class="btn btn-info">Emitir custom</button>
        </div>
      </div>

      <div class="parent-component">
        <h3>Componente Padre (recibe eventos)</h3>
        <p>Escucha los eventos del hijo y muestra el registro:</p>
        
        <div class="events-log">
          <div v-for="(log, index) in eventsLog" :key="index" class="log-entry">
            <span class="time">{{ log.time }}</span>
            <span class="event-name">{{ log.event }}</span>
            <pre>{{ JSON.stringify(log.data) }}</pre>
          </div>
          <div v-if="eventsLog.length === 0" class="no-events">
            No hay eventos registrados aún
          </div>
        </div>
      </div>
    </div>

    <div class="code-example">
      <h3>Código de ejemplo:</h3>
      <pre><code>&lt;!-- Componente Hijo --&gt;
&lt;script setup&gt;
const emit = defineEmits(['update', 'delete', 'save'])

function onUpdate() {
  emit('update', { id: 1, name: 'Item' })
}

function onDelete(id) {
  emit('delete', id)
}
&lt;/script&gt;

&lt;template&gt;
  &lt;button @click="onUpdate"&gt;Actualizar&lt;/button&gt;
  &lt;button @click="onDelete(1)"&gt;Eliminar&lt;/button&gt;
&lt;/template&gt;

&lt;!-- Componente Padre --&gt;
&lt;template&gt;
  &lt;Hijo 
    @update="handleUpdate" 
    @delete="handleDelete"
    @save="handleSave"
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
function handleUpdate(data) {
  console.log('Actualizado:', data)
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

.demo-section {
  background: #fafafa;
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 24px;
}

.child-component,
.parent-component {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

.child-component h3 {
  color: #dc3545;
}

.parent-component h3 {
  color: #42b883;
}

.button-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 15px;
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
.btn-success { background: #28a745; }
.btn-info { background: #17a2b8; }

input[type="text"] {
  width: 100%;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
  box-sizing: border-box;
}

.events-log {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
  max-height: 300px;
  overflow-y: auto;
}

.log-entry {
  background: white;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  border-left: 4px solid #007bff;
}

.log-entry .time {
  font-size: 0.8em;
  color: #666;
  margin-right: 10px;
}

.log-entry .event-name {
  font-weight: bold;
  color: #007bff;
}

.log-entry pre {
  margin: 5px 0 0 0;
  background: #f5f5f5;
  padding: 8px;
  border-radius: 4px;
  font-size: 0.85em;
}

.no-events {
  text-align: center;
  color: #666;
  font-style: italic;
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
