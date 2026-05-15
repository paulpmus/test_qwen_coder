<script setup>
import { ref, computed } from 'vue'

const products = ref([
  { id: 1, name: 'Laptop', price: 999.99, category: 'electronics' },
  { id: 2, name: 'Mouse', price: 29.99, category: 'electronics' },
  { id: 3, name: 'Keyboard', price: 79.99, category: 'electronics' },
  { id: 4, name: 'Monitor', price: 299.99, category: 'electronics' },
  { id: 5, name: 'Desk Chair', price: 199.99, category: 'furniture' },
  { id: 6, name: 'Desk', price: 349.99, category: 'furniture' },
  { id: 7, name: 'Book: Vue.js', price: 39.99, category: 'books' },
  { id: 8, name: 'Notebook', price: 9.99, category: 'books' },
])

const searchQuery = ref('')
const selectedCategory = ref('all')
const maxPrice = ref(1000)

// Computed property que filtra productos
const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'all' || product.category === selectedCategory.value
    const matchesPrice = product.price <= maxPrice.value
    return matchesSearch && matchesCategory && matchesPrice
  })
})

// Computed property con múltiples dependencias
const totalPrice = computed(() => {
  return filteredProducts.value.reduce((sum, product) => sum + product.price, 0)
})

const averagePrice = computed(() => {
  if (filteredProducts.value.length === 0) return 0
  return totalPrice.value / filteredProducts.value.length
})

const categories = computed(() => {
  const unique = [...new Set(products.value.map(p => p.category))]
  return ['all', ...unique]
})
</script>

<template>
  <div class="topic-container">
    <h1>Tema 9: Lógica Reutilizable con computed</h1>
    
    <div class="info-box">
      <h2>Conceptos Clave</h2>
      <ul>
        <li><code>computed()</code>: Crea propiedades derivadas que se cachean</li>
        <li>Solo se recalcula cuando sus dependencias cambian</li>
        <li>Ideal para transformaciones de datos y filtrados</li>
        <li>Puede tener getter y setter opcional</li>
        <li>Más eficiente que métodos para datos derivados</li>
      </ul>
    </div>

    <div class="demo-section">
      <h2>Ejemplo Práctico</h2>
      
      <div class="filters">
        <input 
          v-model="searchQuery"
          type="text"
          placeholder="Buscar producto..."
          class="search-input"
        />
        
        <select v-model="selectedCategory" class="select-field">
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
        
        <div class="price-filter">
          <label>Precio máximo: ${{ maxPrice }}</label>
          <input 
            v-model.number="maxPrice"
            type="range"
            min="0"
            max="1000"
            step="10"
          />
        </div>
      </div>

      <div class="stats">
        <div class="stat-card">
          <h3>Productos filtrados</h3>
          <p class="stat-value">{{ filteredProducts.length }}</p>
        </div>
        <div class="stat-card">
          <h3>Precio total</h3>
          <p class="stat-value">${{ totalPrice.toFixed(2) }}</p>
        </div>
        <div class="stat-card">
          <h3>Precio promedio</h3>
          <p class="stat-value">${{ averagePrice.toFixed(2) }}</p>
        </div>
      </div>

      <div class="products-grid">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id"
          class="product-card"
        >
          <h4>{{ product.name }}</h4>
          <p class="price">${{ product.price.toFixed(2) }}</p>
          <span class="category">{{ product.category }}</span>
        </div>
        <div v-if="filteredProducts.length === 0" class="no-results">
          No se encontraron productos
        </div>
      </div>
    </div>

    <div class="code-example">
      <h3>Código de ejemplo:</h3>
      <pre><code>&lt;script setup&gt;
import { ref, computed } from 'vue'

const items = ref([1, 2, 3, 4, 5])
const multiplier = ref(2)

// Computed básico (solo getter)
const doubled = computed(() => {
  return items.value.map(item => item * multiplier.value)
})

// Computed con getter y setter
const fullName = computed({
  get: () => firstName.value + ' ' + lastName.value,
  set: (value) => {
    [firstName.value, lastName.value] = value.split(' ')
  }
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

.filters {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  align-items: center;
}

.search-input {
  flex: 1;
  min-width: 200px;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
}

.select-field {
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
}

.price-filter {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.price-filter input[type="range"] {
  width: 150px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.stat-card {
  background: white;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.stat-card h3 {
  margin: 0 0 10px 0;
  font-size: 0.9em;
  color: #666;
}

.stat-value {
  font-size: 1.8em;
  font-weight: bold;
  color: #42b883;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
}

.product-card {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.product-card h4 {
  margin: 0 0 10px 0;
  color: #333;
}

.price {
  font-size: 1.3em;
  font-weight: bold;
  color: #42b883;
  margin-bottom: 8px;
}

.category {
  display: inline-block;
  background: #e9ecef;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8em;
  color: #666;
}

.no-results {
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px;
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
