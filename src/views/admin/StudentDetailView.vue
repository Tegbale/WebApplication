<template>
  <div class="pt-4">
    <!-- Breadcrumb -->
    <div class="flex items-center gap-2 font-roboto mb-6 min-w-0">
      <router-link :to="{ name: 'adminStudents' }" class="text-3xl font-normal text-tegbale-text-gray hover:text-tegbale-navy-blue transition-colors flex-shrink-0">
        Students
      </router-link>
      <svg class="h-5 w-5 text-tegbale-text-gray flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
      </svg>
      <span class="text-3xl font-normal text-tegbale-navy-blue truncate min-w-0">
        {{ student ? `${student.firstName} ${student.lastName}` : '…' }}
      </span>
    </div>

    <div v-if="loading" class="space-y-4">
      <div class="h-48 rounded-2xl bg-white animate-pulse" />
      <div class="h-36 rounded-2xl bg-white animate-pulse" />
    </div>

    <div v-else-if="!student" class="bg-white rounded-2xl shadow-sm p-12 text-center text-tegbale-text-gray font-roboto">
      Student not found.
    </div>

    <div v-else class="space-y-5">
      <!-- Profile card -->
      <div class="bg-white rounded-2xl shadow-sm p-6">
        <div class="flex flex-wrap items-start gap-5 mb-6">
          <div class="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-tegbale-blue/10 text-tegbale-blue text-2xl font-bold font-roboto">
            {{ initials }}
          </div>
          <div class="flex-1 min-w-0">
            <h2 class="text-2xl font-semibold font-roboto text-tegbale-navy-blue">{{ student.firstName }} {{ student.lastName }}</h2>
            <p v-if="student.classroom" class="text-sm font-roboto text-tegbale-text-gray mt-0.5">{{ student.classroom.name }}</p>
            <div class="flex flex-wrap gap-2 mt-3">
              <span v-if="student.gender" class="inline-block rounded-full px-3 py-0.5 text-xs font-roboto bg-blue-50 text-tegbale-blue capitalize">{{ student.gender }}</span>
              <span v-if="student.classroom" class="inline-block rounded-full px-3 py-0.5 text-xs font-roboto bg-purple-50 text-purple-600">{{ student.classroom.name }}</span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-roboto">
          <div class="flex flex-col gap-1">
            <p class="text-xs text-tegbale-text-gray">First Name</p>
            <p class="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-700">{{ student.firstName }}</p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-xs text-tegbale-text-gray">Last Name</p>
            <p class="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-700">{{ student.lastName }}</p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-xs text-tegbale-text-gray">Gender</p>
            <p class="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-700 capitalize">{{ student.gender || '—' }}</p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-xs text-tegbale-text-gray">Date of Birth</p>
            <p class="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-700">{{ formatDate(student.dateOfBirth) }}</p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-xs text-tegbale-text-gray">Classroom</p>
            <p class="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-700">{{ student.classroom?.name || '—' }}</p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-xs text-tegbale-text-gray">Date Added</p>
            <p class="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-700">{{ formatDate(student.createdAt) }}</p>
          </div>
        </div>
      </div>

      <!-- Parents / Guardians -->
      <div v-if="student.parents?.length" class="bg-white rounded-2xl shadow-sm p-6">
        <h3 class="text-base font-semibold font-roboto text-tegbale-navy-blue mb-4">Parents / Guardians</h3>
        <div class="space-y-3">
          <div
            v-for="parent in student.parents"
            :key="parent.id"
            class="flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3"
          >
            <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-tegbale-blue/10 text-tegbale-blue text-sm font-bold font-roboto">
              {{ parentInitials(parent.user) }}
            </div>
            <div class="flex-1 min-w-0 text-sm font-roboto">
              <p class="font-medium text-tegbale-navy-blue">{{ parent.user.firstName }} {{ parent.user.lastName }}</p>
              <p class="text-tegbale-text-gray text-xs mt-0.5">{{ parent.user.email }}</p>
            </div>
            <p v-if="parent.user.phone" class="text-xs font-roboto text-tegbale-text-gray hidden sm:block">{{ parent.user.phone }}</p>
          </div>
        </div>
      </div>

      <div v-else class="bg-white rounded-2xl shadow-sm p-5 text-sm font-roboto text-tegbale-text-gray">
        No parents or guardians linked yet.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useToastStore } from '@/stores/toast-store'
import studentsApi from '@/api/students'

const route = useRoute()
const toastStore = useToastStore()

const student = ref(null)
const loading = ref(false)

const initials = computed(() => {
  const f = student.value?.firstName?.[0] ?? ''
  const l = student.value?.lastName?.[0] ?? ''
  return (f + l).toUpperCase() || '?'
})

const parentInitials = (user) => {
  const f = user?.firstName?.[0] ?? ''
  const l = user?.lastName?.[0] ?? ''
  return (f + l).toUpperCase() || '?'
}

const formatDate = (d) => d
  ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  : '—'

onMounted(async () => {
  loading.value = true
  try {
    const res = await studentsApi.getOne(route.params.id)
    student.value = res.data.data
  } catch {
    toastStore.showToast({ title: 'Error', message: 'Failed to load student', type: 'error', timeout: 3000 })
  } finally { loading.value = false }
})
</script>

<style lang="scss" scoped></style>
