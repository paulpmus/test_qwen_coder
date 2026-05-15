<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <nav class="main-nav">
      <router-link to="/" class="nav-logo">🎓 Vue Course</router-link>
      <div class="nav-links">
        <router-link to="/">Home</router-link>
        <a href="https://vuejs.org" target="_blank" class="external-link">Vue Docs →</a>
      </div>
    </nav>
    
    <main class="main-content">
      <RouterView />
    </main>
    
    <footer class="app-footer">
      <p>Curso Práctico de Vue.js - Composition API con SFC</p>
    </footer>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background: #f5f5f5;
  color: #333;
  line-height: 1.6;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-nav {
  background: #35495e;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.nav-logo {
  color: white;
  text-decoration: none;
  font-size: 1.4em;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 20px;
  align-items: center;
}

.nav-links a {
  color: rgba(255,255,255,0.9);
  text-decoration: none;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: #42b883;
}

.nav-links .external-link {
  background: rgba(255,255,255,0.1);
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.9em;
}

.main-content {
  flex: 1;
  padding: 30px;
}

.app-footer {
  background: #35495e;
  color: rgba(255,255,255,0.7);
  text-align: center;
  padding: 20px;
  margin-top: auto;
}
</style>
