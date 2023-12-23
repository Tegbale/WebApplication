<template>
  <label v-if="label" :class="{ 'text-xs': modalInput }">{{ label }}</label>

  <div
    class="relative flex items-center text-gray-300 focus-within:text-tegbale-blue"
    :class="{ 'mt-2': modalInput }"
  >
    <select
      class="border border-gray-300 rounded-2xl leading-5 pr-3 pl-10 py-2 w-full hover:border-gray-400 focus:outline-none focus:border-none focus:ring-1 focus:border-gray-400 text-gray-900"
      v-model="selectedOption"
      @change="$emit('update:modelValue', selectedOption)"
      v-bind="$attrs"
    >
      <option
        v-for="option in options"
        :value="option.value"
        :key="option.value"
      >
        {{ option.value }}
      </option>
    </select>
  </div>
</template>
<script setup>
import { ref, defineProps } from "vue";

const { label, modelValue, modalInput, options } = defineProps([
  "label",
  "modelValue",
  "modalInput",
  "options",
]);

const selectedOption = ref(modelValue);
</script>
