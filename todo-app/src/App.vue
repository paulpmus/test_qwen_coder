<script setup>
/* TODO: Firebase Authenticacion */
import { computed, onMounted, ref } from 'vue'
import {
  //createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { auth } from './firebase.js'
import TodoListFirebase from './components/TodoListFirebase.vue'
import TodoListVar from './components/TodoListVar.vue'
import TodoListLS from './components/TodoListLS.vue'
import TodoListJSON from './components/TodoListJSON.vue'
import TodoListMongo from './components/TodoListMongo.vue'
import TodoListServerless from './components/TodoListServerless.vue'

const email = ref('')
const password = ref('')
const authError = ref('')
const user = ref(null)
const loading = ref(true)
const selectedList = ref('var')

onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser
    loading.value = false
  })
})

const isLoggedIn = computed(() => Boolean(user.value))

const handleLogin = async () => {
  authError.value = ''

  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
  } catch (error) {
    authError.value = 'No se pudo iniciar sesión. Revisa tu correo y contraseña.'
  }
}
/*
const handleRegister = async () => {
  authError.value = ''

  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value)
  } catch (error) {
    authError.value = 'No se pudo crear la cuenta. Verifica el correo y la contraseña.'
  }
}
*/
const handleLogout = async () => {
  await signOut(auth)
}

const setSelectedList = (listKey) => {
  selectedList.value = listKey
}
</script>

<template>
  <main>
    <section v-if="loading" class="auth-shell">
      <div class="auth-card">
        <p>Cargando sesión...</p>
      </div>
    </section>

    <section v-else-if="!isLoggedIn" class="auth-shell">
      <div class="auth-card">
        <h1>Acceso a la Todo App</h1>
        <p class="auth-copy">Inicia sesión con correo y contraseña para continuar.</p>

        <form class="auth-form" @submit.prevent="handleLogin">
          <input v-model="email" type="email" placeholder="Correo electrónico" autocomplete="email" />
          <input v-model="password" type="password" placeholder="Contraseña" autocomplete="current-password" />

          <p v-if="authError" class="auth-error">{{ authError }}</p>
          
          <div class="auth-actions">
            <button type="submit" class="primary-btn">Entrar</button>
            <!--<button type="button" class="secondary-btn" @click="handleRegister">Crear cuenta</button>-->
          </div>
          
        </form>
      </div>
    </section>

    <section v-else class="app-shell">
      <header class="app-bar">
        <div>
          <span class="eyebrow">Sesión iniciada</span>
          <p class="user-email">{{ user?.email }}</p>
        </div>
        <button class="logout-btn" @click="handleLogout">Cerrar sesión</button>
      </header>

      <nav class="list-menu" aria-label="Seleccionar lista">
        <button
          class="menu-btn"
          :class="{ active: selectedList === 'var' }"
          type="button"
          @click="setSelectedList('var')"
        >
          Lista Var
        </button>
        <button
          class="menu-btn"
          :class="{ active: selectedList === 'ls' }"
          type="button"
          @click="setSelectedList('ls')"
        >
          Lista LS
        </button>
        <button
          class="menu-btn"
          :class="{ active: selectedList === 'firebase' }"
          type="button"
          @click="setSelectedList('firebase')"
        >
          Lista FireStore
        </button> 
        <button
          class="menu-btn"
          :class="{ active: selectedList === 'json' }"
          type="button"
          @click="setSelectedList('json')"
        >
          Lista API REST json
        </button>
        <button
          class="menu-btn"
          :class="{ active: selectedList === 'mongo' }"
          type="button"
          @click="setSelectedList('mongo')"
        >
          Lista API REST Mongo
        </button> 
        <button
          class="menu-btn"
          :class="{ active: selectedList === 'serverless' }"
          type="button"
          @click="setSelectedList('serverless')"
        >
          Lista API REST Serverless
        </button> 
      </nav>

      <TodoListVar v-if="selectedList === 'var'" />
      <TodoListLS v-else-if="selectedList === 'ls'" />
      <TodoListFirebase v-else-if="selectedList === 'firebase'" />
      <TodoListJSON v-else-if="selectedList === 'json'" />
      <TodoListMongo v-else-if="selectedList === 'mongo'" />
      <TodoListServerless v-else-if="selectedList === 'serverless'" />
    </section>
  </main>
</template>

<style scoped>
main {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.auth-shell,
.app-shell {
  min-height: calc(100vh - 40px);
  display: grid;
  place-items: center;
}

.auth-card {
  width: min(100%, 420px);
  background: rgba(255, 255, 255, 0.96);
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);
}

.auth-card h1 {
  margin: 0 0 8px;
  font-size: 2rem;
  color: #222;
}

.auth-copy {
  margin: 0 0 20px;
  color: #666;
}

.auth-form {
  display: grid;
  gap: 12px;
}

.auth-form input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #d8d8d8;
  border-radius: 12px;
  font-size: 1rem;
}

.auth-form input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);
}

.auth-error {
  margin: 0;
  color: #d93025;
  font-size: 0.95rem;
}

.auth-actions {
  display: flex;
  gap: 10px;
  margin-top: 4px;
}

.primary-btn,
.secondary-btn,
.logout-btn {
  border: none;
  border-radius: 12px;
  padding: 12px 16px;
  font-weight: 600;
  cursor: pointer;
}

.primary-btn {
  flex: 1;
  background: #667eea;
  color: white;
}

.secondary-btn {
  flex: 1;
  background: #eef1ff;
  color: #374151;
}

.app-shell {
  align-items: start;
  gap: 18px;
}

.app-bar {
  width: min(100%, 500px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.eyebrow {
  display: block;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.8;
}

.user-email {
  margin: 4px 0 0;
  font-size: 1rem;
  font-weight: 600;
}

.logout-btn {
  background: rgba(255, 255, 255, 0.18);
  color: white;
}

.list-menu {
  width: min(100%, 500px);
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.menu-btn {
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 12px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.15s ease, background 0.2s ease;
}

.menu-btn:hover {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.2);
}

.menu-btn.active {
  background: #ffffff;
  color: #4b4b4b;
}
</style>
