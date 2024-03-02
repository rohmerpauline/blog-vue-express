<template>
  <nav :class="className">
    <RouterLink to="/" @click="handleNavClick">Home</RouterLink>
    <RouterLink to="/articles">Articles</RouterLink>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router';

defineProps({
  className: String,
  closeSlide: Function,
});

const handleNavClick = (event) => {
  if (event.currentTarget.classList.contains('mobile-nav')) {
    closeSlide();
  }
};
</script>

<style scoped>
nav {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.mobile-nav {
  padding: 20px 0;
  width: 100%;
  background-color: white;
  position: absolute;
  top: 0;
  border-bottom: 1px solid var(--color-text-gray);
}

.desktop-nav {
  display: none;
}

nav a {
  text-decoration: none;
  font-size: 17px;
  font-weight: 500;
  color: inherit;
  margin: auto;
}

nav a:hover,
.menu-burger-icon:hover {
  transform: scale(1.02);
}

nav a.router-link-exact-active,
nav a:hover,
.menu-burger-icon:hover {
  color: var(--theme-color);
}

@media (min-width: 800px) {
  nav {
    flex-direction: row;
  }

  .mobile-nav {
    display: none;
  }

  .desktop-nav {
    display: flex;
  }
}
</style>
