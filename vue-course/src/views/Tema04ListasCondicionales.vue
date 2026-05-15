<script setup>
import { ref } from 'vue'

const items = ref([
  { id: 1, name: 'Producto A', price: 25.99, inStock: true },
  { id: 2, name: 'Producto B', price: 39.99, inStock: false },
  { id: 3, name: 'Producto C', price: 15.50, inStock: true },
  { id: 4, name: 'Producto D', price: 89.99, inStock: true },
])

const showDetails = ref(false)
const selectedCategory = ref('all')
const isLoggedIn = ref(true)
const userRole = ref('admin')

const categories = ref(['all', 'electronics', 'books', 'clothing'])

function toggleDetails() {
  showDetails.value = !showDetails.value
}

function formatPrice(price) {
  return `$${price.toFixed(2)}`
}
</script>

<template>
  <div class="topic-container">
    <h1>Tema 4: Listas Dinámicas y Condicionales</h1>
    
    <div class="info-box">
      <h2>Conceptos Clave</h2>
      <ul>
        <li><code>v-for</code>: Renderiza listas basadas en arreglos u objetos</li>
        <li><code>v-if</code>, <code>v-else-if</code>, <code>v-else</code>: Renderizado condicional</li>
        <li><code>v-show</code>: Muestra/oculta con CSS (display: none)</li>
        <li>Siempre usa <code>:key</code> con v-for para mejor rendimiento</li>
        <li>Diferencia entre v-if (renderizado) y v-show (visibilidad)</li>
      </ul>
    </div>

    <div class="demo-section">
      <h2>Ejemplo Práctico</h2>
      
      <div class="demo-box">
        <h3>Lista con v-for</h3>
        <ul class="product-list">
          <li 
            v-for="item in items" 
            :key="item.id"
            class="product-item"
          >
            <span class="product-name">{{ item.name }}</span>
            <span class="product-price">{{ formatPrice(item.price) }}</span>
            <span 
              :class="['stock-badge', { 'in-stock': item.inStock, 'out-of-stock': !item.inStock }]"
            >
              {{ item.inStock ? '✓ Disponible' : '✗ Agotado' }}
            </span>
          </li>
        </ul>
      </div>

      <div class="demo-box">
        <h3>Renderizado Condicional</h3>
        
        <button @click="toggleDetails" class="btn btn-primary">
          {{ showDetails ? 'Ocultar' : 'Mostrar' }} Detalles
        </button>

        <div v-if="showDetails" class="details-box">
          <p>¡Estos son los detalles adicionales!</p>
          <p>Esta sección solo se renderiza cuando showDetails es true</p>
        </div>
        <div v-else class="details-placeholder">
          <p>Los detalles están ocultos. Haz click en "Mostrar Detalles"</p>
        </div>

        <hr />

        <h4>Ejemplo con múltiples condiciones:</h4>
        <div v-if="userRole === 'admin'">
          <p class="role-badge admin">👑 Panel de Administrador</p>
        </div>
        <div v-else-if="userRole === 'user'">
          <p class="role-badge user">👤 Panel de Usuario</p>
        </div>
        <div v-else>
          <p class="role-badge guest">🔒 Acceso limitado (Invitado)</p>
        </div>
      </div>

      <div class="demo-box">
        <h3>v-if vs v-show</h3>
        <label>
          <input type="checkbox" v-model="isLoggedIn" />
          Usuario logueado
        </label>

        <div v-if="isLoggedIn" class="conditional-block">
          <p><strong>v-if:</strong> Este bloque NO existe en el DOM cuando isLoggedIn es false</p>
        </div>

        <div v-show="isLoggedIn" class="conditional-block">
          <p><strong>v-show:</strong> Este bloque SIEMPRE está en el DOM, solo cambia display: none/block</p>
        </div>

        <p class="hint">Abre las herramientas de desarrollador para ver la diferencia en el DOM</p>
      </div>

      <div class="demo-box">
        <h3>Filtrado de Lista</h3>
        <select v-model="selectedCategory" class="select-field">
          <option value="all">Todos</option>
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>

        <div v-if="items.length === 0" class="empty-state">
          <p>No hay productos disponibles</p>
        </div>
        <div v-else class="filtered-list">
          <p>Mostrando {{ items.length }} productos</p>
        </div>
      </div>
    </div>

    <div class="code-example">
      <h3>Código de ejemplo:</h3>
      <pre><code>&lt;script setup&gt;
import { ref } from 'vue'

const items = ref([
  { id: 1, name: 'Item 1', available: true },
  { id: 2, name: 'Item 2', available: false }
])

const isLoggedIn = ref(true)
&lt;/script&gt;

&lt;template&gt;
  &lt;!-- v-for con key --&gt;
  &lt;ul&gt;
    &lt;li v-for="item in items" :key="item.id"&gt;
      {{ item.name }}
    &lt;/li&gt;
  &lt;/ul&gt;
  
  &lt;!-- v-if / v-else --&gt;
  &lt;div v-if="isLoggedIn"&gt;Bienvenido&lt;/div&gt;
  &lt;div v-else&gt;Por favor inicia sesión&lt;/div&gt;
  
  &lt;!-- v-show (siempre en DOM) --&gt;
  &lt;div v-show="isLoggedIn"&gt;Contenido visible&lt;/div&gt;
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

.product-list {
  list-style: none;
  padding: 0;
}

.product-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #eee;
}

.product-item:last-child {
  border-bottom: none;
}

.product-name {
  font-weight: bold;
}

.product-price {
  color: #42b883;
  font-weight: bold;
}

.stock-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.85em;
}

.stock-badge.in-stock {
  background: #d4edda;
  color: #155724;
}

.stock-badge.out-of-stock {
  background: #f8d7da;
  color: #721c24;
}

.btn {
  padding: 10px 20px;
  font-size: 1em;
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

.details-box {
  margin-top: 15px;
  padding: 15px;
  background: #e8f5e9;
  border-radius: 4px;
  border: 2px solid #42b883;
}

.details-placeholder {
  margin-top: 15px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 4px;
  color: #666;
}

.role-badge {
  padding: 10px 15px;
  border-radius: 4px;
  font-weight: bold;
  display: inline-block;
}

.role-badge.admin {
  background: #fff3cd;
  color: #856404;
}

.role-badge.user {
  background: #d1ecf1;
  color: #0c5460;
}

.role-badge.guest {
  background: #f8d7da;
  color: #721c24;
}

.conditional-block {
  margin-top: 15px;
  padding: 15px;
  background: #f0f9ff;
  border-radius: 4px;
  border-left: 4px solid #0ea5e9;
}

.hint {
  margin-top: 10px;
  color: #666;
  font-style: italic;
  font-size: 0.9em;
}

.select-field {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
}

.empty-state {
  padding: 30px;
  text-align: center;
  color: #666;
  background: #f9f9f9;
  border-radius: 4px;
}

.filtered-list {
  padding: 10px;
  background: #e8f5e9;
  border-radius: 4px;
  margin-top: 10px;
}

hr {
  margin: 20px 0;
  border: none;
  border-top: 1px solid #ddd;
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
