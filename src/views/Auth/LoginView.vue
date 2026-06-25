<template>
  <div class="flex min-h-screen items-center justify-center bg-[#f3f3f3] px-4">
    <div class="w-full max-w-md rounded-2xl bg-white px-10 py-10 shadow-sm">
      <!-- Logo -->
      <div class="flex justify-center mb-6">
        <div class="flex h-14 w-14 items-center justify-center rounded-full bg-tegbale-blue text-white text-2xl font-bold font-poppins">
          T
        </div>
      </div>
      <LoginForm />
    </div>
  </div>
</template>

<script setup>
import LoginForm from "@/views/Auth/components/LoginForm.vue";
</script>

<style lang="scss" scoped></style>
