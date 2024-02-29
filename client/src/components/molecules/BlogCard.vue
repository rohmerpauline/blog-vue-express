<template>
  <div class="blog-card">
    <h2 class="blog-title">Exploring the Wonders of Deep Learning</h2>
    <p class="blog-subheading">Unraveling the Mysteries of Neural Networks and AI Advancements</p>
    <p class="blog-content">
      {{ content }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const content = ref(
  'In this blog post, we delve into the fascinating world of deep learning, discussing its applications, breakthroughs, and the impact it has on various industries. Join us on a journey through neural networks...',
);

/* defineProps({
  title: String,
  subheading: String,
  content: String,
}); */
</script>

<style scoped>
.blog-card {
  padding: 20px;
  border: 1px solid var(--color-text-gray);
  border-radius: 15px;
}
.blog-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 3px;
}

.blog-subheading {
  font-weight: 300;
  margin-bottom: 20px;
  font-size: 14px;
}

.blog-content {
  font-size: 13px;
}
</style>
