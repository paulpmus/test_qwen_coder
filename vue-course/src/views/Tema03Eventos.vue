<script setup>
import { ref } from 'vue'

const clickCount = ref(0)
const inputValue = ref('')
const formText = ref('')
const formSubmitted = ref(false)
const lastEvent = ref('')

function handleClick(event) {
  clickCount.value++
  lastEvent.value = `Click ${clickCount.value}: (${event.clientX}, ${event.clientY})`
}

function handleInput(event) {
  lastEvent.value = `Input: "${event.target.value}"`
}

function handleKeydown(event) {
  lastEvent.value = `Tecla presionada: ${event.key}`
}

function handleSubmit(event) {
  event.preventDefault()
  formSubmitted.value = true
  lastEvent.value = `Formulario enviado: "${formText.value}"`
}

function resetForm() {
  formText.value = ''
  formSubmitted.value = false
}
</script>

<template>
  <div class="topic-container">
    <h1>Tema 3: Eventos y Métodos</h1>
    
    <div class="info-box">
      <h2>Conceptos Clave</h2>
      <ul>
        <li><code>@click</code> o <code>v-on:click</code>: Escucha eventos de click</li>
        <li><code>@input</code>, <code>@change</code>, <code>@submit</code>: Eventos de formulario</li>
        <li><code>@keydown</code>, <code>@keyup</code>: Eventos de teclado</li>
        <li>Los métodos pueden recibir el objeto <code>$event</code></li>
        <li>Modificadores: <code>.prevent</code>, <code>.stop</code>, <code>.enter</code>, etc.</li>
      </ul>
    </div>

    <div class="demo-section">
      <h2>Ejemplo Práctico</h2>
      
      <div class="demo-box">
        <h3>Eventos de Click</h3>
        <button @click="handleClick" class="btn btn-primary">
          Haz click aquí ({{ clickCount }} clicks)
        </button>
        <p v-if="lastEvent" class="event-log">Último evento: {{ lastEvent }}</p>
      </div>

      <div class="demo-box">
        <h3>Eventos de Input</h3>
        <input 
          @input="handleInput"
          @keydown="handleKeydown"
          type="text"
          placeholder="Escribe algo..."
          class="input-field"
        />
      </div>

      <div class="demo-box">
        <h3>Envío de Formulario</h3>
        <form @submit="handleSubmit">
          <input 
            v-model="formText"
            type="text"
            placeholder="Escribe y presiona Enter"
            class="input-field"
          />
          <button type="submit" class="btn btn-success">Enviar</button>
          <button type="button" @click="resetForm" class="btn btn-secondary">Reset</button>
        </form>
        <p v-if="formSubmitted" class="success-message">✓ Formulario enviado correctamente</p>
      </div>

      <div class="demo-box">
        <h3>Modificadores de Eventos</h3>
        <input 
          @keyup.enter="lastEvent = 'Presionaste Enter'"
          type="text"
          placeholder="Presiona Enter para ver el efecto"
          class="input-field"
        />
        <a 
          href="https://example.com" 
          @click.prevent="lastEvent = 'Click prevenido (no navega)'"
          class="link-demo"
        >
          Click en este enlace (la navegación es prevenida)
        </a>
      </div>
    </div>

    <div class="code-example">
      <h3>Código de ejemplo:</h3>
      <pre><code>&lt;script setup&gt;
import { ref } from 'vue'

const count = ref(0)

function handleClick(event) {
  count.value++
  console.log('Coordenadas:', event.clientX, event.clientY)
}

function handleSubmit(event) {
  event.preventDefault()  // Prevenir envío default
  // Procesar formulario
}
&lt;/script&gt;

&lt;template&gt;
  &lt;!-- Sintaxis corta (recomendada) --&gt;
  &lt;button @click="handleClick"&gt;Click&lt;/button&gt;
  
  &lt;!-- Con modificador --&gt;
  &lt;form @submit.prevent="handleSubmit"&gt;&lt;/form&gt;
  
  &lt;!-- Solo enter --&gt;
  &lt;input @keyup.enter="onEnter" /&gt;
  
  &lt;!-- Múltiples eventos --&gt;
  &lt;input @input="onInput" @change="onChange" /&gt;
&lt;/template&gt;</code></pre>
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

.btn {
  padding: 10px 20px;
  font-size: 1em;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-right: 8px;
  transition: transform 0.1s;
}

.btn:hover {
  transform: scale(1.05);
}

.btn-primary {
  background: #42b883;
  color: white;
}

.btn-success {
  background: #28a745;
  color: white;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
  box-sizing: border-box;
}

.input-field:focus {
  outline: none;
  border-color: #42b883;
}

.event-log {
  margin-top: 10px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9em;
}

.success-message {
  margin-top: 10px;
  color: #28a745;
  font-weight: bold;
}

.link-demo {
  display: inline-block;
  margin-top: 10px;
  color: #42b883;
  text-decoration: none;
  font-weight: bold;
}

.link-demo:hover {
  text-decoration: underline;
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
