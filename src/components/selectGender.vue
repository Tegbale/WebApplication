<template>
    <div>
        <label class="text-xs">Gender</label>
        <select v-model="selectedValue" @change="updateValue"
            class="border border-gray-300 rounded-2xl leading-5 mt-2 pr-3 pl-10 py-2 w-full hover:border-gray-400 focus:outline-none focus:border-none focus:ring-1 focus:border-gray-400 placeholder:text-[12px] placeholder:tracking-wide placeholder:opacity-50 placeholder:content-center text-black">
            <option selected disabled value="">Select A Gender</option>
            <option v-for="gender in genderArray" :value="gender.value" :key="gender.text">{{ gender.text }}</option>
        </select>
        <span v-if="errors && errors.gender && errors.gender.length > 0" class="text-red-500 text-sm pl-4">
            {{ errors.gender[0] }}
        </span>
    </div>
</template>
    
<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    errors: {
        type: Object,
        default: null
    }
});

const emits = defineEmits(['update:modelValue']);

const selectedValue = ref(props.modelValue);

watch(
    () => props.modelValue,
    (newValue) => {
        selectedValue.value = newValue;
    }
);

const genderArray = [
    { text: "Male", value: "male" },
    { text: "Female", value: "female" },
];

function updateValue(event) {
    const newValue = event.target.value;
    emits('update:modelValue', newValue);
}
</script>
    
<style scoped>
/* Add your scoped styles here */
</style>
  