<template>
  <div class="last-post" v-if="post">
    <h2 class="post-heading" @click="handleOnClick(post._id)">{{ post.title }}</h2>
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
.last-post {
  margin: 40px 0;
}

.post-heading {
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 10px;
  cursor: pointer;
}

.post-heading:hover {
  color: var(--theme-color);
  transform: scale(1.01);
}

.post-subheading {
  font-size: 18px;
  margin-bottom: 20px;
}

.post-content {
  text-align: justify;
  line-height: 2;
}
</style>
