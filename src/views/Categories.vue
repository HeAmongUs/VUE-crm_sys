<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <category-create @created="addNewCategory" />
        <category-edit />
      </div>
    </section>
  </div>
</template>

<script>
import CategoryEdit from "../components/CategoryEdit";
import CategoryCreate from "../components/CategoryCreate";
export default {
  name: "CategoriesView",
  components: { CategoryCreate, CategoryEdit },
  data() {
    return {
      categories: [],
    };
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
      console.log(this.categories);
    },
  },
};
</script>

<style scoped></style>
