<template>
  <div class="users-tabs">
    <div>
      <h2>Create a new user</h2>
      <form @submit.prevent="handleCreateUser">
        <input type="text" v-model="username" id="username" />
        <input type="text" v-model="password" id="password" />
        <button type="submit">Create a user</button>
      </form>
    </div>

    <div>
      <h2>Manage users and users permissions</h2>
      <table>
        <tr>
          <th>Username</th>
          <th>Permission</th>
          <th></th>
        </tr>
        <tr v-for="user in users">
          <td>{{ user.username }}</td>
          <td>{{ user.role }}</td>
          <td><button type="button" @click="deleteUser(user._id)">Delete user</button></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
const authStore = useAuthStore();

const users = ref([]);
const username = ref(null);
const password = ref(null);

const handleCreateUser = async () => {
  if (username && password) {
    await authStore.createUser(username.value, password.value);
    username.value = null;
    password.value = null;
    await authStore.getAllUsers();
  }
};

const deleteUser = async (id) => {
  await authStore.deleteUser(id);
  await authStore.getAllUsers();
};

const fetchUsers = async () => {
  await authStore.getAllUsers();
  users.value = authStore.users;
};

onMounted(() => {
  fetchUsers();
});

watchEffect(() => {
  users.value = authStore.users;
});
</script>

<style scoped>
.users-tabs div {
  margin: 40px 0;
}

h2 {
  margin-bottom: 10px;
  font-size: 18px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}

form input {
  width: 100%;
}

form button {
  width: 100px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  text-align: center;
  border: 1px solid var(--color-text-gray);
}

tr {
  border-bottom: 1px solid var(--color-text-gray);
}

th,
td {
  padding: 4px;
}

th {
  background-color: var(--color-text-gray);
}
</style>
