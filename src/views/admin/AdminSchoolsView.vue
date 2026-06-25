<template>
  <div class="pt-4">
    <h1 class="text-3xl font-normal text-tegbale-navy-blue font-roboto mb-6">My School</h1>

    <div v-if="loading" class="space-y-4">
      <div class="h-48 rounded-2xl bg-white animate-pulse" />
    </div>

    <div v-else-if="school" class="space-y-5">
      <!-- School info card -->
      <div class="bg-white rounded-2xl shadow-sm p-6">
        <div class="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <h2 class="text-2xl font-semibold font-roboto text-tegbale-navy-blue">{{ school.name }}</h2>
            <span class="mt-2 inline-block rounded-full px-3 py-0.5 text-xs font-roboto"
              :class="school.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'">
              {{ school.isActive ? 'Active' : 'Inactive' }}
            </span>
          </div>
          <router-link
            :to="{ name: 'schoolsDetails', params: { id: school.id } }"
            class="flex items-center gap-2 rounded-full bg-tegbale-blue px-5 py-2.5 text-sm font-roboto font-medium text-white hover:bg-blue-600"
          >
            View Details
          </router-link>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-roboto">
          <div class="flex flex-col gap-1">
            <p class="text-xs text-tegbale-text-gray">Email Address</p>
            <p class="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-700">{{ school.email || '—' }}</p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-xs text-tegbale-text-gray">Phone</p>
            <p class="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-700">{{ school.phone || '—' }}</p>
          </div>
          <div class="flex flex-col gap-1 sm:col-span-2">
            <p class="text-xs text-tegbale-text-gray">Address</p>
            <p class="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-700">{{ school.address || '—' }}</p>
          </div>
        </div>
      </div>

      <!-- Stats row -->
      <div v-if="school._count" class="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div class="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
          <div class="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-tegbale-navy-blue">
            <svg width="22" height="20" viewBox="0 0 23 20" fill="white"><path d="M21.111 8.889H18.889V2.222H20V0H2.222v2.222h1.111v6.667H1.111C.816 8.889.534 9.006.325 9.214.117 9.423 0 9.705 0 10v10h22.222V10c0-.295-.117-.577-.325-.786-.208-.208-.49-.325-.786-.325zM13.333 17.778V13.333H8.889v4.445H5.556V2.222h11.111v15.556h-3.334z"/><path d="M7.778 4.444h2.222v2.223H7.778V4.444zm4.444 0h2.222v2.223h-2.222V4.444zM7.778 8.889h2.222V11.11H7.778V8.889zm4.444 0h2.222V11.11h-2.222V8.889z"/></svg>
          </div>
          <div>
            <p class="text-2xl font-semibold text-tegbale-navy-blue font-roboto">{{ school._count.classrooms ?? 0 }}</p>
            <p class="text-xs text-tegbale-text-gray font-roboto">Classrooms</p>
          </div>
        </div>
        <div class="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
          <div class="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-tegbale-purple">
            <svg fill="white" viewBox="0 0 24 24" width="24" height="24"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/></svg>
          </div>
          <div>
            <p class="text-2xl font-semibold text-tegbale-navy-blue font-roboto">{{ school._count.students ?? 0 }}</p>
            <p class="text-xs text-tegbale-text-gray font-roboto">Students</p>
          </div>
        </div>
        <div class="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
          <div class="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-tegbale-green">
            <svg fill="white" viewBox="0 0 30 20" width="24" height="18"><path d="M30 13.25C30 14 28.5 14.5 26.75 14.75 25.625 12.625 23.375 11 20.75 9.875c.25-.375.5-.625.75-1h1C26.375 8.75 30 11.125 30 13.25zM8.5 8.75H7.5C3.625 8.75 0 11.125 0 13.25 0 14 1.5 14.5 3.25 14.75 4.375 12.625 6.625 11 9.25 9.875L8.5 8.75zM15 10c2.75 0 5-2.25 5-5S17.75 0 15 0s-5 2.25-5 5 2.25 5 5 5zm0 1.25C9.875 11.25 5 14.5 5 17.5 5 20 15 20 15 20s10 0 10-2.5c0-3-4.875-6.25-10-6.25z"/></svg>
          </div>
          <div>
            <p class="text-2xl font-semibold text-tegbale-navy-blue font-roboto">{{ school._count.staff ?? 0 }}</p>
            <p class="text-xs text-tegbale-text-gray font-roboto">Staff</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="bg-white rounded-2xl shadow-sm p-12 text-center text-tegbale-text-gray font-roboto">
      School information not available
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUsersStore } from '@/stores/user-store'
import { useSchoolStore } from '@/stores/school-store'

const userStore = useUsersStore()
const schoolStore = useSchoolStore()
const school = ref(null)
const loading = ref(false)

onMounted(async () => {
  if (!userStore.schoolId) return
  loading.value = true
  try {
    school.value = await schoolStore.fetchSchool(userStore.schoolId)
  } catch {} finally {
    loading.value = false
  }
})
</script>

<style lang="scss" scoped></style>
