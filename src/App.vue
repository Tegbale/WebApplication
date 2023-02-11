<script setup>
import { RouterView } from "vue-router";
import BaseToastNotification from "@/components/BaseComponents/BaseToastNotification.vue";
import { useToastStore } from "@/stores/toast-store";
import { watch } from "vue";

const toastStore = useToastStore();

// watch the toast store show property and dismiss the toast after 3 seconds
watch(
  () => toastStore.toast.show,
  (show) => {
    if (show) {
      setTimeout(() => {
        toastStore.hideToast();
      }, 3000);
    }
  }
);
</script>

<template>
  <div class="p-8 w-full absolute flex justify-end right-0 bottom-5">
    <BaseToastNotification
      class="animate__animated animate__fadeInUp z-50"
      :title="toastStore.toast.title"
      :intent="toastStore.toast.type"
      :show="toastStore.toast.show"
      :on-dismiss="toastStore.hideToast"
    >
      {{ toastStore.toast.message }}!
    </BaseToastNotification>
  </div>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition || ''" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style scoped>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";

.slide-down-enter-active,
.slide-down-leave-active {
  transition: opacity 0.5s ease-out;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
}
/* 
.slide-down-leave-active {
  transform: translateY(0%);
} */

/* .slide-down-enter-active {
  transform: translateY(0%);
}

.slide-down-leave-active {
  transform: translateY(100%);
}

.slide-down-enter,
.slide-down-leave-to {
  transform: translateY(100%);
}

.slide-down-enter-active {
  transform: translateY(0%);
}

.slide-down-leave-active {
  transform: translateY(-100%);
} */
</style>
