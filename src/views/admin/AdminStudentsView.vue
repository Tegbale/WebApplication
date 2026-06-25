<template>
  <div class="pt-4">
    <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
      <h1 class="text-3xl font-normal text-tegbale-navy-blue font-roboto">Students</h1>
      <div class="flex items-center gap-2">
        <button
          class="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-roboto font-medium text-tegbale-text-gray hover:bg-gray-50"
          @click="showImport = true"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
          </svg>
          Import CSV
        </button>
        <button
          class="flex items-center gap-2 rounded-full bg-tegbale-blue px-5 py-2.5 text-sm font-roboto font-medium text-white hover:bg-blue-600"
          @click="openCreate"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
          </svg>
          Add Student
        </button>
      </div>
    </div>

    <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div class="flex items-center justify-end px-4 py-3 border-b border-gray-50">
        <ExportDropdown :rows="students" :columns="exportColumns" filename="students" :disabled="!students.length" />
      </div>

      <div v-if="loading" class="p-6 space-y-3">
        <div v-for="i in 4" :key="i" class="h-12 rounded-xl bg-gray-100 animate-pulse" />
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-sm font-roboto min-w-[480px]">
          <thead>
            <tr class="text-left text-tegbale-text-gray border-b border-gray-100">
              <th class="px-6 py-4 font-normal">S/N</th>
              <th class="px-6 py-4 font-normal">Full Name</th>
              <th class="px-6 py-4 font-normal hidden md:table-cell">Classroom</th>
              <th class="px-6 py-4 font-normal hidden lg:table-cell">Gender</th>
              <th class="px-6 py-4 font-normal">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="(student, i) in students" :key="student.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 text-tegbale-text-gray">{{ i + 1 }}</td>
              <td class="px-6 py-4 text-tegbale-text-gray">{{ student.firstName }} {{ student.lastName }}</td>
              <td class="px-6 py-4 text-tegbale-text-gray hidden md:table-cell">{{ student.classroom?.name ?? '—' }}</td>
              <td class="px-6 py-4 text-tegbale-text-gray hidden lg:table-cell capitalize">{{ student.gender ?? '—' }}</td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <button class="text-tegbale-blue hover:text-blue-700" title="View" @click="viewTarget = student">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </button>
                  <button class="text-tegbale-green hover:text-green-700" title="Edit" @click="openEdit(student)">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>
                  <button class="text-red-400 hover:text-red-600" title="Delete" @click="deleteStudent(student.id)">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="!students.length">
              <td colspan="5" class="px-6 py-12 text-center text-tegbale-text-gray">No students found</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- View modal -->
    <div v-if="viewTarget" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" @click.self="viewTarget = null">
      <div class="w-full max-w-lg bg-white rounded-2xl shadow-xl">
        <div class="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h3 class="text-lg font-semibold text-tegbale-navy-blue font-roboto">View Student</h3>
          <button class="rounded-full p-1 text-tegbale-text-gray hover:bg-gray-100" @click="viewTarget = null">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div class="px-6 py-5 space-y-3 text-sm font-roboto">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="flex flex-col gap-1"><p class="text-xs text-tegbale-text-gray">First Name</p><p class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700">{{ viewTarget.firstName }}</p></div>
            <div class="flex flex-col gap-1"><p class="text-xs text-tegbale-text-gray">Last Name</p><p class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700">{{ viewTarget.lastName }}</p></div>
            <div class="flex flex-col gap-1"><p class="text-xs text-tegbale-text-gray">Classroom</p><p class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700">{{ viewTarget.classroom?.name ?? '—' }}</p></div>
            <div class="flex flex-col gap-1"><p class="text-xs text-tegbale-text-gray">Gender</p><p class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 capitalize">{{ viewTarget.gender ?? '—' }}</p></div>
            <div class="flex flex-col gap-1"><p class="text-xs text-tegbale-text-gray">Date of Birth</p><p class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700">{{ viewTarget.dateOfBirth ? viewTarget.dateOfBirth.split('T')[0] : '—' }}</p></div>
          </div>
          <div class="flex justify-end pt-2">
            <button class="rounded-full bg-gray-400 px-6 py-2.5 text-sm font-roboto font-medium text-white hover:bg-gray-500" @click="viewTarget = null">Close</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div class="w-full max-w-lg bg-white rounded-2xl shadow-xl">
        <div class="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h3 class="text-lg font-semibold text-tegbale-navy-blue font-roboto">{{ editTarget ? 'Edit Student' : 'Add Student' }}</h3>
          <button class="rounded-full p-1 text-tegbale-text-gray hover:bg-gray-100" @click="closeModal">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <form @submit.prevent="saveStudent" class="px-6 py-5 text-sm font-roboto">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div class="flex flex-col gap-1">
              <label class="text-xs text-tegbale-text-gray">First Name <span class="text-red-400">*</span></label>
              <input v-model="form.firstName" type="text" placeholder="Enter first name" class="rounded-full border px-4 py-2.5 text-gray-700 placeholder:text-tegbale-text-gray focus:outline-none focus:ring-1 transition-colors" :class="v$.firstName.$error ? 'border-red-400 focus:ring-red-300' : 'border-gray-200 focus:border-tegbale-blue focus:ring-tegbale-blue/20'" />
              <span v-if="v$.firstName.$error" class="text-xs text-red-500 pl-2">{{ v$.firstName.$errors[0].$message }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-xs text-tegbale-text-gray">Last Name <span class="text-red-400">*</span></label>
              <input v-model="form.lastName" type="text" placeholder="Enter last name" class="rounded-full border px-4 py-2.5 text-gray-700 placeholder:text-tegbale-text-gray focus:outline-none focus:ring-1 transition-colors" :class="v$.lastName.$error ? 'border-red-400 focus:ring-red-300' : 'border-gray-200 focus:border-tegbale-blue focus:ring-tegbale-blue/20'" />
              <span v-if="v$.lastName.$error" class="text-xs text-red-500 pl-2">{{ v$.lastName.$errors[0].$message }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-xs text-tegbale-text-gray">Gender</label>
              <select v-model="form.gender" class="appearance-none rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 focus:border-tegbale-blue focus:outline-none focus:ring-1 focus:ring-tegbale-blue/20">
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-xs text-tegbale-text-gray">Date of Birth</label>
              <input v-model="form.dateOfBirth" type="date" class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 focus:border-tegbale-blue focus:outline-none focus:ring-1 focus:ring-tegbale-blue/20" />
            </div>
            <div class="flex flex-col gap-1 sm:col-span-2">
              <label class="text-xs text-tegbale-text-gray">Classroom</label>
              <select v-model="form.classroomId" class="appearance-none rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 focus:border-tegbale-blue focus:outline-none focus:ring-1 focus:ring-tegbale-blue/20">
                <option value="">No classroom</option>
                <option v-for="cls in classrooms" :key="cls.id" :value="cls.id">{{ cls.name }}</option>
              </select>
            </div>
          </div>
          <div class="flex justify-end gap-3 pt-2">
            <button type="button" class="rounded-full bg-gray-400 px-6 py-2.5 text-sm font-roboto font-medium text-white hover:bg-gray-500" @click="closeModal">Cancel</button>
            <button type="submit" :disabled="saving" class="rounded-full bg-tegbale-blue px-6 py-2.5 text-sm font-roboto font-medium text-white hover:bg-blue-600 disabled:opacity-60">
              {{ saving ? 'Saving...' : (editTarget ? 'Save Changes' : 'Add Student') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Import modal -->
    <ImportModal
      v-if="showImport"
      label="Students"
      :columns="['firstName', 'lastName', 'gender', 'dateOfBirth', 'classroomName']"
      :import-fn="(fd) => studentsApi.bulkImport(fd)"
      @close="showImport = false"
      @done="fetchStudents"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { useStudentsStore } from '@/stores/students-store'
import { useUsersStore } from '@/stores/user-store'
import { useToastStore } from '@/stores/toast-store'
import studentsApi from '@/api/students'
import classroomsApi from '@/api/classrooms'
import ExportDropdown from '@/components/BaseComponents/ExportDropdown.vue'
import ImportModal from '@/components/ImportModal.vue'

const studentsStore = useStudentsStore()
const userStore = useUsersStore()
const toastStore = useToastStore()

const students = ref([])
const classrooms = ref([])
const loading = ref(false)
const showModal = ref(false)
const showImport = ref(false)
const editTarget = ref(null)
const viewTarget = ref(null)
const saving = ref(false)

const form = reactive({ firstName: '', lastName: '', gender: '', dateOfBirth: '', classroomId: '' })

const rules = {
  firstName: { required: helpers.withMessage('First name is required', required) },
  lastName: { required: helpers.withMessage('Last name is required', required) },
}
const v$ = useVuelidate(rules, form)

const exportColumns = [
  { header: 'S/N', value: (_, i) => i + 1 },
  { header: 'First Name', value: (s) => s.firstName },
  { header: 'Last Name', value: (s) => s.lastName },
  { header: 'Classroom', value: (s) => s.classroom?.name ?? '' },
  { header: 'Gender', value: (s) => s.gender ?? '' },
]

const openCreate = () => {
  editTarget.value = null
  Object.assign(form, { firstName: '', lastName: '', gender: '', dateOfBirth: '', classroomId: '' })
  v$.value.$reset()
  showModal.value = true
}

const openEdit = (student) => {
  editTarget.value = student
  Object.assign(form, {
    firstName: student.firstName,
    lastName: student.lastName,
    gender: student.gender || '',
    dateOfBirth: student.dateOfBirth ? student.dateOfBirth.split('T')[0] : '',
    classroomId: student.classroomId || '',
  })
  v$.value.$reset()
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editTarget.value = null
  v$.value.$reset()
}

const saveStudent = async () => {
  v$.value.$touch()
  if (v$.value.$invalid) return
  saving.value = true
  try {
    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      gender: form.gender || undefined,
      dateOfBirth: form.dateOfBirth || undefined,
      classroomId: form.classroomId || undefined,
    }
    if (editTarget.value) {
      await studentsStore.updateStudent(editTarget.value.id, payload)
      toastStore.showToast({ title: 'Updated', message: 'Student updated', type: 'success', timeout: 3000 })
    } else {
      await studentsStore.createStudent({ ...payload, schoolId: userStore.schoolId })
      toastStore.showToast({ title: 'Created', message: 'Student added', type: 'success', timeout: 3000 })
    }
    closeModal()
    await fetchStudents()
  } catch (error) {
    toastStore.showToast({ title: 'Error', message: error?.response?.data?.message ?? 'Operation failed', type: 'error', timeout: 4000 })
  } finally { saving.value = false }
}

const deleteStudent = async (id) => {
  if (!confirm('Delete this student? This cannot be undone.')) return
  try {
    await studentsStore.deleteStudent(id)
    students.value = students.value.filter(s => s.id !== id)
    toastStore.showToast({ title: 'Deleted', message: 'Student removed', type: 'success', timeout: 3000 })
  } catch {
    toastStore.showToast({ title: 'Error', message: 'Failed to delete student', type: 'error', timeout: 4000 })
  }
}

const fetchStudents = async () => {
  loading.value = true
  try {
    await studentsStore.fetchAll({ schoolId: userStore.schoolId })
    students.value = studentsStore.students ?? []
  } catch {} finally { loading.value = false }
}

const fetchClassrooms = async () => {
  try {
    const res = await classroomsApi.getAll({ schoolId: userStore.schoolId })
    classrooms.value = res.data.data ?? []
  } catch {}
}

onMounted(() => { fetchStudents(); fetchClassrooms() })
</script>

<style lang="scss" scoped></style>
