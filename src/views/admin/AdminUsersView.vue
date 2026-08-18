<template>
  <div class="pt-4">
    <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
      <h1 class="text-3xl font-normal text-tegbale-navy-blue font-roboto">Staff</h1>
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
          Add Staff
        </button>
      </div>
    </div>

    <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div class="flex flex-wrap items-center gap-3 px-4 py-3 border-b border-gray-50">
        <div class="flex-1 min-w-[160px] max-w-xs">
          <SearchInput v-model="search" placeholder="Search staff..." />
        </div>
        <div class="relative">
          <select v-model="roleFilter" class="appearance-none rounded-full border border-gray-200 bg-white pl-4 pr-9 py-2.5 text-sm font-roboto text-gray-700 focus:border-tegbale-blue focus:outline-none focus:ring-1 focus:ring-tegbale-blue/20">
            <option value="">All roles</option>
            <option value="STAFF">Staff</option>
            <option value="TEACHER">Teacher</option>
          </select>
          <svg class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-tegbale-text-gray" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
        <div class="ml-auto shrink-0">
          <ExportDropdown :rows="adminStore.staff" :columns="exportColumns" filename="staff" :disabled="!adminStore.staff.length" />
        </div>
      </div>

      <div v-if="adminStore.loading && !adminStore.staff.length" class="p-6 space-y-3">
        <div v-for="i in 4" :key="i" class="h-12 rounded-xl bg-gray-100 animate-pulse" />
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-sm font-roboto min-w-[540px]">
          <thead>
            <tr class="text-left text-tegbale-text-gray border-b border-gray-100">
              <th class="px-6 py-4 font-normal">S/N</th>
              <th class="px-6 py-4 font-normal">Full Name</th>
              <th class="px-6 py-4 font-normal hidden md:table-cell">Email Address</th>
              <th class="px-6 py-4 font-normal hidden md:table-cell">Role</th>
              <th class="px-6 py-4 font-normal">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="(member, i) in adminStore.staff" :key="member.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 text-tegbale-text-gray">{{ i + 1 }}</td>
              <td class="px-6 py-4 text-tegbale-text-gray">{{ member.firstName }} {{ member.lastName }}</td>
              <td class="px-6 py-4 text-tegbale-text-gray hidden md:table-cell">{{ member.email }}</td>
              <td class="px-6 py-4 text-tegbale-text-gray hidden md:table-cell">{{ roleLabel(member.role) }}</td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <button class="text-tegbale-blue hover:text-blue-700" title="View" @click="router.push({ name: 'staffDetail', params: { id: member.id } })">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </button>
                  <button class="text-tegbale-green hover:text-green-700" title="Edit" @click="openEdit(member)">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>
                  <button
                    :class="member.isActive ? 'text-red-400 hover:text-red-600' : 'text-tegbale-green hover:text-green-700'"
                    :title="member.isActive ? 'Deactivate' : 'Activate'"
                    @click="handleToggle(member)"
                  >
                    <svg v-if="member.isActive" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
                    </svg>
                    <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="!adminStore.staff.length && !adminStore.loading">
              <td colspan="5" class="px-6 py-12 text-center text-tegbale-text-gray">No staff members found</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-6 py-4">
        <div class="flex items-center gap-2 text-sm font-roboto text-tegbale-text-gray">
          <span>Rows per page:</span>
          <PerPageSelect v-model="limit" />
          <span v-if="adminStore.meta?.total">of {{ adminStore.meta.total }} member{{ adminStore.meta.total !== 1 ? 's' : '' }}</span>
        </div>
        <div v-if="adminStore.meta?.totalPages > 1" class="flex gap-2">
          <button :disabled="page <= 1" @click="changePage(page - 1)" class="rounded-full border border-gray-200 px-4 py-1.5 text-sm font-roboto text-tegbale-text-gray hover:bg-gray-50 disabled:opacity-40">Prev</button>
          <span class="flex items-center px-3 text-sm font-roboto text-tegbale-text-gray">{{ page }} / {{ adminStore.meta.totalPages }}</span>
          <button :disabled="page >= adminStore.meta.totalPages" @click="changePage(page + 1)" class="rounded-full border border-gray-200 px-4 py-1.5 text-sm font-roboto text-tegbale-text-gray hover:bg-gray-50 disabled:opacity-40">Next</button>
        </div>
      </div>
    </div>

    <!-- Create Modal -->
    <div v-if="showCreate" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div class="w-full max-w-lg bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h3 class="text-lg font-semibold text-tegbale-navy-blue font-roboto">Add Staff Member</h3>
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
              <label class="text-xs text-tegbale-text-gray">Phone</label>
              <input v-model="form.phone" type="tel" placeholder="Enter phone number" class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 placeholder:text-tegbale-text-gray focus:border-tegbale-blue focus:outline-none focus:ring-1 focus:ring-tegbale-blue/20" />
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-xs text-tegbale-text-gray">Role <span class="text-red-400">*</span></label>
              <select v-model="form.role" class="appearance-none rounded-full border px-4 py-2.5 bg-white text-gray-700 focus:outline-none focus:ring-1 transition-colors" :class="v$.role.$error ? 'border-red-400 focus:ring-red-300' : 'border-gray-200 focus:border-tegbale-blue focus:ring-tegbale-blue/20'">
                <option value="" disabled>Select role</option>
                <option value="TEACHER">Teacher</option>
                <option value="STAFF">Staff</option>
              </select>
              <span v-if="v$.role.$error" class="text-xs text-red-500 pl-2">{{ v$.role.$errors[0].$message }}</span>
            </div>
          </div>
          <p class="text-xs text-tegbale-text-gray bg-blue-50 rounded-xl px-4 py-2.5 border border-blue-100">
            A secure temporary password will be generated automatically.
          </p>
          <div class="flex justify-end gap-3 pt-1">
            <button type="button" @click="closeCreate" class="rounded-full bg-gray-400 px-6 py-2.5 text-sm font-roboto font-medium text-white hover:bg-gray-500">Cancel</button>
            <button type="submit" :disabled="formLoading" class="rounded-full bg-tegbale-blue px-8 py-2.5 text-sm font-roboto font-medium text-white hover:bg-blue-600 disabled:opacity-50">
              {{ formLoading ? 'Saving...' : 'Add Staff' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="editTarget" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" @click.self="editTarget = null">
      <div class="w-full max-w-lg bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h3 class="text-lg font-semibold text-tegbale-navy-blue font-roboto">Edit Staff Member</h3>
          <button class="rounded-full p-1 text-tegbale-text-gray hover:bg-gray-100" @click="editTarget = null">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <form @submit.prevent="saveEdit" class="px-6 py-5 space-y-4 text-sm font-roboto">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="flex flex-col gap-1">
              <label class="text-xs text-tegbale-text-gray">First Name</label>
              <input v-model="editForm.firstName" class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 focus:border-tegbale-blue focus:outline-none focus:ring-1 focus:ring-tegbale-blue/20" />
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-xs text-tegbale-text-gray">Last Name</label>
              <input v-model="editForm.lastName" class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 focus:border-tegbale-blue focus:outline-none focus:ring-1 focus:ring-tegbale-blue/20" />
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-xs text-tegbale-text-gray">Phone</label>
              <input v-model="editForm.phone" class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 focus:border-tegbale-blue focus:outline-none focus:ring-1 focus:ring-tegbale-blue/20" />
            </div>
          </div>
          <div class="flex justify-end gap-3 pt-2">
            <button type="button" @click="editTarget = null" class="rounded-full bg-gray-400 px-6 py-2.5 text-sm font-roboto font-medium text-white hover:bg-gray-500">Cancel</button>
            <button type="submit" :disabled="formLoading" class="rounded-full bg-tegbale-blue px-8 py-2.5 text-sm font-roboto font-medium text-white hover:bg-blue-600 disabled:opacity-50">
              {{ formLoading ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Import modal -->
    <ImportModal
      v-if="showImport"
      label="Staff"
      :columns="['firstName', 'lastName', 'email', 'phone']"
      :import-fn="(fd) => adminApi.bulkImportStaff(fd, 'STAFF')"
      @close="showImport = false"
      @done="() => adminStore.fetchAllStaff()"
    />

    <!-- Temp password modal -->
    <TempPasswordModal
      v-if="tempPassword"
      :password="tempPassword"
      :name="createdName"
      @close="tempPassword = null"
    />

    <ConfirmModal
      :open="!!toggleTarget"
      :title="toggleTarget?.isActive ? 'Deactivate staff member?' : 'Activate staff member?'"
      :message="toggleTarget?.isActive
        ? 'This staff member will lose access to the platform immediately.'
        : 'This staff member will regain access to the platform.'"
      :loading="toggleLoading"
      @confirm="confirmToggle"
      @cancel="toggleTarget = null"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import { useAdminsStore } from '@/stores/admin-store'
import { useToastStore } from '@/stores/toast-store'
import adminApi from '@/api/admin'
import ExportDropdown from '@/components/BaseComponents/ExportDropdown.vue'
import ImportModal from '@/components/ImportModal.vue'
import TempPasswordModal from '@/components/TempPasswordModal.vue'
import SearchInput from '@/components/BaseComponents/SearchInput.vue'
import PerPageSelect from '@/components/BaseComponents/PerPageSelect.vue'
import ConfirmModal from '@/components/BaseComponents/ConfirmModal.vue'

const router = useRouter()
const adminStore = useAdminsStore()
const toastStore = useToastStore()

const showCreate = ref(false)
const showImport = ref(false)
const editTarget = ref(null)
const formLoading = ref(false)
const tempPassword = ref(null)
const createdName = ref('')

const page = ref(1)
const limit = ref(10)
const search = ref('')
const roleFilter = ref('')
let searchTimer = null

const form = reactive({ firstName: '', lastName: '', email: '', phone: '', role: '' })
const editForm = reactive({ firstName: '', lastName: '', phone: '' })

const roleLabel = (role) => ({ SCHOOL_ADMIN: 'School Admin', STAFF: 'Staff', TEACHER: 'Teacher' }[role] ?? role)

const rules = computed(() => ({
  firstName: { required: helpers.withMessage('First name is required', required) },
  lastName: { required: helpers.withMessage('Last name is required', required) },
  email: {
    required: helpers.withMessage('Email is required', required),
    email: helpers.withMessage('Enter a valid email address', email),
  },
  role: { required: helpers.withMessage('Role is required', required) },
}))
const v$ = useVuelidate(rules, form)

const exportColumns = [
  { header: 'S/N', value: (_, i) => i + 1 },
  { header: 'First Name', value: (m) => m.firstName },
  { header: 'Last Name', value: (m) => m.lastName },
  { header: 'Email', value: (m) => m.email },
  { header: 'Phone', value: (m) => m.phone || '' },
  { header: 'Role', value: (m) => roleLabel(m.role) },
]

const openCreate = () => {
  Object.assign(form, { firstName: '', lastName: '', email: '', phone: '', role: '' })
  v$.value.$reset()
  showCreate.value = true
}

const closeCreate = () => { showCreate.value = false; v$.value.$reset() }

const openEdit = (member) => {
  Object.assign(editForm, { firstName: member.firstName, lastName: member.lastName, phone: member.phone || '' })
  editTarget.value = member
}

const saveCreate = async () => {
  v$.value.$touch()
  if (v$.value.$invalid) return
  formLoading.value = true
  try {
    const result = await adminStore.createStaff({ ...form })
    createdName.value = `${form.firstName} ${form.lastName}`
    tempPassword.value = result?.tempPassword ?? null
    closeCreate()
    toastStore.showToast({ title: 'Done', message: 'Staff member added', type: 'success', timeout: 3000 })
  } catch (err) {
    toastStore.showToast({ title: 'Error', message: err?.response?.data?.message ?? 'Failed to add staff', type: 'error', timeout: 4000 })
  } finally { formLoading.value = false }
}

const saveEdit = async () => {
  if (!editTarget.value) return
  formLoading.value = true
  try {
    await adminStore.updateStaff(editTarget.value.id, { ...editForm })
    editTarget.value = null
    toastStore.showToast({ title: 'Done', message: 'Staff updated', type: 'success', timeout: 3000 })
  } catch (err) {
    toastStore.showToast({ title: 'Error', message: err?.response?.data?.message ?? 'Failed to update', type: 'error', timeout: 4000 })
  } finally { formLoading.value = false }
}

const toggleTarget = ref(null)
const toggleLoading = ref(false)

const handleToggle = (member) => { toggleTarget.value = member }

const confirmToggle = async () => {
  if (!toggleTarget.value) return
  toggleLoading.value = true
  try {
    await adminStore.toggleStatus(toggleTarget.value.id)
    toastStore.showToast({ title: 'Done', message: 'Status updated', type: 'success', timeout: 3000 })
  } catch {
    toastStore.showToast({ title: 'Error', message: 'Failed to update status', type: 'error', timeout: 4000 })
  } finally {
    toggleLoading.value = false
    toggleTarget.value = null
  }
}

const fetchStaff = () => adminStore.fetchAllStaff({
  page: page.value,
  limit: limit.value,
  ...(search.value && { search: search.value }),
  ...(roleFilter.value && { role: roleFilter.value }),
})
const changePage = (p) => { page.value = p; fetchStaff() }

watch([search, roleFilter], () => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => { page.value = 1; fetchStaff() }, 350)
})

watch(limit, () => { page.value = 1; fetchStaff() })

onMounted(async () => { try { await fetchStaff() } catch {} })
</script>

<style lang="scss" scoped></style>
