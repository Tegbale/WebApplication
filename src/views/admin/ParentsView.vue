<template>
  <div class="pt-4">
    <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
      <h1 class="text-3xl font-normal text-tegbale-navy-blue font-roboto">Parents / Guardians</h1>
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
          Add Parent
        </button>
      </div>
    </div>

    <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div class="flex items-center justify-end px-4 py-3 border-b border-gray-50">
        <ExportDropdown :rows="parentsStore.parents" :columns="exportColumns" filename="parents" :disabled="!parentsStore.parents.length" />
      </div>

      <div v-if="parentsStore.loading && !parentsStore.parents.length" class="p-6 space-y-3">
        <div v-for="i in 4" :key="i" class="h-12 rounded-xl bg-gray-100 animate-pulse" />
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-sm font-roboto min-w-[540px]">
          <thead>
            <tr class="text-left text-tegbale-text-gray border-b border-gray-100">
              <th class="px-6 py-4 font-normal">S/N</th>
              <th class="px-6 py-4 font-normal">Full Name</th>
              <th class="px-6 py-4 font-normal hidden md:table-cell">Email Address</th>
              <th class="px-6 py-4 font-normal hidden md:table-cell">Phone</th>
              <th class="px-6 py-4 font-normal hidden lg:table-cell">Wards</th>
              <th class="px-6 py-4 font-normal">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="(parent, i) in parentsStore.parents" :key="parent.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 text-tegbale-text-gray">{{ (page - 1) * limit + i + 1 }}</td>
              <td class="px-6 py-4 text-tegbale-text-gray">{{ parent.user.firstName }} {{ parent.user.lastName }}</td>
              <td class="px-6 py-4 text-tegbale-text-gray hidden md:table-cell">{{ parent.user.email }}</td>
              <td class="px-6 py-4 text-tegbale-text-gray hidden md:table-cell">{{ parent.user.phone || '—' }}</td>
              <td class="px-6 py-4 text-tegbale-text-gray hidden lg:table-cell">{{ parent.wards?.length ?? 0 }}</td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <button class="text-tegbale-blue hover:text-blue-700" title="View" @click="openView(parent)">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </button>
                  <button
                    :class="parent.user.isActive ? 'text-red-400 hover:text-red-600' : 'text-tegbale-green hover:text-green-700'"
                    :title="parent.user.isActive ? 'Deactivate' : 'Activate'"
                    @click="handleToggle(parent.id)"
                  >
                    <svg v-if="parent.user.isActive" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
                    </svg>
                    <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="!parentsStore.parents.length && !parentsStore.loading">
              <td colspan="6" class="px-6 py-12 text-center text-tegbale-text-gray">No parents found</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="parentsStore.meta.totalPages > 1" class="flex items-center justify-between border-t border-gray-100 px-6 py-4">
        <p class="text-sm text-tegbale-text-gray font-roboto">{{ parentsStore.meta.total }} parent{{ parentsStore.meta.total !== 1 ? 's' : '' }}</p>
        <div class="flex gap-2">
          <button :disabled="page <= 1" @click="changePage(page - 1)" class="rounded-full border border-gray-200 px-4 py-1.5 text-sm font-roboto text-tegbale-text-gray hover:bg-gray-50 disabled:opacity-40">Prev</button>
          <span class="flex items-center px-3 text-sm font-roboto text-tegbale-text-gray">{{ page }} / {{ parentsStore.meta.totalPages }}</span>
          <button :disabled="page >= parentsStore.meta.totalPages" @click="changePage(page + 1)" class="rounded-full border border-gray-200 px-4 py-1.5 text-sm font-roboto text-tegbale-text-gray hover:bg-gray-50 disabled:opacity-40">Next</button>
        </div>
      </div>
    </div>

    <!-- View Modal with ward management -->
    <div v-if="viewTarget" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" @click.self="viewTarget = null">
      <div class="w-full max-w-xl bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h3 class="text-lg font-semibold text-tegbale-navy-blue font-roboto">Parent Details</h3>
          <button class="rounded-full p-1 text-tegbale-text-gray hover:bg-gray-100" @click="viewTarget = null">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div class="px-6 py-5 space-y-5 text-sm font-roboto">
          <!-- Info fields -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="flex flex-col gap-1 min-w-0">
              <p class="text-xs text-tegbale-text-gray">First Name</p>
              <p class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 break-words">{{ viewTarget.user.firstName }}</p>
            </div>
            <div class="flex flex-col gap-1 min-w-0">
              <p class="text-xs text-tegbale-text-gray">Last Name</p>
              <p class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 break-words">{{ viewTarget.user.lastName }}</p>
            </div>
            <div class="flex flex-col gap-1 min-w-0 sm:col-span-2">
              <p class="text-xs text-tegbale-text-gray">Email Address</p>
              <p class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 break-all">{{ viewTarget.user.email }}</p>
            </div>
            <div class="flex flex-col gap-1 min-w-0">
              <p class="text-xs text-tegbale-text-gray">Phone</p>
              <p class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 break-words">{{ viewTarget.user.phone || '—' }}</p>
            </div>
            <div class="flex flex-col gap-1 min-w-0">
              <p class="text-xs text-tegbale-text-gray">Status</p>
              <p class="rounded-full border px-4 py-2.5" :class="viewTarget.user.isActive ? 'border-green-200 text-green-600' : 'border-red-200 text-red-500'">
                {{ viewTarget.user.isActive ? 'Active' : 'Inactive' }}
              </p>
            </div>
          </div>

          <!-- Ward management -->
          <div class="border-t border-gray-100 pt-4">
            <div class="flex items-center justify-between mb-3">
              <p class="text-xs font-medium text-tegbale-navy-blue">Assigned Wards ({{ viewTarget.wards?.length ?? 0 }})</p>
              <button @click="showAssignWard = !showAssignWard" class="flex items-center gap-1.5 rounded-full border border-tegbale-blue px-3 py-1.5 text-xs text-tegbale-blue hover:bg-blue-50">
                <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                </svg>
                Assign Ward
              </button>
            </div>

            <!-- Assign ward input -->
            <div v-if="showAssignWard" class="mb-3 rounded-xl border border-gray-100 bg-gray-50 p-3 space-y-2">
              <input
                v-model="wardSearch"
                @input="searchStudents"
                placeholder="Search student by name..."
                class="w-full rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-700 placeholder:text-tegbale-text-gray focus:border-tegbale-blue focus:outline-none focus:ring-1 focus:ring-tegbale-blue/20 bg-white"
              />
              <div v-if="studentResults.length" class="rounded-xl border border-gray-100 bg-white overflow-hidden">
                <button
                  v-for="s in studentResults"
                  :key="s.id"
                  @click="doAssignWard(s)"
                  :disabled="wardBusy"
                  class="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 disabled:opacity-50"
                >
                  <div class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-tegbale-blue/10 text-xs font-medium text-tegbale-blue">
                    {{ s.firstName[0] }}{{ s.lastName[0] }}
                  </div>
                  <span class="text-sm text-gray-700">{{ s.firstName }} {{ s.lastName }}</span>
                  <span v-if="s.classroom" class="ml-auto text-xs text-tegbale-text-gray">{{ s.classroom.name }}</span>
                </button>
              </div>
              <p v-else-if="wardSearch.length > 1" class="text-xs text-tegbale-text-gray px-1">No students found</p>
            </div>

            <!-- Current wards list -->
            <div v-if="viewTarget.wards?.length" class="space-y-2">
              <div
                v-for="ward in viewTarget.wards"
                :key="ward.id"
                class="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5"
              >
                <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-tegbale-blue/10 text-xs font-medium text-tegbale-blue">
                  {{ ward.firstName[0] }}{{ ward.lastName[0] }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm text-gray-700">{{ ward.firstName }} {{ ward.lastName }}</p>
                  <p v-if="ward.classroom" class="text-xs text-tegbale-text-gray">{{ ward.classroom.name }}</p>
                </div>
                <button @click="doRemoveWard(ward)" :disabled="wardBusy" class="text-red-400 hover:text-red-600 disabled:opacity-40 flex-shrink-0" title="Remove ward">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
            </div>
            <p v-else class="text-xs text-tegbale-text-gray px-1">No wards assigned yet</p>
          </div>

          <div class="flex justify-end pt-1">
            <button @click="viewTarget = null" class="rounded-full bg-gray-400 px-6 py-2.5 text-sm font-roboto font-medium text-white hover:bg-gray-500">Close</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Modal -->
    <div v-if="showCreate" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div class="w-full max-w-lg bg-white rounded-2xl shadow-xl">
        <div class="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h3 class="text-lg font-semibold text-tegbale-navy-blue font-roboto">Add Parent</h3>
          <button class="rounded-full p-1 text-tegbale-text-gray hover:bg-gray-100" @click="closeCreate">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <form @submit.prevent="saveCreate" class="px-6 py-5 space-y-4 text-sm font-roboto">
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
            <div class="flex flex-col gap-1 sm:col-span-2">
              <label class="text-xs text-tegbale-text-gray">Email Address <span class="text-red-400">*</span></label>
              <input v-model="form.email" type="email" placeholder="Enter email address" class="rounded-full border px-4 py-2.5 text-gray-700 placeholder:text-tegbale-text-gray focus:outline-none focus:ring-1 transition-colors" :class="v$.email.$error ? 'border-red-400 focus:ring-red-300' : 'border-gray-200 focus:border-tegbale-blue focus:ring-tegbale-blue/20'" />
              <span v-if="v$.email.$error" class="text-xs text-red-500 pl-2">{{ v$.email.$errors[0].$message }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-xs text-tegbale-text-gray">Phone Number</label>
              <input v-model="form.phone" type="tel" placeholder="Enter phone number" class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 placeholder:text-tegbale-text-gray focus:border-tegbale-blue focus:outline-none focus:ring-1 focus:ring-tegbale-blue/20" />
            </div>
          </div>
          <p class="text-xs text-tegbale-text-gray bg-blue-50 rounded-xl px-4 py-2.5 border border-blue-100">
            A secure temporary password will be generated automatically.
          </p>
          <div class="flex justify-end gap-3 pt-1">
            <button type="button" @click="closeCreate" class="rounded-full bg-gray-400 px-6 py-2.5 text-sm font-roboto font-medium text-white hover:bg-gray-500">Cancel</button>
            <button type="submit" :disabled="formLoading" class="rounded-full bg-tegbale-blue px-8 py-2.5 text-sm font-roboto font-medium text-white hover:bg-blue-600 disabled:opacity-50">
              {{ formLoading ? 'Saving...' : 'Add Parent' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Import modal -->
    <ImportModal
      v-if="showImport"
      label="Parents"
      :columns="['firstName', 'lastName', 'email', 'phone']"
      :import-fn="(fd) => parentsApi.bulkImport(fd)"
      @close="showImport = false"
      @done="fetch"
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
import { ref, reactive, onMounted } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import { useParentsStore } from '@/stores/parents-store'
import { useToastStore } from '@/stores/toast-store'
import studentsApi from '@/api/students'
import parentsApi from '@/api/parents'
import ExportDropdown from '@/components/BaseComponents/ExportDropdown.vue'
import ImportModal from '@/components/ImportModal.vue'
import TempPasswordModal from '@/components/TempPasswordModal.vue'

const parentsStore = useParentsStore()
const toastStore = useToastStore()

const page = ref(1)
const limit = 20
const showCreate = ref(false)
const showImport = ref(false)
const viewTarget = ref(null)
const formLoading = ref(false)
const tempPassword = ref(null)
const createdName = ref('')

// Ward management state
const showAssignWard = ref(false)
const wardSearch = ref('')
const studentResults = ref([])
const wardBusy = ref(false)
let searchTimer = null

const form = reactive({ firstName: '', lastName: '', email: '', phone: '' })

const rules = {
  firstName: { required: helpers.withMessage('First name is required', required) },
  lastName: { required: helpers.withMessage('Last name is required', required) },
  email: {
    required: helpers.withMessage('Email is required', required),
    email: helpers.withMessage('Enter a valid email address', email),
  },
}
const v$ = useVuelidate(rules, form)

const exportColumns = [
  { header: 'S/N', value: (_, i) => i + 1 },
  { header: 'First Name', value: (p) => p.user.firstName },
  { header: 'Last Name', value: (p) => p.user.lastName },
  { header: 'Email', value: (p) => p.user.email },
  { header: 'Phone', value: (p) => p.user.phone || '' },
  { header: 'Wards', value: (p) => p.wards?.length ?? 0 },
]

const fetch = () => parentsStore.fetchAll({ page: page.value, limit })
const changePage = (p) => { page.value = p; fetch() }

const openView = (parent) => {
  viewTarget.value = parent
  showAssignWard.value = false
  wardSearch.value = ''
  studentResults.value = []
}

const openCreate = () => {
  Object.assign(form, { firstName: '', lastName: '', email: '', phone: '' })
  v$.value.$reset()
  showCreate.value = true
}

const closeCreate = () => { showCreate.value = false; v$.value.$reset() }

const saveCreate = async () => {
  v$.value.$touch()
  if (v$.value.$invalid) return
  formLoading.value = true
  try {
    const result = await parentsStore.createParent({ ...form })
    createdName.value = `${form.firstName} ${form.lastName}`
    tempPassword.value = result?.tempPassword ?? null
    closeCreate()
    toastStore.showToast({ title: 'Done', message: 'Parent added', type: 'success', timeout: 3000 })
  } catch (err) {
    toastStore.showToast({ title: 'Error', message: err?.response?.data?.message ?? 'Failed to add parent', type: 'error', timeout: 4000 })
  } finally { formLoading.value = false }
}

const handleToggle = async (id) => {
  try {
    await parentsStore.toggleStatus(id)
    toastStore.showToast({ title: 'Done', message: 'Status updated', type: 'success', timeout: 3000 })
  } catch {
    toastStore.showToast({ title: 'Error', message: 'Failed to update status', type: 'error', timeout: 4000 })
  }
}

const searchStudents = () => {
  clearTimeout(searchTimer)
  if (wardSearch.value.length < 2) { studentResults.value = []; return }
  searchTimer = setTimeout(async () => {
    try {
      const res = await studentsApi.getStudents({ search: wardSearch.value, limit: 10 })
      const existing = new Set((viewTarget.value?.wards ?? []).map(w => w.id))
      studentResults.value = (res.data?.data ?? []).filter(s => !existing.has(s.id))
    } catch {}
  }, 300)
}

const doAssignWard = async (student) => {
  if (!viewTarget.value) return
  wardBusy.value = true
  try {
    await parentsStore.assignWard(viewTarget.value.id, student.id)
    viewTarget.value = parentsStore.parents.find(p => p.id === viewTarget.value.id) ?? viewTarget.value
    wardSearch.value = ''
    studentResults.value = []
    showAssignWard.value = false
    toastStore.showToast({ title: 'Done', message: `${student.firstName} assigned as ward`, type: 'success', timeout: 3000 })
  } catch (err) {
    toastStore.showToast({ title: 'Error', message: err?.response?.data?.message ?? 'Failed to assign ward', type: 'error', timeout: 4000 })
  } finally { wardBusy.value = false }
}

const doRemoveWard = async (ward) => {
  if (!viewTarget.value) return
  wardBusy.value = true
  try {
    await parentsStore.removeWard(viewTarget.value.id, ward.id)
    viewTarget.value = parentsStore.parents.find(p => p.id === viewTarget.value.id) ?? viewTarget.value
    toastStore.showToast({ title: 'Done', message: `${ward.firstName} removed`, type: 'success', timeout: 3000 })
  } catch (err) {
    toastStore.showToast({ title: 'Error', message: err?.response?.data?.message ?? 'Failed to remove ward', type: 'error', timeout: 4000 })
  } finally { wardBusy.value = false }
}

onMounted(fetch)
</script>

<style lang="scss" scoped></style>
