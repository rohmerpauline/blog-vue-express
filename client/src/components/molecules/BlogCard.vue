<template>
  <div class="post-card" @click="handleOnClick(post._id)">
    <h2 class="post-heading">{{ post.title }}</h2>
    <p class="post-subheading">{{ post.subheading }}</p>
    <p class="post-content">{{ post.content }}</p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

defineProps({
  post: Object,
});

const router = useRouter();

const handleOnClick = (id) => {
  router.push(`article/${id}`);
};
</script>

<style scoped>
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

.post-card:hover > .post-heading {
  color: var(--theme-color);
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
