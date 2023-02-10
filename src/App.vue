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
  <div class="p-8 w-full absolute z-9 flex justify-end">
    <BaseToastNotification
      :title="toastStore.toast.title"
      :intent="toastStore.toast.type"
      :show="toastStore.toast.show"
      :on-dismiss="toastStore.hideToast"
    >
      {{ toastStore.toast.message }}!
    </BaseToastNotification>
  </div>
  <RouterView />
</template>

<style scoped></style>
