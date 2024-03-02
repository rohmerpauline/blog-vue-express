<template>
  <div class="blog-post">
    <button type="button" class="back-button" @click="handleGoBack">
      <font-awesome-icon icon="chevron-left" class="chevron-left-icon" />
    </button>
    <div class="post-container">
      <h1 class="post-title">{{ post.title }}</h1>
      <p class="post-subheading">{{ post.subheading }}</p>
      <p class="post-info" v-if="post.author && post.createdAt">By {{ post.author }}, {{ getDateFormat(post.createdAt) }}</p>
      <div v-if="authStore.isAuthenticated" class="edit-buttons-container">
        <button>Modify</button>
        <button @click="handleClickDelete">Delete</button>
      </div>
      <div class="confirm-delete-buttons" v-if="deleteHasBeenClicked">
        Are you sure you want to delete this post? <button type="'button'" @click="confirmDeletePost(post._id)">Yes</button>
        <button type="button" @click="abortDelete">No</button>
      </div>
      <p class="post-content">{{ post.content }}</p>
    </div>
  </div>
</template>

<script setup>
import { useBlogPostStore } from '@/stores/BlogPostStore';
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
const route = useRoute();
const router = useRouter();
const id = route.params.id;
const blogPostStore = useBlogPostStore();
const authStore = useAuthStore();

const post = ref({});
const deleteHasBeenClicked = ref(false);

const handleGoBack = () => {
  router.push('/articles');
};

const handleClickDelete = () => {
  deleteHasBeenClicked.value = true;
};

const confirmDeletePost = async (id) => {
  await blogPostStore.deletePost(id);
  router.push('/articles');
  deleteHasBeenClicked.value = false;
};

const abortDelete = () => {
  deleteHasBeenClicked.value = false;
};

const getDateFormat = (date) => {
  const dateObject = new Date(date);
  const day = String(dateObject.getDate()).padStart(2, '0');
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const year = dateObject.getFullYear();
  const formattedDate = day + '/' + month + '/' + year;
  return formattedDate;
};

onMounted(async () => {
  await blogPostStore.getAllPosts();
  post.value = blogPostStore.getPostById(id);
});
</script>

<style scoped>
.back-button {
  border: none;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 0;
}

.chevron-left-icon {
  color: var(--color-text-gray);
  height: 20px;
  width: 20px;
  padding: 10px;
}

.chevron-left-icon:hover {
  color: var(--theme-color);
}

.post-container {
  margin: 20px 0;
}

.post-title {
  font-weight: 700;
  margin-bottom: 10px;
}

.post-subheading {
  font-weight: 300;
  font-size: 17px;
  margin-bottom: 5px;
}

.post-info {
  font-size: 12px;
  font-style: italic;
  margin-bottom: 10px;
}

.edit-buttons-container {
  display: flex;
  gap: 10px;
}

.confirm-delete-buttons {
  display: flex;
  gap: 10px;
  color: red;
  font-weight: 700;
  font-size: 13px;
  margin: 10px 0;
}

.post-content {
  line-height: 2;
  text-align: justify;
  margin: 40px 0;
}
</style>
