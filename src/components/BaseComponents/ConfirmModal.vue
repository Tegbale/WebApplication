<template>
  <Teleport to="body">
    <Transition name="overlay">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-end justify-center bg-black/50 px-4 pb-6 sm:items-center sm:pb-0"
        @click.self="$emit('cancel')"
        @keydown.esc.window="$emit('cancel')"
      >
        <Transition name="panel">
          <div
            v-if="open"
            class="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
            role="alertdialog"
            aria-modal="true"
            :aria-labelledby="titleId"
            :aria-describedby="messageId"
          >
            <!-- Icon -->
            <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
              <svg class="h-6 w-6 text-red-500" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </div>

            <!-- Text -->
            <div class="text-center">
              <h3 :id="titleId" class="text-base font-semibold text-tegbale-navy-blue font-roboto">
                {{ title }}
              </h3>
              <p :id="messageId" class="mt-1.5 text-sm text-tegbale-text-gray font-roboto break-words">
                {{ message }}
              </p>
            </div>

            <!-- Buttons -->
            <div class="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-center">
              <button
                type="button"
                class="w-full rounded-full border border-gray-200 bg-white px-6 py-2.5 text-sm font-roboto font-medium text-gray-600 hover:bg-gray-50 sm:w-auto"
                @click="$emit('cancel')"
              >
                Cancel
              </button>
              <button
                type="button"
                :disabled="loading"
                class="w-full rounded-full bg-red-500 px-6 py-2.5 text-sm font-roboto font-medium text-white hover:bg-red-600 disabled:opacity-50 sm:w-auto"
                @click="$emit('confirm')"
              >
                {{ loading ? 'Deleting…' : confirmLabel }}
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: 'Delete this item?' },
  message: { type: String, default: 'This action cannot be undone.' },
  confirmLabel: { type: String, default: 'Delete' },
  loading: { type: Boolean, default: false },
})

defineEmits(['confirm', 'cancel'])

const uid = Math.random().toString(36).slice(2, 7)
const titleId = computed(() => `confirm-title-${uid}`)
const messageId = computed(() => `confirm-msg-${uid}`)
</script>

<style scoped>
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.2s ease;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.panel-enter-active {
  transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.18s ease;
}
.panel-leave-active {
  transition: transform 0.16s ease, opacity 0.16s ease;
}
.panel-enter-from {
  transform: scale(0.92) translateY(8px);
  opacity: 0;
}
.panel-leave-to {
  transform: scale(0.95);
  opacity: 0;
}
</style>
