<template>
  <Header />
  <main>
    <RouterView />
  </main>
</template>

<script setup>
import { RouterView } from 'vue-router';
import Header from './components/organisms/Header.vue';
import { useAuthStore } from './stores/AuthStore';
const authStore = useAuthStore();
authStore.checkAuthStatusOnLoad();
</script>

<style scoped></style>
