import { API_URL } from '@/configs/api';
import axios from 'axios';
import { defineStore } from 'pinia';

export const useBlogPostStore = defineStore('blogPostStore', {
  state: () => ({
    posts: [],
    error: '',
  }),
  getters: {},
  actions: {
    async getAllPosts() {
      try {
        const res = await axios.get(API_URL.POSTS);
        this.posts = res.data.map((post) => ({
          ...post,
          createdAt: new Date(post.createdAt),
        }));
        this.error = null;
      } catch (error) {
        this.posts = [];
        this.error = error.message;
      }
    },
    getPostById(id) {
      return this.posts.find((post) => post._id == id);
    },
  },
});
