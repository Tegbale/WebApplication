<template>
  <div class="min-h-screen bg-white text-tegbale-navy-blue overflow-x-hidden">
    <RequestAccessModal :show="showModal" @close="showModal = false" />

    <!-- Navbar -->
    <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" :class="scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'">
      <div class="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <!-- Logo -->
        <div class="flex items-center gap-2.5">
          <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-tegbale-blue text-white text-lg font-bold font-poppins shadow-md">T</div>
          <span class="text-xl font-bold font-poppins" :class="scrolled ? 'text-tegbale-navy-blue' : 'text-white'">Tègbalé</span>
        </div>
        <!-- Nav links -->
        <div class="hidden md:flex items-center gap-8">
          <a v-for="link in navLinks" :key="link.label" :href="link.href" class="text-sm font-roboto font-medium transition-colors" :class="scrolled ? 'text-tegbale-text-gray hover:text-tegbale-navy-blue' : 'text-white/80 hover:text-white'">{{ link.label }}</a>
        </div>
        <!-- CTA -->
        <div class="flex items-center gap-3">
          <template v-if="userStore.isAuthenticated">
            <router-link to="/admin/dashboard" class="flex items-center gap-2 rounded-full bg-tegbale-blue px-5 py-2 text-sm font-roboto font-semibold text-white hover:bg-blue-600 transition-colors shadow-md shadow-blue-200">
              Go to Dashboard
              <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
            </router-link>
          </template>
          <template v-else>
            <router-link to="/login" class="text-sm font-roboto font-medium transition-colors" :class="scrolled ? 'text-tegbale-navy-blue hover:text-tegbale-blue' : 'text-white/90 hover:text-white'">Sign in</router-link>
            <button @click="showModal = true" class="rounded-full bg-tegbale-blue px-5 py-2 text-sm font-roboto font-semibold text-white hover:bg-blue-600 transition-colors shadow-md shadow-blue-200">
              Get Started
            </button>
          </template>
        </div>
      </div>
    </nav>

    <!-- Hero -->
    <section class="relative min-h-screen flex items-center bg-tegbale-navy-blue overflow-hidden">
      <!-- Background layers -->
      <div class="absolute inset-0 bg-gradient-to-br from-tegbale-navy-blue via-[#1e2666] to-[#0d1240]"></div>
      <!-- Decorative blobs -->
      <div class="absolute -top-32 -right-32 h-[600px] w-[600px] rounded-full bg-tegbale-blue/10 blur-3xl"></div>
      <div class="absolute -bottom-40 -left-20 h-[500px] w-[500px] rounded-full bg-tegbale-purple/10 blur-3xl"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-tegbale-blue/5 blur-3xl"></div>
      <!-- Grid pattern overlay -->
      <div class="absolute inset-0 opacity-[0.04]" style="background-image: linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px); background-size: 48px 48px;"></div>

      <!-- Floating faint icon pills -->
      <div v-for="pill in heroPills" :key="pill.label" class="hero-pill absolute flex items-center gap-2.5 rounded-full border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm px-4 py-2.5 select-none pointer-events-none opacity-40" :style="pill.style">
        <div class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full" :style="`background: ${pill.color}25`">
          <svg class="h-3.5 w-3.5" :style="`color: ${pill.color}`" fill="currentColor" viewBox="0 0 24 24" v-html="pill.icon"></svg>
        </div>
        <div>
          <p class="text-white text-xs font-roboto font-medium leading-none">{{ pill.label }}</p>
          <p class="text-white/40 text-[10px] font-roboto mt-0.5 leading-none">{{ pill.sub }}</p>
        </div>
      </div>

      <div class="relative max-w-6xl mx-auto px-6 pt-28 pb-20 w-full">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Left: copy -->
          <div>
            <div class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-6">
              <span class="h-1.5 w-1.5 rounded-full bg-tegbale-green animate-pulse"></span>
              <span class="text-xs font-roboto text-white/70">School Management Platform</span>
            </div>
            <h1 class="text-4xl sm:text-5xl xl:text-6xl font-bold font-poppins text-white leading-tight mb-6">
              Your School<br/>
              <span class="text-tegbale-blue">in Your Pocket</span>
            </h1>
            <p class="text-base sm:text-lg text-white/60 font-roboto leading-relaxed mb-8 max-w-lg">
              Tègbalé brings together students, teachers, parents and administrators on one intelligent platform — so you can spend less time on admin and more time on education.
            </p>
            <div class="flex flex-wrap items-center gap-3">
              <button @click="showModal = true" class="flex items-center gap-2 rounded-full bg-tegbale-blue px-7 py-3.5 text-sm font-roboto font-semibold text-white hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/40 hover:shadow-blue-900/60 hover:-translate-y-0.5">
                Request Access
                <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
              </button>
              <a href="#features" class="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-roboto font-medium text-white hover:bg-white/10 transition-colors">
                See how it works
              </a>
            </div>
            <!-- Trust badges -->
            <div class="flex flex-wrap items-center gap-5 mt-10">
              <div v-for="badge in trustBadges" :key="badge" class="flex items-center gap-2 text-white/50 text-xs font-roboto">
                <svg class="h-3.5 w-3.5 text-tegbale-green" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                {{ badge }}
              </div>
            </div>
          </div>

          <!-- Right: mockup card stack -->
          <div class="hidden lg:flex items-center justify-center">
            <div class="relative w-full max-w-md">
              <!-- Back card -->
              <div class="absolute -top-4 -right-4 w-full rounded-2xl bg-white/5 border border-white/10 h-72 rotate-3"></div>
              <!-- Main card -->
              <div class="relative rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm p-6 shadow-2xl">
                <div class="flex items-center justify-between mb-5">
                  <div>
                    <p class="text-xs text-white/50 font-roboto">Laurel Nursery School</p>
                    <p class="text-white font-poppins font-semibold text-lg">School Dashboard</p>
                  </div>
                  <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-tegbale-blue text-white font-bold font-poppins">T</div>
                </div>
                <!-- Mini stat cards -->
                <div class="grid grid-cols-2 gap-3 mb-4">
                  <div v-for="s in heroStats" :key="s.label" class="rounded-xl bg-white/5 border border-white/10 p-3">
                    <p class="text-2xl font-bold font-poppins text-white">{{ s.value }}</p>
                    <p class="text-xs text-white/50 font-roboto mt-0.5">{{ s.label }}</p>
                  </div>
                </div>
                <!-- Mini post -->
                <div class="rounded-xl bg-white/5 border border-white/10 p-3">
                  <div class="flex items-center gap-2 mb-2">
                    <div class="h-6 w-6 rounded-full bg-tegbale-blue flex items-center justify-center text-white text-xs font-bold">J</div>
                    <p class="text-xs text-white/70 font-roboto">Jane Okafor · Admin</p>
                  </div>
                  <p class="text-xs text-white/50 font-roboto">📢 Reminder: Parent-Teacher meeting this Friday at 10am in the school hall.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Wave divider -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" class="w-full h-12 md:h-16">
          <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="white"/>
        </svg>
      </div>
    </section>

    <!-- Stats bar -->
    <section class="bg-white border-b border-gray-100">
      <div class="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div v-for="stat in statsBar" :key="stat.label" class="text-center">
          <p class="text-3xl font-bold font-poppins text-tegbale-navy-blue">{{ stat.value }}</p>
          <p class="text-sm text-tegbale-text-gray font-roboto mt-1">{{ stat.label }}</p>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="py-20 bg-white">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-14">
          <span class="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-roboto font-medium text-tegbale-blue mb-4">Everything you need</span>
          <h2 class="text-3xl sm:text-4xl font-bold font-poppins text-tegbale-navy-blue mb-4">One platform, every role</h2>
          <p class="text-tegbale-text-gray font-roboto max-w-xl mx-auto leading-relaxed">Whether you're an administrator, teacher, or parent — Tègbalé gives everyone exactly what they need, all in one place.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="feature-card group relative rounded-2xl bg-white p-7 transition-all duration-300"
            :style="`--glow: ${feature.gradFrom}`"
          >
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl mb-5" :style="`background: ${feature.gradFrom}15`">
              <img :src="feature.icon" :alt="feature.title" class="h-6 w-6" :style="feature.darkIcon ? 'filter: brightness(0)' : 'filter: none'" />
            </div>
            <h3 class="text-base font-semibold font-poppins text-tegbale-navy-blue mb-2">{{ feature.title }}</h3>
            <p class="text-sm text-tegbale-text-gray font-roboto leading-relaxed">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section id="how" class="py-20 bg-[#f8f9ff]">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-14">
          <span class="inline-block rounded-full bg-purple-50 px-4 py-1.5 text-xs font-roboto font-medium text-tegbale-purple mb-4">Simple setup</span>
          <h2 class="text-3xl sm:text-4xl font-bold font-poppins text-tegbale-navy-blue mb-4">Up and running in minutes</h2>
          <p class="text-tegbale-text-gray font-roboto max-w-lg mx-auto">No complex onboarding. No IT team required. Just sign in and start managing your school today.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <!-- Connector lines (desktop) -->
          <div class="hidden md:block absolute top-10 left-1/3 right-1/3 h-px bg-gradient-to-r from-tegbale-blue/30 via-tegbale-purple/30 to-tegbale-blue/30"></div>
          <div
            v-for="(step, i) in steps"
            :key="step.title"
            class="relative flex flex-col items-center text-center"
          >
            <div class="relative mb-6">
              <div class="flex h-20 w-20 items-center justify-center rounded-2xl shadow-lg" :style="`background: ${step.bg}`">
                <span v-html="step.icon" class="text-white"></span>
              </div>
              <div class="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white border-2 text-xs font-bold font-poppins shadow-sm" :style="`color: ${step.color}; border-color: ${step.color}`">{{ i + 1 }}</div>
            </div>
            <h3 class="text-base font-semibold font-poppins text-tegbale-navy-blue mb-2">{{ step.title }}</h3>
            <p class="text-sm text-tegbale-text-gray font-roboto leading-relaxed max-w-xs">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Roles section -->
    <section id="roles" class="py-20 bg-white">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-14">
          <span class="inline-block rounded-full bg-green-50 px-4 py-1.5 text-xs font-roboto font-medium text-tegbale-green mb-4">Built for everyone</span>
          <h2 class="text-3xl sm:text-4xl font-bold font-poppins text-tegbale-navy-blue mb-4">Every stakeholder, covered</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div v-for="role in roles" :key="role.title" class="rounded-2xl p-6 border border-gray-100">
            <div class="flex h-14 w-14 items-center justify-center rounded-2xl mb-4" :style="`background: ${role.bg}`">
              <img :src="role.icon" :alt="role.title" class="h-7 w-7" />
            </div>
            <h3 class="text-sm font-semibold font-poppins text-tegbale-navy-blue mb-2">{{ role.title }}</h3>
            <p class="text-xs text-tegbale-text-gray font-roboto leading-relaxed">{{ role.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA banner -->
    <section class="py-20 bg-tegbale-navy-blue relative overflow-hidden">
      <div class="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-tegbale-blue/20 blur-3xl"></div>
      <div class="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-tegbale-purple/20 blur-3xl"></div>
      <div class="relative max-w-3xl mx-auto px-6 text-center">
        <h2 class="text-3xl sm:text-4xl font-bold font-poppins text-white mb-5 leading-tight">
          Ready to transform<br/> how your school operates?
        </h2>
        <p class="text-white/60 font-roboto mb-8 text-base">Join forward-thinking schools already using Tègbalé to save time, reduce errors, and strengthen their community.</p>
        <div class="flex flex-wrap items-center justify-center gap-3">
          <button @click="showModal = true" class="flex items-center gap-2 rounded-full bg-tegbale-blue px-8 py-3.5 text-sm font-roboto font-semibold text-white hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/40 hover:-translate-y-0.5">
            Request Access
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
          </button>
          <a href="mailto:hello@tegbale.com" class="rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-roboto font-medium text-white hover:bg-white/10 transition-colors">
            Contact Sales
          </a>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-[#0d1240] text-white/50 py-10">
      <div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2.5">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-tegbale-blue text-white text-base font-bold font-poppins">T</div>
          <span class="text-white font-semibold font-poppins">Tègbalé</span>
        </div>
        <p class="text-sm font-roboto text-center">Built with ❤️ by <span class="text-white/70">Breme Technologies Limited</span> &copy; {{ new Date().getFullYear() }}</p>
        <div class="flex items-center gap-5 text-sm font-roboto">
          <router-link to="/login" class="hover:text-white transition-colors">Login</router-link>
          <a href="mailto:hello@tegbale.com" class="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import RequestAccessModal from '@/components/RequestAccessModal.vue'
import { useUsersStore } from '@/stores/user-store'

const userStore = useUsersStore()

import schoolsIcon from '@/assets/appIcons/schools.svg'
import studentsIcon from '@/assets/appIcons/students.svg'
import teacherIcon from '@/assets/appIcons/teacher.svg'
import staffsIcon from '@/assets/appIcons/staffs.svg'
import parentsIcon from '@/assets/appIcons/parents.svg'

const scrolled = ref(false)
const showModal = ref(false)
const onScroll = () => { scrolled.value = window.scrollY > 40 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const heroPills = [
  {
    label: '248 Students enrolled',
    sub: 'Laurel Nursery School',
    color: '#408ED5',
    icon: '<path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>',
    style: 'top: 12%; right: 18%; animation-duration: 5s; animation-delay: 0s;',
  },
  {
    label: '18 Teachers active',
    sub: 'Staff portal',
    color: '#18A40C',
    icon: '<path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-9 11H7v-2h4v2zm6 0h-4v-2h4v2zm0-4H7V7h10v2z"/>',
    style: 'top: 42%; right: 5%; animation-duration: 6.5s; animation-delay: 1s;',
  },
  {
    label: 'Parent-Teacher Meeting',
    sub: 'Event · Friday 10am',
    color: '#F59E0B',
    icon: '<path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>',
    style: 'top: 26%; right: 3%; animation-duration: 7s; animation-delay: 0.5s;',
  },
  {
    label: '3 Wards assigned',
    sub: 'Parent dashboard',
    color: '#6A10DD',
    icon: '<path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>',
    style: 'top: 62%; right: 14%; animation-duration: 8s; animation-delay: 1.5s;',
  },
]

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how' },
  { label: 'Roles', href: '#roles' },
]

const trustBadges = ['No credit card required', 'Free to get started', 'Cancel anytime']

const heroStats = [
  { value: '248', label: 'Students' },
  { value: '18', label: 'Teachers' },
  { value: '12', label: 'Classrooms' },
  { value: '3', label: 'Events' },
]

const statsBar = [
  { value: '500+', label: 'Schools onboarded' },
  { value: '50k+', label: 'Students managed' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '4.9★', label: 'Average rating' },
]

const features = [
  {
    title: 'Student Management',
    desc: 'Enroll students, track classrooms, manage records and bulk-import from CSV — all in one place.',
    icon: studentsIcon,
    gradFrom: '#408ED5',
    gradTo: '#171D53',
  },
  {
    title: 'Teacher & Staff Portal',
    desc: 'Onboard staff with auto-generated credentials, assign roles, and manage your entire teaching workforce.',
    icon: teacherIcon,
    gradFrom: '#18A40C',
    gradTo: '#0d6b08',
    darkIcon: true,
  },
  {
    title: 'Parent Communication',
    desc: 'Keep guardians in the loop with secure parent accounts, ward assignments, and school-wide announcements.',
    icon: parentsIcon,
    gradFrom: '#6A10DD',
    gradTo: '#4a0a9a',
  },
  {
    title: 'School Feed & Posts',
    desc: 'Share updates, announcements and reminders with threaded comments and @mention notifications.',
    icon: schoolsIcon,
    gradFrom: '#408ED5',
    gradTo: '#171D53',
  },
  {
    title: 'Events Calendar',
    desc: 'Schedule and manage school events, track status from Upcoming to Completed, and export to reports.',
    icon: staffsIcon,
    gradFrom: '#F59E0B',
    gradTo: '#D97706',
    darkIcon: true,
  },
  {
    title: 'Secure & Private',
    desc: 'Role-based access, school-scoped data isolation, and auto-generated passwords keep your community safe.',
    icon: schoolsIcon,
    gradFrom: '#EF4444',
    gradTo: '#DC2626',
  },
]

const steps = [
  {
    title: 'Create your school',
    desc: 'A super-admin sets up your school profile in minutes. Your portal is ready instantly.',
    icon: `<svg fill="currentColor" viewBox="0 0 24 24" width="28" height="28"><path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"/></svg>`,
    bg: 'linear-gradient(135deg, #171D53, #408ED5)',
    color: '#408ED5',
  },
  {
    title: 'Add your people',
    desc: 'Import students, teachers, and parents via CSV or add them one by one. Passwords are auto-generated.',
    icon: `<svg fill="currentColor" viewBox="0 0 24 24" width="28" height="28"><path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg>`,
    bg: 'linear-gradient(135deg, #6A10DD, #408ED5)',
    color: '#6A10DD',
  },
  {
    title: 'Manage everything',
    desc: 'Post updates, track events, manage classrooms, and communicate with parents — from any device.',
    icon: `<svg fill="currentColor" viewBox="0 0 24 24" width="28" height="28"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
    bg: 'linear-gradient(135deg, #18A40C, #0d6b08)',
    color: '#18A40C',
  },
]

const roles = [
  {
    title: 'School Administrators',
    desc: 'Full control over school setup, staff, students, parents, and all communications.',
    icon: schoolsIcon,
    bg: '#408ED515',
  },
  {
    title: 'Teachers',
    desc: 'View assigned classrooms, post updates to the school feed, and stay connected.',
    icon: teacherIcon,
    bg: '#18A40C15',
  },
  {
    title: 'Students',
    desc: 'Stay informed about events, announcements, and school activities in real time.',
    icon: studentsIcon,
    bg: '#6A10DD15',
  },
  {
    title: 'Parents & Guardians',
    desc: 'Follow their ward\'s school life, get notified about events, and connect with teachers.',
    icon: parentsIcon,
    bg: '#171D5315',
  },
]
</script>

<style scoped>
html { scroll-behavior: smooth; }

.hero-pill {
  animation: pillDrift ease-in-out infinite alternate;
}

@keyframes pillDrift {
  0%   { transform: translateY(0px); }
  100% { transform: translateY(-10px); }
}

.feature-card {
  border: 1px solid #e5e7eb;
  box-shadow: 0 0 0 0 transparent;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  border-color: var(--glow);
  box-shadow:
    0 0 0 1px var(--glow),
    0 0 12px 2px color-mix(in srgb, var(--glow) 25%, transparent),
    0 0 30px 4px color-mix(in srgb, var(--glow) 10%, transparent);
}
</style>
