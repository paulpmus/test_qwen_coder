<script setup>
import { ref } from 'vue'

const showModal = ref(false)
const modalContent = ref('')
const showTooltip = ref(false)

function openModal(content) {
  modalContent.value = content
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  modalContent.value = ''
}
</script>

<template>
  <div class="topic-container">
    <h1>Tema 15: Slots y Slots Teleport</h1>
    
    <div class="info-box">
      <h2>Conceptos Clave</h2>
      <ul>
        <li><code>&lt;slot&gt;</code>: Punto de inserción para contenido del padre</li>
        <li>Slots con nombre: <code>&lt;slot name="header"&gt;</code></li>
        <li>Slots con scope: pasar datos del hijo al padre</li>
        <li><code>&lt;Teleport&gt;</code>: Renderiza contenido fuera de la jerarquía del componente</li>
        <li>Ideal para modales, tooltips, notificaciones</li>
      </ul>
    </div>

    <div class="demo-section">
      <h2>Ejemplo Práctico</h2>
      
      <div class="demo-box">
        <h3>Slot Básico</h3>
        <div class="card-basic">
          <div class="card-header">
            <slot name="header">Header por defecto</slot>
          </div>
          <div class="card-body">
            <slot>Contenido por defecto</slot>
          </div>
          <div class="card-footer">
            <slot name="footer">Footer por defecto</slot>
          </div>
        </div>

        <!-- Uso con slots nombrados -->
        <div class="card-basic custom-slots">
          <template #header>
            <h4>🎉 Header Personalizado</h4>
          </template>
          <template #default>
            <p>Este es el contenido principal personalizado pasado al slot por defecto.</p>
          </template>
          <template #footer>
            <span>⭐ Footer Personalizado</span>
          </template>
        </div>
      </div>

      <div class="demo-box">
        <h3>Teleport - Modal</h3>
        <button @click="openModal('¡Hola desde el modal!')" class="btn btn-primary">
          Abrir Modal
        </button>

        <Teleport to="body">
          <div v-if="showModal" class="modal-overlay" @click="closeModal">
            <div class="modal-content" @click.stop>
              <div class="modal-header">
                <h3>Modal con Teleport</h3>
                <button @click="closeModal" class="btn-close">×</button>
              </div>
              <div class="modal-body">
                {{ modalContent }}
                <p>Este modal se renderiza directamente en &lt;body&gt;, fuera de la jerarquía del componente.</p>
              </div>
              <div class="modal-footer">
                <button @click="closeModal" class="btn btn-secondary">Cerrar</button>
              </div>
            </div>
          </div>
        </Teleport>
      </div>

      <div class="demo-box">
        <h3>Teleport - Tooltip</h3>
        <div class="tooltip-container">
          Pasa el cursor por aquí
          <Teleport to="body">
            <div v-if="showTooltip" class="tooltip-content">
              ¡Este tooltip está fuera del contenedor!
            </div>
          </Teleport>
        </div>
      </div>

      <div class="demo-box">
        <h3>Slot con Scope (ejemplo conceptual)</h3>
        <pre><code>&lt;!-- Componente Hijo --&gt;
&lt;slot :user="userData" :count="itemCount"&gt;
  Contenido fallback
&lt;/slot&gt;

&lt;!-- Componente Padre --&gt;
&lt;Hijo v-slot="{ user, count }"&gt;
  {{ user.name }} tiene {{ count }} items
&lt;/Hijo&gt;

&lt;!-- Sintaxis abreviada --&gt;
&lt;Hijo #default="{ user, count }"&gt;
  ...
&lt;/Hijo&gt;</code></pre>
      </div>
    </div>

    <div class="code-example">
      <h3>Código de ejemplo:</h3>
      <pre><code>&lt;!-- Componente con Slots --&gt;
&lt;template&gt;
  &lt;div class="card"&gt;
    &lt;slot name="header"&gt;Default Header&lt;/slot&gt;
    &lt;slot&gt;Default Content&lt;/slot&gt;
    &lt;slot name="footer"&gt;Default Footer&lt;/slot&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;!-- Uso --&gt;
&lt;Card&gt;
  &lt;template #header&gt;
    &lt;h2&gt;Mi Header&lt;/h2&gt;
  &lt;/template&gt;
  
  &lt;p&gt;Contenido principal&lt;/p&gt;
  
  &lt;template #footer&gt;
    &lt;button&gt;Acción&lt;/button&gt;
  &lt;/template&gt;
&lt;/Card&gt;

&lt;!-- Teleport --&gt;
&lt;Teleport to="#modal-root"&gt;
  &lt;div class="modal"&gt;...&lt;/div&gt;
&lt;/Teleport&gt;

&lt;Teleport to="body"&gt;
  &lt;div class="tooltip"&gt;...&lt;/div&gt;
&lt;/Teleport&gt;</code></pre>
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

.card-basic {
  border: 2px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 15px;
}

.card-header {
  background: #42b883;
  color: white;
  padding: 15px;
}

.card-body {
  padding: 20px;
}

.card-footer {
  background: #f8f9fa;
  padding: 15px;
  border-top: 1px solid #ddd;
}

.custom-slots {
  border-color: #007bff;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: white;
}

.btn-primary { background: #007bff; }
.btn-secondary { background: #6c757d; }

.tooltip-container {
  position: relative;
  display: inline-block;
  padding: 20px;
  background: #f0f7ff;
  border-radius: 8px;
  cursor: pointer;
}

.tooltip-container:hover + .tooltip-content,
.tooltip-container:focus + .tooltip-content {
  opacity: 1;
}

.tooltip-content {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: white;
  padding: 10px 15px;
  border-radius: 4px;
  white-space: nowrap;
  z-index: 1000;
  margin-top: 5px;
}

.demo-box pre {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
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

/* Modal styles (usados por Teleport) */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background: white;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
}

.modal-header h3 {
  margin: 0;
  color: #42b883;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  color: #666;
}

.modal-body {
  padding: 20px;
}

.modal-footer {
  padding: 15px 20px;
  border-top: 1px solid #eee;
  text-align: right;
}
</style>
