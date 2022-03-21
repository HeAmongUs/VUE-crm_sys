<template>
  <div>
    <loader v-if="isLoading" />
    <div v-else class="app-main-layout">
      <Navbar @navbarClick="isOpen = !isOpen" />

      <Sidebar :isOpen="isOpen" />

      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link
          to="/record"
          class="btn-floating btn-large blue"
          v-tooltip="'Добавить новую записб'"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";
import Loader from "@/components/app/Loader";
export default {
  name: "MainLayout",
  components: { Loader, Navbar, Sidebar },
  data() {
    return {
      isOpen: true,
      isLoading: true,
    };
  },
  async mounted() {
    if (!this.$store.getters.info?.length) {
      await this.$store.dispatch("queryUserInfo");
    }

    this.isLoading = false;
  },
};
</script>

<style scoped></style>
