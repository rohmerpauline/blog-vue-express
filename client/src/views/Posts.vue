<template>
  <div>
    <Heading title="Blog posts" />
    <PostsList :posts="posts" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useBlogPostStore } from '../stores/BlogPostStore';
import Heading from '../components/atoms/Heading.vue';
import PostsList from '@/components/organisms/PostsList.vue';

const blogPostStore = useBlogPostStore();
const posts = ref([]);

const fetchPosts = async () => {
  await blogPostStore.getAllPosts();
  posts.value = blogPostStore.posts;
};

onMounted(() => {
  fetchPosts();
});
</script>

<style scoped>
.posts-container {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.post-card {
  border: 1px solid var(--color-text-gray);
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
}

.post-card:hover {
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  transform: scale(1.01);
}

.post-heading {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 3px;
}

.post-subheading {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 15px;
}

.post-content {
  font-size: 13px;
  font-weight: 300;
}
</style>
