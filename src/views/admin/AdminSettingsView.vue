<template>
  <div class="pt-4 max-w-2xl space-y-6">
    <h1 class="text-3xl font-normal text-tegbale-navy-blue font-roboto">Settings</h1>

    <!-- Profile card -->
    <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div class="border-b border-gray-50 px-6 py-4">
        <h2 class="text-base font-semibold text-tegbale-navy-blue font-roboto">Profile Information</h2>
      </div>
      <div class="px-6 py-6 space-y-6">

        <!-- Avatar upload -->
        <div class="flex flex-wrap items-center gap-5">
          <div class="relative group">
            <div class="relative flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-tegbale-blue text-white text-2xl font-semibold font-roboto select-none overflow-hidden ring-4 ring-white shadow">
              <img v-if="avatarPreview || userStore.avatar" :src="avatarPreview || userStore.avatar" alt="avatar" class="h-full w-full object-cover" />
              <span v-else>{{ userStore.initials }}</span>
              <div
                class="absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                @click="triggerFilePick"
              >
                <svg class="h-5 w-5 text-white mb-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span class="text-[10px] text-white font-roboto">Change</span>
              </div>
            </div>
            <input ref="fileInput" type="file" accept="image/jpeg,image/png,image/webp" class="hidden" @change="onFileChange" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-xl font-semibold text-tegbale-navy-blue font-roboto">{{ userStore.firstName }} {{ userStore.lastName }}</p>
            <p class="text-sm text-tegbale-text-gray font-roboto mt-0.5">{{ userStore.email }}</p>
            <div class="flex flex-wrap items-center gap-2 mt-2">
              <span class="inline-block rounded-full bg-tegbale-blue/10 px-3 py-0.5 text-xs font-roboto text-tegbale-blue">{{ roleLabel }}</span>
              <span v-if="avatarFile" class="text-xs font-roboto text-tegbale-text-gray">· New photo selected</span>
            </div>
            <div v-if="avatarFile" class="flex gap-2 mt-3">
              <button
                :disabled="avatarSaving"
                class="rounded-full bg-tegbale-blue px-5 py-2 text-xs font-roboto font-medium text-white hover:bg-blue-600 disabled:opacity-50"
                @click="saveAvatar"
              >{{ avatarSaving ? 'Uploading…' : 'Save photo' }}</button>
              <button class="rounded-full border border-gray-200 px-5 py-2 text-xs font-roboto text-tegbale-text-gray hover:bg-gray-50" @click="cancelAvatar">Discard</button>
            </div>
          </div>
        </div>

        <!-- Editable fields -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-roboto">
          <div class="flex flex-col gap-1">
            <label class="text-xs text-tegbale-text-gray">First Name</label>
            <input
              v-model="profileForm.firstName"
              class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 focus:border-tegbale-blue focus:outline-none focus:ring-1 focus:ring-tegbale-blue/20"
              :class="pv$.firstName.$error ? 'border-red-400' : ''"
            />
            <span v-if="pv$.firstName.$error" class="text-xs text-red-500 pl-2">{{ pv$.firstName.$errors[0].$message }}</span>
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-xs text-tegbale-text-gray">Last Name</label>
            <input
              v-model="profileForm.lastName"
              class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 focus:border-tegbale-blue focus:outline-none focus:ring-1 focus:ring-tegbale-blue/20"
              :class="pv$.lastName.$error ? 'border-red-400' : ''"
            />
            <span v-if="pv$.lastName.$error" class="text-xs text-red-500 pl-2">{{ pv$.lastName.$errors[0].$message }}</span>
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-xs text-tegbale-text-gray">Phone Number</label>
            <input
              v-model="profileForm.phone"
              type="tel"
              placeholder="Enter phone number"
              class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 placeholder:text-tegbale-text-gray focus:border-tegbale-blue focus:outline-none focus:ring-1 focus:ring-tegbale-blue/20"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-xs text-tegbale-text-gray">Role</label>
            <div class="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-500">{{ roleLabel }}</div>
          </div>
          <div class="flex flex-col gap-1 sm:col-span-2">
            <label class="text-xs text-tegbale-text-gray">Email Address</label>
            <div class="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-500">{{ userStore.email || '—' }}</div>
          </div>
        </div>

        <div class="flex justify-end pt-2">
          <button
            :disabled="profileSaving || !profileDirty"
            class="rounded-full bg-tegbale-blue px-8 py-2.5 text-sm font-roboto font-medium text-white hover:bg-blue-600 disabled:opacity-50 transition-colors"
            @click="saveProfile"
          >
            {{ profileSaving ? 'Saving…' : 'Save Changes' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Account details card -->
    <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div class="border-b border-gray-50 px-6 py-4">
        <h2 class="text-base font-semibold text-tegbale-navy-blue font-roboto">Account Details</h2>
      </div>
      <div class="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-roboto">
        <div class="flex flex-col gap-1">
          <p class="text-xs text-tegbale-text-gray">Account ID</p>
          <p class="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-400 text-xs truncate">{{ userStore.id || '—' }}</p>
        </div>
        <div class="flex flex-col gap-1">
          <p class="text-xs text-tegbale-text-gray">School ID</p>
          <p class="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-400 text-xs truncate">{{ userStore.schoolId || '—' }}</p>
        </div>
      </div>
    </div>

    <!-- Change password card -->
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
          <button :disabled="pwSaving || pwV$.$invalid" @click="changePassword"
            class="rounded-full bg-tegbale-blue px-8 py-2.5 text-sm font-roboto font-medium text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50 transition-colors">
            {{ pwSaving ? 'Updating…' : 'Update Password' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, helpers } from '@vuelidate/validators'
import { useUsersStore } from '@/stores/user-store'
import { useToastStore } from '@/stores/toast-store'
import userApi from '@/api/user'

const userStore = useUsersStore()
const toastStore = useToastStore()

// ── Avatar ────────────────────────────────────────────────────────────────────
const fileInput = ref(null)
const avatarFile = ref(null)
const avatarPreview = ref(null)
const avatarSaving = ref(false)

const triggerFilePick = () => fileInput.value?.click()

const onFileChange = (e) => {
  const file = e.target.files?.[0]
  if (!file) return
  avatarFile.value = file
  avatarPreview.value = URL.createObjectURL(file)
}

const saveAvatar = async () => {
  if (!avatarFile.value) return
  avatarSaving.value = true
  try {
    await userStore.uploadAvatar(avatarFile.value)
    avatarFile.value = null
    avatarPreview.value = null
    toastStore.showToast({ title: 'Done', message: 'Profile photo updated', type: 'success', timeout: 3000 })
  } catch {
    toastStore.showToast({ title: 'Error', message: 'Failed to upload photo', type: 'error', timeout: 4000 })
  } finally { avatarSaving.value = false }
}

const cancelAvatar = () => {
  avatarFile.value = null
  avatarPreview.value = null
  if (fileInput.value) fileInput.value.value = ''
}

// ── Profile form ──────────────────────────────────────────────────────────────
const profileForm = reactive({
  firstName: userStore.firstName ?? '',
  lastName: userStore.lastName ?? '',
  phone: userStore.phone ?? '',
})

const profileDirty = computed(() =>
  profileForm.firstName !== (userStore.firstName ?? '') ||
  profileForm.lastName !== (userStore.lastName ?? '') ||
  profileForm.phone !== (userStore.phone ?? '')
)

const profileSaving = ref(false)

const pRules = {
  firstName: { required: helpers.withMessage('First name is required', required) },
  lastName: { required: helpers.withMessage('Last name is required', required) },
}
const pv$ = useVuelidate(pRules, profileForm)

const roleLabel = computed(() => ({
  SCHOOL_ADMIN: 'School Admin', STAFF: 'Staff', TEACHER: 'Teacher', SUPER_ADMIN: 'Super Admin',
}[userStore.role] ?? userStore.role ?? '—'))

const saveProfile = async () => {
  const valid = await pv$.value.$validate()
  if (!valid) return
  profileSaving.value = true
  try {
    await userStore.updateProfile({
      firstName: profileForm.firstName,
      lastName: profileForm.lastName,
      phone: profileForm.phone || undefined,
    })
    toastStore.showToast({ title: 'Done', message: 'Profile updated', type: 'success', timeout: 3000 })
  } catch {
    toastStore.showToast({ title: 'Error', message: 'Failed to update profile', type: 'error', timeout: 4000 })
  } finally { profileSaving.value = false }
}

watch(() => userStore.firstName, (v) => { if (v) profileForm.firstName = v })
watch(() => userStore.lastName, (v) => { if (v) profileForm.lastName = v })
watch(() => userStore.phone, (v) => { profileForm.phone = v ?? '' })

// ── Change password ───────────────────────────────────────────────────────────
const pwSaving = ref(false)
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
  pwSaving.value = true
  try {
    await userApi.changePassword({ currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword })
    pwForm.currentPassword = ''; pwForm.newPassword = ''; pwForm.confirmPassword = ''
    pwV$.value.$reset()
    toastStore.showToast({ title: 'Done', message: 'Password updated', type: 'success', timeout: 3000 })
  } catch (error) {
    toastStore.showToast({ title: 'Error', message: typeof error === 'string' ? error : 'Failed to update password', type: 'error', timeout: 4000 })
  } finally { pwSaving.value = false }
}
</script>

<style lang="scss" scoped></style>
