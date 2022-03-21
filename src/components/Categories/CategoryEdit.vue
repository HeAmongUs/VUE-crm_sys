<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select v-model="selectedCategory" ref="select">
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.title }}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model.trim="v$.title.$model"
            :class="{
              invalid:
                v$.title.$dirty &&
                (v$.title.required.$invalid || v$.title.minLength.$invalid),
            }"
          />
          <label for="name">Название</label>
          <span
            v-if="v$.title.$dirty && v$.title.required.$invalid"
            class="helper-text invalid"
            >Введите категорию</span
          >
          <span
            v-else-if="v$.title.$dirty && v$.title.minLength.$invalid"
            class="helper-text invalid"
            >Минимальная длина {{ v$.title.minLength.$params.min }}</span
          >
        </div>

        <div class="input-field">
          <input
            v-model="v$.limit.$model"
            :class="{
              invalid:
                v$.limit.$dirty &&
                (v$.limit.minValue.$invalid || v$.limit.required.$invalid),
            }"
            id="limit"
            type="number"
          />
          <label for="limit">Лимит</label>
          <span
            v-if="
              v$.limit.$dirty &&
              (v$.limit.minValue.$invalid || v$.limit.required.$invalid)
            "
            class="helper-text invalid"
            >Минимальная величина {{ v$.limit.minValue.$params.min }}</span
          >
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { minLength, minValue, required } from "@vuelidate/validators";

export default {
  name: "CategoryEdit",
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      select: null,
      title: "",
      limit: 100,
      selectedCategory: null,
    };
  },
  validations() {
    return {
      title: { required, minLength: minLength(3) },
      limit: {
        required,
        minValue: minValue(100),
      },
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  created() {
    const { id, title, limit } = this.categories[0];
    this.selectedCategory = id;
    this.title = title;
    this.limit = limit;
  },
  mounted() {
    this.select = window.M.FormSelect.init(this.$refs.select);
    window.M.updateTextFields();
  },
  unmounted() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      const categoryData = {
        id: this.selectedCategory,
        title: this.title,
        limit: this.limit,
      };

      try {
        this.$store.dispatch("updateCategory", categoryData);
        this.$message("Категория обновлена");
        this.$emit("updated", categoryData);
        this.updateSelectField();
      } catch (e) {
        console.log(e);
      }
    },
    updateSelectField() {
      this.$nextTick(() => {
        this.select.destroy();
        this.select = window.M.FormSelect.init(this.$refs.select);
      });
    },
  },
  watch: {
    selectedCategory(categoryId) {
      const { title, limit } = this.categories.find((c) => c.id === categoryId);
      this.title = title;
      this.limit = limit;
    },
    categories() {
      console.log("watcher cats");
      this.updateSelectField();
    },
  },
};
</script>

<style scoped></style>
