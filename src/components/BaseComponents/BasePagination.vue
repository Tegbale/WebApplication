<template>
    <div class="pagination">
      <ul>
        <li v-for="(link, index) in links" :key="index" :class="{ active: link.active }">
          <a @click="goToPage(link.url)">{{ link.label }}</a>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  const links = [
    { url: '/page/1', label: 'Page 1', active: true },
    { url: '/page/2', label: 'Page 2', active: false },
    { url: '/page/3', label: 'Page 3', active: false }
  ];
  
  const goToPage = (url) => {
    // Handle navigation logic
    console.log(`Navigating to ${url}`);
  };
  </script>
  
  <style>
  .pagination {
    display: flex;
    justify-content: center;
  }
  
  .pagination ul {
    list-style: none;
    display: flex;
    justify-content: center;
  }
  
  .pagination li {
    margin: 0 5px;
  }
  
  .pagination li.active a {
    font-weight: bold;
  }
  </style>
  