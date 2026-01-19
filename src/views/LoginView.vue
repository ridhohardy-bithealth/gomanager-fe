<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const email = ref('')
const password = ref('')

const handleLogin = async () => {
  const ok = await authStore.login({ email: email.value, password: password.value })
  if (ok) {
    await router.push('/login-success')
  }
}
</script>

<template>
  <main class="min-h-screen bg-[#0b0b0b] text-white">
    <div
      class="relative flex min-h-screen items-center justify-center px-4 py-12 sm:px-8"
    >
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)]"
      ></div>
      <div
        class="relative w-full max-w-6xl rounded-[28px] border border-white/20 bg-black/30 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.6)] backdrop-blur sm:p-10"
      >
        <div class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <section
            class="flex min-h-[360px] items-center justify-center rounded-[22px] border border-white/20 bg-white/5 p-6 sm:p-10"
          >
            <div
              class="flex size-56 items-center justify-center rounded-[2.75rem] border border-white/50 bg-white/5 shadow-[0_0_40px_rgba(255,255,255,0.08)] rotate-45"
            >
              <p
                class="-rotate-45 text-center text-sm font-medium uppercase tracking-[0.3em] text-white/80"
              >
                employee management system ver 0.1
              </p>
            </div>
          </section>

          <section
            class="flex min-h-[360px] flex-col gap-5 rounded-[22px] border border-white/20 bg-white/5 p-6 sm:p-10"
          >
            <p class="text-sm uppercase tracking-[0.35em] text-white/60">
              welcome
            </p>
            <form
              class="flex flex-1 flex-col items-center"
              @submit.prevent="handleLogin"
            >
              <div class="flex w-full max-w-sm flex-col gap-[15px]">
                <label class="flex flex-col gap-3 text-xs uppercase tracking-[0.35em] text-white/60">
                  Email
                  <input
                    v-model="email"
                    type="email"
                    name="email"
                    autocomplete="email"
                    placeholder="yourmail@gmail.com"
                    class="w-full rounded-full border border-white/30 bg-transparent px-5 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/70 focus:outline-none"
                  />
                </label>
                <label class="flex flex-col gap-3 text-xs uppercase tracking-[0.35em] text-white/60">
                  Password
                  <input
                    v-model="password"
                    type="password"
                    name="password"
                    autocomplete="current-password"
                    placeholder="••••••••"
                    class="w-full rounded-full border border-white/30 bg-transparent px-5 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/70 focus:outline-none"
                  />
                </label>
                <p
                  v-if="authStore.error"
                  class="text-xs uppercase tracking-[0.3em] text-red-400"
                >
                  {{ authStore.error }}
                </p>
              </div>
              <div class="mt-auto flex w-full max-w-sm flex-col gap-[15px] pt-4">
                <button
                  type="submit"
                  class="w-full rounded-full border border-white/60 py-3 text-xs font-semibold uppercase tracking-[0.45em] text-white transition hover:border-white hover:text-white/90"
                  :disabled="authStore.isLoading"
                >
                  {{ authStore.isLoading ? 'Loading...' : 'Login' }}
                </button>
                <button
                  type="button"
                  class="w-full rounded-full border border-white/40 py-3 text-xs font-semibold uppercase tracking-[0.45em] text-white/80 transition hover:border-white/80 hover:text-white"
                  @click="authStore.signup()"
                >
                  Signup
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  </main>
</template>
