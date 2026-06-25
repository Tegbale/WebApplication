<template>
  <div class="pt-4">
    <!-- Breadcrumb -->
    <div class="flex items-center justify-between gap-3 mb-6 min-w-0">
      <div class="flex items-center gap-2 font-roboto min-w-0 flex-1">
        <router-link :to="{ name: 'adminSchools' }" class="text-3xl font-normal text-tegbale-text-gray hover:text-tegbale-navy-blue transition-colors flex-shrink-0">
          My School
        </router-link>
        <svg class="h-5 w-5 text-tegbale-text-gray flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
        </svg>
        <span class="text-3xl font-normal text-tegbale-navy-blue truncate min-w-0" :title="schoolStore.name">
          {{ schoolStore.name || 'Details' }}
        </span>
      </div>
    </div>

    <!-- Pill tabs -->
    <div class="inline-flex gap-1 mb-5 bg-white rounded-full p-1 shadow-sm flex-shrink-0">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="activeTab = tab.key"
        class="rounded-full px-5 py-2 text-sm font-roboto font-medium transition-colors whitespace-nowrap"
        :class="activeTab === tab.key ? 'bg-tegbale-blue text-white' : 'text-tegbale-text-gray hover:text-tegbale-navy-blue'"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Table card -->
    <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div class="flex items-center justify-end px-4 py-3 border-b border-gray-50">
        <ExportDropdown
          :rows="activeRows"
          :columns="activeExportColumns"
          :filename="`school-${activeTab}`"
          :disabled="!activeRows.length"
        />
      </div>

      <div v-if="tabLoading" class="p-6 space-y-3">
        <div v-for="i in 5" :key="i" class="h-12 rounded-xl bg-gray-100 animate-pulse" />
      </div>

      <!-- Students -->
      <div v-else-if="activeTab === 'students'" class="overflow-x-auto">
        <table class="w-full text-sm font-roboto min-w-[480px]">
          <thead>
            <tr class="text-left text-tegbale-text-gray border-b border-gray-100">
              <th class="px-6 py-4 font-normal">S/N</th>
              <th class="px-6 py-4 font-normal">Name</th>
              <th class="px-6 py-4 font-normal hidden md:table-cell">Classroom</th>
              <th class="px-6 py-4 font-normal hidden md:table-cell">Gender</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="(s, i) in students" :key="s.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 text-tegbale-text-gray">{{ i + 1 }}</td>
              <td class="px-6 py-4 text-tegbale-text-gray">{{ s.firstName }} {{ s.lastName }}</td>
              <td class="px-6 py-4 text-tegbale-text-gray hidden md:table-cell">{{ s.classroom?.name ?? '—' }}</td>
              <td class="px-6 py-4 text-tegbale-text-gray hidden md:table-cell capitalize">{{ s.gender ?? '—' }}</td>
            </tr>
            <tr v-if="!students.length">
              <td colspan="4" class="px-6 py-12 text-center text-tegbale-text-gray">No students found</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Teachers -->
      <div v-else-if="activeTab === 'teachers'" class="overflow-x-auto">
        <table class="w-full text-sm font-roboto min-w-[480px]">
          <thead>
            <tr class="text-left text-tegbale-text-gray border-b border-gray-100">
              <th class="px-6 py-4 font-normal">S/N</th>
              <th class="px-6 py-4 font-normal">Name</th>
              <th class="px-6 py-4 font-normal hidden md:table-cell">Email Address</th>
              <th class="px-6 py-4 font-normal hidden md:table-cell">Phone</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="(t, i) in teachers" :key="t.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 text-tegbale-text-gray">{{ i + 1 }}</td>
              <td class="px-6 py-4 text-tegbale-text-gray">{{ t.firstName }} {{ t.lastName }}</td>
              <td class="px-6 py-4 text-tegbale-text-gray hidden md:table-cell">{{ t.email }}</td>
              <td class="px-6 py-4 text-tegbale-text-gray hidden md:table-cell">{{ t.phone ?? '—' }}</td>
            </tr>
            <tr v-if="!teachers.length">
              <td colspan="4" class="px-6 py-12 text-center text-tegbale-text-gray">No teachers found</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Guardians -->
      <div v-else-if="activeTab === 'guardians'" class="overflow-x-auto">
        <table class="w-full text-sm font-roboto min-w-[480px]">
          <thead>
            <tr class="text-left text-tegbale-text-gray border-b border-gray-100">
              <th class="px-6 py-4 font-normal">S/N</th>
              <th class="px-6 py-4 font-normal">Name</th>
              <th class="px-6 py-4 font-normal hidden md:table-cell">Email Address</th>
              <th class="px-6 py-4 font-normal hidden md:table-cell">Phone</th>
              <th class="px-6 py-4 font-normal hidden lg:table-cell">Wards</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="(g, i) in guardians" :key="g.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 text-tegbale-text-gray">{{ i + 1 }}</td>
              <td class="px-6 py-4 text-tegbale-text-gray">{{ g.user.firstName }} {{ g.user.lastName }}</td>
              <td class="px-6 py-4 text-tegbale-text-gray hidden md:table-cell">{{ g.user.email }}</td>
              <td class="px-6 py-4 text-tegbale-text-gray hidden md:table-cell">{{ g.user.phone ?? '—' }}</td>
              <td class="px-6 py-4 text-tegbale-text-gray hidden lg:table-cell">{{ g.wards?.length ?? 0 }}</td>
            </tr>
            <tr v-if="!guardians.length">
              <td colspan="5" class="px-6 py-12 text-center text-tegbale-text-gray">No guardians found</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useUsersStore } from '@/stores/user-store'
