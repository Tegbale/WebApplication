<template>
  <button :type="type" class="btn__style">{{ btnTitle }}</button>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  type: {
    type: String,
    default: "submit",
  },
  btnTitle: {
    type: String,
    default: "Button",
  },
});
</script>

<style lang="scss" scoped></style>
