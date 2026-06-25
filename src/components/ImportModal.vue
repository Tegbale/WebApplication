<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
    <div class="w-full max-w-lg bg-white rounded-2xl shadow-xl">
      <div class="flex items-center justify-between border-b border-gray-100 px-6 py-4">
        <h3 class="text-lg font-semibold text-tegbale-navy-blue font-roboto">Import {{ label }}</h3>
        <button class="rounded-full p-1 text-tegbale-text-gray hover:bg-gray-100" @click="$emit('close')">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <div class="px-6 py-5 space-y-4 font-roboto">
        <!-- Template download -->
        <div class="rounded-xl border border-gray-100 bg-gray-50 p-4">
          <p class="text-xs text-tegbale-text-gray mb-2">Download the CSV template, fill it in, then upload.</p>
          <div class="flex items-center gap-2">
            <p class="text-xs text-gray-600 font-mono flex-1">Columns: <span class="text-tegbale-blue">{{ columns.join(', ') }}</span></p>
            <button @click="downloadTemplate" class="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs text-tegbale-text-gray hover:bg-gray-100 flex-shrink-0">
              <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
              Template
            </button>
          </div>
        </div>

        <!-- File drop zone -->
        <div
          class="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 p-8 transition-colors"
          :class="dragOver ? 'border-tegbale-blue bg-blue-50' : 'hover:border-gray-300'"
          @dragover.prevent="dragOver = true"
          @dragleave="dragOver = false"
          @drop.prevent="onDrop"
        >
          <svg class="h-10 w-10 text-gray-300 mb-3" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
          </svg>
          <p class="text-sm text-tegbale-text-gray text-center mb-2">Drag & drop your file here, or</p>
          <label class="cursor-pointer rounded-full bg-tegbale-blue px-5 py-2 text-sm font-medium text-white hover:bg-blue-600">
            Browse File
            <input ref="fileInput" type="file" accept=".csv,.xlsx,.xls" class="hidden" @change="onFileChange" />
          </label>
          <p class="text-xs text-tegbale-text-gray mt-2">CSV or Excel · max 5MB · max 500 rows</p>
        </div>

        <!-- Selected file -->
        <div v-if="selectedFile" class="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
          <svg class="h-5 w-5 text-tegbale-blue flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
          </svg>
          <div class="flex-1 min-w-0">
            <p class="text-sm text-tegbale-navy-blue truncate">{{ selectedFile.name }}</p>
            <p class="text-xs text-tegbale-text-gray">{{ (selectedFile.size / 1024).toFixed(1) }} KB</p>
          </div>
          <button @click="selectedFile = null" class="text-red-400 hover:text-red-600">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <!-- Results -->
        <div v-if="results" class="rounded-xl border p-4 space-y-2" :class="results.failed > 0 ? 'border-yellow-200 bg-yellow-50' : 'border-green-200 bg-green-50'">
          <div class="flex items-center gap-4 text-sm">
            <span class="text-green-700 font-medium">✓ {{ results.created }} created</span>
            <span v-if="results.failed > 0" class="text-red-600 font-medium">✗ {{ results.failed }} failed</span>
          </div>
          <div v-if="results.errors?.length" class="max-h-32 overflow-y-auto space-y-1">
            <p v-for="e in results.errors" :key="e.row" class="text-xs text-red-600">Row {{ e.row }}: {{ e.message }}</p>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-3 pt-1">
          <button @click="$emit('close')" class="rounded-full bg-gray-400 px-6 py-2.5 text-sm font-roboto font-medium text-white hover:bg-gray-500">
            {{ results ? 'Close' : 'Cancel' }}
          </button>
          <button
            v-if="!results"
            @click="doImport"
            :disabled="!selectedFile || importing"
            class="rounded-full bg-tegbale-blue px-8 py-2.5 text-sm font-roboto font-medium text-white hover:bg-blue-600 disabled:opacity-50"
          >
            {{ importing ? 'Importing...' : 'Import' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  columns: { type: Array, required: true },
  importFn: { type: Function, required: true },
})
const emit = defineEmits(['close', 'done'])

const dragOver = ref(false)
const selectedFile = ref(null)
const importing = ref(false)
const results = ref(null)

function onFileChange(e) {
  selectedFile.value = e.target.files[0] ?? null
}

function onDrop(e) {
  dragOver.value = false
  const file = e.dataTransfer.files[0]
  if (file && /\.(csv|xlsx|xls)$/i.test(file.name)) {
    selectedFile.value = file
  }
}

function downloadTemplate() {
  const header = props.columns.join(',')
  const blob = new Blob([header + '\n'], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${props.label.toLowerCase().replace(/\s+/g, '_')}_template.csv`
  a.click()
  URL.revokeObjectURL(url)
}

async function doImport() {
  if (!selectedFile.value) return
  importing.value = true
  try {
    const formData = new FormData()
    formData.append('file', selectedFile.value)
    const res = await props.importFn(formData)
    results.value = res.data?.data ?? res.data
    if (results.value?.created > 0) emit('done')
  } catch (err) {
    results.value = { created: 0, failed: 1, errors: [{ row: 0, message: err?.response?.data?.message ?? 'Upload failed' }] }
  } finally {
    importing.value = false
  }
}
</script>

<style lang="scss" scoped></style>
