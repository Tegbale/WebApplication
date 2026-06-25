<template>
  <div class="comment-thread">
    <!-- Top-level comment -->
    <div class="flex items-start gap-2">
      <div class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-600 font-roboto">
        {{ initials(comment.author) }}
      </div>
      <div class="flex-1 min-w-0">
        <div class="rounded-2xl bg-gray-50 px-3 py-2">
          <p class="text-xs font-semibold text-tegbale-navy-blue font-roboto">
            {{ comment.author.firstName }} {{ comment.author.lastName }}
            <span class="font-normal text-tegbale-text-gray capitalize ml-1">· {{ roleLabel(comment.author.role) }}</span>
          </p>
          <p class="text-sm text-gray-700 font-roboto mt-0.5 whitespace-pre-wrap">{{ comment.content }}</p>
        </div>
        <div class="flex items-center gap-3 mt-1 px-1">
          <span class="text-xs text-tegbale-text-gray font-roboto">{{ formatTime(comment.createdAt) }}</span>
          <button
            @click="$emit('reply', { postId, commentId: comment.id })"
            class="text-xs text-tegbale-blue font-roboto hover:underline"
          >Reply</button>
          <button
            v-if="canDelete"
            @click="$emit('delete', { postId, commentId: comment.id })"
            class="text-xs text-red-400 hover:text-red-600 font-roboto"
          >Delete</button>
        </div>

        <!-- Nested replies -->
        <div v-if="comment.replies?.length" class="mt-2 space-y-2 pl-2 border-l-2 border-gray-100">
          <CommentThread
            v-for="reply in comment.replies"
            :key="reply.id"
            :comment="reply"
            :post-id="postId"
            :current-user="currentUser"
            @reply="$emit('reply', $event)"
            @delete="$emit('delete', $event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  comment: { type: Object, required: true },
  postId: { type: String, required: true },
  currentUser: { type: Object, required: true },
})

defineEmits(['reply', 'delete'])

function initials(author) {
  return ((author.firstName?.[0] ?? '') + (author.lastName?.[0] ?? '')).toUpperCase() || '?'
}

function roleLabel(role) {
  const map = { SCHOOL_ADMIN: 'Admin', STAFF: 'Staff', TEACHER: 'Teacher', PARENT: 'Parent', SUPER_ADMIN: 'Super Admin' }
  return map[role] ?? role
}

function formatTime(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  const now = new Date()
  if (d.toDateString() === now.toDateString()) {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  return d.toLocaleDateString([], { day: '2-digit', month: 'short' })
}

const canDelete = props.currentUser.role === 'SCHOOL_ADMIN' || props.comment.author?.id === props.currentUser.id
</script>

<style lang="scss" scoped>
.comment-thread {}
</style>
