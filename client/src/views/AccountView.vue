<template>
  <div>
    <Heading title="Account" />
    <div>
      <p>Username: {{ authStore.username }}</p>

      <nav>
        <RouterLink to="/account/posts">Manage blog posts</RouterLink>
        <RouterLink v-if="authStore.userRole === 'admin'" to="/account/users">Manage users</RouterLink>
        <span v-else>Manage users</span>
      </nav>

      <RouterView />
    </div>
  </div>
</template>

<script setup>
import Heading from '@/components/atoms/Heading.vue';
import { useAuthStore } from '@/stores/AuthStore';
import { RouterLink, RouterView } from 'vue-router';

const authStore = useAuthStore();
</script>

<style scoped>
nav {
  display: flex;
  margin: 20px 0;
  background-color: rgb(242, 242, 242);
}

nav a,
span {
  text-decoration: none;
  color: inherit;
  padding: 5px 10px;
}

span {
  cursor: not-allowed;
}

nav a:hover,
nav span:hover {
  background-color: rgb(245, 245, 245);
}

nav a.router-link-exact-active {
  font-weight: 700;
  background-color: rgb(210, 210, 210);
  background-color: var(--color-text-gray);
}
</style>
