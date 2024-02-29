<script setup>
import Heading from '@/components/atoms/Heading.vue';
import BlogCard from '@/components/molecules/BlogCard.vue';
</script>

<template>
  <Heading title="Latest blog posts" />
  <div class="blog-card-list">
    <BlogCard />
    <BlogCard />
    <BlogCard />
    <BlogCard />
    <BlogCard />
    <BlogCard />
  </div>
</template>

<style scoped>
.blog-card-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
