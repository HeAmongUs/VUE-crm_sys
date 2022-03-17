<template>
  <ul class="sidenav app-sidenav" :class="{'open': isOpen}" style="margin-top: 60px">
    <li
        v-for="link in links"
        :key="link.url"
        @click="$router.push(link.url)"
        :class="{
         'active': $route.path === link.url
        }"
      >
      <a
          class="waves-effect waves-orange pointer"
      >
        {{ link.title }}
      </a>
    </li>

  </ul>
</template>

<script>
export default {
  name: "Sidebar",
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    links: [
      {title: 'Счет', url: '/'},
      {title: 'История', url: '/history'},
      {title: 'Планирование', url: '/planing'},
      {title: 'Новая запись', url: '/record'},
      {title: 'Категории', url: '/categories'},
    ]
  })
}
</script>

<style scoped>

</style>