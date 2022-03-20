<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <loader v-if="isLoading" />

    <p class="center" v-else-if="!categories.length">
      Категории не найдены.<router-link to="/categories"
        >Добавить новую категорию</router-link
      >
    </p>

    <form v-else class="form">
      <div class="input-field">
        <select v-model="selectedCategory" ref="select">
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.title }}
          </option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
            v-model="type"
            class="with-gap"
            name="type"
            type="radio"
            value="income"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            v-model="type"
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input v-model.number="amount" id="amount" type="number" />
        <label for="amount">Сумма</label>
        <span class="helper-text invalid">amount пароль</span>
      </div>

      <div class="input-field">
        <input v-model="description" id="description" type="text" />
        <label for="description">Описание</label>
        <span class="helper-text invalid">description пароль</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import Loader from "../components/app/Loader";
export default {
  name: "Record",
  components: { Loader },
  data() {
    return {
      select: null,
      selectedCategory: null,
      categories: [],
      isLoading: true,
      type: "outcome",
      amount: 100,
      description: "",
    };
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.isLoading = false;

    if (this.categories.length) {
      const { id, title, limit } = this.categories[0];
      this.selectedCategory = id;
      this.title = title;
      this.limit = limit;
    }

    await this.$nextTick(() => {
      this.select = window.M.FormSelect.init(this.$refs.select);
    });
  },
  unmounted() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
};
</script>

<style scoped></style>
