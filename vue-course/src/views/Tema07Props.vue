<script setup>
import { ref } from 'vue'

// Componente hijo que recibe props
const props = defineProps({
  title: String,
  count: Number,
  isActive: Boolean,
  tags: Array,
  user: Object
})
</script>

<template>
  <div class="topic-container">
    <h1>Tema 7: Paso de Datos con props</h1>
    
    <div class="info-box">
      <h2>Conceptos Clave</h2>
      <ul>
        <li><code>defineProps()</code>: Define las propiedades que acepta un componente</li>
        <li>Las props son solo lectura (no modificarlas directamente)</li>
        <li>Validación de tipos: String, Number, Boolean, Array, Object, Function</li>
        <li>Props opcionales vs requeridas</li>
        <li>Valores por defecto con <code>withDefaults()</code></li>
      </ul>
    </div>

    <div class="demo-section">
      <h2>Ejemplo Práctico</h2>
      
      <div class="card-demo">
        <h3>Componente Card con props:</h3>
        
        <div class="card">
          <div class="card-header">{{ props.title || 'Título por defecto' }}</div>
          <div class="card-body">
            <p>Contador recibido: <strong>{{ props.count }}</strong></p>
            <p>Estado: <span :class="props.isActive ? 'active' : 'inactive'">
              {{ props.isActive ? '✓ Activo' : '✗ Inactivo' }}
            </span></p>
            <div v-if="props.tags && props.tags.length">
              <strong>Tags:</strong>
              <span v-for="tag in props.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
            <div v-if="props.user">
              <strong>Usuario:</strong> {{ props.user.name }} ({{ props.user.email }})
            </div>
          </div>
        </div>
      </div>

      <div class="props-values">
        <h3>Valores actuales de props:</h3>
        <pre>{{ JSON.stringify(props, null, 2) }}</pre>
      </div>
    </div>

    <div class="code-example">
      <h3>Código de ejemplo:</h3>
      <pre><code>&lt;!-- Componente Hijo: MiComponente.vue --&gt;
&lt;script setup&gt;
// Props básicas
const props = defineProps({
  title: String,
  count: Number,
  isActive: Boolean
})

// Con validación detallada
const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    default: 'Sin nombre'
  },
  tags: {
    type: Array,
    default: () => []
  }
})

// Con withDefaults (TypeScript friendly)
const props = withDefaults(defineProps&lt;{
  title?: string
  count?: number
}&gt;(), {
  title: 'Default',
  count: 0
})
&lt;/script&gt;

&lt;!-- Componente Padre --&gt;
&lt;template&gt;
  &lt;MiComponente 
    :title="'Mi Título'" 
    :count="5" 
    :is-active="true" 
  /&gt;
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

.card-demo {
  margin-bottom: 24px;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
}

.card-header {
  background: #42b883;
  color: white;
  padding: 15px;
  font-weight: bold;
  font-size: 1.2em;
}

.card-body {
  padding: 20px;
}

.active {
  color: #28a745;
  font-weight: bold;
}

.inactive {
  color: #dc3545;
}

.tag {
  display: inline-block;
  background: #e9ecef;
  padding: 4px 8px;
  border-radius: 4px;
  margin: 4px 4px 4px 0;
  font-size: 0.85em;
}

.props-values {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.props-values pre {
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
</style>
