<template>
  <form @submit.prevent="handleLogin" class="px-2">
    <h3 class="text-tegbale-blue font-bold font-roboto text-center text-3xl py-6">
      Welcome Back
    </h3>

    <div class="flex flex-col gap-4 px-2">
      <!-- Email -->
      <div class="relative">
        <span class="pointer-events-none absolute inset-y-0 left-4 flex items-center text-tegbale-blue">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"/>
          </svg>
        </span>
        <input
          v-model="loginData.email"
          type="email"
          placeholder="Email Address"
          autocomplete="email"
          class="w-full rounded-full border border-gray-200 py-3 pl-12 pr-4 text-sm font-roboto text-gray-700 placeholder:text-tegbale-text-gray focus:border-tegbale-blue focus:outline-none focus:ring-2 focus:ring-tegbale-blue/20"
          :class="{ 'border-red-400': v$.email.$error }"
          @blur="v$.email.$touch()"
          @change="loginData.email = $event.target.value"
        />
        <p v-if="v$.email.$error" class="mt-1 pl-4 text-xs text-red-500">{{ v$.email.$errors[0].$message }}</p>
      </div>

      <!-- Password -->
      <div class="relative">
        <span class="pointer-events-none absolute inset-y-0 left-4 flex items-center text-tegbale-blue">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"/>
          </svg>
        </span>
        <input
          v-model="loginData.password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Password"
          autocomplete="current-password"
          class="w-full rounded-full border border-gray-200 py-3 pl-12 pr-12 text-sm font-roboto text-gray-700 placeholder:text-tegbale-text-gray focus:border-tegbale-blue focus:outline-none focus:ring-2 focus:ring-tegbale-blue/20"
          :class="{ 'border-red-400': v$.password.$error }"
          @blur="v$.password.$touch()"
          @change="loginData.password = $event.target.value"
        />
        <button
          type="button"
          class="absolute inset-y-0 right-4 flex items-center text-tegbale-text-gray hover:text-tegbale-blue"
          @click="showPassword = !showPassword"
        >
          <svg v-if="!showPassword" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/>
          </svg>
        </button>
        <p v-if="v$.password.$error" class="mt-1 pl-4 text-xs text-red-500">{{ v$.password.$errors[0].$message }}</p>
      </div>

      <!-- Forgot password -->
      <div class="flex justify-end -mt-1">
        <button type="button" class="text-sm text-tegbale-blue font-roboto hover:underline">
          Forgot Password?
        </button>
      </div>

      <button
        type="submit"
        :disabled="isLoading"
        class="w-full rounded-full bg-tegbale-blue py-3 text-sm font-roboto font-bold text-white hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
      >
        <span v-if="isLoading">Signing in...</span>
        <span v-else>Sign In</span>
      </button>

      <p class="text-center text-sm font-roboto text-tegbale-text-gray mt-1">
        Don't have an account?
        <router-link to="/register" class="text-tegbale-blue hover:underline font-medium">Get started</router-link>
      </p>
    </div>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { useUsersStore } from '@/stores/user-store'
import { useToastStore } from '@/stores/toast-store'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUsersStore()
const toastStore = useToastStore()

const loginData = reactive({ email: '', password: '' })
const isLoading = ref(false)
const showPassword = ref(false)

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(6) },
}
const v$ = useVuelidate(rules, loginData)

const handleLogin = async () => {
  const valid = await v$.value.$validate()
  if (!valid) return

  isLoading.value = true
  try {
    await userStore.login(loginData)
    toastStore.showToast({ title: 'Welcome', message: 'Logged in successfully', type: 'success', timeout: 3000 })
    router.push('/admin/dashboard')
  } catch (error) {
    toastStore.showToast({ title: 'Login Failed', message: error instanceof Error ? error.message : 'Invalid email or password', type: 'error', timeout: 4000 })
  } finally {
    isLoading.value = false
  }
}
</script>
