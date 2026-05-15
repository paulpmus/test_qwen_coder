<script setup>
import { ref, reactive } from 'vue'

const isActive = ref(true)
const error = ref(false)
const fontSize = ref(16)
const textColor = ref('#333333')
const backgroundColor = ref('#ffffff')

const styles = reactive({
  fontWeight: 'bold',
  fontStyle: 'italic'
})

const classObject = reactive({
  active: true,
  'text-danger': false
})
</script>

<template>
  <div class="topic-container">
    <h1>Tema 2: Directivas de Atributos (v-bind)</h1>
    
    <div class="info-box">
      <h2>Conceptos Clave</h2>
      <ul>
        <li><code>v-bind:class</code> o <code>:class</code>: Vincula clases CSS dinámicamente</li>
        <li><code>v-bind:style</code> o <code>:style</code>: Vincula estilos en línea</li>
        <li><code>v-bind</code> o <code>:</code>: Vincula cualquier atributo HTML</li>
        <li>La sintaxis corta <code>:</code> es equivalente a <code>v-bind:</code></li>
      </ul>
    </div>

    <div class="demo-section">
      <h2>Ejemplo Práctico</h2>
      
      <div class="controls">
        <label>
          <input type="checkbox" v-model="isActive" />
          Clase "active" activada
        </label>
        <label>
          <input type="checkbox" v-model="error" />
          Mostrar error
        </label>
        <label>
          Tamaño de fuente: 
          <input type="range" v-model="fontSize" min="12" max="32" />
          {{ fontSize }}px
        </label>
        <label>
          Color de texto:
          <input type="color" v-model="textColor" />
        </label>
        <label>
          Color de fondo:
          <input type="color" v-model="backgroundColor" />
        </label>
      </div>

      <div 
        :class="['demo-box', { active: isActive, 'has-error': error }]"
        :style="{ 
          fontSize: fontSize + 'px', 
          color: textColor, 
          backgroundColor: backgroundColor,
          ...styles
        }"
      >
        <p>¡Este elemento cambia dinámicamente!</p>
        <p v-if="error" class="error-message">⚠️ Hay un error</p>
      </div>

      <div class="attribute-demo">
        <h3>Vinculación de atributos</h3>
        <input 
          type="text" 
          :placeholder="'Escribe algo... (tamaño: ' + fontSize + ')'"
          :disabled="!isActive"
          class="input-field"
        />
        <p v-if="!isActive" class="hint">El input está deshabilitado porque "active" es falso</p>
        
        <a 
          href="https://vuejs.org" 
          target="_blank"
          :title="'Visitar Vue.js (font-size: ' + fontSize + 'px)'"
          class="link-demo"
        >
          Enlace a Vue.js (hover para ver title dinámico)
        </a>
      </div>
    </div>

    <div class="code-example">
      <h3>Código de ejemplo:</h3>
      <pre><code>&lt;script setup&gt;
import { ref, reactive } from 'vue'

const isActive = ref(true)
const fontSize = ref(16)

const styles = reactive({
  fontWeight: 'bold'
})

const classObject = reactive({
  active: true,
  'text-danger': false
})
&lt;/script&gt;

&lt;template&gt;
  &lt;!-- Sintaxis completa --&gt;
  &lt;div v-bind:class="{ active: isActive }"&gt;&lt;/div&gt;
  
  &lt;!-- Sintaxis corta (recomendada) --&gt;
  &lt;div :class="[classObject, { 'error': hasError }]"&gt;&lt;/div&gt;
  
  &lt;!-- Vincular estilos --&gt;
  &lt;div :style="{ fontSize: fontSize + 'px', ...styles }"&gt;&lt;/div&gt;
  
  &lt;!-- Vincular cualquier atributo --&gt;
  &lt;input :disabled="!isActive" :placeholder="texto" /&gt;
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

.controls {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
  padding: 16px;
  background: white;
  border-radius: 8px;
}

.controls label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.controls input[type="checkbox"] {
  width: 18px;
  height: 18px;
}

.controls input[type="range"] {
  flex: 1;
  max-width: 200px;
}

.controls input[type="color"] {
  width: 40px;
  height: 30px;
  border: none;
  cursor: pointer;
}

.demo-box {
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  transition: all 0.3s ease;
  border: 3px solid transparent;
}

.demo-box.active {
  border-color: #42b883;
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.3);
}

.demo-box.has-error {
  border-color: #c9302c;
  background-color: #ffe6e6 !important;
}

.error-message {
  color: #c9302c;
  font-weight: bold;
  margin-top: 10px;
}

.attribute-demo {
  margin-top: 24px;
  padding: 16px;
  background: white;
  border-radius: 8px;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
}

.input-field:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

.hint {
  color: #666;
  font-style: italic;
  font-size: 0.9em;
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
