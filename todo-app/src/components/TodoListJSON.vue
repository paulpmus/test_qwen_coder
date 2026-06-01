<script setup>
import { ref, computed, onMounted } from 'vue'

const newTodo = ref('')
const todos = ref([])
const API_URL = 'http://localhost:3000/api/todos'

const loadTodos = async () => {
  try {
    const res = await fetch(API_URL)
    const data = await res.json()
    todos.value = data
  } catch (err) {
    console.error('Failed to load todos', err)
  }
}

onMounted(() => {
  loadTodos()
})

const addTodo = async () => {
  if (newTodo.value.trim() === '') return
  
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newTodo.value.trim() })
    })
    const data = await res.json()
    console.log(data)

    todos.value.push(data)
    newTodo.value = ''
  } catch (err) {
    console.error('Failed to add todo', err)
  }
}

const toggleTodo = async (todo) => {
  try {
    const res = await fetch(`${API_URL}/${todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: todo.completed })
    })
    const data = await res.json()
    console.log(data)
  } catch (err) {
    console.error('Failed to update todo', err)
    // Revert state on error if needed
    todo.completed = !todo.completed
  }
}

const removeTodo = async (todo) => {
  try {
    const res = await fetch(`${API_URL}/${todo.id}`, {
      method: 'DELETE'
    })
    const data = await res.json()
    console.log(data)

    const index = todos.value.indexOf(todo)
    if (index > -1) {
      todos.value.splice(index, 1)
    }
  } catch (err) {
    console.error('Failed to delete todo', err)
  }
}

const remainingTodos = computed(() => {
  return todos.value.filter(todo => !todo.completed).length
})

const completedTodos = computed(() => {
  return todos.value.filter(todo => todo.completed).length
})

const clearCompleted = async () => {
  try {
    // You could also do a bulk delete endpoint in Express here, but let's assume we made one
    const res = await fetch(`${API_URL}/completed`, {
      method: 'DELETE'
    })
    const data = await res.json()
    console.log(data)

    todos.value = todos.value.filter(todo => !todo.completed)
  } catch (err) {
    console.error('Failed to clear completed todos', err)
  }
}
</script>

<template>
  <div class="todo-app">
    <h1>Todo List API REST</h1>
    
    <div class="add-todo-form">
      <input 
        v-model="newTodo" 
        @keyup.enter="addTodo" 
        type="text" 
        placeholder="¿Qué necesitas hacer?" 
        class="todo-input"
      />
      <button @click="addTodo" class="add-btn">Agregar</button>
    </div>
    
    <div class="stats" v-if="todos.length > 0">
      <span>Pendientes: {{ remainingTodos }}</span>
      <span>Completadas: {{ completedTodos }}</span>
    </div>
    
    <ul class="todo-list" v-if="todos.length > 0">
      <li 
        v-for="todo in todos" 
        :key="todo.id" 
        :class="{ completed: todo.completed }"
        class="todo-item"
      >
        <input 
          type="checkbox" 
          v-model="todo.completed"
          @change="toggleTodo(todo)"
          class="todo-checkbox"
        />
        <span class="todo-text">{{ todo.text }}</span>
        <button @click="removeTodo(todo)" class="remove-btn">✕</button>
      </li>
    </ul>
    
    <div class="empty-state" v-else>
      <p>¡No hay tareas! Agrega una nueva tarea para comenzar.</p>
    </div>
    
    <button 
      v-if="completedTodos > 0" 
      @click="clearCompleted" 
      class="clear-btn"
    >
      Limpiar completadas
    </button>
  </div>
</template>

<style scoped>
.todo-app {
  max-width: 500px;
  margin: 40px auto;
  padding: 30px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 2rem;
}

.add-todo-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.todo-input {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.todo-input:focus {
  outline: none;
  border-color: #42b983;
}

.add-btn {
  padding: 12px 24px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.add-btn:hover {
  background: #3aa876;
}

.stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 8px;
  font-size: 14px;
  color: #666;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 12px;
  margin-bottom: 8px;
  background: #f9f9f9;
  border-radius: 8px;
  transition: all 0.3s;
}

.todo-item:hover {
  background: #f0f0f0;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: #999;
}

.todo-checkbox {
  margin-right: 12px;
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.todo-text {
  flex: 1;
  font-size: 16px;
  color: #333;
}

.remove-btn {
  padding: 6px 12px;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;
}

.remove-btn:hover {
  background: #ff5252;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #999;
  font-size: 16px;
}

.clear-btn {
  display: block;
  width: 100%;
  margin-top: 20px;
  padding: 12px;
  background: #f0f0f0;
  color: #666;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;
}

.clear-btn:hover {
  background: #e0e0e0;
}
</style>