import { useSchoolStore } from '@/stores/school-store'
import studentsApi from '@/api/students'
import adminApi from '@/api/admin'
import parentsApi from '@/api/parents'
import ExportDropdown from '@/components/BaseComponents/ExportDropdown.vue'

const route = useRoute()
const userStore = useUsersStore()
const schoolStore = useSchoolStore()

const schoolId = computed(() => route.params.id || userStore.schoolId)
const activeTab = ref('students')
const tabLoading = ref(false)
const students = ref([])
const teachers = ref([])
const guardians = ref([])

const tabs = [
  { key: 'students', label: 'Students' },
  { key: 'teachers', label: 'Teachers' },
  { key: 'guardians', label: 'Guardians' },
]

const activeRows = computed(() => {
  if (activeTab.value === 'students') return students.value
  if (activeTab.value === 'teachers') return teachers.value
  return guardians.value
})

const activeExportColumns = computed(() => {
  if (activeTab.value === 'students') return [
    { header: 'S/N', value: (_, i) => i + 1 },
    { header: 'First Name', value: (s) => s.firstName },
    { header: 'Last Name', value: (s) => s.lastName },
    { header: 'Classroom', value: (s) => s.classroom?.name ?? '' },
    { header: 'Gender', value: (s) => s.gender ?? '' },
  ]
  if (activeTab.value === 'teachers') return [
    { header: 'S/N', value: (_, i) => i + 1 },
    { header: 'First Name', value: (t) => t.firstName },
    { header: 'Last Name', value: (t) => t.lastName },
    { header: 'Email', value: (t) => t.email },
    { header: 'Phone', value: (t) => t.phone ?? '' },
  ]
  return [
    { header: 'S/N', value: (_, i) => i + 1 },
    { header: 'First Name', value: (g) => g.user.firstName },
    { header: 'Last Name', value: (g) => g.user.lastName },
    { header: 'Email', value: (g) => g.user.email },
    { header: 'Phone', value: (g) => g.user.phone ?? '' },
    { header: 'Wards', value: (g) => g.wards?.length ?? 0 },
  ]
})

async function loadTab(tab) {
  tabLoading.value = true
  try {
    if (tab === 'students') {
      const { data } = await studentsApi.getStudents({ schoolId: schoolId.value, limit: 100 })
      students.value = data.data
    } else if (tab === 'teachers') {
      const { data } = await adminApi.getAllStaff({ role: 'TEACHER', limit: 100 })
      teachers.value = data.data
    } else {
      const { data } = await parentsApi.getParents({ schoolId: schoolId.value, limit: 100 })
      guardians.value = data.data
    }
  } catch {
    // silent
  } finally {
    tabLoading.value = false
  }
}

watch(activeTab, loadTab)

onMounted(async () => {
  if (userStore.schoolId && !schoolStore.name) {
    try { await schoolStore.fetchSchool(userStore.schoolId) } catch {}
  }
  loadTab('students')
})
</script>

<style lang="scss" scoped></style>
