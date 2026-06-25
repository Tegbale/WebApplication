<template>
  <div class="pt-4 pb-10 space-y-6">

    <!-- Welcome banner -->
    <div class="relative overflow-hidden rounded-2xl bg-tegbale-navy-blue px-6 py-7 md:px-10 md:py-9">
      <!-- Background decoration -->
      <div class="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/5"></div>
      <div class="pointer-events-none absolute -bottom-12 -right-4 h-56 w-56 rounded-full bg-tegbale-blue/20"></div>
      <div class="pointer-events-none absolute left-1/2 bottom-0 h-32 w-32 rounded-full bg-white/5"></div>

      <div class="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p class="text-sm font-roboto text-white/60 mb-1">{{ todayLabel }}</p>
          <h1 class="text-2xl md:text-3xl font-semibold font-roboto text-white leading-snug">
            Good {{ greeting }}, {{ userStore.firstName }} 👋
          </h1>
          <p class="mt-1 text-sm font-roboto text-white/70">
            {{ schoolStore.name ?? 'Your School' }}
          </p>
        </div>
        <div class="flex flex-wrap gap-2 md:gap-3">
          <router-link
            to="/admin/students"
            class="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-roboto font-medium text-white hover:bg-white/20 transition-colors"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
            Add Student
          </router-link>
          <router-link
            to="/admin/teachers"
            class="flex items-center gap-2 rounded-full bg-tegbale-blue px-4 py-2 text-sm font-roboto font-medium text-white hover:bg-blue-500 transition-colors"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
            Add Teacher
          </router-link>
        </div>
      </div>
    </div>

    <!-- Stat cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="stat in stats" :key="stat.label" class="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <div :class="['flex h-11 w-11 items-center justify-center rounded-xl', stat.bg]">
            <span class="text-white" v-html="stat.icon"></span>
          </div>
          <span class="rounded-full px-2.5 py-1 text-xs font-roboto" :class="stat.badgeCls">{{ stat.badge }}</span>
        </div>
        <div>
          <p class="text-2xl font-semibold font-roboto text-tegbale-navy-blue leading-none">
            <span v-if="statsLoading" class="inline-block h-6 w-12 animate-pulse rounded bg-gray-200"></span>
            <span v-else>{{ counts[stat.key] }}</span>
          </p>
          <p class="mt-1 text-xs font-roboto text-tegbale-text-gray">{{ stat.label }}</p>
        </div>
      </div>
    </div>

    <!-- Main two-column layout -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">

      <!-- Left: posts feed (spans 2 cols) -->
      <div class="xl:col-span-2 space-y-4">
        <h2 class="text-base font-semibold font-roboto text-tegbale-navy-blue">School Feed</h2>

        <!-- Create post box -->
        <div class="bg-white rounded-2xl shadow-sm p-4">
          <div class="flex items-start gap-3 mb-3">
            <div class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-tegbale-navy-blue text-white text-xs font-semibold font-roboto">
              {{ userStore.initials || 'SA' }}
            </div>
            <div class="relative flex-1">
              <textarea
                v-model="newPostContent"
                @input="onPostInput"
                placeholder="Share an update, announcement, or reminder… Use @name to mention someone"
                rows="3"
                class="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-roboto text-gray-700 placeholder:text-tegbale-text-gray focus:bg-white focus:outline-none focus:ring-1 focus:ring-tegbale-blue transition-colors"
              />
              <!-- @mention dropdown -->
              <div
                v-if="mention.inputId === 'new-post' && mention.results.length"
                class="absolute left-0 right-0 top-full z-20 mt-1 rounded-xl border border-gray-100 bg-white shadow-lg overflow-hidden"
              >
                <button
                  v-for="user in mention.results"
                  :key="user.id"
                  @mousedown.prevent="insertMention(user)"
                  class="flex w-full items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-left"
                >
                  <div class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-tegbale-blue/10 text-xs font-medium text-tegbale-blue">
                    {{ user.firstName[0] }}{{ user.lastName[0] }}
                  </div>
                  <div>
                    <p class="text-sm text-gray-700 leading-none">{{ user.firstName }} {{ user.lastName }}</p>
                    <p class="text-xs text-tegbale-text-gray mt-0.5 capitalize">{{ roleLabel(user.role) }}</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-end border-t border-gray-100 pt-3">
            <button
              @click="submitPost"
              :disabled="!newPostContent.trim() || postSubmitting"
              class="flex items-center gap-2 rounded-full bg-tegbale-blue px-5 py-2 text-sm font-roboto font-medium text-white disabled:opacity-50 hover:bg-blue-600 transition-colors"
            >
              <svg v-if="postSubmitting" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
              {{ postSubmitting ? 'Posting...' : 'Post Update' }}
            </button>
          </div>
        </div>

        <!-- Feed skeleton -->
        <div v-if="postsStore.loading" class="space-y-4">
          <div v-for="i in 3" :key="i" class="bg-white rounded-2xl shadow-sm p-5 space-y-3 animate-pulse">
            <div class="flex items-center gap-3">
              <div class="h-10 w-10 rounded-full bg-gray-200" />
              <div class="space-y-1.5 flex-1">
                <div class="h-3 w-32 rounded bg-gray-200" />
                <div class="h-2.5 w-20 rounded bg-gray-100" />
              </div>
            </div>
            <div class="h-4 w-full rounded bg-gray-100" />
            <div class="h-4 w-3/4 rounded bg-gray-100" />
          </div>
        </div>

        <!-- Empty state -->
        <div v-else-if="!postsStore.posts.length" class="bg-white rounded-2xl shadow-sm flex flex-col items-center justify-center py-14 px-6 text-center">
          <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50 mb-4">
            <svg class="h-8 w-8 text-gray-300" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/></svg>
          </div>
          <p class="text-sm font-medium text-gray-500 font-roboto">No posts yet</p>
          <p class="text-xs text-tegbale-text-gray mt-1 font-roboto">Be the first to share an update with your school.</p>
        </div>

        <!-- Post cards -->
        <div v-else class="space-y-4">
          <div v-for="post in postsStore.posts" :key="post.id" class="bg-white rounded-2xl shadow-sm p-5">
            <!-- Post header -->
            <div class="flex items-start justify-between gap-3 mb-3">
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-tegbale-blue text-white text-sm font-semibold font-roboto">
                  {{ initials(post.author) }}
                </div>
                <div>
                  <p class="text-sm font-semibold text-tegbale-navy-blue font-roboto leading-tight">
                    {{ post.author.firstName }} {{ post.author.lastName }}
                  </p>
                  <div class="flex items-center gap-1.5 mt-0.5">
                    <span class="inline-block rounded-full px-2 py-0.5 text-xs font-roboto bg-gray-100 text-tegbale-text-gray capitalize">{{ roleLabel(post.author.role) }}</span>
                    <span class="text-tegbale-text-gray text-xs">·</span>
                    <span class="text-xs text-tegbale-text-gray font-roboto">{{ formatTime(post.createdAt) }}</span>
                  </div>
                </div>
              </div>
              <button
                v-if="canDeletePost(post)"
                @click="deletePost(post.id)"
                class="text-gray-300 hover:text-red-400 transition-colors p-1 flex-shrink-0"
                title="Delete post"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/></svg>
              </button>
            </div>

            <!-- Post content -->
            <p class="text-sm text-gray-700 font-roboto leading-relaxed mb-4 whitespace-pre-wrap" v-html="highlightMentions(post.content)"></p>

            <!-- Comment toggle -->
            <div class="flex items-center gap-4 border-t border-gray-100 pt-3 mb-3">
              <button @click="toggleComments(post)" class="flex items-center gap-1.5 text-sm text-tegbale-text-gray font-roboto hover:text-tegbale-blue transition-colors">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/></svg>
                {{ post._count?.comments ?? post.comments?.length ?? 0 }} {{ (post._count?.comments ?? 0) === 1 ? 'Comment' : 'Comments' }}
              </button>
            </div>

            <!-- Comments section -->
            <div v-if="post.showComments" class="mb-3">
              <div v-if="post.loadingComments" class="space-y-2 mb-3">
                <div v-for="i in 2" :key="i" class="flex items-start gap-2 animate-pulse">
                  <div class="h-7 w-7 rounded-full bg-gray-200 flex-shrink-0" />
                  <div class="flex-1 space-y-1">
                    <div class="h-2.5 w-24 rounded bg-gray-200" />
                    <div class="h-2.5 w-full rounded bg-gray-100" />
                  </div>
                </div>
              </div>
              <div v-else-if="post.comments?.length" class="space-y-3 mb-3">
                <CommentThread
                  v-for="comment in post.comments"
                  :key="comment.id"
                  :comment="comment"
                  :post-id="post.id"
                  :current-user="userStore"
                  @reply="onReply"
                  @delete="onDeleteComment"
                />
              </div>
              <p v-else class="text-xs text-tegbale-text-gray font-roboto mb-3">No comments yet.</p>
            </div>

            <!-- Reply input -->
            <div class="relative">
              <div
                v-if="mention.inputId === post.id && mention.results.length"
                class="absolute left-0 right-0 bottom-full z-20 mb-1 rounded-xl border border-gray-100 bg-white shadow-lg overflow-hidden"
              >
                <button
                  v-for="user in mention.results"
                  :key="user.id"
                  @mousedown.prevent="insertMention(user)"
                  class="flex w-full items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-left"
                >
                  <div class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-tegbale-blue/10 text-xs font-medium text-tegbale-blue">
                    {{ user.firstName[0] }}{{ user.lastName[0] }}
                  </div>
                  <p class="text-sm text-gray-700">{{ user.firstName }} {{ user.lastName }}</p>
                </button>
              </div>
              <div class="flex items-center gap-2">
                <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-tegbale-navy-blue text-white text-xs font-semibold font-roboto">
                  {{ userStore.initials || 'SA' }}
                </div>
                <div class="flex flex-1 items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 focus-within:border-tegbale-blue focus-within:bg-white transition-colors">
                  <input
                    v-model="replyInputs[post.id]"
                    type="text"
                    :placeholder="replyTargets[post.id] ? 'Replying...' : 'Write a comment...'"
                    class="flex-1 bg-transparent text-sm font-roboto text-gray-700 placeholder:text-tegbale-text-gray focus:outline-none"
                    @input="onReplyInput(post.id)"
                    @keyup.enter="submitComment(post.id)"
                    @blur="clearMentionIfBlur(post.id)"
                  />
                  <button v-if="replyTargets[post.id]" @click="clearReplyTarget(post.id)" class="text-xs text-tegbale-text-gray hover:text-gray-600">✕</button>
                  <button @click="submitComment(post.id)" :disabled="!replyInputs[post.id]?.trim()" class="text-tegbale-blue disabled:opacity-40 hover:text-blue-700">
                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right sidebar -->
      <div class="space-y-5">

        <!-- Quick actions -->
        <div class="bg-white rounded-2xl shadow-sm p-5">
          <h3 class="text-sm font-semibold font-roboto text-tegbale-navy-blue mb-4">Quick Actions</h3>
          <div class="grid grid-cols-2 gap-2">
            <router-link
              v-for="action in quickActions"
              :key="action.label"
              :to="action.to"
              class="flex flex-col items-center gap-2 rounded-xl border border-gray-100 p-3.5 hover:border-tegbale-blue/30 hover:bg-blue-50/40 transition-colors group"
            >
              <div :class="['flex h-9 w-9 items-center justify-center rounded-xl transition-colors', action.bg, 'group-hover:scale-105']" style="transition: transform 0.15s">
                <span v-html="action.icon" class="text-white"></span>
              </div>
              <p class="text-xs font-roboto text-tegbale-text-gray text-center leading-tight">{{ action.label }}</p>
            </router-link>
          </div>
        </div>

        <!-- Upcoming events -->
        <div class="bg-white rounded-2xl shadow-sm p-5">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-semibold font-roboto text-tegbale-navy-blue">Upcoming Events</h3>
            <router-link to="/admin/events" class="text-xs font-roboto text-tegbale-blue hover:underline">View all</router-link>
          </div>

          <div v-if="eventsLoading" class="space-y-3">
            <div v-for="i in 3" :key="i" class="flex gap-3 animate-pulse">
              <div class="h-12 w-12 rounded-xl bg-gray-100 flex-shrink-0" />
              <div class="flex-1 space-y-1.5 pt-1">
                <div class="h-3 w-3/4 rounded bg-gray-200" />
                <div class="h-2.5 w-1/2 rounded bg-gray-100" />
              </div>
            </div>
          </div>

          <div v-else-if="!upcomingEvents.length" class="flex flex-col items-center py-6 text-center">
            <svg class="h-10 w-10 text-gray-200 mb-2" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/></svg>
            <p class="text-xs text-tegbale-text-gray font-roboto">No upcoming events</p>
            <router-link to="/admin/events" class="mt-2 text-xs text-tegbale-blue hover:underline font-roboto">Create one →</router-link>
          </div>

          <div v-else class="space-y-3">
            <div
              v-for="event in upcomingEvents"
              :key="event.id"
              class="flex items-start gap-3 rounded-xl border border-gray-50 bg-gray-50/50 p-3 hover:bg-gray-50 transition-colors"
            >
              <div class="flex h-12 w-12 flex-shrink-0 flex-col items-center justify-center rounded-xl bg-tegbale-blue/10 text-tegbale-blue">
                <span class="text-base font-bold font-roboto leading-none">{{ eventDay(event.startDate) }}</span>
                <span class="text-xs font-roboto leading-none mt-0.5 opacity-70">{{ eventMonth(event.startDate) }}</span>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-700 font-roboto truncate">{{ event.title }}</p>
                <p v-if="event.location" class="text-xs text-tegbale-text-gray font-roboto mt-0.5 truncate">📍 {{ event.location }}</p>
                <p class="text-xs text-tegbale-text-gray font-roboto mt-0.5">{{ formatEventTime(event.startDate) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- School info snapshot -->
        <div class="bg-white rounded-2xl shadow-sm p-5">
          <h3 class="text-sm font-semibold font-roboto text-tegbale-navy-blue mb-4">School Info</h3>
          <div class="space-y-3 text-sm font-roboto">
            <div class="flex items-center gap-3">
              <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gray-50">
                <svg class="h-4 w-4 text-tegbale-text-gray" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"/></svg>
              </div>
              <p class="text-gray-700 truncate">{{ schoolStore.name ?? '—' }}</p>
            </div>
            <div v-if="schoolStore.email" class="flex items-center gap-3">
              <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gray-50">
                <svg class="h-4 w-4 text-tegbale-text-gray" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
              </div>
              <p class="text-gray-700 truncate">{{ schoolStore.email }}</p>
            </div>
            <div v-if="schoolStore.address" class="flex items-start gap-3">
              <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gray-50">
                <svg class="h-4 w-4 text-tegbale-text-gray" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
              </div>
              <p class="text-gray-700 leading-snug">{{ schoolStore.address }}</p>
            </div>
            <router-link to="/admin/my-school" class="mt-1 flex items-center gap-1.5 text-xs font-roboto text-tegbale-blue hover:underline">
              View school settings →
            </router-link>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { useUsersStore } from '@/stores/user-store'
import { useSchoolStore } from '@/stores/school-store'
import { useParentsStore } from '@/stores/parents-store'
import { usePostsStore } from '@/stores/posts-store'
import { useEventsStore } from '@/stores/events-store'
import adminApi from '@/api/admin'
import CommentThread from '@/components/CommentThread.vue'

const userStore = useUsersStore()
const schoolStore = useSchoolStore()
const parentsStore = useParentsStore()
const postsStore = usePostsStore()
const eventsStore = useEventsStore()

// --- Greeting ---
const now = new Date()
const hour = now.getHours()
const greeting = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening'
const todayLabel = now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

// --- Stats ---
const counts = reactive({ classrooms: 0, students: 0, teachers: 0, parents: 0 })
const statsLoading = ref(true)
const eventsLoading = ref(true)
const upcomingEvents = ref([])

const stats = [
  {
    key: 'classrooms', label: 'Classrooms', bg: 'bg-tegbale-navy-blue',
    badge: 'Rooms', badgeCls: 'bg-blue-50 text-tegbale-navy-blue',
    icon: `<svg width="20" height="18" viewBox="0 0 23 20" fill="currentColor"><path d="M21.111 8.889H18.889V2.222H20V0H2.222v2.222h1.111v6.667H1.111C.816 8.889.534 9.006.325 9.214.117 9.423 0 9.705 0 10v10h22.222V10c0-.295-.117-.577-.325-.786-.208-.208-.49-.325-.786-.325zM13.333 17.778V13.333H8.889v4.445H5.556V2.222h11.111v15.556h-3.334z"/><path d="M7.778 4.444h2.222v2.223H7.778V4.444zm4.444 0h2.222v2.223h-2.222V4.444zM7.778 8.889h2.222V11.11H7.778V8.889zm4.444 0h2.222V11.11h-2.222V8.889z"/></svg>`,
  },
  {
    key: 'students', label: 'Students', bg: 'bg-tegbale-purple',
    badge: 'Enrolled', badgeCls: 'bg-purple-50 text-purple-600',
    icon: `<svg fill="currentColor" viewBox="0 0 24 24" width="22" height="22"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/></svg>`,
  },
  {
    key: 'teachers', label: 'Teachers', bg: 'bg-tegbale-green',
    badge: 'Staff', badgeCls: 'bg-green-50 text-green-600',
    icon: `<svg fill="currentColor" viewBox="0 0 24 24" width="22" height="22"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-9 11H7v-2h4v2zm6 0h-4v-2h4v2zm0-4H7V7h10v2z"/></svg>`,
  },
  {
    key: 'parents', label: 'Parents', bg: 'bg-tegbale-blue',
    badge: 'Guardians', badgeCls: 'bg-blue-50 text-tegbale-blue',
    icon: `<svg fill="currentColor" viewBox="0 0 24 24" width="22" height="22"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`,
  },
]

const quickActions = [
  { label: 'Add Student', to: '/admin/students', bg: 'bg-tegbale-purple', icon: `<svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/></svg>` },
  { label: 'Add Teacher', to: '/admin/teachers', bg: 'bg-tegbale-green', icon: `<svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-9 11H7v-2h4v2zm6 0h-4v-2h4v2zm0-4H7V7h10v2z"/></svg>` },
  { label: 'Add Parent', to: '/admin/parents', bg: 'bg-tegbale-blue', icon: `<svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>` },
  { label: 'New Event', to: '/admin/events', bg: 'bg-tegbale-navy-blue', icon: `<svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>` },
  { label: 'Classrooms', to: '/admin/classrooms', bg: 'bg-orange-400', icon: `<svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm-2 13.55V19h-4v-2.45L4 15.45 12 11l8 4.45-8 4.55-2-1.45z"/></svg>` },
  { label: 'My School', to: '/admin/my-school', bg: 'bg-rose-400', icon: `<svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>` },
]

// --- @mention ---
const mention = reactive({ inputId: null, results: [], loading: false })
let mentionTimer = null
const MENTION_RE = /@([A-Za-z][\w.]*)$/

function getMentionQuery(value) {
  const m = value.match(MENTION_RE)
  return m ? m[1] : null
}

async function runMentionSearch(query, inputId) {
  mention.inputId = inputId
  mention.loading = true
  try {
    const res = await adminApi.searchUsers(query)
    if (mention.inputId === inputId) mention.results = res.data?.data ?? []
  } catch { mention.results = [] } finally { mention.loading = false }
}

function onPostInput() {
  clearTimeout(mentionTimer)
  const query = getMentionQuery(newPostContent.value)
  if (!query) { mention.inputId = null; mention.results = []; return }
  mentionTimer = setTimeout(() => runMentionSearch(query, 'new-post'), 250)
}

function onReplyInput(postId) {
  clearTimeout(mentionTimer)
  const query = getMentionQuery(replyInputs[postId] ?? '')
  if (!query) { if (mention.inputId === postId) { mention.inputId = null; mention.results = [] } return }
  mentionTimer = setTimeout(() => runMentionSearch(query, postId), 250)
}

function insertMention(user) {
  const handle = `@${user.firstName.toLowerCase()}.${user.lastName.toLowerCase()} `
  if (mention.inputId === 'new-post') {
    newPostContent.value = newPostContent.value.replace(MENTION_RE, handle)
  } else {
    const postId = mention.inputId
    replyInputs[postId] = (replyInputs[postId] ?? '').replace(MENTION_RE, handle)
  }
  mention.inputId = null; mention.results = []
}

function clearMentionIfBlur(postId) {
  setTimeout(() => { if (mention.inputId === postId) { mention.inputId = null; mention.results = [] } }, 150)
}

// --- Posts ---
const newPostContent = ref('')
const postSubmitting = ref(false)
const replyInputs = reactive({})
const replyTargets = reactive({})

function initials(author) { return ((author.firstName?.[0] ?? '') + (author.lastName?.[0] ?? '')).toUpperCase() || '?' }
function roleLabel(role) { return ({ SCHOOL_ADMIN: 'Admin', STAFF: 'Staff', TEACHER: 'Teacher', PARENT: 'Parent', SUPER_ADMIN: 'Super Admin' }[role] ?? role) }

function formatTime(iso) {
  if (!iso) return ''
  const d = new Date(iso), n = new Date()
  if (d.toDateString() === n.toDateString()) return 'Today · ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  return d.toLocaleDateString([], { day: '2-digit', month: 'short' }) + ' · ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function highlightMentions(content) {
  if (!content) return ''
  return content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/@([A-Za-z][\w.]*)/g, '<span class="text-tegbale-blue font-medium">@$1</span>')
}

function canDeletePost(post) { return userStore.role === 'SCHOOL_ADMIN' || post.author?.id === userStore.id }

async function submitPost() {
  if (!newPostContent.value.trim()) return
  postSubmitting.value = true
  try { await postsStore.create(newPostContent.value.trim()); newPostContent.value = ''; mention.inputId = null; mention.results = [] }
  finally { postSubmitting.value = false }
}

async function deletePost(id) {
  if (!confirm('Delete this post?')) return
  await postsStore.remove(id)
}

async function toggleComments(post) {
  post.showComments = !post.showComments
  if (post.showComments && !post.comments) {
    post.loadingComments = true
    try { await postsStore.loadComments(post.id) } finally { post.loadingComments = false }
  }
}

async function submitComment(postId) {
  const content = replyInputs[postId]?.trim()
  if (!content) return
  const parentId = replyTargets[postId] ?? null
  const post = postsStore.posts.find((p) => p.id === postId)
  if (post && !post.showComments) {
    post.showComments = true
    if (!post.comments) { post.loadingComments = true; try { await postsStore.loadComments(postId) } finally { post.loadingComments = false } }
  }
  await postsStore.addComment(postId, content, parentId)
  replyInputs[postId] = ''; delete replyTargets[postId]; mention.inputId = null; mention.results = []
}

function onReply({ postId, commentId }) { replyTargets[postId] = commentId; replyInputs[postId] = replyInputs[postId] ?? '' }
async function onDeleteComment({ postId, commentId }) { if (!confirm('Delete this comment?')) return; await postsStore.removeComment(postId, commentId) }
function clearReplyTarget(postId) { delete replyTargets[postId] }

// --- Events helpers ---
function eventDay(d) { return new Date(d).getDate() }
function eventMonth(d) { return new Date(d).toLocaleDateString('en-GB', { month: 'short' }) }
function formatEventTime(d) { return new Date(d).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }

// --- Mount ---
onMounted(async () => {
  statsLoading.value = true
  try {
    if (userStore.schoolId) {
      const school = await schoolStore.fetchSchool(userStore.schoolId)
      counts.classrooms = school._count?.classrooms ?? 0
      counts.students = school._count?.students ?? 0
      counts.teachers = school._count?.staff ?? 0
    }
  } catch {} finally { statsLoading.value = false }

  try {
    await parentsStore.fetchAll({ limit: 1 })
    counts.parents = parentsStore.meta.total
  } catch {}

  eventsLoading.value = true
  try {
    await eventsStore.fetchAll({ status: 'UPCOMING', limit: 4, page: 1 })
    upcomingEvents.value = eventsStore.events.slice(0, 4)
  } catch {} finally { eventsLoading.value = false }

  try { await postsStore.fetchAll() } catch {}
})
</script>

<style lang="scss" scoped></style>
