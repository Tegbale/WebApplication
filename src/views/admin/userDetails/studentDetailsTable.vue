<template>
  <div>
    <div v-if="loading" class="flex justify-center items-center h-52">
      <svg aria-hidden="true" class="inline w-10 h-10 text-white animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
      </svg>
    </div>

    <BaseDataTable v-else class="hidden md:block">
      <template #table-header>
        <tr>
          <th class="p-3 text-sm font-semibold tracking-wide text-left text-tegbale-text-gray">S/N</th>
          <th class="p-3 text-sm font-semibold tracking-wide text-left text-tegbale-text-gray">Name</th>
          <th class="p-3 text-sm font-semibold tracking-wide text-left text-tegbale-text-gray">Gender</th>
          <th class="p-3 text-sm font-semibold tracking-wide text-left text-tegbale-text-gray">Date of Birth</th>
          <th class="p-3 text-sm font-semibold tracking-wide text-left text-tegbale-text-gray">Classroom</th>
        </tr>
      </template>
      <template #table-body>
        <template v-if="students.length > 0">
          <tr class="border-b-2 border-gray-100 hover:bg-gray-50" v-for="(s, i) in students" :key="s.id">
            <td class="p-3 text-sm text-tegbale-text-gray font-roboto">{{ i + 1 }}</td>
            <td class="p-3 text-sm text-tegbale-text-gray font-roboto">{{ s.firstName }} {{ s.lastName }}</td>
            <td class="p-3 text-sm text-tegbale-text-gray font-roboto">{{ s.gender || '—' }}</td>
            <td class="p-3 text-sm text-tegbale-text-gray font-roboto">{{ s.dateOfBirth ? new Date(s.dateOfBirth).toLocaleDateString() : '—' }}</td>
            <td class="p-3 text-sm text-tegbale-text-gray font-roboto">{{ s.classroom?.name || '—' }}</td>
          </tr>
        </template>
        <tr v-else>
          <td colspan="5" class="text-center h-40 text-tegbale-text-gray font-roboto">No students found</td>
        </tr>
      </template>
    </BaseDataTable>

    <template v-if="students.length > 0">
      <div class="grid grid-auto-fit gap-4 md:hidden pt-4" v-for="s in students" :key="s.id">
        <BaseMobileDataTable
          :column-one-text="`${s.firstName} ${s.lastName}`"
          :column-two-text="s.classroom?.name || '—'"
          :column-three-text="s.gender || '—'"
          :notClickable="true"
          column-one-title="Name"
          column-two-title="Classroom"
          column-three-title="Gender"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
import BaseDataTable from '@/components/BaseComponents/BaseDataTable.vue'
import BaseMobileDataTable from '@/components/BaseComponents/BaseMobileDataTable.vue'
import { ref, onMounted, watch } from 'vue'
import studentsApi from '@/api/students'

const props = defineProps({ schoolId: { type: String, default: null } })

const students = ref([])
const loading = ref(false)

const fetchStudents = async () => {
  if (!props.schoolId) return
  loading.value = true
  try {
    const { data } = await studentsApi.getStudents({ schoolId: props.schoolId, limit: 100 })
    students.value = data.data
  } catch {} finally {
    loading.value = false
  }
}

onMounted(fetchStudents)
watch(() => props.schoolId, fetchStudents)
</script>

<style lang="scss" scoped></style>
