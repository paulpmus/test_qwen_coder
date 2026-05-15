<script setup>
import { ref, onMounted } from 'vue'

const users = ref([])
const loading = ref(false)
const error = ref(null)
const post = ref(null)

async function fetchUsers() {
  loading.value = true
  error.value = null
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    if (!response.ok) throw new Error('Error en la respuesta')
    users.value = await response.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

async function fetchPost() {
  loading.value = true
  error.value = null
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1')
    if (!response.ok) throw new Error('Error en la respuesta')
    post.value = await response.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

async function createPost() {
  loading.value = true
  error.value = null
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Mi nuevo post',
        body: 'Este es el contenido del post',
        userId: 1
      })
    })
    if (!response.ok) throw new Error('Error al crear')
    const data = await response.json()
    alert('Post creado con ID: ' + data.id)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <div class="topic-container">
    <h1>Tema 12: Consumo de APIs Reales</h1>
    
    <div class="info-box">
      <h2>Conceptos Clave</h2>
      <ul>
        <li><code>fetch()</code>: API nativa para hacer peticiones HTTP</li>
        <li>Axios: Librería popular alternativa a fetch</li>
        <li>Manejo de estados: loading, data, error</li>
        <li>Métodos HTTP: GET, POST, PUT, DELETE</li>
        <li>Async/await para código más limpio</li>
      </ul>
    </div>

    <div class="demo-section">
      <h2>Ejemplo Práctico</h2>
      
      <div class="demo-box">
        <h3>GET - Lista de Usuarios</h3>
        <button @click="fetchUsers" :disabled="loading" class="btn btn-primary">
          {{ loading ? 'Cargando...' : 'Recargar Usuarios' }}
        </button>

        <div v-if="error" class="error">{{ error }}</div>

        <div v-if="loading" class="loading">Cargando usuarios...</div>

        <ul v-else-if="users.length" class="users-list">
          <li v-for="user in users" :key="user.id" class="user-item">
            <strong>{{ user.name }}</strong>
            <p>{{ user.email }}</p>
            <small>{{ user.company?.name }}</small>
          </li>
        </ul>
      </div>

      <div class="demo-box">
        <h3>GET - Single Resource</h3>
        <button @click="fetchPost" :disabled="loading" class="btn btn-info">
          {{ loading ? 'Cargando...' : 'Obtener Post' }}
        </button>

        <div v-if="post" class="post-card">
          <h4>{{ post.title }}</h4>
          <p>{{ post.body }}</p>
        </div>
      </div>

      <div class="demo-box">
        <h3>POST - Crear Recurso</h3>
        <button @click="createPost" :disabled="loading" class="btn btn-success">
          {{ loading ? 'Creando...' : 'Crear Post' }}
        </button>
        <p class="hint">JSONPlaceholder simula la creación (siempre devuelve id: 101)</p>
      </div>
    </div>

    <div class="code-example">
      <h3>Código de ejemplo:</h3>
      <pre><code>&lt;script setup&gt;
import { ref, onMounted } from 'vue'

const data = ref(null)
const loading = ref(false)
const error = ref(null)

// Fetch básico
async function fetchData() {
  loading.value = true
  try {
    const res = await fetch('https://api.example.com/data')
    if (!res.ok) throw new Error('Error HTTP')
    data.value = await res.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// POST request
async function postData(newItem) {
  const res = await fetch('/api/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newItem)
  })
  return await res.json()
}

// Con Axios (npm install axios)
import axios from 'axios'

const { data, loading, error } = await useFetch('/api/data')
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

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: white;
  margin-right: 10px;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary { background: #007bff; }
.btn-info { background: #17a2b8; }
.btn-success { background: #28a745; }

.error {
  color: #dc3545;
  padding: 10px;
  background: #ffe6e6;
  border-radius: 4px;
  margin-top: 10px;
}

.loading {
  color: #007bff;
  font-style: italic;
  padding: 10px;
}

.users-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.user-item {
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #007bff;
}

.user-item strong {
  display: block;
  margin-bottom: 5px;
}

.user-item p {
  margin: 5px 0;
  color: #666;
  font-size: 0.9em;
}

.user-item small {
  color: #999;
}

.post-card {
  margin-top: 15px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #17a2b8;
}

.hint {
  color: #666;
  font-style: italic;
  font-size: 0.9em;
  margin-top: 10px;
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
