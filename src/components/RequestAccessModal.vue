<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="close"></div>

        <!-- Dialog -->
        <div class="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden">
          <!-- Header -->
          <div class="bg-tegbale-navy-blue px-8 py-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-white/60 text-xs font-roboto mb-1">Tègbalé School Platform</p>
                <h2 class="text-white font-poppins font-bold text-xl">Request School Access</h2>
              </div>
              <button @click="close" class="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
          </div>

          <!-- Success state -->
          <div v-if="submitted" class="px-8 py-10 text-center">
            <div class="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 mx-auto mb-4">
              <svg class="h-8 w-8 text-green-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
            </div>
            <h3 class="font-poppins font-bold text-lg text-tegbale-navy-blue mb-2">Request submitted!</h3>
            <p class="text-sm text-tegbale-text-gray font-roboto leading-relaxed mb-6">
              Thank you! We've received your request for <strong>{{ submittedSchoolName }}</strong>. Check your inbox — we've sent a confirmation email. Our team will review and be in touch within 1–2 business days.
            </p>
            <button @click="close" class="rounded-full bg-tegbale-blue px-8 py-2.5 text-sm font-roboto font-semibold text-white hover:bg-blue-500 transition-colors">
              Done
            </button>
          </div>

          <!-- Form -->
          <form v-else @submit.prevent="handleSubmit" class="px-8 py-6">
            <p class="text-sm text-tegbale-text-gray font-roboto mb-5 leading-relaxed">
              Fill in your school's details and we'll reach out to set up your account.
            </p>

            <div class="flex flex-col gap-3">
              <!-- School name -->
              <div>
                <input
                  v-model="form.schoolName"
                  type="text"
                  placeholder="School name *"
                  class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-roboto text-gray-700 placeholder:text-tegbale-text-gray focus:border-tegbale-blue focus:outline-none focus:ring-2 focus:ring-tegbale-blue/20"
                  :class="{ 'border-red-400': v$.schoolName.$error }"
                  @blur="v$.schoolName.$touch()"
                />
                <p v-if="v$.schoolName.$error" class="mt-1 pl-1 text-xs text-red-500">{{ v$.schoolName.$errors[0].$message }}</p>
              </div>

              <!-- First + Last name -->
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <input
                    v-model="form.contactFirstName"
                    type="text"
                    placeholder="First name *"
                    class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-roboto text-gray-700 placeholder:text-tegbale-text-gray focus:border-tegbale-blue focus:outline-none focus:ring-2 focus:ring-tegbale-blue/20"
                    :class="{ 'border-red-400': v$.contactFirstName.$error }"
                    @blur="v$.contactFirstName.$touch()"
                  />
                  <p v-if="v$.contactFirstName.$error" class="mt-1 pl-1 text-xs text-red-500">Required</p>
                </div>
                <div>
                  <input
                    v-model="form.contactLastName"
                    type="text"
                    placeholder="Last name *"
                    class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-roboto text-gray-700 placeholder:text-tegbale-text-gray focus:border-tegbale-blue focus:outline-none focus:ring-2 focus:ring-tegbale-blue/20"
                    :class="{ 'border-red-400': v$.contactLastName.$error }"
                    @blur="v$.contactLastName.$touch()"
                  />
                  <p v-if="v$.contactLastName.$error" class="mt-1 pl-1 text-xs text-red-500">Required</p>
                </div>
              </div>

              <!-- Email -->
              <div>
                <input
                  v-model="form.contactEmail"
                  type="email"
                  placeholder="Your email address *"
                  class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-roboto text-gray-700 placeholder:text-tegbale-text-gray focus:border-tegbale-blue focus:outline-none focus:ring-2 focus:ring-tegbale-blue/20"
                  :class="{ 'border-red-400': v$.contactEmail.$error }"
                  @blur="v$.contactEmail.$touch()"
                />
                <p v-if="v$.contactEmail.$error" class="mt-1 pl-1 text-xs text-red-500">{{ v$.contactEmail.$errors[0].$message }}</p>
              </div>

              <!-- Phone -->
              <input
                v-model="form.contactPhone"
                type="tel"
                placeholder="Phone number (optional)"
                class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-roboto text-gray-700 placeholder:text-tegbale-text-gray focus:border-tegbale-blue focus:outline-none focus:ring-2 focus:ring-tegbale-blue/20"
              />

              <!-- City + Country -->
              <div class="grid grid-cols-2 gap-3">
                <input
                  v-model="form.city"
                  type="text"
                  placeholder="City (optional)"
                  class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-roboto text-gray-700 placeholder:text-tegbale-text-gray focus:border-tegbale-blue focus:outline-none focus:ring-2 focus:ring-tegbale-blue/20"
                />
                <input
                  v-model="form.country"
                  type="text"
                  placeholder="Country (optional)"
                  class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-roboto text-gray-700 placeholder:text-tegbale-text-gray focus:border-tegbale-blue focus:outline-none focus:ring-2 focus:ring-tegbale-blue/20"
                />
              </div>

              <!-- Message -->
              <textarea
                v-model="form.message"
                rows="3"
                placeholder="Anything else you'd like us to know? (optional)"
                class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-roboto text-gray-700 placeholder:text-tegbale-text-gray focus:border-tegbale-blue focus:outline-none focus:ring-2 focus:ring-tegbale-blue/20 resize-none"
              ></textarea>

              <!-- Documents -->
              <div class="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4">
                <p class="text-xs font-semibold font-roboto text-tegbale-navy-blue mb-3">Required Documents</p>
                <div class="space-y-3">
                  <!-- CAC -->
                  <div>
                    <label class="text-xs font-roboto text-tegbale-text-gray block mb-1">
                      CAC Certificate <span class="text-red-500">*</span>
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-roboto text-tegbale-text-gray hover:border-tegbale-blue transition-colors"
                      :class="{ 'border-red-400': cacError }">
                      <svg class="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                      <span class="truncate">{{ cacFile ? cacFile.name : 'Upload CAC document (PDF or image)' }}</span>
                      <input type="file" class="hidden" accept=".pdf,.jpg,.jpeg,.png" @change="(e) => onFileChange(e, 'cac')" />
                    </label>
                    <p v-if="cacError" class="mt-1 pl-1 text-xs text-red-500">CAC certificate is required</p>
                  </div>
                  <!-- Govt Approval -->
                  <div>
                    <label class="text-xs font-roboto text-tegbale-text-gray block mb-1">
                      Government Approval Document <span class="text-red-500">*</span>
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-roboto text-tegbale-text-gray hover:border-tegbale-blue transition-colors"
                      :class="{ 'border-red-400': govtError }">
                      <svg class="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                      <span class="truncate">{{ govtFile ? govtFile.name : 'Upload govt. approval doc (PDF or image)' }}</span>
                      <input type="file" class="hidden" accept=".pdf,.jpg,.jpeg,.png" @change="(e) => onFileChange(e, 'govt')" />
                    </label>
                    <p v-if="govtError" class="mt-1 pl-1 text-xs text-red-500">Government approval document is required</p>
                  </div>
                </div>
              </div>
            </div>

            <p v-if="errorMessage" class="mt-3 text-xs text-red-500 font-roboto">{{ errorMessage }}</p>

            <div class="flex items-center justify-end gap-3 mt-5">
              <button type="button" @click="close" class="rounded-full border border-gray-200 px-6 py-2.5 text-sm font-roboto text-tegbale-text-gray hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button
                type="submit"
                :disabled="isLoading"
                class="flex items-center gap-2 rounded-full bg-tegbale-blue px-7 py-2.5 text-sm font-roboto font-semibold text-white hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                <svg v-if="isLoading" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>
                <span>{{ isLoading ? 'Submitting…' : 'Submit Request' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import schoolRequestsApi from '@/api/schoolRequests'

const props = defineProps({ show: Boolean })
const emit = defineEmits(['close'])

const form = reactive({
  schoolName: '',
  contactFirstName: '',
  contactLastName: '',
  contactEmail: '',
  contactPhone: '',
  city: '',
  country: '',
  message: '',
})

const cacFile = ref(null)
const govtFile = ref(null)
const cacError = ref(false)
const govtError = ref(false)

const isLoading = ref(false)
const submitted = ref(false)
const submittedSchoolName = ref('')
const errorMessage = ref('')

const rules = {
  schoolName: { required },
  contactFirstName: { required },
  contactLastName: { required },
  contactEmail: { required, email },
}
const v$ = useVuelidate(rules, form)

const onFileChange = (event, type) => {
  const file = event.target.files[0] ?? null
  if (type === 'cac') { cacFile.value = file; cacError.value = false }
  else { govtFile.value = file; govtError.value = false }
}

const handleSubmit = async () => {
  const valid = await v$.value.$validate()
  cacError.value = !cacFile.value
  govtError.value = !govtFile.value
  if (!valid || cacError.value || govtError.value) return

  isLoading.value = true
  errorMessage.value = ''
  try {
    const fd = new FormData()
    fd.append('schoolName', form.schoolName)
    fd.append('contactFirstName', form.contactFirstName)
    fd.append('contactLastName', form.contactLastName)
    fd.append('contactEmail', form.contactEmail)
    if (form.contactPhone) fd.append('contactPhone', form.contactPhone)
    if (form.city) fd.append('city', form.city)
    if (form.country) fd.append('country', form.country)
    if (form.message) fd.append('message', form.message)
    fd.append('cacDocument', cacFile.value)
    fd.append('govtDocument', govtFile.value)

    await schoolRequestsApi.submit(fd)
    submittedSchoolName.value = form.schoolName
    submitted.value = true
  } catch (err) {
    errorMessage.value = typeof err === 'string' ? err : 'Something went wrong. Please try again.'
  } finally {
    isLoading.value = false
  }
}

const close = () => {
  emit('close')
  setTimeout(() => {
    submitted.value = false
    errorMessage.value = ''
    cacFile.value = null
    govtFile.value = null
    cacError.value = false
    govtError.value = false
    v$.value.$reset()
    Object.assign(form, { schoolName: '', contactFirstName: '', contactLastName: '', contactEmail: '', contactPhone: '', city: '', country: '', message: '' })
  }, 300)
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .relative {
  transform: scale(0.95) translateY(8px);
  opacity: 0;
}
</style>
