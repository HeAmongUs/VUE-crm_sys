<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <loader v-if="isLoading" />
      <div v-else class="row">
        <category-create @created="addNewCategory" />
        <category-edit
          v-if="categories.length"
          @updated="updateCategory"
          :categories="this.categories"
          :key="categories.key"
        />
        <p v-else class="center">На данный момент категорий нет.</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryEdit from "../components/Categories/CategoryEdit";
import CategoryCreate from "../components/Categories/CategoryCreate";
export default {
  name: "CategoriesView",
  components: { CategoryCreate, CategoryEdit },
  data() {
    return {
      categories: [],
      isLoading: true,
    };
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.isLoading = false;
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
      this.categories = [...this.categories];
    },
    updateCategory(category) {
      const index = this.categories.findIndex((c) => c.id === category.id);
      this.categories[index].title = category.title;
      this.categories[index].limit = category.limit;
    },
  },
};
</script>

<style scoped></style>
