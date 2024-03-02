<template>
  <div className="back-office-bar" v-if="authStore.isAuthenticated">
    <div>Welcome! Your are connected as {{ authStore.username }}.</div>
    <div class="back-office-buttons">
      <button type="button" @click="handleClickAccount">Account</button>
      <button type="button" @click="handleLogOut">Log out</button>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();

const handleLogOut = () => {
  authStore.logout();
  router.go(0);
};

const handleClickAccount = () => {
  router.push('/account');
};
</script>

<style scoped>
.back-office-bar {
  height: max-content;
  padding: 5px 20px;
  background-color: var(--color-text-gray);
  display: flex;
  justify-content: space-between;
}

.back-office-buttons {
  display: flex;
  gap: 5px;
}
</style>
