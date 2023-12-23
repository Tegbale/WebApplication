<template>
  <div class="flex mx-auto w-full relative">
    <aside
      class="fixed inset-0 transform md:transform-none md:opacity-100 duration-200 md:relative z-10 border-r bg-white border-gray-200 w-60"
      :class="{
        'translate-x-0 ease-in opacity-100': isOpen,
        '-translate-x-full ease-out opacity-0': !isOpen,
      }"
    >
      <div class="fixed">
        <div class="flex items-center justify-between">
          <div class="flex flex-1 items-center">
            <div class="flex flex-1 justify-between items-center">
              <div
                class="logo-wrapper p-2 flex-1"
                @click.prevent="isOpen = true"
              >
                <div
                  class="logo rounded-full flex justify-center items-center text-white text-4xl font-bold font-poppins bg-tegbale-blue mx-0"
                >
                  T
                </div>
                <p class="px-2 text-xl font-bold font-roboto text-tegbale-blue">
                  Tegbale
                </p>
              </div>
              <div
                @click.prevent="isOpen = false"
                class="rounded-full hover:bg-gray-200 text-tegbale-blue font-medium p-2 cursor-pointer md:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-8 h-8"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <nav class="mt-10">
          <ul class="flex flex-1 flex-col space-y-4">
            <li class="flex-1 items-center">
              <router-link
                to="/dashboard"
                active-class="bg-tegbale-blue text-white rounded-xl"
                class="flex items-center pl-4 pr-4 py-2 text-tegbale-text-gray hover:bg-tegbale-blue hover:text-white hover:rounded-xl"
              >
                <span class="flex justify-center items-center">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                  >
                    <path
                      d="M8.88889 20H2.22222C1 20 0 19 0 17.7778V2.22222C0 1 1 0 2.22222 0H8.88889V20ZM11.1111 20H17.7778C19 20 20 19 20 17.7778V10H11.1111V20ZM20 7.77778V2.22222C20 1 19 0 17.7778 0H11.1111V7.77778H20Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span class="mx-4 text-base font-normal font-roboto"
                    >Dashboard</span
                  >
                </span>
              </router-link>
            </li>
            <li class="flex-1 items-center">
              <router-link
                to="/classrooms"
                active-class="bg-tegbale-blue text-white rounded-xl"
                class="flex items-center pl-4 pr-4 py-2 text-tegbale-text-gray w-full, hover:bg-tegbale-blue hover:text-white hover:rounded-xl"
              >
                <span class="flex justify-center items-center">
                  <svg
                    width="24"
                    height="20"
                    viewBox="0 0 24 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                  >
                    <path
                      d="M1.57966 0C0.706359 0 0 0.706359 0 1.57869V18.4213C0 19.2936 0.706359 20 1.57966 20H21.5797C22.453 20 23.1593 19.2936 23.1593 18.4213V1.57869C23.1593 0.706359 22.453 0 21.5797 0H1.57966ZM2.10557 2.1046H21.0537V17.8954H18.4232V16.8436H13.6852V17.8954H2.10557V2.1046ZM11.5797 6.31574C11.1608 6.31574 10.7592 6.48211 10.463 6.77827C10.1669 7.07442 10.0005 7.47609 10.0005 7.89491C10.0005 8.31374 10.1669 8.71541 10.463 9.01156C10.7592 9.30771 11.1608 9.47409 11.5797 9.47409C11.9985 9.47409 12.4002 9.30771 12.6963 9.01156C12.9925 8.71541 13.1588 8.31374 13.1588 7.89491C13.1588 7.47609 12.9925 7.07442 12.6963 6.77827C12.4002 6.48211 11.9985 6.31574 11.5797 6.31574ZM7.36949 8.15883C6.71524 8.15883 6.18354 8.68957 6.18354 9.34189C6.19234 9.65019 6.32099 9.9429 6.54217 10.1579C6.76335 10.3728 7.05962 10.4931 7.36804 10.4931C7.67646 10.4931 7.97273 10.3728 8.19391 10.1579C8.41509 9.9429 8.54374 9.65019 8.55254 9.34189C8.55254 8.6886 8.02277 8.15883 7.36949 8.15883ZM15.7898 8.15883C15.6316 8.15431 15.474 8.18158 15.3265 8.23903C15.1789 8.29647 15.0444 8.38293 14.9308 8.49328C14.8173 8.60363 14.727 8.73563 14.6654 8.88147C14.6038 9.02731 14.572 9.18404 14.572 9.34237C14.572 9.5007 14.6038 9.65743 14.6654 9.80327C14.727 9.94911 14.8173 10.0811 14.9308 10.1915C15.0444 10.3018 15.1789 10.3883 15.3265 10.4457C15.474 10.5032 15.6316 10.5304 15.7898 10.5259C16.0979 10.5171 16.3903 10.3886 16.6051 10.1676C16.8199 9.94657 16.9401 9.65054 16.9401 9.34237C16.9401 9.0342 16.8199 8.73818 16.6051 8.51718C16.3903 8.29618 16.0979 8.16763 15.7898 8.15883ZM11.5797 10.5259C10.442 10.5259 9.25118 10.9129 8.54193 11.4967C8.16233 11.3781 7.76716 11.317 7.36949 11.3153C6.10151 11.3153 4.73608 11.9859 4.73608 12.8196V13.6843H18.4232V12.8196C18.4232 11.9859 17.0578 11.3153 15.7898 11.3153C15.3942 11.3153 14.9889 11.3809 14.6174 11.4967C13.9081 10.9129 12.7174 10.5259 11.5797 10.5259Z"
                      fill="currentColor"
                    />
                  </svg>

                  <span class="mx-4 text-base font-normal font-roboto"
                    >Classrooms</span
                  >
                </span>
              </router-link>
            </li>
            <li class="flex-1 items-center">
              <router-link
                to="/teachers"
                active-class="bg-tegbale-blue text-white rounded-xl"
                class="flex items-center pl-4 pr-4 py-2 text-tegbale-text-gray w-full, hover:bg-tegbale-blue hover:text-white hover:rounded-xl"
              >
                <span class="flex justify-center items-center">
                  <svg
                    width="25"
                    height="20"
                    viewBox="0 0 25 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                  >
                    <path
                      d="M8.12506 13.75C8.0317 13.75 7.93834 13.7637 7.84928 13.7926C7.34303 13.957 6.81061 14.0625 6.25006 14.0625C5.68952 14.0625 5.15709 13.957 4.65045 13.7926C4.56139 13.7637 4.46842 13.75 4.37506 13.75C1.95084 13.75 -0.0128275 15.7219 6.31046e-05 18.1492C0.00553185 19.175 0.848891 20 1.87506 20H10.6251C11.6512 20 12.4946 19.175 12.5001 18.1492C12.513 15.7219 10.5493 13.75 8.12506 13.75ZM6.25006 12.5C8.32116 12.5 10.0001 10.8211 10.0001 8.75C10.0001 6.67891 8.32116 5 6.25006 5C4.17897 5 2.50006 6.67891 2.50006 8.75C2.50006 10.8211 4.17897 12.5 6.25006 12.5ZM23.1251 0H8.12506C7.09108 0 6.25006 0.869141 6.25006 1.93711V3.75C7.16491 3.75 8.01178 4.01484 8.75006 4.44531V2.5H22.5001V13.75H20.0001V11.25H15.0001V13.75H12.0219C12.768 14.402 13.3157 15.2629 13.5723 16.25H23.1251C24.159 16.25 25.0001 15.3809 25.0001 14.3129V1.93711C25.0001 0.869141 24.159 0 23.1251 0Z"
                      fill="currentColor"
                    />
                  </svg>

                  <span class="mx-4 text-base font-normal font-roboto"
                    >Teachers</span
                  >
                </span>
              </router-link>
            </li>

            <li class="flex-1 items-center">
              <router-link
                active-class="bg-tegbale-blue text-white rounded-xl"
                to="/students"
                class="flex items-center pl-4 pr-4 py-2 text-tegbale-text-gray w-full, hover:bg-tegbale-blue hover:text-white hover:rounded-xl"
              >
                <span class="flex justify-center items-center">
                  <svg
                    width="35"
                    height="20"
                    viewBox="0 0 35 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                  >
                    <path
                      d="M17.1844 0L16.8408 0.104281L3.11965 4.70143L0 5.72997L1.81669 6.31175V15.9166C1.16136 16.2975 0.71899 16.9923 0.71899 17.8046C0.71899 18.3869 0.95029 18.9453 1.362 19.357C1.77372 19.7687 2.33213 20 2.91438 20C3.49663 20 4.05504 19.7687 4.46676 19.357C4.87847 18.9453 5.10977 18.3869 5.10977 17.8046C5.10977 16.9923 4.6674 16.2975 4.01208 15.9166V7.06916L6.20747 7.78815V13.4138C6.20747 14.3139 6.75631 15.0604 7.40834 15.5763C8.06037 16.0889 8.87047 16.4512 9.84303 16.7761C11.7903 17.4237 14.3568 17.8046 17.1844 17.8046C20.0121 17.8046 22.5785 17.4248 24.5258 16.775C25.4984 16.4512 26.3085 16.0889 26.9605 15.5752C27.6125 15.0604 28.1614 14.3139 28.1614 13.4138V7.78815L31.2492 6.75851L34.3688 5.72997L31.2481 4.70033L17.5269 0.104281L17.1844 0ZM17.1844 2.29967L27.4753 5.72997L17.1844 9.16026L6.89352 5.72997L17.1844 2.29967ZM8.40285 8.54336L16.8419 11.3557L17.1844 11.4588L17.528 11.3546L25.966 8.54226V13.4138C25.966 13.4248 25.9704 13.5521 25.6224 13.8255C25.2755 14.0999 24.6531 14.4457 23.8386 14.7179C22.2119 15.2591 19.8134 15.6092 17.1844 15.6092C14.5554 15.6092 12.157 15.2602 10.5291 14.7168C9.7168 14.4457 9.09331 14.0988 8.74643 13.8255C8.39737 13.551 8.40285 13.4248 8.40285 13.4138V8.54336Z"
                      fill="currentColor"
                    />
                  </svg>

                  <span class="mx-4 text-base font-normal font-roboto"
                    >Students</span
                  >
                </span>
              </router-link>
            </li>
            <li class="flex-1 items-center">
              <router-link
                active-class="bg-tegbale-blue text-white rounded-xl"
                to="/settings"
                class="flex items-center pl-4 pr-4 py-2 text-tegbale-text-gray w-full, hover:bg-tegbale-blue hover:text-white hover:rounded-xl"
              >
                <span class="flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span class="mx-4 text-base font-normal font-roboto"
                    >Settings</span
                  >
                </span>
              </router-link>
            </li>
          </ul>
        </nav>
        <div class="flex flex-col justify-center py-24">
          <ul>
            <li class="flex-1 items-center">
              <button
                @click.prevent="logout"
                class="flex w-full items-center pl-4 pr-4 py-2 text-[#e77d7d] w-full, hover:bg-red-100 hover:rounded-xl"
              >
                <span class="flex justify-center items-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="#D00808"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_33_1882)">
                      <g opacity="0.7">
                        <path
                          d="M3.75 18.75H11.25C11.5814 18.7497 11.8992 18.6179 12.1335 18.3835C12.3679 18.1492 12.4997 17.8314 12.5 17.5V15.625H11.25V17.5H3.75V2.5H11.25V4.375H12.5V2.5C12.4997 2.16858 12.3679 1.85083 12.1335 1.61648C11.8992 1.38213 11.5814 1.25033 11.25 1.25H3.75C3.41858 1.25033 3.10083 1.38213 2.86648 1.61648C2.63213 1.85083 2.50033 2.16858 2.5 2.5V17.5C2.50033 17.8314 2.63213 18.1492 2.86648 18.3835C3.10083 18.6179 3.41858 18.7497 3.75 18.75Z"
                          fill="currentColor"
                        />
                        <path
                          d="M12.8663 12.8663L15.1075 10.625H6.25V9.375H15.1075L12.8663 7.13375L13.75 6.25L17.5 10L13.75 13.75L12.8663 12.8663Z"
                          fill="currentColor"
                        />
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_33_1882">
                        <rect width="20" height="20" fill="currentColor" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span class="mx-4 text-base font-normal font-roboto"
                    >Logout</span
                  >
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </aside>
    <div class="flex w-screen min-h-screen flex-col flex-grow relative">
      <div class="flex w-full items-center bg-white border-b fixed z-50">
        <!-- hamburger menu -->
        <button
          @click.prevent="openMenu"
          class="p-3 focus:outline-none rounded-full text-gray-500 hover:bg-gray-100 focus:bg-gray-200 md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <nav
          class="flex w-full md:w-10/12 items-center justify-between md:justify-around py-4 font-roboto text-base font-normal text-tegbale-text-gray bg-white"
        >
          <div class="w-full sm:w-[30%] max-w-2xl">
            <form action="">
              <div
                class="relative w-full flex items-center text-tegbale-text-gray focus-within:text-transparent"
              >
                <input
                  type="text"
                  name="search"
                  placeholder="Search"
                  autocomplete="off"
                  aria-label="Search"
                  class="pr-3 font-medium placeholder:text-tegbale-text-gray placeholder:text-xs placeholder:sm:text-base placeholder:sm:pl-4 text-gray-700 rounded-2xl border-none ring-2 ring-gray-200 focus:ring-tegbale-blue focus:ring-2 w-full"
                />
                <div class="absolute hidden sm:block pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 ml-1 pointer-events-none"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </div>
              </div>
            </form>
          </div>
          <div class="flex items-center space-x-4 px-4">
            <BadgeComponent class="hidden md:flex" />

            <AvatarComponent class="flex" />
          </div>
        </nav>
      </div>

      <main class="container mx-auto px-6 py-10">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AvatarComponent from "../components/avatarComponent.vue";
import BadgeComponent from "../components/badgeComponent.vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const userStore = useAuthStore();
const router = useRouter();

const isOpen = ref(false);

// function to logout user
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  userStore.clearUserDetails();

  router.push({ name: "home" });
};

// function to open menu
const openMenu = () => {
  isOpen.value = true;
};
</script>

<style lang="scss" scoped>
aside {
  // transition: width 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 1rem;
  color: #a9a9a9;

  .logo-wrapper {
    display: flex;
    align-items: center;

    .logo {
      width: 3rem;
      height: 3rem;
    }

    p {
      font-family: "Roboto";
      display: flex;
      align-items: center;
      text-align: center;
    }
  }

  @media (max-width: 768px) {
    position: fixed;
    z-index: 10;
  }
}
</style>
