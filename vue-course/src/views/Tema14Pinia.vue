<script setup>
import { computed } from 'vue'
import { useCartStore } from '../stores/cart'

const store = useCartStore()

const products = [
  { id: 1, name: 'Laptop', price: 999.99 },
  { id: 2, name: 'Mouse', price: 29.99 },
  { id: 3, name: 'Keyboard', price: 79.99 },
  { id: 4, name: 'Monitor', price: 299.99 },
]

const cartTotal = computed(() => {
  return store.items.reduce((sum, item) => sum + item.price, 0).toFixed(2)
})

function addToCart(product) {
  store.addItem(product)
}

function removeFromCart(productId) {
  store.removeItem(productId)
}

function login() {
  store.setUser({ name: 'Usuario Demo', email: 'demo@example.com' })
}

function logout() {
  store.logout()
}
</script>

<template>
  <div class="topic-container">
    <h1>Tema 14: Estado Global con Pinia</h1>
    
    <div class="info-box">
      <h2>Conceptos Clave</h2>
      <ul>
        <li>Pinia es el estado global oficial de Vue 3</li>
        <li><code>defineStore()</code>: Crea un store con estado, getters y acciones</li>
        <li>Reemplaza a Vuex con una API más simple</li>
        <li>Estado accesible desde cualquier componente</li>
        <li>DevTools integration para debugging</li>
      </ul>
    </div>

    <div class="demo-section">
      <h2>Ejemplo Práctico</h2>
      
      <div class="demo-box">
        <h3>Estado del Usuario (Store)</h3>
        <div v-if="store.user" class="user-info">
          <p>👤 <strong>{{ store.user.name }}</strong></p>
          <p>{{ store.user.email }}</p>
          <button @click="logout" class="btn btn-danger">Logout</button>
        </div>
        <div v-else class="user-info">
          <p>No hay usuario logueado</p>
          <button @click="login" class="btn btn-success">Login</button>
        </div>
      </div>

      <div class="demo-box">
        <h3>Carrito de Compras</h3>
        <p class="cart-count">Items en carrito: <strong>{{ store.items.length }}</strong></p>
        <p class="cart-total">Total: <strong>${{ cartTotal }}</strong></p>

        <div v-if="store.items.length === 0" class="empty-cart">
          El carrito está vacío
        </div>
        <ul v-else class="cart-list">
          <li v-for="item in store.items" :key="item.id" class="cart-item">
            <span>{{ item.name }} - ${{ item.price }}</span>
            <button @click="removeFromCart(item.id)" class="btn-remove">×</button>
          </li>
        </ul>
      </div>

      <div class="demo-box">
        <h3>Productos Disponibles</h3>
        <div class="products-grid">
          <div v-for="product in products" :key="product.id" class="product-card">
            <h4>{{ product.name }}</h4>
            <p class="price">${{ product.price }}</p>
            <button @click="addToCart(product)" class="btn btn-primary">Agregar</button>
          </div>
        </div>
      </div>

      <div class="demo-box">
        <h3>Estado Completo del Store</h3>
        <pre>{{ JSON.stringify(store.$state, null, 2) }}</pre>
      </div>
    </div>

    <div class="code-example">
      <h3>Código de ejemplo:</h3>
      <pre><code>// stores/cart.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // Estado
  const items = ref([])
  const user = ref(null)

  // Getters (computed)
  const totalItems = computed(() => items.value.length)
  const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => sum + item.price, 0)
  })

  // Acciones
  function addItem(product) {
    items.value.push(product)
  }

  function removeItem(id) {
    items.value = items.value.filter(item => item.id !== id)
  }

  function setUser(userData) {
    user.value = userData
  }

  return { items, user, totalItems, totalPrice, addItem, removeItem, setUser }
})

// Uso en componente
&lt;script setup&gt;
import { useCartStore } from '@/stores/cart'

const store = useCartStore()
store.addItem(product)
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

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
}

.cart-count, .cart-total {
  font-size: 1.2em;
  margin-bottom: 15px;
}

.empty-cart {
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 20px;
}

.cart-list {
  list-style: none;
  padding: 0;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.btn-remove {
  background: #dc3545;
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2em;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 15px;
}

.product-card {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
}

.price {
  font-size: 1.3em;
  font-weight: bold;
  color: #42b883;
  margin: 10px 0;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: white;
}

.btn-primary { background: #007bff; }
.btn-success { background: #28a745; }
.btn-danger { background: #dc3545; }

.demo-box pre {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
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
