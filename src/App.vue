<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import EmptyLayout from "@/layouts/EmptyLayout";
import MainLayout from "@/layouts/MainLayout";
import localizeFilter from "./filters/localizeFilter";

export default {
  name: "App",
  components: {
    MainLayout,
    EmptyLayout,
  },
  mounted() {
    window.M.AutoInit();
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || "empty") + "-layout";
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        document.title = localizeFilter(to.name) || "Some Title";
      },
    },
  },
};
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import "../../crm_sys/src/assets/index.css";
</style>
