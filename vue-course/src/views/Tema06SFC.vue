<script setup>
// Este componente demuestra la estructura de un Single File Component (SFC)
import { ref } from 'vue'

// <script setup> es azúcar sintáctico para setup()
// Las variables y funciones declaradas aquí están disponibles en el template

const title = ref('Mi Componente SFC')
const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <div class="topic-container">
    <h1>Tema 6: Estructura de SFC</h1>
    
    <div class="info-box">
      <h2>Partes de un SFC</h2>
      <ul>
        <li><code>&lt;script setup&gt;</code>: Lógica del componente (reactividad, métodos)</li>
        <li><code>&lt;template&gt;</code>: Estructura HTML con sintaxis Vue</li>
        <li><code>&lt;style scoped&gt;</code>: Estilos CSS que solo afectan este componente</li>
      </ul>
    </div>

    <div class="demo-section">
      <h2>Ejemplo Práctico</h2>
      
      <div class="component-demo">
        <h3>{{ title }}</h3>
        <p>Contador: {{ count }}</p>
        <button @click="increment" class="btn">Incrementar</button>
      </div>

      <div class="structure-diagram">
        <h3>Estructura visual:</h3>
        <div class="diagram">
          <div class="block script">&lt;script setup&gt;<br>Lógica JS/TS</div>
          <div class="block template">&lt;template&gt;<br>HTML + Directivas</div>
          <div class="block style">&lt;style scoped&gt;<br>CSS aislado</div>
        </div>
      </div>
    </div>

    <div class="code-example">
      <h3>Estructura completa:</h3>
      <pre><code>&lt;!-- MiComponente.vue --&gt;

&lt;script setup&gt;
import { ref } from 'vue'

// Variables reactivas
const message = ref('Hola')

// Funciones
function greet() {
  console.log(message.value)
}
&lt;/script&gt;

&lt;template&gt;
  &lt;div class="container"&gt;
    &lt;h1&gt;{{ message }}&lt;/h1&gt;
    &lt;button @click="greet"&gt;Saludar&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;style scoped&gt;
.container {
  padding: 20px;
}

h1 {
  color: #42b883;
}
&lt;/style&gt;</code></pre>
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

.component-demo {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  text-align: center;
}

.btn {
  padding: 10px 20px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
}

.structure-diagram {
  margin-top: 24px;
}

.diagram {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.block {
  padding: 20px;
  border-radius: 8px;
  min-width: 150px;
  text-align: center;
  font-weight: bold;
}

.block.script {
  background: #fce77d;
  color: #333;
}

.block.template {
  background: #42b883;
  color: white;
}

.block.style {
  background: #35495e;
  color: white;
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
