<template>
  <div class="pt-4 flex flex-col" style="height: calc(100vh - 6rem);">
    <div class="flex flex-wrap items-center justify-between gap-3 mb-4 flex-shrink-0">
      <h1 class="text-3xl font-normal text-tegbale-navy-blue font-roboto">Messages</h1>
      <button
        class="flex items-center gap-2 rounded-full bg-tegbale-blue px-5 py-2.5 text-sm font-roboto font-medium text-white hover:bg-blue-600"
        @click="openCompose"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
        </svg>
        New Message
      </button>
    </div>

    <div class="flex flex-1 gap-4 overflow-hidden">
      <!-- Conversation list -->
      <div class="w-72 flex-shrink-0 bg-white rounded-2xl shadow-sm flex flex-col overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100 flex-shrink-0">
          <p class="text-xs font-roboto text-tegbale-text-gray font-medium uppercase tracking-wide">Conversations</p>
        </div>
        <div class="flex-1 overflow-y-auto">
          <div v-if="loadingConvos" class="p-4 space-y-3">
            <div v-for="i in 5" :key="i" class="h-14 rounded-xl bg-gray-100 animate-pulse" />
          </div>
          <template v-else>
            <button
              v-for="c in conversations"
              :key="c.partner.id"
              class="w-full flex items-start gap-3 px-4 py-3 transition-colors text-left border-b border-gray-50 last:border-0"
              :class="activeConvo?.partner.id === c.partner.id ? 'bg-blue-50' : 'hover:bg-gray-50'"
              @click="selectConvo(c)"
            >
              <div class="h-9 w-9 rounded-full bg-tegbale-blue flex items-center justify-center text-white text-xs font-roboto font-semibold flex-shrink-0">
                {{ initials(c.partner) }}
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-1">
                  <p class="text-sm font-roboto font-medium text-tegbale-navy-blue truncate">
                    {{ c.partner.firstName }} {{ c.partner.lastName }}
                  </p>
                  <span v-if="c.unreadCount" class="flex-shrink-0 h-5 w-5 rounded-full bg-tegbale-blue text-white text-xs font-roboto flex items-center justify-center">
                    {{ c.unreadCount }}
                  </span>
                </div>
                <p class="text-xs text-tegbale-text-gray truncate mt-0.5">{{ c.lastMessage.body }}</p>
              </div>
            </button>
            <p v-if="!conversations.length" class="px-4 py-10 text-center text-sm text-tegbale-text-gray font-roboto">
              No conversations yet
            </p>
          </template>
        </div>
      </div>

      <!-- Thread panel -->
      <div class="flex-1 bg-white rounded-2xl shadow-sm flex flex-col overflow-hidden">
        <!-- Empty state -->
        <div v-if="!activeConvo" class="flex-1 flex flex-col items-center justify-center gap-3 text-tegbale-text-gray">
          <svg class="h-12 w-12 opacity-30" fill="none" stroke="currentColor" stroke-width="1.2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
          </svg>
          <p class="font-roboto text-sm">Select a conversation or start a new one</p>
        </div>

        <template v-else>
          <!-- Thread header -->
          <div class="flex items-center gap-3 px-6 py-4 border-b border-gray-100 flex-shrink-0">
            <div class="h-9 w-9 rounded-full bg-tegbale-blue flex items-center justify-center text-white text-xs font-roboto font-semibold">
              {{ initials(activeConvo.partner) }}
            </div>
            <p class="font-roboto font-medium text-tegbale-navy-blue">
              {{ activeConvo.partner.firstName }} {{ activeConvo.partner.lastName }}
            </p>
          </div>

          <!-- Messages -->
          <div ref="threadEl" class="flex-1 overflow-y-auto px-6 py-4 space-y-3">
            <div v-if="loadingThread" class="space-y-3">
              <div v-for="i in 4" :key="i" class="h-12 rounded-xl bg-gray-100 animate-pulse" />
            </div>
            <template v-else>
              <div
                v-for="msg in thread"
                :key="msg.id"
                class="flex"
                :class="msg.senderId === currentUserId ? 'justify-end' : 'justify-start'"
              >
                <div
                  class="max-w-xs lg:max-w-sm rounded-2xl px-4 py-2.5 text-sm font-roboto"
                  :class="msg.senderId === currentUserId
                    ? 'bg-tegbale-blue text-white rounded-br-sm'
                    : 'bg-gray-100 text-gray-700 rounded-bl-sm'"
                >
                  <p v-if="msg.subject" class="text-xs font-semibold mb-1 opacity-80">{{ msg.subject }}</p>
                  <p class="leading-relaxed">{{ msg.body }}</p>
                  <p class="text-xs mt-1 opacity-60 text-right">{{ formatTime(msg.createdAt) }}</p>
                </div>
              </div>
              <p v-if="!thread.length" class="text-center text-sm text-tegbale-text-gray py-6">No messages in this conversation</p>
            </template>
          </div>

          <!-- Reply box -->
          <div class="border-t border-gray-100 px-6 py-4 flex-shrink-0">
            <div class="flex gap-2">
              <input
                v-model="replyBody"
                placeholder="Type a reply..."
                class="flex-1 rounded-full border border-gray-200 px-4 py-2.5 text-sm font-roboto text-gray-700 placeholder:text-tegbale-text-gray focus:border-tegbale-blue focus:outline-none focus:ring-1 focus:ring-tegbale-blue/20"
                @keydown.enter.prevent="sendReply"
              />
              <button
                :disabled="!replyBody.trim() || sending"
                class="rounded-full bg-tegbale-blue px-5 py-2.5 text-sm font-roboto font-medium text-white hover:bg-blue-600 disabled:opacity-50"
                @click="sendReply"
              >
                <span v-if="sending">
                  <svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                </span>
                <span v-else>Send</span>
              </button>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Compose modal -->
    <div v-if="showCompose" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div class="w-full max-w-lg bg-white rounded-2xl shadow-xl">
        <div class="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h3 class="text-lg font-semibold text-tegbale-navy-blue font-roboto">New Message</h3>
          <button class="rounded-full p-1 text-tegbale-text-gray hover:bg-gray-100" @click="closeCompose">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div class="px-6 py-5 space-y-4 text-sm font-roboto">
          <!-- Recipient search -->
          <div class="flex flex-col gap-1 relative">
            <label class="text-xs text-tegbale-text-gray">To <span class="text-red-400">*</span></label>
            <input
              v-model="recipientQuery"
              placeholder="Search by name or email..."
              class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 placeholder:text-tegbale-text-gray focus:border-tegbale-blue focus:outline-none focus:ring-1 focus:ring-tegbale-blue/20"
              @input="onRecipientInput"
            />
            <div
              v-if="recipientResults.length && !composeForm.receiverId"
              class="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-2xl shadow-lg z-10 max-h-48 overflow-y-auto"
            >
              <button
                v-for="u in recipientResults"
                :key="u.id"
                class="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700 font-roboto"
                @click="selectRecipient(u)"
              >
                {{ u.firstName }} {{ u.lastName }}
                <span class="text-tegbale-text-gray text-xs ml-1">{{ u.email }}</span>
              </button>
            </div>
            <p v-if="composeForm.receiverId" class="text-xs text-tegbale-blue pl-2">✓ {{ recipientQuery }}</p>
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-xs text-tegbale-text-gray">Subject (optional)</label>
            <input
              v-model="composeForm.subject"
              placeholder="Message subject"
              class="rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 placeholder:text-tegbale-text-gray focus:border-tegbale-blue focus:outline-none focus:ring-1 focus:ring-tegbale-blue/20"
            />
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-xs text-tegbale-text-gray">Message <span class="text-red-400">*</span></label>
            <textarea
              v-model="composeForm.body"
              rows="4"
              placeholder="Write your message..."
              class="rounded-2xl border border-gray-200 px-4 py-2.5 text-gray-700 placeholder:text-tegbale-text-gray focus:border-tegbale-blue focus:outline-none focus:ring-1 focus:ring-tegbale-blue/20 resize-none"
            />
          </div>

          <div class="flex justify-end gap-3 pt-1">
            <button type="button" class="rounded-full bg-gray-400 px-6 py-2.5 text-sm font-roboto font-medium text-white hover:bg-gray-500" @click="closeCompose">Cancel</button>
            <button
              :disabled="!composeForm.receiverId || !composeForm.body.trim() || sending"
              class="rounded-full bg-tegbale-blue px-6 py-2.5 text-sm font-roboto font-medium text-white hover:bg-blue-600 disabled:opacity-50"
              @click="sendCompose"
            >
              {{ sending ? 'Sending...' : 'Send' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import { useUsersStore } from '@/stores/user-store'
import { useToastStore } from '@/stores/toast-store'
import messagesApi from '@/api/messages'
import adminApi from '@/api/admin'

const userStore = useUsersStore()
const toastStore = useToastStore()

const currentUserId = computed(() => userStore.id)

const allMessages = ref([])
const loadingConvos = ref(false)
const activeConvo = ref(null)
const thread = ref([])
const loadingThread = ref(false)
const threadEl = ref(null)
const replyBody = ref('')
const sending = ref(false)

// Compose
const showCompose = ref(false)
const recipientQuery = ref('')
const recipientResults = ref([])
const searchTimeout = ref(null)
const composeForm = reactive({ receiverId: '', subject: '', body: '' })

const initials = (u) => u ? `${(u.firstName?.[0] ?? '').toUpperCase()}${(u.lastName?.[0] ?? '').toUpperCase()}` : '?'

const formatTime = (d) => d
  ? new Date(d).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' })
  : ''

const conversations = computed(() => {
  const map = new Map()
  for (const msg of allMessages.value) {
    const isOwn = msg.senderId === currentUserId.value
    const partner = isOwn ? msg.receiver : msg.sender
    if (!partner) continue
    const existing = map.get(partner.id)
    const isUnread = msg.receiverId === currentUserId.value && msg.status !== 'READ'
    if (!existing || new Date(msg.createdAt) > new Date(existing.lastMessage.createdAt)) {
      map.set(partner.id, {
        partner,
        lastMessage: msg,
        unreadCount: (existing?.unreadCount ?? 0) + (isUnread ? 1 : 0),
      })
    } else if (isUnread) {
      existing.unreadCount = (existing.unreadCount ?? 0) + 1
    }
  }
  return [...map.values()].sort((a, b) => new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt))
})

const fetchAllMessages = async () => {
  loadingConvos.value = true
  try {
    const res = await messagesApi.getAll({ type: 'all', limit: 200 })
    allMessages.value = res.data.data ?? []
  } catch {
    toastStore.showToast({ title: 'Error', message: 'Failed to load messages', type: 'error', timeout: 3000 })
  } finally {
    loadingConvos.value = false
  }
}

const selectConvo = async (convo) => {
  activeConvo.value = convo
  thread.value = []
  loadingThread.value = true
  try {
    const res = await messagesApi.getAll({ type: 'all', partnerId: convo.partner.id, limit: 100 })
    thread.value = (res.data.data ?? []).slice().reverse()
    await messagesApi.markConversationRead(convo.partner.id)
    // Clear unread badge locally
    convo.unreadCount = 0
    await nextTick()
    if (threadEl.value) threadEl.value.scrollTop = threadEl.value.scrollHeight
  } catch {
    toastStore.showToast({ title: 'Error', message: 'Failed to load conversation', type: 'error', timeout: 3000 })
  } finally {
    loadingThread.value = false
  }
}

const sendReply = async () => {
  if (!replyBody.value.trim() || !activeConvo.value) return
  sending.value = true
  try {
    const res = await messagesApi.send({ receiverId: activeConvo.value.partner.id, body: replyBody.value.trim() })
    thread.value.push(res.data.data)
    replyBody.value = ''
    await nextTick()
    if (threadEl.value) threadEl.value.scrollTop = threadEl.value.scrollHeight
    await fetchAllMessages()
  } catch (err) {
    toastStore.showToast({ title: 'Error', message: err?.response?.data?.message ?? 'Failed to send message', type: 'error', timeout: 4000 })
  } finally {
    sending.value = false }
}

// Compose
const openCompose = () => {
  Object.assign(composeForm, { receiverId: '', subject: '', body: '' })
  recipientQuery.value = ''
  recipientResults.value = []
  showCompose.value = true
}

const closeCompose = () => { showCompose.value = false }

const onRecipientInput = () => {
  composeForm.receiverId = ''
  clearTimeout(searchTimeout.value)
  if (!recipientQuery.value.trim()) { recipientResults.value = []; return }
  searchTimeout.value = setTimeout(async () => {
    try {
      const res = await adminApi.searchUsers(recipientQuery.value)
      recipientResults.value = (res.data.data ?? []).filter(u => u.id !== currentUserId.value)
    } catch {}
  }, 300)
}

const selectRecipient = (u) => {
  composeForm.receiverId = u.id
  recipientQuery.value = `${u.firstName} ${u.lastName} (${u.email})`
  recipientResults.value = []
}

const sendCompose = async () => {
  if (!composeForm.receiverId || !composeForm.body.trim()) return
  sending.value = true
  try {
    await messagesApi.send({
      receiverId: composeForm.receiverId,
      body: composeForm.body.trim(),
      ...(composeForm.subject && { subject: composeForm.subject }),
    })
    toastStore.showToast({ title: 'Sent', message: 'Message sent successfully', type: 'success', timeout: 3000 })
    closeCompose()
    await fetchAllMessages()
  } catch (err) {
    toastStore.showToast({ title: 'Error', message: err?.response?.data?.message ?? 'Failed to send message', type: 'error', timeout: 4000 })
  } finally { sending.value = false }
}

onMounted(fetchAllMessages)
</script>

<style lang="scss" scoped></style>
