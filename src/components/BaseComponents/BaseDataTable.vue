<template>
  <div class="container mx-auto bg-white w-full rounded-lg mt-10">
    <table class="w-full rounded-lg">
      <thead class="bg-gray-50 border-b-2 border-gray-200">
        <slot name="table-header" />
      </thead>
      <tbody>
        <slot name="table-body" />
      </tbody>
    </table>
  </div>
</template>

<script setup>


</script>

<style lang="scss" scoped></style>
