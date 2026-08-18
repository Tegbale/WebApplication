<template>
  <div class="pt-4">
    <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
      <h1 class="text-3xl font-normal text-tegbale-navy-blue font-roboto">Events</h1>
      <button
        class="flex items-center gap-2 rounded-full bg-tegbale-blue px-5 py-2.5 text-sm font-roboto font-medium text-white hover:bg-blue-600"
        @click="openCreate"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
        </svg>
        Add Event
      </button>
    </div>

    <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div class="flex flex-wrap items-center gap-3 px-4 py-3 border-b border-gray-50">
        <div class="flex-1 min-w-[160px] max-w-xs">
          <SearchInput v-model="search" placeholder="Search events..." />
        </div>
        <div class="relative">
          <select v-model="statusFilter" class="appearance-none rounded-full border border-gray-200 bg-white pl-4 pr-9 py-2.5 text-sm font-roboto text-gray-700 focus:border-tegbale-blue focus:outline-none focus:ring-1 focus:ring-tegbale-blue/20">
            <option value="">All statuses</option>
            <option value="UPCOMING">Upcoming</option>
            <option value="ONGOING">Ongoing</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          <svg class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-tegbale-text-gray" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
        <div class="ml-auto shrink-0">
          <ExportDropdown
            :rows="eventsStore.events"
            :columns="exportColumns"
            filename="events"
            :disabled="!eventsStore.events.length"
          />
        </div>
      </div>

      <div v-if="eventsStore.loading && !eventsStore.events.length" class="p-6 space-y-3">
        <div v-for="i in 4" :key="i" class="h-12 rounded-xl bg-gray-100 animate-pulse" />
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-sm font-roboto min-w-[580px]">
          <thead>
            <tr class="text-left text-tegbale-text-gray border-b border-gray-100">
              <th class="px-6 py-4 font-normal">S/N</th>
              <th class="px-6 py-4 font-normal">Title</th>
              <th class="px-6 py-4 font-normal hidden md:table-cell">Start Date</th>
              <th class="px-6 py-4 font-normal hidden md:table-cell">Location</th>
              <th class="px-6 py-4 font-normal hidden lg:table-cell">Status</th>
              <th class="px-6 py-4 font-normal">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="(event, i) in eventsStore.events" :key="event.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 text-tegbale-text-gray">{{ (page - 1) * limit + i + 1 }}</td>
              <td class="px-6 py-4 text-tegbale-text-gray font-medium">{{ event.title }}</td>
              <td class="px-6 py-4 text-tegbale-text-gray hidden md:table-cell">{{ formatDate(event.startDate) }}</td>
              <td class="px-6 py-4 text-tegbale-text-gray hidden md:table-cell">{{ event.location || '—' }}</td>
              <td class="px-6 py-4 hidden lg:table-cell">
                <span class="inline-block rounded-full px-3 py-0.5 text-xs font-roboto" :class="statusClass(event.status)">
                  {{ event.status }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <button class="text-tegbale-blue hover:text-blue-700" title="View" @click="viewTarget = event">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </button>
                  <button class="text-tegbale-green hover:text-green-700" title="Edit" @click="openEdit(event)">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>
                  <button class="text-red-400 hover:text-red-600" title="Delete" @click="handleDelete(event)">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="!eventsStore.events.length && !eventsStore.loading">
              <td colspan="6" class="px-6 py-12 text-center text-tegbale-text-gray">No events found</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-6 py-4">
        <div class="flex items-center gap-2 text-sm font-roboto text-tegbale-text-gray">
          <span>Rows per page:</span>
          <PerPageSelect v-model="limit" />
          <span v-if="eventsStore.meta.total">of {{ eventsStore.meta.total }} event{{ eventsStore.meta.total !== 1 ? 's' : '' }}</span>
        </div>
        <div v-if="eventsStore.meta.totalPages > 1" class="flex gap-2">
          <button :disabled="page <= 1" @click="changePage(page - 1)" class="rounded-full border border-gray-200 px-4 py-1.5 text-sm font-roboto text-tegbale-text-gray hover:bg-gray-50 disabled:opacity-40">Prev</button>
          <span class="flex items-center px-3 text-sm font-roboto text-tegbale-text-gray">{{ page }} / {{ eventsStore.meta.totalPages }}</span>
          <button :disabled="page >= eventsStore.meta.totalPages" @click="changePage(page + 1)" class="rounded-full border border-gray-200 px-4 py-1.5 text-sm font-roboto text-tegbale-text-gray hover:bg-gray-50 disabled:opacity-40">Next</button>
        </div>
      </div>
    </div>

    <!-- View Modal -->
    <div v-if="viewTarget" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" @click.self="viewTarget = null">
      <div class="w-full max-w-lg bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h3 class="text-lg font-semibold text-tegbale-navy-blue font-roboto">Event Details</h3>
          <button class="rounded-full p-1 text-tegbale-text-gray hover:bg-gray-100" @click="viewTarget = null">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div class="px-6 py-5 space-y-4 text-sm font-roboto">
          <div class="flex flex-col gap-1">
            <p class="text-xs text-tegbale-text-gray">Title</p>
            <p class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700">{{ viewTarget.title }}</p>
          </div>
          <div v-if="viewTarget.description" class="flex flex-col gap-1">
            <p class="text-xs text-tegbale-text-gray">Description</p>
            <p class="rounded-2xl border border-gray-200 px-4 py-3 text-gray-700 leading-relaxed">{{ viewTarget.description }}</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="flex flex-col gap-1">
              <p class="text-xs text-tegbale-text-gray">Start Date</p>
              <p class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700">{{ formatDate(viewTarget.startDate) }}</p>
            </div>
            <div v-if="viewTarget.endDate" class="flex flex-col gap-1">
              <p class="text-xs text-tegbale-text-gray">End Date</p>
              <p class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700">{{ formatDate(viewTarget.endDate) }}</p>
            </div>
            <div class="flex flex-col gap-1">
              <p class="text-xs text-tegbale-text-gray">Location</p>
              <p class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700">{{ viewTarget.location || '—' }}</p>
            </div>
            <div class="flex flex-col gap-1">
              <p class="text-xs text-tegbale-text-gray">Status</p>
              <p class="rounded-full border px-4 py-2.5" :class="statusClass(viewTarget.status)">{{ viewTarget.status }}</p>
            </div>
          </div>
          <div class="flex justify-end pt-2">
            <button @click="viewTarget = null" class="rounded-full bg-gray-400 px-6 py-2.5 text-sm font-roboto font-medium text-white hover:bg-gray-500">Close</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Modal -->
    <div v-if="showCreate" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div class="w-full max-w-lg bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h3 class="text-lg font-semibold text-tegbale-navy-blue font-roboto">Add Event</h3>
          <button class="rounded-full p-1 text-tegbale-text-gray hover:bg-gray-100" @click="closeCreate">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <form @submit.prevent="saveCreate" class="px-6 py-5 space-y-4 text-sm font-roboto">
          <div class="flex flex-col gap-1">
            <label class="text-xs text-tegbale-text-gray">Title</label>
            <input v-model="form.title" placeholder="Event title" class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 placeholder:text-tegbale-text-gray focus:border-tegbale-blue focus:outline-none focus:ring-1 focus:ring-tegbale-blue/20" />
            <span v-if="cv$.title.$error" class="text-xs text-red-500 pl-2">{{ cv$.title.$errors[0].$message }}</span>
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-xs text-tegbale-text-gray">Description (optional)</label>
            <textarea v-model="form.description" rows="3" placeholder="Event description" class="rounded-2xl border border-gray-200 px-4 py-2.5 text-gray-700 placeholder:text-tegbale-text-gray focus:border-tegbale-blue focus:outline-none focus:ring-1 focus:ring-tegbale-blue/20 resize-none" />
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="flex flex-col gap-1">
              <label class="text-xs text-tegbale-text-gray">Start Date &amp; Time</label>
              <input v-model="form.startDate" type="datetime-local" class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 focus:border-tegbale-blue focus:outline-none focus:ring-1 focus:ring-tegbale-blue/20" />
              <span v-if="cv$.startDate.$error" class="text-xs text-red-500 pl-2">{{ cv$.startDate.$errors[0].$message }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-xs text-tegbale-text-gray">End Date &amp; Time (optional)</label>
              <input v-model="form.endDate" type="datetime-local" class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 focus:border-tegbale-blue focus:outline-none focus:ring-1 focus:ring-tegbale-blue/20" />
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-xs text-tegbale-text-gray">Location (optional)</label>
            <input v-model="form.location" placeholder="e.g. School Hall" class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 placeholder:text-tegbale-text-gray focus:border-tegbale-blue focus:outline-none focus:ring-1 focus:ring-tegbale-blue/20" />
          </div>
          <div class="flex justify-end gap-3 pt-2">
            <button type="button" @click="closeCreate" class="rounded-full bg-gray-400 px-6 py-2.5 text-sm font-roboto font-medium text-white hover:bg-gray-500">Cancel</button>
            <button type="submit" :disabled="formLoading" class="rounded-full bg-tegbale-blue px-8 py-2.5 text-sm font-roboto font-medium text-white hover:bg-blue-600 disabled:opacity-50">
              {{ formLoading ? 'Saving...' : 'Add Event' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirm -->
    <ConfirmModal
      :open="!!deleteTarget"
      :title="`Delete &quot;${deleteTarget?.title}&quot;?`"
      message="This event will be permanently removed and cannot be recovered."
      :loading="deleteLoading"
      @confirm="confirmDelete"
      @cancel="deleteTarget = null"
    />

    <!-- Edit Modal -->
    <div v-if="editTarget" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div class="w-full max-w-lg bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h3 class="text-lg font-semibold text-tegbale-navy-blue font-roboto">Edit Event</h3>
          <button class="rounded-full p-1 text-tegbale-text-gray hover:bg-gray-100" @click="editTarget = null">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <form @submit.prevent="saveEdit" class="px-6 py-5 space-y-4 text-sm font-roboto">
          <div class="flex flex-col gap-1">
            <label class="text-xs text-tegbale-text-gray">Title</label>
            <input v-model="editForm.title" class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 focus:border-tegbale-blue focus:outline-none focus:ring-1 focus:ring-tegbale-blue/20" />
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-xs text-tegbale-text-gray">Description</label>
            <textarea v-model="editForm.description" rows="3" class="rounded-2xl border border-gray-200 px-4 py-2.5 text-gray-700 focus:border-tegbale-blue focus:outline-none focus:ring-1 focus:ring-tegbale-blue/20 resize-none" />
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="flex flex-col gap-1">
              <label class="text-xs text-tegbale-text-gray">Start Date &amp; Time</label>
              <input v-model="editForm.startDate" type="datetime-local" class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 focus:border-tegbale-blue focus:outline-none focus:ring-1 focus:ring-tegbale-blue/20" />
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-xs text-tegbale-text-gray">End Date &amp; Time</label>
              <input v-model="editForm.endDate" type="datetime-local" class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 focus:border-tegbale-blue focus:outline-none focus:ring-1 focus:ring-tegbale-blue/20" />
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="flex flex-col gap-1">
              <label class="text-xs text-tegbale-text-gray">Location</label>
              <input v-model="editForm.location" class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 focus:border-tegbale-blue focus:outline-none focus:ring-1 focus:ring-tegbale-blue/20" />
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-xs text-tegbale-text-gray">Status</label>
              <select v-model="editForm.status" class="rounded-full border border-gray-200 px-4 py-2.5 bg-white text-gray-700 focus:border-tegbale-blue focus:outline-none focus:ring-1 focus:ring-tegbale-blue/20">
                <option value="UPCOMING">Upcoming</option>
                <option value="ONGOING">Ongoing</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
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
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { useEventsStore } from '@/stores/events-store'
import { useToastStore } from '@/stores/toast-store'
import ExportDropdown from '@/components/BaseComponents/ExportDropdown.vue'
import ConfirmModal from '@/components/BaseComponents/ConfirmModal.vue'
import SearchInput from '@/components/BaseComponents/SearchInput.vue'
import PerPageSelect from '@/components/BaseComponents/PerPageSelect.vue'

const eventsStore = useEventsStore()
const toastStore = useToastStore()

const page = ref(1)
const limit = ref(10)
const showCreate = ref(false)
const viewTarget = ref(null)
const editTarget = ref(null)
const formLoading = ref(false)
const deleteTarget = ref(null)
const deleteLoading = ref(false)

const search = ref('')
const statusFilter = ref('')
let searchTimer = null

const form = reactive({ title: '', description: '', startDate: '', endDate: '', location: '' })
const editForm = reactive({ title: '', description: '', startDate: '', endDate: '', location: '', status: 'UPCOMING' })

const createRules = {
  title: { required: helpers.withMessage('Title is required', required) },
  startDate: { required: helpers.withMessage('Start date is required', required) },
}
const cv$ = useVuelidate(createRules, form)

const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'

const statusClass = (s) => ({
  UPCOMING: 'bg-blue-50 text-blue-600',
  ONGOING: 'bg-green-50 text-green-600',
  COMPLETED: 'bg-gray-100 text-gray-500',
  CANCELLED: 'bg-red-50 text-red-500',
}[s] ?? 'bg-gray-100 text-gray-500')

const exportColumns = [
  { header: 'S/N', value: (_, i) => i + 1 },
  { header: 'Title', value: (e) => e.title },
  { header: 'Start Date', value: (e) => formatDate(e.startDate) },
  { header: 'Location', value: (e) => e.location || '' },
  { header: 'Status', value: (e) => e.status },
]

const fetch = () => eventsStore.fetchAll({
  page: page.value,
  limit: limit.value,
  ...(search.value && { search: search.value }),
  ...(statusFilter.value && { status: statusFilter.value }),
})
const changePage = (p) => { page.value = p; fetch() }

const openCreate = () => {
  Object.assign(form, { title: '', description: '', startDate: '', endDate: '', location: '' })
  cv$.value.$reset()
  showCreate.value = true
}
const closeCreate = () => { showCreate.value = false; cv$.value.$reset() }

const openEdit = (event) => {
  const pad = (n) => String(n).padStart(2, '0')
  const toLocal = (d) => {
    if (!d) return ''
    const dt = new Date(d)
    return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}T${pad(dt.getHours())}:${pad(dt.getMinutes())}`
  }
  Object.assign(editForm, {
    title: event.title,
    description: event.description || '',
    startDate: toLocal(event.startDate),
    endDate: toLocal(event.endDate),
    location: event.location || '',
    status: event.status,
  })
  editTarget.value = event
}

const saveCreate = async () => {
  const valid = await cv$.value.$validate()
  if (!valid) return
  formLoading.value = true
  try {
    const payload = {
      title: form.title,
      startDate: new Date(form.startDate).toISOString(),
      ...(form.description && { description: form.description }),
      ...(form.endDate && { endDate: new Date(form.endDate).toISOString() }),
      ...(form.location && { location: form.location }),
    }
    await eventsStore.create(payload)
    closeCreate()
    toastStore.showToast({ title: 'Done', message: 'Event created', type: 'success', timeout: 3000 })
  } catch (err) {
    toastStore.showToast({ title: 'Error', message: typeof err === 'string' ? err : 'Failed to create event', type: 'error', timeout: 4000 })
  } finally { formLoading.value = false }
}

const saveEdit = async () => {
  if (!editTarget.value) return
  formLoading.value = true
  try {
    const payload = {
      title: editForm.title,
      description: editForm.description || undefined,
      startDate: editForm.startDate ? new Date(editForm.startDate).toISOString() : undefined,
      endDate: editForm.endDate ? new Date(editForm.endDate).toISOString() : undefined,
      location: editForm.location || undefined,
      status: editForm.status,
    }
    await eventsStore.update(editTarget.value.id, payload)
    editTarget.value = null
    toastStore.showToast({ title: 'Done', message: 'Event updated', type: 'success', timeout: 3000 })
  } catch (err) {
    toastStore.showToast({ title: 'Error', message: typeof err === 'string' ? err : 'Failed to update event', type: 'error', timeout: 4000 })
  } finally { formLoading.value = false }
}

const handleDelete = (event) => { deleteTarget.value = event }

const confirmDelete = async () => {
  if (!deleteTarget.value) return
  deleteLoading.value = true
  try {
    await eventsStore.remove(deleteTarget.value.id)
    deleteTarget.value = null
    toastStore.showToast({ title: 'Done', message: 'Event deleted', type: 'success', timeout: 3000 })
  } catch {
    toastStore.showToast({ title: 'Error', message: 'Failed to delete event', type: 'error', timeout: 4000 })
  } finally { deleteLoading.value = false }
}

watch([search, statusFilter], () => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => { page.value = 1; fetch() }, 350)
})

watch(limit, () => { page.value = 1; fetch() })

onMounted(fetch)
</script>

<style lang="scss" scoped></style>
