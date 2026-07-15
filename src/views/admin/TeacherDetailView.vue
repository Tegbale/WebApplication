<template>
  <div class="pt-4">
    <!-- Breadcrumb -->
    <div class="flex items-center gap-2 font-roboto mb-6 min-w-0">
      <router-link :to="{ name: 'adminTeachers' }" class="text-3xl font-normal text-tegbale-text-gray hover:text-tegbale-navy-blue transition-colors flex-shrink-0">
        Teachers
      </router-link>
      <svg class="h-5 w-5 text-tegbale-text-gray flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
      </svg>
      <span class="text-3xl font-normal text-tegbale-navy-blue truncate min-w-0">
        {{ teacher ? `${teacher.firstName} ${teacher.lastName}` : '…' }}
      </span>
    </div>

    <div v-if="loading" class="space-y-4">
      <div class="h-48 rounded-2xl bg-white animate-pulse" />
      <div class="h-32 rounded-2xl bg-white animate-pulse" />
    </div>

    <div v-else-if="!teacher" class="bg-white rounded-2xl shadow-sm p-12 text-center text-tegbale-text-gray font-roboto">
      Teacher not found.
    </div>

    <div v-else class="space-y-5">
      <!-- Profile card -->
      <div class="bg-white rounded-2xl shadow-sm p-6">
        <div class="flex flex-wrap items-start gap-5 mb-6">
          <div class="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-tegbale-blue/10 text-tegbale-blue text-2xl font-bold font-roboto overflow-hidden">
            <img v-if="teacher.avatar" :src="teacher.avatar" alt="avatar" class="h-full w-full object-cover" />
            <span v-else>{{ initials }}</span>
          </div>
          <div class="flex-1 min-w-0">
            <h2 class="text-2xl font-semibold font-roboto text-tegbale-navy-blue">{{ teacher.firstName }} {{ teacher.lastName }}</h2>
            <p class="text-sm font-roboto text-tegbale-text-gray mt-0.5">{{ teacher.email }}</p>
            <div class="flex flex-wrap gap-2 mt-3">
              <span class="inline-block rounded-full px-3 py-0.5 text-xs font-roboto bg-blue-50 text-tegbale-blue">Teacher</span>
              <span
                class="inline-block rounded-full px-3 py-0.5 text-xs font-roboto"
                :class="teacher.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'"
              >
                {{ teacher.isActive ? 'Active' : 'Inactive' }}
              </span>
              <span v-if="classrooms.length" class="inline-block rounded-full px-3 py-0.5 text-xs font-roboto bg-purple-50 text-purple-600">
                {{ classrooms.length }} classroom{{ classrooms.length !== 1 ? 's' : '' }}
              </span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-roboto">
          <div class="flex flex-col gap-1">
            <p class="text-xs text-tegbale-text-gray">First Name</p>
            <p class="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-700">{{ teacher.firstName }}</p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-xs text-tegbale-text-gray">Last Name</p>
            <p class="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-700">{{ teacher.lastName }}</p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-xs text-tegbale-text-gray">Email Address</p>
            <p class="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-700">{{ teacher.email }}</p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-xs text-tegbale-text-gray">Phone Number</p>
            <p class="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-700">{{ teacher.phone || '—' }}</p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-xs text-tegbale-text-gray">Account Status</p>
            <p class="rounded-full border px-4 py-2.5"
              :class="teacher.isActive ? 'border-green-200 text-green-600 bg-green-50' : 'border-red-200 text-red-500 bg-red-50'">
              {{ teacher.isActive ? 'Active' : 'Inactive' }}
            </p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-xs text-tegbale-text-gray">Date Added</p>
            <p class="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-700">{{ formatDate(teacher.createdAt) }}</p>
          </div>
        </div>
      </div>

      <!-- Assigned Classrooms -->
      <div class="bg-white rounded-2xl shadow-sm p-6">
        <h3 class="text-base font-semibold font-roboto text-tegbale-navy-blue mb-4">Assigned Classrooms</h3>
        <div v-if="classrooms.length" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            v-for="cls in classrooms"
            :key="cls.id"
            class="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3"
          >
            <div class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-tegbale-blue/10">
              <svg class="h-4 w-4 text-tegbale-blue" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-9 11H7v-2h4v2zm6 0h-4v-2h4v2zm0-4H7V7h10v2z"/></svg>
            </div>
            <div class="min-w-0">
              <p class="text-sm font-roboto font-medium text-tegbale-navy-blue truncate">{{ cls.name }}</p>
              <p v-if="cls.level" class="text-xs font-roboto text-tegbale-text-gray">{{ cls.level }}</p>
            </div>
          </div>
        </div>
        <p v-else class="text-sm font-roboto text-tegbale-text-gray italic">Not assigned to any classroom yet.</p>
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

const teacher = ref(null)
const loading = ref(false)

const initials = computed(() => {
  const f = teacher.value?.firstName?.[0] ?? ''
  const l = teacher.value?.lastName?.[0] ?? ''
  return (f + l).toUpperCase() || '?'
})

const classrooms = computed(() => teacher.value?.teacherProfile?.classrooms ?? [])

const formatDate = (d) => d
  ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  : '—'

onMounted(async () => {
  loading.value = true
  try {
    const res = await adminApi.getStaffMember(route.params.id)
    teacher.value = res.data.data
  } catch {
    toastStore.showToast({ title: 'Error', message: 'Failed to load teacher', type: 'error', timeout: 3000 })
  } finally { loading.value = false }
})
</script>

<style lang="scss" scoped></style>
