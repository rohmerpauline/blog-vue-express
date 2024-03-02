<template>
  <div class="posts-container">
    <BlogCard v-for="post in posts" :key="post._id" :post="post" />
  </div>
</template>

<script setup>
import BlogCard from '../molecules/BlogCard.vue';

defineProps({
  posts: Array,
});
</script>

<style scoped>
.posts-container {
  display: flex;
  flex-direction: column;
  gap: 25px;
}
</style>
