<template>
  <div class="blog-post">
    <button type="button" class="back-button" @click="handleGoBack">Back</button>
    <div class="post-container">
      <h1 class="post-title">{{ post.title }}</h1>
      <p class="post-subheading">{{ post.subheading }}</p>
      <p class="post-content">{{ post.content }}</p>
    </div>
  </div>
</template>

<script setup>
import { useBlogPostStore } from '@/stores/BlogPostStore';
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
const route = useRoute();
const router = useRouter();
const id = route.params.id;
const blogPostStore = useBlogPostStore();

const post = ref({});

const handleGoBack = () => {
  router.push('/articles');
};

onMounted(async () => {
  await blogPostStore.getAllPosts();
  post.value = blogPostStore.getPostById(id);
});
</script>

<style scoped>
.post-container {
  margin: 40px 0;
}

.post-title {
  font-weight: 700;
  margin-bottom: 10px;
}

.post-subheading {
  font-weight: 300;
  font-size: 17px;
  margin-bottom: 40px;
}

.post-content {
  line-height: 2;
  text-align: justify;
}
</style>
