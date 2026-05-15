<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const userId = ref('')
const userName = ref('')

function navigateToHome() {
  router.push('/')
}

function navigateToTema1() {
  router.push('/tema-1-ref-reactive')
}

function navigateWithParams() {
  if (userId.value) {
    router.push(`/user/${userId.value}`)
  }
}

function goBack() {
  router.back()
}

function goForward() {
  router.forward()
}
</script>

<template>
  <div class="topic-container">
    <h1>Tema 13: Enrutamiento Práctico (Vue Router)</h1>
    
    <div class="info-box">
      <h2>Conceptos Clave</h2>
      <ul>
        <li><code>useRouter()</code>: Accede a la instancia del router</li>
        <li><code>useRoute()</code>: Accede a la información de la ruta actual</li>
        <li><code>router.push()</code>: Navega programáticamente</li>
        <li>Rutas dinámicas con parámetros: <code>/user/:id</code></li>
        <li>Navegación con <code>&lt;router-link&gt;</code> y <code>&lt;router-view&gt;</code></li>
      </ul>
    </div>

    <div class="demo-section">
      <h2>Ejemplo Práctico</h2>
      
      <div class="demo-box">
        <h3>Información de la Ruta Actual</h3>
        <div class="route-info">
          <p><strong>Path:</strong> {{ route.path }}</p>
          <p><strong>Name:</strong> {{ route.name || '(sin nombre)' }}</p>
          <p><strong>Params:</strong> {{ JSON.stringify(route.params) }}</p>
          <p><strong>Query:</strong> {{ JSON.stringify(route.query) }}</p>
        </div>
      </div>

      <div class="demo-box">
        <h3>Navegación Programática</h3>
        <div class="nav-buttons">
          <button @click="navigateToHome" class="btn btn-primary">Ir a Home</button>
          <button @click="navigateToTema1" class="btn btn-info">Ir a Tema 1</button>
          <button @click="goBack" class="btn btn-secondary">Atrás</button>
          <button @click="goForward" class="btn btn-secondary">Adelante</button>
        </div>
      </div>

      <div class="demo-box">
        <h3>Ruta con Parámetros</h3>
        <input 
          v-model="userId"
          type="text" 
          placeholder="ID de usuario"
          class="input-field"
        />
        <button @click="navigateWithParams" class="btn btn-success">
          Navegar a /user/:id
        </button>
        <p class="hint">Ejemplo: ingresa "123" para navegar a /user/123</p>
      </div>

      <div class="demo-box">
        <h3>Enlaces con router-link</h3>
        <div class="links-demo">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/tema-1-ref-reactive" class="nav-link">Tema 1</router-link>
          <router-link to="/tema-5-v-model" class="nav-link">Tema 5</router-link>
          <router-link to="/tema-10-watch-lifecycle" class="nav-link">Tema 10</router-link>
        </div>
      </div>
    </div>

    <div class="code-example">
      <h3>Código de ejemplo:</h3>
      <pre><code>// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/user/:id', name: 'User', component: User },
  { path: '/about', name: 'About', component: About }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

// En componente
&lt;script setup&gt;
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Navegación
router.push('/home')
router.push({ name: 'User', params: { id: 123 } })
router.push({ path: '/search', query: { q: 'vue' } })

// Información
console.log(route.params.id)
console.log(route.query.q)
&lt;/script&gt;

// Template
&lt;template&gt;
  &lt;router-link to="/home"&gt;Home&lt;/router-link&gt;
  &lt;router-view /&gt;
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

.route-info {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9em;
}

.route-info p {
  margin: 8px 0;
}

.nav-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: white;
}

.btn-primary { background: #007bff; }
.btn-info { background: #17a2b8; }
.btn-success { background: #28a745; }
.btn-secondary { background: #6c757d; }

.input-field {
  width: 100%;
  max-width: 200px;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
  margin-right: 10px;
}

.hint {
  color: #666;
  font-style: italic;
  font-size: 0.9em;
  margin-top: 10px;
}

.links-demo {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.nav-link {
  color: #007bff;
  text-decoration: none;
  padding: 8px 16px;
  background: #f0f7ff;
  border-radius: 4px;
  transition: background 0.2s;
}

.nav-link:hover {
  background: #007bff;
  color: white;
}

.nav-link.router-link-active {
  background: #28a745;
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
