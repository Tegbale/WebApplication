<script setup></script>

<template>
  <main>
    <div class="w-sreen h-screen flex space-x-4 justify-center items-center">
      <h1>Home page</h1>
      <router-link to="/login">
        <p class="bg-red-500 w-fit text-white font-bold py-2 px-4 rounded">
          Go To Login
        </p>
      </router-link>
    </div>
  </main>
</template>
