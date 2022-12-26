<template>
  <Teleport to="body">
    <transition name="modal-outter">
      <div
        v-show="modalActive"
        class="absolute w-full bg-black bg-opacity-40 h-screen top-0 left-0 flex justify-center px-8 z-50"
      >
        <transition name="modal-inner">
          <div
            v-if="modalActive"
            class="bg-white p-4 self-start mt-32 w-2/3 max-w-screen-lg rounded-lg"
          >
            <slot />
          
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
defineEmits(["close-modal"]);
defineProps({
  modalActive: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.modal-outter-enter-active,
.modal-outter-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.01, 0.36, 1.01);
}

.modal-outter-enter-from,
.modal-outter-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.01, 0.36, 1.01) 0.15s;
}

.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.01, 0.36, 1.01);
}

.modal-inner-enter-from {
  transform: scale(0.9);
  opacity: 0;
}

.modal-inner-leave-to {
  transform: scale(0.9);
}
</style>
