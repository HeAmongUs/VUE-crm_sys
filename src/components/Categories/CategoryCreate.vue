<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitHandler">
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
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { minValue, required, minLength } from "@vuelidate/validators";

export default {
  name: "CategoryCreate",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      title: null,
      limit: 100,
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
  mounted() {
    window.M.updateTextFields();
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        return;
      }
      try {
        const category = await this.$store.dispatch("createCategory", {
          title: this.title,
          limit: this.limit,
        });
        this.title = "";
        this.limit = 100;
        this.v$.$reset();
        this.$message("Категория создана");
        this.$emit("created", category);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped></style>
