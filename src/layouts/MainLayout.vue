<template>
  <div class="app-main-layout">
    <Navbar @navbarClick="isOpen = !isOpen" />

    <Sidebar :isOpen="isOpen" />

    <main class="app-content" :class="{ full: !isOpen }">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link to="/record" class="btn-floating btn-large blue">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";
export default {
  name: "MainLayout",
  components: { Navbar, Sidebar },
  data() {
    return {
      isOpen: true,
    };
  },
};
</script>

<style scoped></style>
