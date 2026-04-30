<script setup>
import TodoList from './components/TodoList.vue'
</script>

<template>
  <main>
    <TodoList />
  </main>
</template>

<style scoped>
main {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}
</style>
