<template>
  <div class="pt-4">
    <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
      <h1 class="text-3xl font-normal text-tegbale-navy-blue font-roboto">Posts</h1>
      <button
        class="flex items-center gap-2 rounded-full bg-tegbale-blue px-5 py-2.5 text-sm font-roboto font-medium text-white hover:bg-blue-600"
        @click="showCreate = true"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
        </svg>
        New Post
      </button>
    </div>

    <!-- Loading skeleton -->
    <div v-if="loading && !posts.length" class="space-y-4">
      <div v-for="i in 4" :key="i" class="h-36 rounded-2xl bg-white animate-pulse" />
    </div>

    <div v-else-if="!posts.length" class="flex flex-col items-center justify-center py-24 gap-3 text-tegbale-text-gray bg-white rounded-2xl shadow-sm">
      <svg class="h-12 w-12 opacity-30" fill="none" stroke="currentColor" stroke-width="1.2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2z"/>
      </svg>
      <p class="font-roboto text-sm">No posts yet. Be the first to post!</p>
    </div>

    <!-- Feed -->
    <div v-else class="space-y-4">
      <div v-for="post in posts" :key="post.id" class="bg-white rounded-2xl shadow-sm overflow-hidden">
        <!-- Post header -->
        <div class="flex items-start gap-3 px-5 pt-5 pb-3">
          <div class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-tegbale-blue/10 text-tegbale-blue text-sm font-semibold font-roboto">
            {{ initials(post.author) }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-roboto font-medium text-tegbale-navy-blue">{{ post.author.firstName }} {{ post.author.lastName }}</p>
            <p class="text-xs text-tegbale-text-gray font-roboto">{{ post.author.role }} · {{ formatDate(post.createdAt) }}</p>
          </div>
          <button
            v-if="canDeletePost(post)"
            class="rounded-full p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600"
            title="Delete post"
            @click="deletePost(post)"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
        </div>

        <!-- Post content -->
        <p class="px-5 pb-4 text-sm font-roboto text-gray-700 leading-relaxed whitespace-pre-line">{{ post.content }}</p>

        <!-- Comment toggle -->
        <div class="border-t border-gray-50 px-5 py-2.5 flex items-center gap-3">
          <button
            class="flex items-center gap-1.5 text-xs font-roboto text-tegbale-text-gray hover:text-tegbale-blue transition-colors"
            @click="toggleComments(post.id)"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
            {{ post._count?.comments ?? 0 }} comment{{ post._count?.comments !== 1 ? 's' : '' }}
          </button>
        </div>

        <!-- Comments section -->
        <div v-if="openPostId === post.id" class="border-t border-gray-50 bg-gray-50/50">
          <div v-if="commentsLoading[post.id]" class="px-5 py-4 space-y-2">
            <div v-for="i in 2" :key="i" class="h-10 rounded-xl bg-gray-100 animate-pulse" />
          </div>
          <div v-else class="px-5 py-3 space-y-3">
            <div v-if="!comments[post.id]?.length" class="text-xs text-tegbale-text-gray font-roboto py-2">No comments yet.</div>
            <div v-for="c in comments[post.id]" :key="c.id" class="flex gap-2.5">
              <div class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-tegbale-blue/10 text-tegbale-blue text-xs font-semibold font-roboto">
                {{ initials(c.author) }}
              </div>
              <div class="flex-1 min-w-0 bg-white rounded-2xl px-3.5 py-2.5 shadow-xs">
                <div class="flex items-center justify-between gap-2">
                  <p class="text-xs font-roboto font-medium text-tegbale-navy-blue">{{ c.author.firstName }} {{ c.author.lastName }}</p>
                  <button
                    v-if="canDeleteComment(c)"
                    class="text-red-300 hover:text-red-500"
                    @click="deleteComment(post.id, c.id)"
                  >
                    <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
                <p class="text-xs font-roboto text-gray-600 mt-0.5 leading-relaxed">{{ c.content }}</p>
              </div>
            </div>

            <!-- Reply box -->
            <div class="flex gap-2.5 pt-1">
              <div class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-tegbale-blue text-white text-xs font-semibold font-roboto">
                {{ userInitials }}
              </div>
              <div class="flex flex-1 items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5">
                <input
                  v-model="commentInput[post.id]"
                  type="text"
                  placeholder="Write a comment…"
                  class="flex-1 text-xs font-roboto text-gray-700 placeholder:text-tegbale-text-gray focus:outline-none bg-transparent"
                  @keydown.enter.prevent="submitComment(post.id)"
                />
                <button
                  :disabled="!commentInput[post.id]?.trim() || commentSending[post.id]"
                  class="text-tegbale-blue hover:text-blue-700 disabled:opacity-40"
                  @click="submitComment(post.id)"
                >
                  <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex items-center justify-between bg-white rounded-2xl shadow-sm px-6 py-4">
        <p class="text-sm text-tegbale-text-gray font-roboto">{{ total }} post{{ total !== 1 ? 's' : '' }}</p>
        <div class="flex gap-2">
          <button :disabled="page <= 1" @click="changePage(page - 1)" class="rounded-full border border-gray-200 px-4 py-1.5 text-sm font-roboto text-tegbale-text-gray hover:bg-gray-50 disabled:opacity-40">Prev</button>
          <span class="flex items-center px-3 text-sm font-roboto text-tegbale-text-gray">{{ page }} / {{ totalPages }}</span>
          <button :disabled="page >= totalPages" @click="changePage(page + 1)" class="rounded-full border border-gray-200 px-4 py-1.5 text-sm font-roboto text-tegbale-text-gray hover:bg-gray-50 disabled:opacity-40">Next</button>
        </div>
      </div>
    </div>

    <!-- Delete Confirm -->
    <ConfirmModal
      :open="!!deleteTarget"
      title="Delete this post?"
      message="This post and all its comments will be permanently removed."
      :loading="deleteLoading"
      @confirm="confirmDeletePost"
      @cancel="deleteTarget = null"
    />

    <!-- Create Post Modal -->
    <div v-if="showCreate" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div class="w-full max-w-lg bg-white rounded-2xl shadow-xl">
        <div class="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h3 class="text-lg font-semibold text-tegbale-navy-blue font-roboto">New Post</h3>
          <button class="rounded-full p-1 text-tegbale-text-gray hover:bg-gray-100" @click="showCreate = false">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div class="px-6 py-5 space-y-4 text-sm font-roboto">
          <div class="flex flex-col gap-1">
            <label class="text-xs text-tegbale-text-gray">Content <span class="text-red-400">*</span></label>
            <textarea
              v-model="newContent"
              rows="5"
              placeholder="Share something with your school… Use @firstname or @firstname.lastname to mention someone."
              class="rounded-2xl border border-gray-200 px-4 py-2.5 text-gray-700 placeholder:text-tegbale-text-gray focus:border-tegbale-blue focus:outline-none focus:ring-1 focus:ring-tegbale-blue/20 resize-none"
            />
            <span v-if="createError" class="text-xs text-red-500 pl-2">{{ createError }}</span>
          </div>
          <div class="flex justify-end gap-3 pt-1">
            <button @click="showCreate = false" class="rounded-full bg-gray-400 px-6 py-2.5 text-sm font-roboto font-medium text-white hover:bg-gray-500">Cancel</button>
            <button :disabled="creating" @click="createPost" class="rounded-full bg-tegbale-blue px-8 py-2.5 text-sm font-roboto font-medium text-white hover:bg-blue-600 disabled:opacity-50">
              {{ creating ? 'Posting…' : 'Post' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { useUsersStore } from '@/stores/user-store'
import { useToastStore } from '@/stores/toast-store'
import postsApi from '@/api/posts'
import ConfirmModal from '@/components/BaseComponents/ConfirmModal.vue'

const userStore = useUsersStore()
const toastStore = useToastStore()

const posts = ref([])
const loading = ref(false)
const total = ref(0)
const page = ref(1)
const limit = 20
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / limit)))

