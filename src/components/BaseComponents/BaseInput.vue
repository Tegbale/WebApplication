<template>
  <label v-if="label">{{ label }}</label>

  <div
    class="relative flex items-center text-gray-300 focus-within:text-tegbale-blue"
  >
    <input
      class="border border-gray-300 rounded-2xl leading-5 pr-3 pl-10 py-4 w-full hover:border-gray-400 focus:outline-none focus:border-none focus:ring-1 focus:border-gray-400 placeholder:text-[12px] placeholder:tracking-wide placeholder:opacity-50 placeholder:content-center text-gray-900"
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
    />
    <div class="absolute w-10 block ml-2 mr-2">
      <slot name="icon" v-if="withIcon"></slot>
    </div>
    <div class="absolute w-10 block ml-2 mr-2">
      <slot name="icon" v-if="withIcon"></slot>
    </div>
    <div class="flex absolute right-0 mr-3" v-if="isPassword">
      <slot name="password"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: [String, Boolean],
    default: false,
  },
  modelValue: {
    type: String,
    default: "",
  },
  withIcon: {
    type: Boolean,
    default: false,
  },
  isPassword: {
    type: Boolean,
    default: false,
  },
});


</script>

<style scoped>
.input-wrap {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.input-wrap input {
  padding: 8px;
  font-size: 16px;
}
</style>
