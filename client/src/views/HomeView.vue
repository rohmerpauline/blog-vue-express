<template>
  <LastPost :post="posts[0]" />
  <Heading title="Latest blog posts" />
  <PostsList :posts="posts" />
  <div class="see-all-link"><RouterLink to="/articles">See all article</RouterLink></div>
</template>

<script setup>
import Heading from '@/components/atoms/Heading.vue';
import LastPost from '@/components/molecules/LastPost.vue';
import PostsList from '@/components/organisms/PostsList.vue';
import { useBlogPostStore } from '@/stores/BlogPostStore';
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

const blogPostStore = useBlogPostStore();
const posts = ref([]);

const fetchPostsByLimit = async () => {
  await blogPostStore.getPostsByLimit(5);
  posts.value = blogPostStore.posts;
};

onMounted(() => {
  fetchPostsByLimit();
});
</script>

<style scoped>
.blog-card-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.see-all-link {
  margin: 20px 0;
  text-align: center;
}

a {
  text-decoration: none;
  color: inherit;
}

.see-all-link:hover {
  transform: scale(1.02);
}

a:hover {
  color: var(--theme-color);
  font-weight: 600;
}
</style>
