import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const user = ref(null)

  function addItem(product) {
    const cartItem = {
      ...product,
      cartItemId: Date.now() + Math.random() // ID único para cada copia
    }
    items.value.push(cartItem)
  }

  function removeItem(cartItemId) {
    const index = items.value.findIndex(item => item.cartItemId === cartItemId)
    if (index !== -1) {
      items.value.splice(index, 1) // Elimina solo ese item
    }
  }

  function setUser(userData) {
    user.value = userData
  }

  function logout() {
    user.value = null
    items.value = []
  }

  const totalItems = computed(() => items.value.length)

  const cartTotal = computed(() => items.value.reduce((sum, item) => sum + item.price, 0).toFixed(2))

  return { items, user, addItem, removeItem, setUser, logout, totalItems, cartTotal }
})
