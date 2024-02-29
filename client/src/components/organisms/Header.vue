<template>
  <header>
    <div class="app-title" @click="goToHomePage">My <span>Blog</span> App</div>
    <button type="button" class="login-button">Log in</button>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const goToHomePage = () => {
  router.push('/');
};
</script>

<style scoped>
header {
  height: 80px;
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-title {
  font-size: 1.7em;
  font-weight: 700;
  letter-spacing: -1px;
  cursor: pointer;
}

.app-title > span {
  color: var(--theme-color);
  font-weight: 700;
}

.login-button {
  background-color: var(--theme-color);
  border: none;
  padding: 5px 12px;
  font-size: 18px;
  color: white;
  border-radius: 8px;
  cursor: pointer;
}
</style>
