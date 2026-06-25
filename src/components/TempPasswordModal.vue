<template>
  <div class="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl">
      <div class="flex items-center justify-between border-b border-gray-100 px-6 py-4">
        <h3 class="text-lg font-semibold text-tegbale-navy-blue font-roboto">Account Created</h3>
        <button class="rounded-full p-1 text-tegbale-text-gray hover:bg-gray-100" @click="$emit('close')">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="px-6 py-5 space-y-4 font-roboto">
        <div class="flex items-center gap-3 rounded-xl bg-green-50 border border-green-200 px-4 py-3">
          <svg class="h-5 w-5 flex-shrink-0 text-green-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <p class="text-sm text-green-700">{{ name }} has been created successfully.</p>
        </div>

        <div>
          <p class="text-xs text-tegbale-text-gray mb-1.5">Temporary Password</p>
          <div class="flex items-center gap-2">
            <code class="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-mono tracking-widest text-tegbale-navy-blue select-all">
              {{ password }}
            </code>
            <button
              @click="copy"
              class="flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-2 text-xs font-roboto text-tegbale-text-gray hover:bg-gray-50 transition-colors flex-shrink-0"
              :class="copied ? 'border-green-300 text-green-600' : ''"
            >
              <svg v-if="!copied" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
              <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
              {{ copied ? 'Copied' : 'Copy' }}
            </button>
          </div>
        </div>

        <p class="text-xs text-tegbale-text-gray leading-relaxed">
          Share this password securely with the user. They should change it after signing in for the first time.
        </p>

        <div class="flex justify-end pt-1">
          <button @click="$emit('close')" class="rounded-full bg-tegbale-blue px-8 py-2.5 text-sm font-roboto font-medium text-white hover:bg-blue-600">
            Done
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  password: { type: String, required: true },
  name: { type: String, default: 'The account' },
})
defineEmits(['close'])

const copied = ref(false)

async function copy() {
  try {
    await navigator.clipboard.writeText(props.password)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {}
}
</script>

<style lang="scss" scoped></style>
