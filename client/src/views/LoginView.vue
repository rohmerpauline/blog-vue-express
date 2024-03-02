<template>
  <Heading title="Log in" />
  <div v-if="!authStore.isAuthenticated">
    <form @submit.prevent="handleSubmit" class="login-form">
      <input type="text" v-model="username" id="username" name="username" />
      <input type="text" v-model="password" id="password" name="password" />
      <button type="submit">Login</button>
    </form>
  </div>
  <div v-else class="logged-in-message">You are already logged in!</div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import Heading from '@/components/atoms/Heading.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const username = ref(null);
const password = ref(null);

const handleSubmit = () => {
  if (username && password) {
    authStore.login(username.value, password.value);
    username.value = null;
    password.value = null;
    router.push('/');
  }
};
</script>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

input {
  height: 35px;
  font-size: 16px;
  padding: 0 10px;
  border-radius: 5px;
  border: 1px solid var(--color-text-gray);
}

button {
  width: max-content;
  padding: 5px 15px;
  font-size: 18px;
  margin: auto;
  background-color: var(--theme-color);
  border: none;
  color: rgb(75, 70, 70);
  border-radius: 8px;
}

button:hover {
  transform: scale(1.02);
}
.logged-in-message {
  font-size: 20px;
  text-align: center;
}
</style>
