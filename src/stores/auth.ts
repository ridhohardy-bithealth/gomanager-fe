import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const lastAction = ref<'login' | 'signup' | null>(null)
  const error = ref<string | null>(null)
  const isLoading = ref(false)
  const apiBaseUrl = computed(() => import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080')

  async function login(payload: { email: string; password: string }) {
    const trimmed = {
      email: payload.email.trim(),
      password: payload.password.trim(),
    }

    if (!trimmed.email || !trimmed.password) {
      error.value = 'Email and password must filled.'
      return false
    }

    error.value = null
    isLoading.value = true
    try {
      const response = await fetch(`${apiBaseUrl.value}/v1/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: trimmed.email,
          password: trimmed.password,
          action: 'login',
        }),
      })
      
      if (!response.ok) {
        let message = ''
        try {
          const data = await response.json()
          message = typeof data?.message === 'string' ? data.message : ''
        } catch {
          message = await response.text()
        }
        error.value = message || 'Login failed.'
        return false
      }

      lastAction.value = 'login'
      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Login failed.'
      return false
    } finally {
      isLoading.value = false
    }
  }

  function signup() {
    lastAction.value = 'signup'
    error.value = null
  }

  return {
    lastAction,
    error,
    isLoading,
    login,
    signup,
  }
})
