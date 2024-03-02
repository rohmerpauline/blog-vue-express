<template>
  <div class="header-container">
    <BackOfficeBar />
    <header v-click-outside="closeSlide">
      <div class="app-title" @click="goToHomePage">My <span>Blog</span> App</div>
      <Nav className="desktop-nav" />
      <font-awesome-icon class="menu-burger-icon" icon="bars" @click="toggleSlide" />
    </header>

    <Nav className="mobile-nav" :closeSlide="closeSlide" v-if="isMenuVisible" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import BackOfficeBar from './BackOfficeBar.vue';
import Nav from '../molecules/Nav.vue';

const isMenuVisible = ref(false);

const toggleSlide = () => {
  isMenuVisible.value = !isMenuVisible.value;
};

const closeSlide = () => {
  if (isMenuVisible) {
    isMenuVisible.value = false;
  }
};

const router = useRouter();

const goToHomePage = () => {
  router.push('/');
};
</script>

<style scoped>
.header-container {
  position: relative;
}

header {
  height: 80px;
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-title {
  font-size: 1.7em;
  font-weight: 700;
  letter-spacing: -1px;
  cursor: pointer;
}

.app-title > span {
  color: var(--theme-color);
  font-weight: 700;
}

.menu-burger-icon {
  height: 25px;
  width: 25px;
  cursor: pointer;
}

.menu-burger-icon:hover {
  color: var(--theme-color);
}

@media (min-width: 800px) {
  .menu-burger-icon {
    display: none;
  }
}
</style>
