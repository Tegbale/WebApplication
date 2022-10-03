<template>
  <div
    class="w-full max-w-xl p-4 bg-white rounded-lg shadow-md flex-col justify-center content-center card__width"
  >
    <slot></slot>
  </div>
</template>

<script setup></script>

<style scoped>
.card__width {
  width: 617px;
}
</style>
