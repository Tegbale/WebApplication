<template>
  <div class="pt-4">
    <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
      <h1 class="text-3xl font-normal text-tegbale-navy-blue font-roboto">Classrooms</h1>
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
          Add Classroom
        </button>
      </div>
    </div>

    <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div class="flex items-center justify-end px-4 py-3 border-b border-gray-50">
        <ExportDropdown :rows="classrooms" :columns="exportColumns" filename="classrooms" :disabled="!classrooms.length" />
      </div>

      <div v-if="loading" class="p-6 space-y-3">
        <div v-for="i in 4" :key="i" class="h-12 rounded-xl bg-gray-100 animate-pulse" />
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-sm font-roboto min-w-[580px]">
          <thead>
            <tr class="text-left text-tegbale-text-gray border-b border-gray-100">
              <th class="px-6 py-4 font-normal">S/N</th>
              <th class="px-6 py-4 font-normal">Name</th>
              <th class="px-6 py-4 font-normal hidden md:table-cell">Level</th>
              <th class="px-6 py-4 font-normal hidden lg:table-cell">Students</th>
              <th class="px-6 py-4 font-normal hidden lg:table-cell">Teachers</th>
              <th class="px-6 py-4 font-normal">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="(classroom, i) in classrooms" :key="classroom.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 text-tegbale-text-gray">{{ i + 1 }}</td>
              <td class="px-6 py-4 text-tegbale-text-gray">{{ classroom.name }}</td>
              <td class="px-6 py-4 text-tegbale-text-gray hidden md:table-cell">{{ classroom.level || '—' }}</td>
              <td class="px-6 py-4 text-tegbale-text-gray hidden lg:table-cell">{{ classroom._count?.students ?? 0 }}</td>
              <td class="px-6 py-4 text-tegbale-text-gray hidden lg:table-cell">{{ classroom._count?.teachers ?? 0 }}</td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <button class="text-tegbale-blue hover:text-blue-700" title="View" @click="viewTarget = classroom">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </button>
                  <button class="text-tegbale-green hover:text-green-700" title="Edit" @click="openEdit(classroom)">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>
                  <button class="text-red-400 hover:text-red-600" title="Delete" @click="deleteClassroom(classroom.id)">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="!classrooms.length">
              <td colspan="6" class="px-6 py-16 text-center text-tegbale-text-gray">No classrooms added yet</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- View modal -->
    <div v-if="viewTarget" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" @click.self="viewTarget = null">
      <div class="w-full max-w-lg bg-white rounded-2xl shadow-xl">
        <div class="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h3 class="text-lg font-semibold text-tegbale-navy-blue font-roboto">View Classroom</h3>
          <button class="rounded-full p-1 text-tegbale-text-gray hover:bg-gray-100" @click="viewTarget = null">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div class="px-6 py-5 space-y-3 text-sm font-roboto">
          <div class="flex flex-col gap-1">
            <p class="text-xs text-tegbale-text-gray">Classroom Name</p>
            <p class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700">{{ viewTarget.name }}</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="flex flex-col gap-1">
              <p class="text-xs text-tegbale-text-gray">Level</p>
              <p class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700">{{ viewTarget.level || '—' }}</p>
            </div>
            <div class="flex flex-col gap-1">
              <p class="text-xs text-tegbale-text-gray">Students</p>
              <p class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700">{{ viewTarget._count?.students ?? 0 }}</p>
            </div>
            <div class="flex flex-col gap-1">
              <p class="text-xs text-tegbale-text-gray">Teachers</p>
              <p class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700">{{ viewTarget._count?.teachers ?? 0 }}</p>
            </div>
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
          <h3 class="text-lg font-semibold text-tegbale-navy-blue font-roboto">{{ editTarget ? 'Edit Classroom' : 'Add Classroom' }}</h3>
          <button class="rounded-full p-1 text-tegbale-text-gray hover:bg-gray-100" @click="closeModal">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <form @submit.prevent="saveClassroom" class="px-6 py-5 text-sm font-roboto">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div class="flex flex-col gap-1">
              <label class="text-xs text-tegbale-text-gray">Classroom Name <span class="text-red-400">*</span></label>
              <input v-model="form.name" type="text" placeholder="e.g. Primary 3A" class="rounded-full border px-4 py-2.5 text-gray-700 placeholder:text-tegbale-text-gray focus:outline-none focus:ring-1 transition-colors" :class="v$.name.$error ? 'border-red-400 focus:ring-red-300' : 'border-gray-200 focus:border-tegbale-blue focus:ring-tegbale-blue/20'" />
              <span v-if="v$.name.$error" class="text-xs text-red-500 pl-2">{{ v$.name.$errors[0].$message }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-xs text-tegbale-text-gray">Level (optional)</label>
              <input v-model="form.level" type="text" placeholder="e.g. Primary 3" class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 placeholder:text-tegbale-text-gray focus:border-tegbale-blue focus:outline-none focus:ring-1 focus:ring-tegbale-blue/20" />
            </div>
          </div>
          <div class="flex justify-end gap-3 pt-2">
            <button type="button" class="rounded-full bg-gray-400 px-6 py-2.5 text-sm font-roboto font-medium text-white hover:bg-gray-500" @click="closeModal">Cancel</button>
            <button type="submit" :disabled="saving" class="rounded-full bg-tegbale-blue px-6 py-2.5 text-sm font-roboto font-medium text-white hover:bg-blue-600 disabled:opacity-60">
              {{ saving ? 'Saving...' : (editTarget ? 'Save Changes' : 'Add Classroom') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Import modal -->
    <ImportModal
      v-if="showImport"
      label="Classrooms"
      :columns="['name', 'level']"
      :import-fn="(fd) => classroomsApi.bulkImport(fd)"
      @close="showImport = false"
      @done="fetchClassrooms"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { useUsersStore } from '@/stores/user-store'
import { useToastStore } from '@/stores/toast-store'
import classroomsApi from '@/api/classrooms'
import ExportDropdown from '@/components/BaseComponents/ExportDropdown.vue'
import ImportModal from '@/components/ImportModal.vue'

const userStore = useUsersStore()
const toastStore = useToastStore()

const classrooms = ref([])
const loading = ref(false)
const showModal = ref(false)
const showImport = ref(false)
const editTarget = ref(null)
const viewTarget = ref(null)
const saving = ref(false)

const form = reactive({ name: '', level: '' })

const rules = {
  name: { required: helpers.withMessage('Classroom name is required', required) },
}
const v$ = useVuelidate(rules, form)

const exportColumns = [
  { header: 'S/N', value: (_, i) => i + 1 },
  { header: 'Name', value: (c) => c.name },
  { header: 'Level', value: (c) => c.level || '' },
  { header: 'Students', value: (c) => c._count?.students ?? 0 },
  { header: 'Teachers', value: (c) => c._count?.teachers ?? 0 },
]

const openCreate = () => {
  editTarget.value = null
  Object.assign(form, { name: '', level: '' })
  v$.value.$reset()
  showModal.value = true
}

const openEdit = (classroom) => {
  editTarget.value = classroom
  Object.assign(form, { name: classroom.name, level: classroom.level || '' })
  v$.value.$reset()
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editTarget.value = null
  v$.value.$reset()
}

const saveClassroom = async () => {
  v$.value.$touch()
  if (v$.value.$invalid) return
  saving.value = true
  try {
    if (editTarget.value) {
      await classroomsApi.update(editTarget.value.id, { name: form.name, level: form.level || undefined })
      toastStore.showToast({ title: 'Updated', message: 'Classroom updated', type: 'success', timeout: 3000 })
    } else {
      await classroomsApi.create({ name: form.name, level: form.level || undefined, schoolId: userStore.schoolId })
      toastStore.showToast({ title: 'Created', message: 'Classroom added', type: 'success', timeout: 3000 })
    }
    closeModal()
    await fetchClassrooms()
  } catch (error) {
    toastStore.showToast({ title: 'Error', message: error?.response?.data?.message ?? 'Operation failed', type: 'error', timeout: 4000 })
  } finally { saving.value = false }
}

const deleteClassroom = async (id) => {
  if (!confirm('Delete this classroom? This cannot be undone.')) return
  try {
    await classroomsApi.remove(id)
    toastStore.showToast({ title: 'Deleted', message: 'Classroom removed', type: 'success', timeout: 3000 })
    await fetchClassrooms()
  } catch {
    toastStore.showToast({ title: 'Error', message: 'Failed to delete classroom', type: 'error', timeout: 4000 })
  }
}

const fetchClassrooms = async () => {
  loading.value = true
  try {
    const res = await classroomsApi.getAll({ schoolId: userStore.schoolId })
    classrooms.value = res.data.data ?? []
  } catch {} finally { loading.value = false }
}

onMounted(fetchClassrooms)
</script>

<style lang="scss" scoped></style>
