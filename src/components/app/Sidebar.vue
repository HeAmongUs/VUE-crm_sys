<template>
  <ul class="sidenav app-sidenav" :class="{ open: isOpen }">
    <li
      v-for="link in links"
      :key="link.url"
      @click="$router.push(link.url)"
      :class="{
        active: $route.path === link.url,
      }"
    >
      <a class="waves-effect waves-orange pointer">
        {{ link.title }}
      </a>
    </li>
  </ul>
</template>

<script>
import localizeFilter from "@/filters/localizeFilter";

export default {
  name: "Sidebar",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      links: [
        { title: localizeFilter("Bill"), url: "/" },
        { title: localizeFilter("History"), url: "/history" },
        { title: localizeFilter("Planning"), url: "/planing" },
        { title: localizeFilter("New_record"), url: "/record" },
        { title: localizeFilter("Categories"), url: "/categories" },
      ],
    };
  },
};
</script>

<style scoped></style>
