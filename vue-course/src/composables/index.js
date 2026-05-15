import { ref } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)

  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  function reset() {
    count.value = initialValue
  }

  return { count, increment, decrement, reset }
}

export function useLocalStorage(key, initialValue) {
  const stored = localStorage.getItem(key)
  const value = ref(stored ? JSON.parse(stored) : initialValue)

  function setValue(newValue) {
    value.value = newValue
    localStorage.setItem(key, JSON.stringify(newValue))
  }

  function clear() {
    value.value = initialValue
    localStorage.removeItem(key)
  }

  return { value, setValue, clear }
}

export function useToggle(initialValue = false) {
  const isOn = ref(initialValue)

  function toggle() {
    isOn.value = !isOn.value
  }

  function turnOn() {
    isOn.value = true
  }

  function turnOff() {
    isOn.value = false
  }

  return { isOn, toggle, turnOn, turnOff }
}
