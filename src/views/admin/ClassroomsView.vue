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
      <div class="flex flex-wrap items-center gap-3 px-4 py-3 border-b border-gray-50">
        <div class="flex-1 min-w-[160px] max-w-xs">
          <SearchInput v-model="search" placeholder="Search classrooms..." />
        </div>
        <div class="ml-auto shrink-0">
          <ExportDropdown :rows="filteredClassrooms" :columns="exportColumns" filename="classrooms" :disabled="!filteredClassrooms.length" />
        </div>
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
            <tr v-for="(classroom, i) in paginatedClassrooms" :key="classroom.id" class="hover:bg-gray-50 transition-colors">
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
                  <button class="text-purple-500 hover:text-purple-700" title="Manage Teachers" @click="openManageTeachers(classroom)">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
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
            <tr v-if="!filteredClassrooms.length">
              <td colspan="6" class="px-6 py-16 text-center text-tegbale-text-gray">{{ search ? 'No classrooms match your search' : 'No classrooms added yet' }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-6 py-4">
        <div class="flex items-center gap-2 text-sm font-roboto text-tegbale-text-gray">
          <span>Rows per page:</span>
          <div class="relative">
            <select v-model="perPage" class="appearance-none rounded-full border border-gray-200 bg-white pl-3 pr-7 py-1.5 text-sm font-roboto text-gray-700 focus:border-tegbale-blue focus:outline-none focus:ring-1 focus:ring-tegbale-blue/20">
              <option :value="10">10</option>
              <option :value="20">20</option>
              <option :value="50">50</option>
            </select>
            <svg class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-tegbale-text-gray" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
          <span v-if="filteredClassrooms.length">of {{ filteredClassrooms.length }} total</span>
        </div>
        <div v-if="totalClientPages > 1" class="flex gap-2">
          <button :disabled="clientPage <= 1" @click="clientPage--" class="rounded-full border border-gray-200 px-4 py-1.5 text-sm font-roboto text-tegbale-text-gray hover:bg-gray-50 disabled:opacity-40">Prev</button>
          <span class="flex items-center px-3 text-sm font-roboto text-tegbale-text-gray">{{ clientPage }} / {{ totalClientPages }}</span>
          <button :disabled="clientPage >= totalClientPages" @click="clientPage++" class="rounded-full border border-gray-200 px-4 py-1.5 text-sm font-roboto text-tegbale-text-gray hover:bg-gray-50 disabled:opacity-40">Next</button>
        </div>
      </div>
    </div>

    <!-- View modal -->
    <div v-if="viewTarget" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" @click.self="viewTarget = null">
      <div class="w-full max-w-lg bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
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
            <div class="flex flex-col gap-1 min-w-0">
              <p class="text-xs text-tegbale-text-gray">Level</p>
              <p class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 break-words">{{ viewTarget.level || '—' }}</p>
            </div>
            <div class="flex flex-col gap-1 min-w-0">
              <p class="text-xs text-tegbale-text-gray">Students</p>
              <p class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700">{{ viewTarget._count?.students ?? 0 }}</p>
            </div>
            <div class="flex flex-col gap-1 min-w-0">
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
      <div class="w-full max-w-lg bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
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

    <!-- Manage Teachers modal -->
    <div v-if="manageTarget" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" @click.self="manageTarget = null">
      <div class="w-full max-w-lg bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h3 class="text-lg font-semibold text-tegbale-navy-blue font-roboto">Manage Teachers — {{ manageTarget.name }}</h3>
          <button class="rounded-full p-1 text-tegbale-text-gray hover:bg-gray-100" @click="manageTarget = null">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div class="px-6 py-5 space-y-4 text-sm font-roboto">
          <div>
            <p class="text-xs text-tegbale-text-gray mb-2">Assigned Teachers</p>
            <div v-if="managingLoading" class="h-8 rounded-full bg-gray-100 animate-pulse w-32" />
            <div v-else-if="assignedTeachers.length" class="flex flex-wrap gap-2">
              <span
                v-for="t in assignedTeachers" :key="t.id"
                class="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-3 py-1.5 text-xs text-tegbale-blue"
              >
                {{ t.user.firstName }} {{ t.user.lastName }}
                <button :disabled="removingId === t.id" @click="removeAssignedTeacher(t.id)" class="ml-0.5 rounded-full hover:bg-blue-100 p-0.5 disabled:opacity-50">
                  <svg class="h-3 w-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </span>
            </div>
            <p v-else class="text-tegbale-text-gray italic text-xs">No teachers assigned yet.</p>
          </div>

          <div class="flex gap-2">
            <div class="flex-1 flex flex-col gap-1">
              <label class="text-xs text-tegbale-text-gray">Add Teacher</label>
              <select v-model="selectedTeacherId" class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 focus:border-tegbale-blue focus:outline-none focus:ring-1 focus:ring-tegbale-blue/20 bg-white">
                <option value="">Select a teacher</option>
                <option v-for="t in availableTeachers" :key="t.id" :value="t.id">
                  {{ t.firstName }} {{ t.lastName }}
                </option>
              </select>
            </div>
            <button
              :disabled="!selectedTeacherId || assigning"
              @click="assignTeacher"
              class="self-end rounded-full bg-tegbale-blue px-5 py-2.5 text-sm font-roboto font-medium text-white hover:bg-blue-600 disabled:opacity-50"
            >
              {{ assigning ? '...' : 'Assign' }}
            </button>
          </div>

          <div class="flex justify-end pt-1">
            <button class="rounded-full bg-gray-400 px-6 py-2.5 text-sm font-roboto font-medium text-white hover:bg-gray-500" @click="manageTarget = null">Close</button>
          </div>
        </div>
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

    <!-- Delete Confirm -->
    <ConfirmModal
      :open="!!deleteTarget"
      title="Delete classroom?"
      message="This classroom will be permanently removed and cannot be recovered."
      :loading="deleteLoading"
      @confirm="confirmDelete"
      @cancel="deleteTarget = null"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { useUsersStore } from '@/stores/user-store'
import { useToastStore } from '@/stores/toast-store'
import classroomsApi from '@/api/classrooms'
import adminApi from '@/api/admin'
import ExportDropdown from '@/components/BaseComponents/ExportDropdown.vue'
import ImportModal from '@/components/ImportModal.vue'
import ConfirmModal from '@/components/BaseComponents/ConfirmModal.vue'
import SearchInput from '@/components/BaseComponents/SearchInput.vue'

const userStore = useUsersStore()
const toastStore = useToastStore()

const classrooms = ref([])
const loading = ref(false)
const search = ref('')
const showModal = ref(false)
const showImport = ref(false)
const editTarget = ref(null)
const viewTarget = ref(null)
const saving = ref(false)
const deleteTarget = ref(null)
const deleteLoading = ref(false)

// Manage Teachers state
const manageTarget = ref(null)
const assignedTeachers = ref([])
const allTeachers = ref([])
const selectedTeacherId = ref('')
const managingLoading = ref(false)
const assigning = ref(false)
const removingId = ref(null)

const availableTeachers = computed(() => {
  const assignedUserIds = new Set(assignedTeachers.value.map(t => t.user.id))
  return allTeachers.value.filter(t => t.role === 'TEACHER' && !assignedUserIds.has(t.id))
})

const filteredClassrooms = computed(() => {
  if (!search.value) return classrooms.value
  const q = search.value.toLowerCase()
  return classrooms.value.filter(c => c.name.toLowerCase().includes(q))
})

const perPage = ref(10)
const clientPage = ref(1)
const totalClientPages = computed(() => Math.max(1, Math.ceil(filteredClassrooms.value.length / perPage.value)))
const paginatedClassrooms = computed(() => {
  const start = (clientPage.value - 1) * perPage.value
  return filteredClassrooms.value.slice(start, start + perPage.value)
})

watch([search, perPage], () => { clientPage.value = 1 })

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

const deleteClassroom = (id) => { deleteTarget.value = id }

const confirmDelete = async () => {
  if (!deleteTarget.value) return
  deleteLoading.value = true
  try {
    await classroomsApi.remove(deleteTarget.value)
    deleteTarget.value = null
    toastStore.showToast({ title: 'Deleted', message: 'Classroom removed', type: 'success', timeout: 3000 })
    await fetchClassrooms()
  } catch {
    toastStore.showToast({ title: 'Error', message: 'Failed to delete classroom', type: 'error', timeout: 4000 })
  } finally { deleteLoading.value = false }
}

const openManageTeachers = async (classroom) => {
  manageTarget.value = classroom
  selectedTeacherId.value = ''
  assignedTeachers.value = []
  allTeachers.value = []
  managingLoading.value = true
  try {
    const [detailRes, teachersRes] = await Promise.all([
      classroomsApi.getOne(classroom.id),
      adminApi.getAllStaff({ role: 'TEACHER', limit: 100 }),
    ])
    assignedTeachers.value = detailRes.data.data?.teachers ?? []
    allTeachers.value = teachersRes.data.data ?? []
  } catch {
    toastStore.showToast({ title: 'Error', message: 'Failed to load teachers', type: 'error', timeout: 3000 })
  } finally {
    managingLoading.value = false
  }
}

const refreshManageDetail = async () => {
  if (!manageTarget.value) return
  try {
    const res = await classroomsApi.getOne(manageTarget.value.id)
    assignedTeachers.value = res.data.data?.teachers ?? []
  } catch {}
}

const assignTeacher = async () => {
  if (!selectedTeacherId.value || !manageTarget.value) return
  assigning.value = true
  try {
    await classroomsApi.assignTeacher(manageTarget.value.id, selectedTeacherId.value)
    toastStore.showToast({ title: 'Assigned', message: 'Teacher assigned to classroom', type: 'success', timeout: 3000 })
    selectedTeacherId.value = ''
    await Promise.all([refreshManageDetail(), fetchClassrooms()])
  } catch (err) {
    toastStore.showToast({ title: 'Error', message: err?.response?.data?.message ?? 'Failed to assign teacher', type: 'error', timeout: 4000 })
  } finally {
    assigning.value = false
  }
}

const removeAssignedTeacher = async (teacherId) => {
  if (!manageTarget.value) return
  removingId.value = teacherId
  try {
    await classroomsApi.removeTeacher(manageTarget.value.id, teacherId)
    toastStore.showToast({ title: 'Removed', message: 'Teacher removed from classroom', type: 'success', timeout: 3000 })
    await Promise.all([refreshManageDetail(), fetchClassrooms()])
  } catch {
    toastStore.showToast({ title: 'Error', message: 'Failed to remove teacher', type: 'error', timeout: 4000 })
  } finally {
    removingId.value = null
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
