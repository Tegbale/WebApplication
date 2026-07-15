<template>
  <div class="pt-4">
    <!-- Breadcrumb -->
    <div class="flex items-center gap-2 font-roboto mb-6 min-w-0">
      <router-link :to="{ name: 'adminUsers' }" class="text-3xl font-normal text-tegbale-text-gray hover:text-tegbale-navy-blue transition-colors flex-shrink-0">
        Staffs
      </router-link>
      <svg class="h-5 w-5 text-tegbale-text-gray flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
      </svg>
      <span class="text-3xl font-normal text-tegbale-navy-blue truncate min-w-0">
        {{ member ? `${member.firstName} ${member.lastName}` : '…' }}
      </span>
    </div>

    <div v-if="loading" class="space-y-4">
      <div class="h-48 rounded-2xl bg-white animate-pulse" />
    </div>

    <div v-else-if="!member" class="bg-white rounded-2xl shadow-sm p-12 text-center text-tegbale-text-gray font-roboto">
      Staff member not found.
    </div>

    <div v-else class="space-y-5">
      <div class="bg-white rounded-2xl shadow-sm p-6">
        <div class="flex flex-wrap items-start gap-5 mb-6">
          <div class="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-tegbale-blue/10 text-tegbale-blue text-2xl font-bold font-roboto overflow-hidden">
            <img v-if="member.avatar" :src="member.avatar" alt="avatar" class="h-full w-full object-cover" />
            <span v-else>{{ initials }}</span>
          </div>
          <div class="flex-1 min-w-0">
            <h2 class="text-2xl font-semibold font-roboto text-tegbale-navy-blue">{{ member.firstName }} {{ member.lastName }}</h2>
            <p class="text-sm font-roboto text-tegbale-text-gray mt-0.5">{{ member.email }}</p>
            <div class="flex flex-wrap gap-2 mt-3">
              <span class="inline-block rounded-full px-3 py-0.5 text-xs font-roboto bg-purple-50 text-purple-600">{{ roleLabel(member.role) }}</span>
              <span
                class="inline-block rounded-full px-3 py-0.5 text-xs font-roboto"
                :class="member.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'"
              >
                {{ member.isActive ? 'Active' : 'Inactive' }}
              </span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-roboto">
          <div class="flex flex-col gap-1">
            <p class="text-xs text-tegbale-text-gray">First Name</p>
            <p class="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-700">{{ member.firstName }}</p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-xs text-tegbale-text-gray">Last Name</p>
            <p class="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-700">{{ member.lastName }}</p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-xs text-tegbale-text-gray">Email Address</p>
            <p class="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-700">{{ member.email }}</p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-xs text-tegbale-text-gray">Phone Number</p>
            <p class="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-700">{{ member.phone || '—' }}</p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-xs text-tegbale-text-gray">Role</p>
            <p class="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-700">{{ roleLabel(member.role) }}</p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-xs text-tegbale-text-gray">Account Status</p>
            <p class="rounded-full border px-4 py-2.5"
              :class="member.isActive ? 'border-green-200 text-green-600 bg-green-50' : 'border-red-200 text-red-500 bg-red-50'">
              {{ member.isActive ? 'Active' : 'Inactive' }}
            </p>
          </div>
          <div class="flex flex-col gap-1 sm:col-span-2">
            <p class="text-xs text-tegbale-text-gray">Date Added</p>
            <p class="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-700">{{ formatDate(member.createdAt) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useToastStore } from '@/stores/toast-store'
import adminApi from '@/api/admin'

const route = useRoute()
const toastStore = useToastStore()

const member = ref(null)
const loading = ref(false)

const initials = computed(() => {
  const f = member.value?.firstName?.[0] ?? ''
  const l = member.value?.lastName?.[0] ?? ''
  return (f + l).toUpperCase() || '?'
})

const roleLabel = (role) => ({ SCHOOL_ADMIN: 'School Admin', STAFF: 'Staff', TEACHER: 'Teacher' }[role] ?? role)

const formatDate = (d) => d
  ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  : '—'

onMounted(async () => {
  loading.value = true
  try {
    const res = await adminApi.getStaffMember(route.params.id)
    member.value = res.data.data
  } catch {
    toastStore.showToast({ title: 'Error', message: 'Failed to load staff member', type: 'error', timeout: 3000 })
  } finally { loading.value = false }
})
</script>

<style lang="scss" scoped></style>
