<template>
  <div>
    <Heading title="Create a post" />
    <form @submit.prevent="handleSubmit" class="create-post-form">
      <label for="title">Title</label>
      <textarea type="text" name="title" id="title" v-model="title" rows="1" />
      <label for="subheading">Subheading</label>
      <textarea name="subheading" id="subheading" v-model="subheading" rows="2" />
      <label for="content">Content</label>
      <textarea name="content" id="content" v-model="content" rows="20" />
      <button type="submit">Create a post</button>
    </form>
  </div>
</template>

<script setup>
import Heading from '@/components/atoms/Heading.vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useBlogPostStore } from '@/stores/BlogPostStore';
import { ref } from 'vue';
const title = ref(null);
const subheading = ref(null);
const content = ref(null);
const blogPostStore = useBlogPostStore();
const authStore = useAuthStore();

const handleSubmit = () => {
  if (title && subheading && content) {
    const post = { title: title.value, subheading: subheading.value, content: content.value, author: authStore.username };
    blogPostStore.createPost(post);
    title.value = null;
    subheading.value = null;
    content.value = null;
  }
};
</script>

<style scoped>
.create-post-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

input {
  height: 35px;
  padding: 0 10px;
}

textarea,
input {
  font-size: 16px !important;
  border-radius: 2px;
  border: 1px solid var(--color-text-gray);
  background-color: rgb(236, 236, 236);
}

textarea {
  resize: none;
  font-family: inherit !important;
  padding: 10px;
}

button {
  width: max-content;
  padding: 5px 15px;
  font-size: 18px;
  margin: auto;
  background-color: var(--theme-color);
  border: none;
  color: white;
  border-radius: 8px;
}

button:hover {
  transform: scale(1.02);
}
</style>
