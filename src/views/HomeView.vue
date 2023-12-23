<script setup></script>

<template>
  <main
    class="h-full flex items-center w-full px-6 lg:px-32 bg-tegbale-blue text-white relative"
  >
    <img
      src="@/assets/communication.png"
      alt=""
      class="opacity-10 absolute max-w-2xl right-0 md:right-28"
    />

    <header class="w-full absolute left-0 top-0 p-6 lg:p-32">
      <div class="md:flex justify-start md:justify-between">
        <div>
          <div
            class="logo rounded-full flex justify-center items-center text-tegbale-blue text-5xl font-bold font-poppins bg-white mx-0"
          >
            T
          </div>
        </div>
        <div>
          <ul class="flex">
            <li
              class="ml-24 hover:border-b-2 hover:border-red-500 hover:transition hover:translate-x-1 transition-opacity"
            >
              <router-link to="/login" class=" ">
                <div class="flex items-center justify-end">
                  <div class="w-10 border-b border-solid border-white"></div>
                  <h1 class="ml-3 text-3xl font-bold">1</h1>
                </div>
                <div class="text-right text-lg font-poppins font-semibold">
                  Login
                </div>
              </router-link>
            </li>
            <li
              class="ml-24 hover:border-b-2 hover:border-red-500 hover:transition hover:translate-x-1 transition-opacity"
            >
              <router-link to="/login">
                <div class="flex items-center justify-end">
                  <div class="w-10 border-b border-solid border-white"></div>
                  <h1 class="ml-3 text-3xl font-bold">2</h1>
                </div>
                <div class="text-right text-lg font-poppins font-semibold">
                  Request a Demo
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </header>

    <section class="w-full md:w-9/12 xl:w-8/12">
      <span class="font-bold italic uppercase tracking-widest">Holla! </span
      ><span class="text-3xl">&#128075;</span>
      <h1 class="text-3xl lg:text-5xl font-bold text-blue-900 py-4">Tègbalé</h1>
      <p class="font-bold mb-1">Take your School in Your Pocket</p>
      <p class="max-w-sm">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam
        dolorem hic
      </p>
    </section>
    <footer class="absolute space-x-2 flex right-0 bottom-0 p-6 lg:p-32">
      <p class="font-bold mb-1">&copy;</p>
      <p>Breme Technologies Limited 2023</p>
    </footer>
  </main>
</template>

<style scoped>
.logo {
  width: 4rem;
  height: 4rem;
}

/*  */
</style>
