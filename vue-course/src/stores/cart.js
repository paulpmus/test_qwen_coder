import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const user = ref(null)

  function addItem(product) {
    items.value.push(product)
  }

  function removeItem(productId) {
    items.value = items.value.filter(item => item.id !== productId)
  }

  function setUser(userData) {
    user.value = userData
  }

  function logout() {
    user.value = null
    items.value = []
  }

  const totalItems = computed(() => items.value.length)

  return { items, user, addItem, removeItem, setUser, logout, totalItems }
})
