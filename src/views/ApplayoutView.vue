<template>
  <div
    v-if="!noNavRoutes.includes($route.name)"
    class="flex mx-auto w-full relative"
  >
    <aside
      class="absolute inset-0 transform md:transform-none md:opacity-100 duration-200 md:relative z-10 bg-white border-r border-gray-200 w-80 md:w-[18%]"
      :class="{
        'translate-x-0 ease-in opacity-100': isOpen,
        '-translate-x-full ease-out opacity-0': !isOpen,
      }"
    >
      <div class="fixed w-[15%]">
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
                to="/admin/dashboard"
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
                to="/admin/schools"
                active-class="bg-tegbale-blue text-white rounded-xl"
                class="flex items-center pl-4 pr-4 py-2 text-tegbale-text-gray w-full, hover:bg-tegbale-blue hover:text-white hover:rounded-xl"
              >
                <span class="flex justify-center items-center">
                  <svg
                    width="23"
                    height="20"
                    viewBox="0 0 23 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                  >
                    <path
                      d="M21.1111 8.88889H18.8889V2.22222H20V0H2.22222V2.22222H3.33333V8.88889H1.11111C0.816426 8.88889 0.533811 9.00595 0.325437 9.21433C0.117063 9.4227 0 9.70532 0 10V20H22.2222V10C22.2222 9.70532 22.1052 9.4227 21.8968 9.21433C21.6884 9.00595 21.4058 8.88889 21.1111 8.88889ZM13.3333 17.7778V13.3333H8.88889V17.7778H5.55556V2.22222H16.6667V17.7778H13.3333Z"
                      fill="currentColor"
                    />
                    <path
                      d="M7.77783 4.44446H10.0001V6.66668H7.77783V4.44446ZM12.2223 4.44446H14.4445V6.66668H12.2223V4.44446ZM7.77783 8.8889H10.0001V11.1111H7.77783V8.8889ZM12.2223 8.8889H14.4445V11.1111H12.2223V8.8889Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span class="mx-4 text-base font-normal font-roboto"
                    >Schools</span
                  >
                </span>
              </router-link>
            </li>
            <li class="flex-1 items-center">
              <router-link
                to="/admin/staffs"
                active-class="bg-tegbale-blue text-white rounded-xl"
                class="flex items-center pl-4 pr-4 py-2 text-tegbale-text-gray w-full, hover:bg-tegbale-blue hover:text-white hover:rounded-xl"
              >
                <span class="flex justify-center items-center">
                  <svg
                    width="30"
                    height="20"
                    viewBox="0 0 30 20"
                    fill="currentColor"
                    class="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M30 13.25C30 14 28.5 14.5 26.75 14.75C25.625 12.625 23.375 11 20.75 9.875C21 9.5 21.25 9.25 21.5 8.875H22.5C26.375 8.75 30 11.125 30 13.25ZM8.5 8.75H7.5C3.625 8.75 0 11.125 0 13.25C0 14 1.5 14.5 3.25 14.75C4.375 12.625 6.625 11 9.25 9.875L8.5 8.75ZM15 10C17.75 10 20 7.75 20 5C20 2.25 17.75 0 15 0C12.25 0 10 2.25 10 5C10 7.75 12.25 10 15 10ZM15 11.25C9.875 11.25 5 14.5 5 17.5C5 20 15 20 15 20C15 20 25 20 25 17.5C25 14.5 20.125 11.25 15 11.25ZM22.125 7.5H22.5C24.625 7.5 26.25 5.875 26.25 3.75C26.25 1.625 24.625 0 22.5 0C21.875 0 21.375 0.125 20.875 0.375C21.875 1.625 22.5 3.25 22.5 5C22.5 5.875 22.375 6.75 22.125 7.5ZM7.5 7.5H7.875C7.625 6.75 7.5 5.875 7.5 5C7.5 3.25 8.125 1.625 9.125 0.375C8.625 0.125 8.125 0 7.5 0C5.375 0 3.75 1.625 3.75 3.75C3.75 5.875 5.375 7.5 7.5 7.5Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span class="mx-4 text-base font-normal font-roboto"
                    >Staffs</span
                  >
                </span>
              </router-link>
            </li>
            <li class="flex-1 items-center">
              <router-link
                active-class="bg-tegbale-blue text-white rounded-xl"
                to="/admin/settings"
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
                class="flex w-full items-center pl-4 pr-4 py-2 text-tegbale-text-gray hover:text-gray-50 w-full, hover:bg-[#e77d7d] hover:text- hover:rounded-xl"
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
    <div class="flex max-w-[84%] min-h-screen flex-col flex-grow relative z-0">
      <div
        class="flex container mx-auto items-center bg-white border-b fixed z-10"
      >
        <!-- hamburger menu -->
        <button
          @click.prevent="isOpen = true"
          class="p-3 ml-2 focus:outline-none rounded-full text-gray-500 hover:bg-gray-100 focus:bg-gray-200 md:hidden"
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
          class="flex w-full md:w-10/12 items-center justify-between py-5 px-4 space-x-3 font-roboto text-base font-normal text-tegbale-text-gray bg-white"
        >
          <form action="" class="w-full max-w-md">
            <div
              class="relative flex items-center text-tegbale-text-gray focus-within:text-tegbale-blue"
            >
              <input
                type="text"
                name="search"
                placeholder="Search"
                autocomplete="off"
                aria-label="Search"
                class="pl-12 pr-3 font-medium placeholder:text-tegbale-text-gray text-gray-700 rounded-2xl border-none ring-2 ring-gray-200 focus:ring-tegbale-blue focus:ring-2 w-full"
              />
              <div class="absolute w-10 block ml-2 mr-2 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 ml-3 pointer-events-none"
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
          <div class="flex justify-end items-center space-x-2 md:space-x-6">
            <BadgeComponent />

            <AvatarComponent />
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
import { useUsersStore } from "@/stores/user-store";
import { useRouter } from "vue-router";

const userStore = useUsersStore();
const router = useRouter();
const noNavRoutes = ref(["home", "login", "register"]);
const isOpen = ref(false);

// function to logout user
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  userStore.clearUserDetails();

  router.push({ name: "login" });
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