const showCreate = ref(false)
const newContent = ref('')
const createError = ref('')
const creating = ref(false)
const deleteTarget = ref(null)
const deleteLoading = ref(false)

const openPostId = ref(null)
const comments = reactive({})
const commentsLoading = reactive({})
const commentInput = reactive({})
const commentSending = reactive({})

const userInitials = computed(() => {
  const f = userStore.firstName?.[0] ?? ''
  const l = userStore.lastName?.[0] ?? ''
  return (f + l).toUpperCase() || 'ME'
})

const initials = (author) => {
  const f = author?.firstName?.[0] ?? ''
  const l = author?.lastName?.[0] ?? ''
  return (f + l).toUpperCase() || '?'
}

const formatDate = (d) => d
  ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  : ''

const canDeletePost = (post) =>
  userStore.role === 'SCHOOL_ADMIN' || post.author?.id === userStore.userId

const canDeleteComment = (comment) =>
  userStore.role === 'SCHOOL_ADMIN' || comment.author?.id === userStore.userId

const fetch = async () => {
  loading.value = true
  try {
    const res = await postsApi.getPosts({ page: page.value, limit })
    posts.value = res.data.data ?? []
    total.value = res.data.meta?.total ?? posts.value.length
  } catch {
    toastStore.showToast({ title: 'Error', message: 'Failed to load posts', type: 'error', timeout: 3000 })
  } finally { loading.value = false }
}

