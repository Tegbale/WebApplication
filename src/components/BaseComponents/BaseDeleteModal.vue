<template>
  <Teleport to="body">
    <transition name="modal-outter">
      <div
        v-show="modalActive"
        class="fixed inset-0 h-full w-full bg-black bg-opacity-70 flex justify-center items-center px-8 z-40"
      >
        <transition name="modal-inner">
          <div
            v-if="modalActive"
            class="bg-white p-10 w-full rounded-lg  overflow-y-auto max-w-xl"
            
            v-on-click-outside="closeMode"
          >
            <div class="w-full">
              <slot name="title" />
            </div>
            <div class="w-full">
              <slot name="form" />
            </div>
            <div class="w-full">
              <slot name="button" />
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { vOnClickOutside } from "@vueuse/components";

// defineEmits(["close-modal"]);
defineProps({
  modalActive: {
    type: Boolean,
    default: false,
  },

  closeMode: {
    type: Function,
    default: () => {},
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
