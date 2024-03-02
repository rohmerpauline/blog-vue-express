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
    async getPostsByLimit(limit) {
      try {
        const res = await axios.get(`${API_URL.POSTS}?limit=${limit}`);
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
    async createPost(post) {
      try {
        await axios.post(API_URL.POSTS, post);
        await this.getAllPosts();
      } catch (error) {
        this.error = error.message;
      }
    },
    async deletePost(id) {
      try {
        await axios.delete(`${API_URL.POSTS}/${id}`);
        await this.getAllPosts();
      } catch (error) {
        this.error = error.message;
      }
    },
  },
});
