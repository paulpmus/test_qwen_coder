<script setup>
import { ref } from 'vue'

const topics = [
  { id: 1, name: '1. ref y reactive', path: '/tema-1-ref-reactive', icon: '🔄' },
  { id: 2, name: '2. v-bind', path: '/tema-2-v-bind', icon: '🎨' },
  { id: 3, name: '3. Eventos', path: '/tema-3-eventos', icon: '⚡' },
  { id: 4, name: '4. Listas y Condicionales', path: '/tema-4-listas-condicionales', icon: '📋' },
  { id: 5, name: '5. v-model', path: '/tema-5-v-model', icon: '📝' },
  { id: 6, name: '6. SFC', path: '/tema-6-sfc', icon: '📦' },
  { id: 7, name: '7. Props', path: '/tema-7-props', icon: '📤' },
  { id: 8, name: '8. Emit', path: '/tema-8-emit', icon: '📢' },
  { id: 9, name: '9. Computed', path: '/tema-9-computed', icon: '🧮' },
  { id: 10, name: '10. Watch y Lifecycle', path: '/tema-10-watch-lifecycle', icon: '⏱️' },
  { id: 11, name: '11. Composables', path: '/tema-11-composables', icon: '🔧' },
  { id: 12, name: '12. APIs', path: '/tema-12-api', icon: '🌐' },
  { id: 13, name: '13. Router', path: '/tema-13-router', icon: '🧭' },
  { id: 14, name: '14. Pinia', path: '/tema-14-pinia', icon: '🗄️' },
  { id: 15, name: '15. Slots', path: '/tema-15-slots', icon: '🎰' },
]
</script>

<template>
  <div class="home-container">
    <header class="header">
      <h1>🎓 Curso Práctico de Vue.js</h1>
      <p class="subtitle">Aprende Vue 3 con Composition API y Single File Components</p>
    </header>

    <nav class="topics-nav">
      <h2>Temas del Curso</h2>
      <div class="topics-grid">
        <router-link 
          v-for="topic in topics" 
          :key="topic.id"
          :to="topic.path"
          class="topic-card"
        >
          <span class="topic-icon">{{ topic.icon }}</span>
          <span class="topic-name">{{ topic.name }}</span>
        </router-link>
      </div>
    </nav>

    <section class="info-section">
      <h2>¿Qué aprenderás?</h2>
      <div class="features">
        <div class="feature">
          <span class="feature-icon">⚡</span>
          <h3>Reactividad</h3>
          <p>Domina ref, reactive y el sistema de reactividad de Vue 3</p>
        </div>
        <div class="feature">
          <span class="feature-icon">🧩</span>
          <h3>Componentes</h3>
          <p>Crea componentes reutilizables con props, emit y slots</p>
        </div>
        <div class="feature">
          <span class="feature-icon">🔄</span>
          <h3>Estado Global</h3>
          <p>Gestiona estado compartido con Pinia store</p>
        </div>
        <div class="feature">
          <span class="feature-icon">🛣️</span>
          <h3>Routing</h3>
          <p>Implementa navegación con Vue Router</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #42b883 0%, #35495e 100%);
  border-radius: 12px;
  color: white;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 2.5em;
  margin: 0 0 10px 0;
}

.subtitle {
  font-size: 1.2em;
  opacity: 0.9;
  margin: 0;
}

.topics-nav {
  margin-bottom: 40px;
}

.topics-nav h2 {
  text-align: center;
  color: #35495e;
  margin-bottom: 25px;
}

.topics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
}

.topic-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px 20px;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  text-decoration: none;
  color: #333;
  transition: all 0.2s ease;
}

.topic-card:hover {
  border-color: #42b883;
  background: #f0fff4;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.2);
}

.topic-icon {
  font-size: 1.8em;
}

.topic-name {
  font-weight: 500;
  font-size: 1em;
}

.info-section {
  background: #f8f9fa;
  padding: 30px;
  border-radius: 12px;
}

.info-section h2 {
  text-align: center;
  color: #35495e;
  margin-bottom: 30px;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.feature {
  text-align: center;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.feature-icon {
  font-size: 2.5em;
  display: block;
  margin-bottom: 10px;
}

.feature h3 {
  color: #42b883;
  margin: 10px 0;
}

.feature p {
  color: #666;
  font-size: 0.9em;
  line-height: 1.5;
}
</style>