const changePage = (p) => { page.value = p; fetch() }

const createPost = async () => {
  createError.value = ''
  if (!newContent.value.trim()) { createError.value = 'Content is required'; return }
  creating.value = true
  try {
    const res = await postsApi.createPost({ content: newContent.value.trim() })
    posts.value.unshift(res.data.data)
    total.value += 1
    newContent.value = ''
    showCreate.value = false
    toastStore.showToast({ title: 'Posted', message: 'Your post is live', type: 'success', timeout: 3000 })
  } catch {
    toastStore.showToast({ title: 'Error', message: 'Failed to create post', type: 'error', timeout: 3000 })
  } finally { creating.value = false }
}

const deletePost = (post) => { deleteTarget.value = post }

const confirmDeletePost = async () => {
  if (!deleteTarget.value) return
  deleteLoading.value = true
  try {
    await postsApi.deletePost(deleteTarget.value.id)
    posts.value = posts.value.filter(p => p.id !== deleteTarget.value.id)
    total.value -= 1
    if (openPostId.value === deleteTarget.value.id) openPostId.value = null
    deleteTarget.value = null
    toastStore.showToast({ title: 'Deleted', message: 'Post removed', type: 'success', timeout: 3000 })
  } catch {
    toastStore.showToast({ title: 'Error', message: 'Failed to delete post', type: 'error', timeout: 3000 })
  } finally { deleteLoading.value = false }
}

const toggleComments = async (postId) => {
  if (openPostId.value === postId) { openPostId.value = null; return }
  openPostId.value = postId
  if (comments[postId]) return
  commentsLoading[postId] = true
  try {
    const res = await postsApi.getComments(postId)
    comments[postId] = res.data.data ?? []
  } catch {
    toastStore.showToast({ title: 'Error', message: 'Failed to load comments', type: 'error', timeout: 3000 })
  } finally { commentsLoading[postId] = false }
}

const submitComment = async (postId) => {
  const content = commentInput[postId]?.trim()
  if (!content || commentSending[postId]) return
  commentSending[postId] = true
  try {
    const res = await postsApi.createComment(postId, { content })
    if (!comments[postId]) comments[postId] = []
    comments[postId].push(res.data.data)
    commentInput[postId] = ''
    const post = posts.value.find(p => p.id === postId)
    if (post?._count) post._count.comments += 1
  } catch {
    toastStore.showToast({ title: 'Error', message: 'Failed to post comment', type: 'error', timeout: 3000 })
  } finally { commentSending[postId] = false }
}

const deleteComment = async (postId, commentId) => {
  try {
    await postsApi.deleteComment(postId, commentId)
    comments[postId] = comments[postId].filter(c => c.id !== commentId)
    const post = posts.value.find(p => p.id === postId)
    if (post?._count) post._count.comments -= 1
  } catch {
    toastStore.showToast({ title: 'Error', message: 'Failed to delete comment', type: 'error', timeout: 3000 })
  }
}

onMounted(fetch)
</script>

<style lang="scss" scoped></style>
