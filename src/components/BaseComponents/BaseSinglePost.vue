<template>
  <div>
    <div class="flex items-center w-full author__wrapper space-x-4">
      <div class="avatar">
        <PostCommentAvatar />
      </div>
      <div class="flex items-start justify-between author w-full">
        <div class="font-roboto">
          <p class="text-base font-semibold tracking-wide">Emeka Ugochukwu</p>
          <p class="text-xs text-tegbale-text-gray">Teacher</p>
        </div>
        <div class="flex items-start space-x-2">
          <svg
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.27966 0.943085C3.65595 0.943085 0.707819 3.89121 0.707819 7.51492C0.707819 11.1386 3.65595 14.0868 7.27966 14.0868C10.9034 14.0868 13.8515 11.1386 13.8515 7.51492C13.8515 3.89121 10.9034 0.943085 7.27966 0.943085ZM7.27966 12.7724C4.38082 12.7724 2.02219 10.4138 2.02219 7.51492C2.02219 4.61609 4.38082 2.25745 7.27966 2.25745C10.1785 2.25745 12.5371 4.61609 12.5371 7.51492C12.5371 10.4138 10.1785 12.7724 7.27966 12.7724Z"
              fill="#589DD9"
            />
            <path
              d="M7.93684 4.229H6.62247V8.17211H10.5656V6.85774H7.93684V4.229Z"
              fill="#589DD9"
            />
          </svg>
          <p class="text-[10px] tracking-wide text-roboto">Today 14:20pm</p>
        </div>
      </div>
    </div>
    <div class="py-4 w-full font-roboto text-sm tracking-wide">
      <p class="mb-6">
        <span class="font-semibold">@Ebun</span> aced all her tests today. I'm
        so proud of her growth.
      </p>
      <p
        class="flex float-right text-[10px] sm:text-xs font-roboto text-tegbale-blue tracking-wide cursor-pointer"
        @click="handleShowComment"
      >
        1 comment
      </p>
      <transition name="slide-down">
        <div v-if="showComments" id="comment_container">
          <div class="ml-3 border-l-2 border-b border-b-gray-50 pl-4">
            <div class="py-2 flex space-x-3">
              <BaseAvatar />
              <div class="flex items-start justify-between author w-full">
                <div
                  class="font-roboto tracking-wide"
                  style="line-height: 0.8rem"
                >
                  <p class="text-[10px] font-semibold">Henry Abimbola</p>
                  <p class="text-[8px] text-tegbale-text-gray">Guardian</p>
                </div>
                <div class="flex items-start space-x-2">
                  <svg
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.27966 0.943085C3.65595 0.943085 0.707819 3.89121 0.707819 7.51492C0.707819 11.1386 3.65595 14.0868 7.27966 14.0868C10.9034 14.0868 13.8515 11.1386 13.8515 7.51492C13.8515 3.89121 10.9034 0.943085 7.27966 0.943085ZM7.27966 12.7724C4.38082 12.7724 2.02219 10.4138 2.02219 7.51492C2.02219 4.61609 4.38082 2.25745 7.27966 2.25745C10.1785 2.25745 12.5371 4.61609 12.5371 7.51492C12.5371 10.4138 10.1785 12.7724 7.27966 12.7724Z"
                      fill="#589DD9"
                    />
                    <path
                      d="M7.93684 4.229H6.62247V8.17211H10.5656V6.85774H7.93684V4.229Z"
                      fill="#589DD9"
                    />
                  </svg>
                  <p class="text-[10px] tracking-wide text-roboto">
                    Today 14:22pm
                  </p>
                </div>
              </div>
            </div>
            <div class="ml-9">
              <p class="w-full font-roboto text-[11px] tracking-wide">
                That's my girl!!
              </p>
            </div>
          </div>
          <div class="ml-3 border-l-2 border-b border-b-gray-50 pl-4">
            <div class="py-2 flex space-x-3">
              <BaseAvatar />
              <div class="flex items-start justify-between author w-full">
                <div
                  class="font-roboto tracking-wide"
                  style="line-height: 0.8rem"
                >
                  <p class="text-[10px] font-semibold">Henry Abimbola</p>
                  <p class="text-[8px] text-tegbale-text-gray">Guardian</p>
                </div>
                <div class="flex items-start space-x-2">
                  <svg
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.27966 0.943085C3.65595 0.943085 0.707819 3.89121 0.707819 7.51492C0.707819 11.1386 3.65595 14.0868 7.27966 14.0868C10.9034 14.0868 13.8515 11.1386 13.8515 7.51492C13.8515 3.89121 10.9034 0.943085 7.27966 0.943085ZM7.27966 12.7724C4.38082 12.7724 2.02219 10.4138 2.02219 7.51492C2.02219 4.61609 4.38082 2.25745 7.27966 2.25745C10.1785 2.25745 12.5371 4.61609 12.5371 7.51492C12.5371 10.4138 10.1785 12.7724 7.27966 12.7724Z"
                      fill="#589DD9"
                    />
                    <path
                      d="M7.93684 4.229H6.62247V8.17211H10.5656V6.85774H7.93684V4.229Z"
                      fill="#589DD9"
                    />
                  </svg>
                  <p class="text-[10px] tracking-wide text-roboto">
                    Today 14:22pm
                  </p>
                </div>
              </div>
            </div>
            <div class="ml-9">
              <p class="w-full font-roboto text-[11px] tracking-wide">
                That's my girl!!
              </p>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="flex items-center mt-3 py-2">
      <CommentInput />
    </div>
  </div>
</template>

<script setup>
import PostCommentAvatar from "@/components/PostCommentAvatar.vue";
import BaseAvatar from "@/components/BaseComponents/BaseAvatar.vue";
import CommentInput from "@/components/CommentInput.vue";
import { ref } from "vue";

const showComments = ref(false);

const handleShowComment = () => {
  showComments.value = !showComments.value;
};
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: max-height 0.5s ease-in-out;
  overflow: hidden;
}

.slide-down-enter,
.slide-down-leave-to {
  max-height: 0;
}
</style>
