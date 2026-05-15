<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const age = ref('')
const termsAccepted = ref(false)
const country = ref('')
const hobbies = ref([])

const submittedData = ref(null)
const errors = ref({})

const countries = ['España', 'México', 'Argentina', 'Colombia', 'Chile']
const hobbyOptions = ['Deportes', 'Lectura', 'Música', 'Viajes', 'Cocina']

function validate() {
  errors.value = {}
  
  if (!name.value.trim()) {
    errors.value.name = 'El nombre es requerido'
  }
  
  if (!email.value.trim()) {
    errors.value.email = 'El email es requerido'
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    errors.value.email = 'Email inválido'
  }
  
  if (!age.value) {
    errors.value.age = 'La edad es requerida'
  } else if (age.value < 18) {
    errors.value.age = 'Debes ser mayor de 18 años'
  }
  
  if (!termsAccepted.value) {
    errors.value.terms = 'Debes aceptar los términos'
  }
  
  return Object.keys(errors.value).length === 0
}

function handleSubmit() {
  if (validate()) {
    submittedData.value = {
      name: name.value,
      email: email.value,
      age: age.value,
      country: country.value,
      hobbies: [...hobbies.value]
    }
  }
}

function resetForm() {
  name.value = ''
  email.value = ''
  age.value = ''
  termsAccepted.value = false
  country.value = ''
  hobbies.value = []
  submittedData.value = null
  errors.value = {}
}
</script>

<template>
  <div class="topic-container">
    <h1>Tema 5: Formularios con v-model</h1>
    
    <div class="info-box">
      <h2>Conceptos Clave</h2>
      <ul>
        <li><code>v-model</code>: Crea un binding bidireccional en inputs</li>
        <li>Funciona con: text, checkbox, radio, select, textarea</li>
        <li>Modificadores: <code>.lazy</code>, <code>.number</code>, <code>.trim</code></li>
        <li>Validaciones básicas verificando el estado del modelo</li>
      </ul>
    </div>

    <div class="demo-section">
      <h2>Ejemplo Práctico</h2>
      
      <form @submit.prevent="handleSubmit" class="form-container">
        <div class="form-group">
          <label for="name">Nombre:</label>
          <input 
            id="name"
            v-model.trim="name"
            type="text"
            :class="{ 'has-error': errors.name }"
            placeholder="Tu nombre"
          />
          <span v-if="errors.name" class="error-text">{{ errors.name }}</span>
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input 
            id="email"
            v-model.trim="email"
            type="email"
            :class="{ 'has-error': errors.email }"
            placeholder="tu@email.com"
          />
          <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
        </div>

        <div class="form-group">
          <label for="age">Edidad:</label>
          <input 
            id="age"
            v-model.number="age"
            type="number"
            :class="{ 'has-error': errors.age }"
            placeholder="18"
          />
          <span v-if="errors.age" class="error-text">{{ errors.age }}</span>
        </div>

        <div class="form-group">
          <label for="country">País:</label>
          <select id="country" v-model="country">
            <option value="" disabled>Selecciona un país</option>
            <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>

        <div class="form-group">
          <label>Hobbies:</label>
          <div class="checkbox-group">
            <label v-for="hobby in hobbyOptions" :key="hobby" class="checkbox-label">
              <input 
                type="checkbox" 
                :value="hobby" 
                v-model="hobbies"
              />
              {{ hobby }}
            </label>
          </div>
        </div>

        <div class="form-group">
          <label class="checkbox-label">
            <input 
              type="checkbox" 
              v-model="termsAccepted"
              :class="{ 'has-error': errors.terms }"
            />
            Acepto los términos y condiciones
          </label>
          <span v-if="errors.terms" class="error-text">{{ errors.terms }}</span>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary">Enviar</button>
          <button type="button" @click="resetForm" class="btn btn-secondary">Reset</button>
        </div>
      </form>

      <div v-if="submittedData" class="result-box">
        <h3>Datos enviados:</h3>
        <pre>{{ JSON.stringify(submittedData, null, 2) }}</pre>
      </div>

      <div class="live-preview">
        <h3>Vista en tiempo real:</h3>
        <p>Nombre: <strong>{{ name || '(vacío)' }}</strong></p>
        <p>Email: <strong>{{ email || '(vacío)' }}</strong></p>
        <p>Edad: <strong>{{ age || '(vacío)' }}</strong></p>
        <p>País: <strong>{{ country || '(ninguno)' }}</strong></p>
        <p>Hobbies: <strong>{{ hobbies.length > 0 ? hobbies.join(', ') : '(ninguno)' }}</strong></p>
        <p>Términos: <strong>{{ termsAccepted ? '✓ Aceptado' : '✗ No aceptado' }}</strong></p>
      </div>
    </div>

    <div class="code-example">
      <h3>Código de ejemplo:</h3>
      <pre><code>&lt;script setup&gt;
import { ref } from 'vue'

const text = ref('')
const checked = ref(false)
const selected = ref('')
const multiSelect = ref([])

// Modificadores
const numberValue = ref(0)      // .number convierte a número
const trimmedText = ref('')     // .trim elimina espacios
const lazyText = ref('')        // .lazy actualiza en change, no input
&lt;/script&gt;

&lt;template&gt;
  &lt;!-- Text input --&gt;
  &lt;input v-model.trim="text" /&gt;
  
  &lt;!-- Checkbox --&gt;
  &lt;input type="checkbox" v-model="checked" /&gt;
  
  &lt;!-- Select --&gt;
  &lt;select v-model="selected"&gt;
    &lt;option value="a"&gt;A&lt;/option&gt;
    &lt;option value="b"&gt;B&lt;/option&gt;
  &lt;/select&gt;
  
  &lt;!-- Múltiple select --&gt;
  &lt;select v-model="multiSelect" multiple&gt;...&lt;/select&gt;
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

.form-container {
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
  color: #333;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="number"],
.form-group select {
  width: 100%;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #42b883;
}

.form-group input.has-error {
  border-color: #dc3545;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-weight: normal;
}

.checkbox-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
}

.error-text {
  color: #dc3545;
  font-size: 0.85em;
  margin-top: 4px;
  display: block;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.btn {
  padding: 12px 24px;
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

.btn-secondary {
  background: #6c757d;
  color: white;
}

.result-box {
  background: #d4edda;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 24px;
}

.result-box pre {
  background: white;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  margin: 10px 0 0 0;
}

.live-preview {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.live-preview h3 {
  margin-top: 0;
  color: #42b883;
}

.live-preview p {
  margin: 8px 0;
  padding: 8px;
  background: #f8f9fa;
  border-radius: 4px;
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
