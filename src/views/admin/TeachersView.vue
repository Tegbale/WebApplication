<template>
  <div class="pt-4">
    <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
      <h1 class="text-3xl font-normal text-tegbale-navy-blue font-roboto">Teachers</h1>
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
          Add Teacher
        </button>
      </div>
    </div>

    <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div class="flex flex-wrap items-center gap-3 px-4 py-3 border-b border-gray-50">
        <div class="flex-1 min-w-[160px] max-w-xs">
          <SearchInput v-model="search" placeholder="Search teachers..." />
        </div>
        <ExportDropdown :rows="filteredTeachers" :columns="exportColumns" filename="teachers" :disabled="!filteredTeachers.length" />
      </div>

      <div v-if="loading" class="p-6 space-y-3">
        <div v-for="i in 4" :key="i" class="h-12 rounded-xl bg-gray-100 animate-pulse" />
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-sm font-roboto min-w-[480px]">
          <thead>
            <tr class="text-left text-tegbale-text-gray border-b border-gray-100">
              <th class="px-6 py-4 font-normal">S/N</th>
              <th class="px-6 py-4 font-normal">Name</th>
              <th class="px-6 py-4 font-normal hidden md:table-cell">Email Address</th>
              <th class="px-6 py-4 font-normal hidden lg:table-cell">Phone</th>
              <th class="px-6 py-4 font-normal">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="(teacher, i) in filteredTeachers" :key="teacher.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 text-tegbale-text-gray">{{ i + 1 }}</td>
              <td class="px-6 py-4 text-tegbale-text-gray">{{ teacher.firstName }} {{ teacher.lastName }}</td>
              <td class="px-6 py-4 text-tegbale-text-gray hidden md:table-cell">{{ teacher.email }}</td>
              <td class="px-6 py-4 text-tegbale-text-gray hidden lg:table-cell">{{ teacher.phone || '—' }}</td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <button class="text-tegbale-blue hover:text-blue-700" title="View" @click="router.push({ name: 'teacherDetail', params: { id: teacher.id } })">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  </button>
                  <button class="text-tegbale-green hover:text-green-700" title="Edit" @click="openEdit(teacher)">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                  </button>
                  <button
                    :class="teacher.isActive ? 'text-red-400 hover:text-red-600' : 'text-tegbale-green hover:text-green-700'"
                    :title="teacher.isActive ? 'Deactivate' : 'Activate'"
                    @click="handleToggle(teacher.id)"
                  >
                    <svg v-if="teacher.isActive" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>
                    <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="!filteredTeachers.length">
              <td colspan="5" class="px-6 py-12 text-center text-tegbale-text-gray">{{ search ? 'No teachers match your search' : 'No teachers found' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create/Edit modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div class="w-full max-w-lg bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h3 class="text-lg font-semibold text-tegbale-navy-blue font-roboto">{{ editingId ? 'Edit Teacher' : 'Add Teacher' }}</h3>
          <button class="rounded-full p-1 text-tegbale-text-gray hover:bg-gray-100" @click="closeModal">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <form @submit.prevent="saveTeacher" class="px-6 py-5 space-y-4 text-sm font-roboto">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="flex flex-col gap-1">
              <label class="text-xs text-tegbale-text-gray">First Name <span class="text-red-400">*</span></label>
              <input v-model="form.firstName" placeholder="Enter first name" class="rounded-full border px-4 py-2.5 text-gray-700 placeholder:text-tegbale-text-gray focus:outline-none focus:ring-1 transition-colors" :class="v$.firstName.$error ? 'border-red-400 focus:ring-red-300' : 'border-gray-200 focus:border-tegbale-blue focus:ring-tegbale-blue/20'" />
              <span v-if="v$.firstName.$error" class="text-xs text-red-500 pl-2">{{ v$.firstName.$errors[0].$message }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-xs text-tegbale-text-gray">Last Name <span class="text-red-400">*</span></label>
              <input v-model="form.lastName" placeholder="Enter last name" class="rounded-full border px-4 py-2.5 text-gray-700 placeholder:text-tegbale-text-gray focus:outline-none focus:ring-1 transition-colors" :class="v$.lastName.$error ? 'border-red-400 focus:ring-red-300' : 'border-gray-200 focus:border-tegbale-blue focus:ring-tegbale-blue/20'" />
              <span v-if="v$.lastName.$error" class="text-xs text-red-500 pl-2">{{ v$.lastName.$errors[0].$message }}</span>
            </div>
            <div class="flex flex-col gap-1" :class="!editingId ? 'sm:col-span-2' : ''">
              <label class="text-xs text-tegbale-text-gray">Email Address <span v-if="!editingId" class="text-red-400">*</span></label>
              <input v-model="form.email" type="email" placeholder="Enter email address" :disabled="!!editingId" class="rounded-full border px-4 py-2.5 text-gray-700 placeholder:text-tegbale-text-gray focus:outline-none focus:ring-1 transition-colors disabled:bg-gray-50 disabled:opacity-60" :class="v$.email.$error ? 'border-red-400 focus:ring-red-300' : 'border-gray-200 focus:border-tegbale-blue focus:ring-tegbale-blue/20'" />
              <span v-if="v$.email.$error" class="text-xs text-red-500 pl-2">{{ v$.email.$errors[0].$message }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-xs text-tegbale-text-gray">Phone Number</label>
              <input v-model="form.phone" type="tel" placeholder="Enter phone number" class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 placeholder:text-tegbale-text-gray focus:border-tegbale-blue focus:outline-none focus:ring-1 focus:ring-tegbale-blue/20" />
            </div>
          </div>
          <p v-if="!editingId" class="text-xs text-tegbale-text-gray bg-blue-50 rounded-xl px-4 py-2.5 border border-blue-100">
            A secure temporary password will be generated automatically.
          </p>
          <div class="flex justify-end gap-3 pt-1">
            <button type="button" @click="closeModal" class="rounded-full bg-gray-400 px-6 py-2.5 text-sm font-roboto font-medium text-white hover:bg-gray-500">Cancel</button>
            <button type="submit" :disabled="saving" class="rounded-full bg-tegbale-blue px-6 py-2.5 text-sm font-roboto font-medium text-white hover:bg-blue-600 disabled:opacity-60">
              {{ saving ? 'Saving...' : (editingId ? 'Save Changes' : 'Add Teacher') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Import modal -->
    <ImportModal
      v-if="showImport"
      label="Teachers"
      :columns="['firstName', 'lastName', 'email', 'phone']"
      :import-fn="(fd) => adminApi.bulkImportStaff(fd, 'TEACHER')"
      @close="showImport = false"
      @done="fetchTeachers"
    />

    <!-- Temp password modal -->
    <TempPasswordModal
      v-if="tempPassword"
      :password="tempPassword"
      :name="createdName"
      @close="tempPassword = null"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import adminApi from '@/api/admin'
import { useToastStore } from '@/stores/toast-store'
import ExportDropdown from '@/components/BaseComponents/ExportDropdown.vue'
import ImportModal from '@/components/ImportModal.vue'
import TempPasswordModal from '@/components/TempPasswordModal.vue'
import SearchInput from '@/components/BaseComponents/SearchInput.vue'

const router = useRouter()

const toastStore = useToastStore()

const teachers = ref([])
const loading = ref(false)
const search = ref('')
const showModal = ref(false)
const showImport = ref(false)
const editingId = ref(null)
const saving = ref(false)
const tempPassword = ref(null)
const createdName = ref('')

const form = reactive({ firstName: '', lastName: '', email: '', phone: '' })

const filteredTeachers = computed(() => {
  if (!search.value) return teachers.value
  const q = search.value.toLowerCase()
  return teachers.value.filter(t =>
    `${t.firstName} ${t.lastName}`.toLowerCase().includes(q) ||
    t.email.toLowerCase().includes(q)
  )
})

const rules = computed(() => ({
  firstName: { required: helpers.withMessage('First name is required', required) },
  lastName: { required: helpers.withMessage('Last name is required', required) },
  email: !editingId.value ? {
    required: helpers.withMessage('Email is required', required),
    email: helpers.withMessage('Enter a valid email address', email),
  } : {},
}))

const v$ = useVuelidate(rules, form)

const exportColumns = [
  { header: 'S/N', value: (_, i) => i + 1 },
  { header: 'First Name', value: (t) => t.firstName },
  { header: 'Last Name', value: (t) => t.lastName },
  { header: 'Email', value: (t) => t.email },
  { header: 'Phone', value: (t) => t.phone || '' },
]

const openCreate = () => {
  editingId.value = null
  Object.assign(form, { firstName: '', lastName: '', email: '', phone: '' })
  v$.value.$reset()
  showModal.value = true
}

const openEdit = (teacher) => {
  editingId.value = teacher.id
  Object.assign(form, { firstName: teacher.firstName, lastName: teacher.lastName, email: teacher.email, phone: teacher.phone || '' })
  v$.value.$reset()
  showModal.value = true
}

const closeModal = () => { showModal.value = false; v$.value.$reset() }

const saveTeacher = async () => {
  v$.value.$touch()
  if (v$.value.$invalid) return
  saving.value = true
  try {
    if (editingId.value) {
      await adminApi.updateStaff(editingId.value, { firstName: form.firstName, lastName: form.lastName, phone: form.phone || undefined })
      toastStore.showToast({ title: 'Updated', message: 'Teacher updated', type: 'success', timeout: 3000 })
      closeModal()
      await fetchTeachers()
    } else {
      const res = await adminApi.createStaff({ firstName: form.firstName, lastName: form.lastName, email: form.email, phone: form.phone || undefined, role: 'TEACHER' })
      createdName.value = `${form.firstName} ${form.lastName}`
      tempPassword.value = res.data?.data?.tempPassword ?? null
      closeModal()
      await fetchTeachers()
    }
  } catch (err) {
    toastStore.showToast({ title: 'Error', message: err?.response?.data?.message ?? 'Operation failed', type: 'error', timeout: 4000 })
  } finally { saving.value = false }
}

const handleToggle = async (id) => {
  try {
    await adminApi.toggleStaffStatus(id)
    await fetchTeachers()
    toastStore.showToast({ title: 'Done', message: 'Status updated', type: 'success', timeout: 3000 })
  } catch {
    toastStore.showToast({ title: 'Error', message: 'Failed to update status', type: 'error', timeout: 4000 })
  }
}

const fetchTeachers = async () => {
  loading.value = true
  try {
    const res = await adminApi.getAllStaff({ role: 'TEACHER', limit: 100 })
    teachers.value = res.data.data ?? []
  } catch {} finally { loading.value = false }
}

onMounted(fetchTeachers)
</script>

<style lang="scss" scoped></style>
