<template>
  <div class="pt-4">
    <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
      <h1 class="text-3xl font-normal text-tegbale-navy-blue font-roboto">Notifications</h1>
      <button
        v-if="hasUnread"
        class="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-roboto font-medium text-tegbale-text-gray hover:bg-gray-50 disabled:opacity-50"
        :disabled="markingAll"
        @click="markAll"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
        </svg>
        {{ markingAll ? 'Marking...' : 'Mark All Read' }}
      </button>
    </div>

    <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
      <!-- Loading -->
      <div v-if="loading" class="p-6 space-y-3">
        <div v-for="i in 6" :key="i" class="h-16 rounded-xl bg-gray-100 animate-pulse" />
      </div>

      <template v-else>
        <div v-if="!notifications.length" class="flex flex-col items-center justify-center py-20 gap-3 text-tegbale-text-gray">
          <svg class="h-12 w-12 opacity-30" fill="none" stroke="currentColor" stroke-width="1.2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
          </svg>
          <p class="font-roboto text-sm">You're all caught up!</p>
        </div>

        <ul v-else class="divide-y divide-gray-50">
          <li
            v-for="n in notifications"
            :key="n.id"
            class="flex items-start gap-4 px-6 py-4 transition-colors"
            :class="n.isRead ? 'bg-white' : 'bg-blue-50/40'"
          >
            <!-- Dot indicator -->
            <div class="mt-1.5 flex-shrink-0">
              <span
                class="block h-2.5 w-2.5 rounded-full transition-colors"
                :class="n.isRead ? 'bg-gray-200' : 'bg-tegbale-blue'"
              />
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <p class="text-sm font-roboto font-medium text-tegbale-navy-blue">{{ n.title }}</p>
              <p class="text-sm font-roboto text-tegbale-text-gray mt-0.5 leading-relaxed">{{ n.body }}</p>
              <p class="text-xs text-tegbale-text-gray mt-1 opacity-70">{{ formatDate(n.createdAt) }}</p>
            </div>

            <!-- Mark read button -->
            <button
              v-if="!n.isRead"
              class="flex-shrink-0 rounded-full border border-gray-200 px-3 py-1 text-xs font-roboto text-tegbale-text-gray hover:bg-gray-100 transition-colors disabled:opacity-50"
              :disabled="markingId === n.id"
              @click="markOne(n)"
            >
              {{ markingId === n.id ? '...' : 'Mark read' }}
            </button>

            <!-- Type badge -->
            <span
              v-if="n.type"
              class="flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-roboto"
              :class="typeBadge(n.type)"
            >
              {{ n.type }}
            </span>
          </li>
        </ul>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex items-center justify-between border-t border-gray-100 px-6 py-4">
          <p class="text-sm text-tegbale-text-gray font-roboto">{{ total }} notification{{ total !== 1 ? 's' : '' }}</p>
          <div class="flex gap-2">
            <button
              :disabled="page <= 1"
              class="rounded-full border border-gray-200 px-4 py-1.5 text-sm font-roboto text-tegbale-text-gray hover:bg-gray-50 disabled:opacity-40"
              @click="changePage(page - 1)"
            >Prev</button>
            <span class="flex items-center px-3 text-sm font-roboto text-tegbale-text-gray">{{ page }} / {{ totalPages }}</span>
            <button
              :disabled="page >= totalPages"
              class="rounded-full border border-gray-200 px-4 py-1.5 text-sm font-roboto text-tegbale-text-gray hover:bg-gray-50 disabled:opacity-40"
              @click="changePage(page + 1)"
            >Next</button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useToastStore } from '@/stores/toast-store'
import notificationsApi from '@/api/notifications'

const toastStore = useToastStore()

const notifications = ref([])
const loading = ref(false)
const total = ref(0)
const page = ref(1)
const limit = 20
const markingId = ref(null)
const markingAll = ref(false)

const totalPages = computed(() => Math.max(1, Math.ceil(total.value / limit)))
const hasUnread = computed(() => notifications.value.some(n => !n.isRead))

const formatDate = (d) => d
  ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  : ''

const typeBadge = (type) => {
  const map = {
    INFO: 'bg-blue-50 text-blue-600',
    SUCCESS: 'bg-green-50 text-green-600',
    WARNING: 'bg-yellow-50 text-yellow-600',
    ERROR: 'bg-red-50 text-red-500',
  }
  return map[type?.toUpperCase()] ?? 'bg-gray-100 text-gray-500'
}

const fetch = async () => {
  loading.value = true
  try {
    const res = await notificationsApi.getAll({ page: page.value, limit })
    notifications.value = res.data.data ?? []
    total.value = res.data.meta?.total ?? notifications.value.length
  } catch {
    toastStore.showToast({ title: 'Error', message: 'Failed to load notifications', type: 'error', timeout: 3000 })
  } finally { loading.value = false }
}

const changePage = (p) => { page.value = p; fetch() }

const markOne = async (n) => {
  markingId.value = n.id
  try {
    await notificationsApi.markRead(n.id)
    n.isRead = true
  } catch {
    toastStore.showToast({ title: 'Error', message: 'Failed to mark notification', type: 'error', timeout: 3000 })
  } finally { markingId.value = null }
}

const markAll = async () => {
  markingAll.value = true
  try {
    await notificationsApi.markAllRead()
    notifications.value.forEach(n => { n.isRead = true })
    toastStore.showToast({ title: 'Done', message: 'All notifications marked as read', type: 'success', timeout: 3000 })
  } catch {
    toastStore.showToast({ title: 'Error', message: 'Failed to mark all as read', type: 'error', timeout: 3000 })
  } finally { markingAll.value = false }
}

onMounted(fetch)
</script>

<style lang="scss" scoped></style>
