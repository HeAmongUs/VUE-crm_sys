<template>
  <div>
    <loader v-if="isLoading" />
    <div v-else class="app-main-layout">
      <Navbar @navbarClick="isOpen = !isOpen" />

      <Sidebar :isOpen="isOpen" :key="locale" />

      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div
        class="fixed-action-btn"
        style="margin-right: 40px; margin-bottom: 40px"
      >
        <router-link
          to="/record"
          class="btn-floating btn-large blue"
          v-tooltip="localize('New_record')"
          :key="locale"
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
import messages from "@/utils/messages";
import localizeFilter from "@/filters/localizeFilter";

export default {
  name: "MainLayout",
  components: { Navbar, Sidebar },
  data() {
    return {
      isOpen: true,
      isLoading: true,
      localize: localizeFilter,
    };
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    locale() {
      return this.$store.getters.info.locale;
    },
  },
  watch: {
    error(fbError) {
      this.$errorMessage(messages[fbError.code] || "Что-то пошло не так");
    },
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
