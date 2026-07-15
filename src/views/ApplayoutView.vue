<template>
  <div class="flex mx-auto w-full relative">
    <!-- Sidebar -->
    <aside
      class="fixed inset-y-0 left-0 z-30 flex w-60 flex-col bg-white border-r border-gray-100 transition-transform duration-200"
      :class="isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'"
    >
      <!-- Logo -->
      <div class="flex items-center gap-3 px-5 py-5">
        <div class="flex h-9 w-9 items-center justify-center rounded-full bg-tegbale-blue text-white font-bold font-poppins text-lg">
          T
        </div>
        <span class="text-xl font-bold font-poppins text-tegbale-blue">Tegbale</span>
        <button class="ml-auto rounded-full p-1 text-gray-400 hover:bg-gray-100 md:hidden" @click="isOpen = false">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Nav -->
      <nav class="flex-1 overflow-y-auto px-3 py-4">
        <ul class="space-y-1">
          <li v-for="item in navItems" :key="item.name">
            <router-link
              :to="item.to"
              active-class="bg-tegbale-blue text-white"
              class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-roboto font-normal text-tegbale-text-gray transition-colors hover:bg-tegbale-blue hover:text-white"
            >
              <span class="h-5 w-5 flex-shrink-0" v-html="item.svgPath"></span>
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- Logout -->
      <div class="p-3 mb-4">
        <button
          class="flex items-center gap-3 px-3 py-2.5 text-sm font-roboto text-red-400 hover:text-red-500"
          @click="logout"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          Logout
        </button>
      </div>
    </aside>

    <!-- Mobile overlay -->
    <div v-if="isOpen" class="fixed inset-0 z-20 bg-black/30 md:hidden" @click="isOpen = false"></div>

    <!-- Main content -->
    <div class="flex w-full min-h-screen flex-col flex-grow md:pl-60">
      <!-- Header -->
      <header class="fixed top-0 right-0 left-0 md:left-60 z-20 flex h-16 items-center gap-4 bg-white px-4 md:px-6">
        <!-- Hamburger -->
        <button class="rounded-full p-2 text-gray-500 hover:bg-gray-100 md:hidden" @click="isOpen = true">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
          </svg>
        </button>

        <!-- Search -->
        <div class="relative hidden max-w-xs flex-1 sm:block">
          <svg class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-tegbale-text-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
          </svg>
          <input
            type="text"
            placeholder="Search..."
            class="w-full rounded-full border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm font-roboto text-gray-700 placeholder:text-tegbale-text-gray focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
        </div>

        <div class="ml-auto flex items-center gap-4">
          <!-- Notification bell -->
          <button class="relative p-1 text-gray-500 hover:text-gray-700">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
            </svg>
            <span class="absolute right-0.5 top-0.5 flex h-2 w-2 items-center justify-center rounded-full bg-red-500"></span>
          </button>

          <!-- User info -->
          <div class="flex items-center gap-2">
            <div class="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gray-200">
              <img v-if="userStore.avatar" :src="userStore.avatar" alt="avatar" class="h-full w-full object-cover" />
              <span v-else class="text-sm font-semibold text-gray-600 font-roboto">{{ initials }}</span>
            </div>
            <span class="hidden text-sm font-medium text-tegbale-navy-blue font-roboto md:block">
              {{ userStore.firstName }} {{ userStore.lastName }}
            </span>
          </div>
        </div>
      </header>

      <main class="px-4 pt-20 pb-10 md:px-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUsersStore } from '@/stores/user-store'
import { useRouter } from 'vue-router'

const userStore = useUsersStore()
const router = useRouter()
const isOpen = ref(false)

const initials = computed(() => {
  const f = userStore.firstName?.[0] ?? ''
  const l = userStore.lastName?.[0] ?? ''
  return (f + l).toUpperCase() || 'SA'
})

const logout = async () => {
  await userStore.logout()
  router.push({ name: 'login' })
}

const navItems = [
  {
    name: 'Dashboard',
    to: '/admin/dashboard',
    svgPath: `<svg fill="currentColor" viewBox="0 0 20 20" class="h-5 w-5"><path d="M8.889 20H2.222C1 20 0 19 0 17.778V2.222C0 1 1 0 2.222 0H8.889V20zm2.222 0h6.667C19 20 20 19 20 17.778V10h-8.889V20zM20 7.778V2.222C20 1 19 0 17.778 0H11.111v7.778H20z"/></svg>`,
  },
  {
    name: 'Classrooms',
    to: '/admin/classrooms',
    svgPath: `<svg fill="currentColor" viewBox="0 0 24 24" class="h-5 w-5"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-9 11H7v-2h4v2zm6 0h-4v-2h4v2zm0-4H7V7h10v2z"/></svg>`,
  },
  {
    name: 'Teachers',
    to: '/admin/teachers',
    svgPath: `<svg fill="currentColor" viewBox="0 0 30 20" class="h-5 w-5"><path d="M30 13.25C30 14 28.5 14.5 26.75 14.75 25.625 12.625 23.375 11 20.75 9.875c.25-.375.5-.625.75-1h1C26.375 8.75 30 11.125 30 13.25zM8.5 8.75H7.5C3.625 8.75 0 11.125 0 13.25 0 14 1.5 14.5 3.25 14.75 4.375 12.625 6.625 11 9.25 9.875L8.5 8.75zM15 10c2.75 0 5-2.25 5-5S17.75 0 15 0s-5 2.25-5 5 2.25 5 5 5zm0 1.25C9.875 11.25 5 14.5 5 17.5 5 20 15 20 15 20s10 0 10-2.5c0-3-4.875-6.25-10-6.25z"/></svg>`,
  },
  {
    name: 'Students',
    to: '/admin/students',
    svgPath: `<svg fill="currentColor" viewBox="0 0 24 24" class="h-5 w-5"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/></svg>`,
  },
  {
    name: 'Parents',
    to: '/admin/parents',
    svgPath: `<svg fill="currentColor" viewBox="0 0 24 24" class="h-5 w-5"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`,
  },
  {
    name: 'Staff',
    to: '/admin/users',
    svgPath: `<svg fill="currentColor" viewBox="0 0 24 24" class="h-5 w-5"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>`,
  },
  {
    name: 'Events',
    to: '/admin/events',
    svgPath: `<svg fill="currentColor" viewBox="0 0 24 24" class="h-5 w-5"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>`,
  },
  {
    name: 'Messages',
    to: '/admin/messages',
    svgPath: `<svg fill="currentColor" viewBox="0 0 24 24" class="h-5 w-5"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>`,
  },
  {
    name: 'Notifications',
    to: '/admin/notifications',
    svgPath: `<svg fill="currentColor" viewBox="0 0 24 24" class="h-5 w-5"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>`,
  },
  {
    name: 'My School',
    to: '/admin/schools',
    svgPath: `<svg fill="currentColor" viewBox="0 0 24 24" class="h-5 w-5"><path d="M12 3L1 9l4 2.18V17h2v-4.82l1 .55V17c0 2.21 1.79 4 4 4s4-1.79 4-4v-4.27l2-.55V19h2v-7.82L23 9 12 3zm4 14c0 1.1-.9 2-2 2s-2-.9-2-2v-3.73l4 1.09V17z"/></svg>`,
  },
  {
    name: 'Settings',
    to: '/admin/settings',
    svgPath: `<svg fill="currentColor" viewBox="0 0 24 24" class="h-5 w-5"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>`,
  },
]
</script>

<style lang="scss" scoped></style>
