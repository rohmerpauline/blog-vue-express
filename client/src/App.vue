<script setup>
import { RouterView } from 'vue-router';
import Header from './components/organisms/Header.vue';
</script>

<template>
  <Header />
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
