<template>
  <div class="pt-4 max-w-2xl space-y-6">
    <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div class="border-b border-gray-50 px-6 py-4">
        <h2 class="text-base font-semibold text-tegbale-navy-blue font-roboto">Profile Information</h2>
      </div>
      <div class="px-6 py-6">
        <div class="flex flex-wrap items-center gap-5 mb-6">
          <div class="relative flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-tegbale-blue text-white text-2xl font-semibold font-roboto select-none overflow-hidden">
            <img v-if="userStore.avatar" :src="userStore.avatar" alt="avatar" class="h-full w-full object-cover" />
            <span v-else>{{ userStore.initials }}</span>
          </div>
          <div>
            <p class="text-lg font-semibold text-tegbale-navy-blue font-roboto">{{ userStore.firstName }} {{ userStore.lastName }}</p>
            <span class="mt-1 inline-block rounded-full bg-tegbale-blue/10 px-3 py-0.5 text-xs font-roboto text-tegbale-blue">School Admin</span>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="flex flex-col gap-1">
            <label class="text-xs text-tegbale-text-gray font-roboto">First Name</label>
            <div class="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-roboto text-gray-700">{{ userStore.firstName || '—' }}</div>
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-xs text-tegbale-text-gray font-roboto">Last Name</label>
            <div class="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-roboto text-gray-700">{{ userStore.lastName || '—' }}</div>
          </div>
          <div class="flex flex-col gap-1 sm:col-span-2">
            <label class="text-xs text-tegbale-text-gray font-roboto">Email Address</label>
            <div class="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-roboto text-gray-700">{{ userStore.email || '—' }}</div>
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-xs text-tegbale-text-gray font-roboto">Phone</label>
            <div class="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-roboto text-gray-700">{{ userStore.phone || '—' }}</div>
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-xs text-tegbale-text-gray font-roboto">School</label>
            <div class="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-roboto text-gray-700">{{ userStore.schoolName || '—' }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div class="border-b border-gray-50 px-6 py-4">
        <h2 class="text-base font-semibold text-tegbale-navy-blue font-roboto">Change Password</h2>
      </div>
      <div class="px-6 py-6 space-y-4">
        <div class="flex flex-col gap-1">
          <label class="text-xs text-tegbale-text-gray font-roboto">Current Password</label>
          <div class="relative">
            <input v-model="pwForm.currentPassword" :type="showCurrent ? 'text' : 'password'" placeholder="Enter current password"
              class="w-full rounded-full border border-gray-200 px-4 py-2.5 pr-10 text-sm font-roboto text-gray-700 placeholder:text-tegbale-text-gray focus:border-tegbale-blue focus:outline-none focus:ring-1 focus:ring-tegbale-blue/20" />
            <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-tegbale-text-gray hover:text-gray-600" @click="showCurrent = !showCurrent">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
            </button>
          </div>
          <span v-if="pwV$.currentPassword.$error" class="text-xs text-red-500 pl-2 font-roboto">{{ pwV$.currentPassword.$errors[0].$message }}</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="flex flex-col gap-1">
            <label class="text-xs text-tegbale-text-gray font-roboto">New Password</label>
            <div class="relative">
              <input v-model="pwForm.newPassword" :type="showNew ? 'text' : 'password'" placeholder="New password"
                class="w-full rounded-full border border-gray-200 px-4 py-2.5 pr-10 text-sm font-roboto text-gray-700 placeholder:text-tegbale-text-gray focus:border-tegbale-blue focus:outline-none focus:ring-1 focus:ring-tegbale-blue/20" />
              <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-tegbale-text-gray hover:text-gray-600" @click="showNew = !showNew">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </button>
            </div>
            <span v-if="pwV$.newPassword.$error" class="text-xs text-red-500 pl-2 font-roboto">{{ pwV$.newPassword.$errors[0].$message }}</span>
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-xs text-tegbale-text-gray font-roboto">Confirm New Password</label>
            <input v-model="pwForm.confirmPassword" :type="showNew ? 'text' : 'password'" placeholder="Confirm new password"
              class="w-full rounded-full border border-gray-200 px-4 py-2.5 text-sm font-roboto text-gray-700 placeholder:text-tegbale-text-gray focus:border-tegbale-blue focus:outline-none focus:ring-1 focus:ring-tegbale-blue/20" />
            <span v-if="pwV$.confirmPassword.$error" class="text-xs text-red-500 pl-2 font-roboto">{{ pwV$.confirmPassword.$errors[0].$message }}</span>
          </div>
        </div>
        <div v-if="pwForm.newPassword" class="space-y-1">
          <div class="flex gap-1">
            <div v-for="n in 4" :key="n" class="h-1.5 flex-1 rounded-full transition-colors" :class="strength >= n ? strengthColor : 'bg-gray-100'" />
          </div>
          <p class="text-xs font-roboto" :class="strengthTextColor">{{ strengthLabel }}</p>
        </div>
        <div class="flex justify-end pt-2">
          <button :disabled="isLoading || pwV$.$invalid" @click="changePassword"
            class="rounded-full bg-tegbale-blue px-8 py-2.5 text-sm font-roboto font-medium text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50 transition-colors">
            {{ isLoading ? 'Updating...' : 'Update Password' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, helpers } from '@vuelidate/validators'
import { useUsersStore } from '@/stores/user-store'
import { useToastStore } from '@/stores/toast-store'
import userApi from '@/api/user'

const userStore = useUsersStore()
const toastStore = useToastStore()
const isLoading = ref(false)
const showCurrent = ref(false)
const showNew = ref(false)

const pwForm = reactive({ currentPassword: '', newPassword: '', confirmPassword: '' })
const sameAsNew = helpers.withMessage('Passwords do not match', (val) => val === pwForm.newPassword)
const pwRules = {
  currentPassword: { required: helpers.withMessage('Current password is required', required) },
  newPassword: { required: helpers.withMessage('New password is required', required), minLength: helpers.withMessage('At least 8 characters', minLength(8)) },
  confirmPassword: { required: helpers.withMessage('Please confirm your password', required), sameAsNew },
}
const pwV$ = useVuelidate(pwRules, pwForm)

const strength = computed(() => {
  const p = pwForm.newPassword; if (!p) return 0
  let s = 0
  if (p.length >= 8) s++; if (/[A-Z]/.test(p)) s++; if (/[0-9]/.test(p)) s++; if (/[^A-Za-z0-9]/.test(p)) s++
  return s
})
const strengthColor = computed(() => ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-tegbale-green'][strength.value - 1] ?? 'bg-gray-100')
const strengthTextColor = computed(() => ['text-red-500', 'text-orange-500', 'text-yellow-600', 'text-tegbale-green'][strength.value - 1] ?? 'text-gray-400')
const strengthLabel = computed(() => ['Weak', 'Fair', 'Good', 'Strong'][strength.value - 1] ?? '')

const changePassword = async () => {
  const valid = await pwV$.value.$validate()
  if (!valid) return
  isLoading.value = true
  try {
    await userApi.changePassword({ currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword })
    pwForm.currentPassword = ''; pwForm.newPassword = ''; pwForm.confirmPassword = ''
    pwV$.value.$reset()
    toastStore.showToast({ title: 'Done', message: 'Password updated successfully', type: 'success', timeout: 3000 })
  } catch (error) {
    toastStore.showToast({ title: 'Error', message: typeof error === 'string' ? error : 'Failed to update password', type: 'error', timeout: 4000 })
  } finally { isLoading.value = false }
}
</script>

<style lang="scss" scoped></style>
