<script setup>
// Imports
import { RouterView } from "vue-router";
import { watch, ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useToastStore } from "@/stores/toast-store";
import AdminlayoutView from "@/views/AdminlayoutView.vue";
import SchoollayoutView from "@/views/SchoollayoutView.vue";
import BaseToastNotification from "@/components/BaseComponents/BaseToastNotification.vue";
import { useAuthStore } from "@/stores/auth";

// Variables
const toastStore = useToastStore();
const authStore = useAuthStore();

const noNavRoutes = ref(["home", "login", "register"]);
const route = useRoute();

// Computed Properties
const allowRoutes = computed(() => {
  return !noNavRoutes.value.includes(route.name);
});

// Watchers
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

onMounted(() => {
  console.log(authStore.authUserRole);
});
</script>

<template>
  <div class="toast-container">
    <BaseToastNotification
      :class="[
        'animate__animated',
        'animate__fadeInUp',
        'z-50',
        toastStore.toast.show && 'visible',
      ]"
      :title="toastStore.toast.title"
      :intent="toastStore.toast.type"
      :show="toastStore.toast.show"
      :on-dismiss="toastStore.hideToast"
    >
      {{ toastStore.toast.message }}!
    </BaseToastNotification>
  </div>

  <template v-if="allowRoutes">
    <AdminlayoutView v-if="authStore.authUserRole === 'superadmin'">
      <router-view />
    </AdminlayoutView>

    <SchoollayoutView v-else-if="authStore.authUserRole === 'schooladmin'">
      <div
        v-if="authStore.authUserEmailVerification === null"
        class="absolute flex items-center mr-8 sm:mt-10 p-4 mb-4 text-sm sm:text-base text-blue-800 border border-blue-300 rounded-lg bg-blue-50 z-50"
        role="alert"
      >
        <svg
          class="flex-shrink-0 inline w-4 h-4 mr-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
          />
        </svg>
        <span class="sr-only">Info</span>
        <div>
          <span class="font-medium">Info alert!</span> It seems you have not
          verified your email. please if you didn't receive any email,
          <span class="font-semibold underline cursor-pointer">click Here</span>
          to resend
        </div>
      </div>
      <router-view />
    </SchoollayoutView>
  </template>

  <template v-else>
    <router-view />
  </template>
</template>

<style scoped>
@import "https://cdn.jsdelivr.net/npm/animate.css@4.1.1";

.toast-container {
  position: absolute;
  bottom: 5%;
  right: 0;
  padding: 8px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.visible {
  animation-duration: 0.5s;
  animation-fill-mode: both;
  animation-name: fadeInUp;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
</style>
