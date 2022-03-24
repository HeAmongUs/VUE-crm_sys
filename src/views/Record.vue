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

    <form v-else class="form" @submit.prevent="handleSubmit">
      <div class="input-field">
        <select v-model="selectedCategoryId" ref="select">
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
        <input
          v-model.number="v$.amount.$model"
          :class="{
            invalid:
              v$.amount.$dirty &&
              (v$.amount.minValue.$invalid || v$.amount.required.$invalid),
          }"
          id="amount"
          type="number"
        />
        <label for="amount">Сумма</label>
        <span
          v-if="
            v$.amount.$dirty &&
            (v$.amount.minValue.$invalid || v$.amount.required.$invalid)
          "
          class="helper-text invalid"
          >Минимальная величина {{ v$.amount.minValue.$params.min }}</span
        >
      </div>

      <div class="input-field">
        <input
          v-model.trim="v$.description.$model"
          :class="{
            invalid: v$.description.$dirty && v$.description.required.$invalid,
          }"
          id="description"
          type="text"
        />
        <label for="description">Описание</label>
        <span
          v-if="v$.description.$dirty && v$.description.required.$invalid"
          class="helper-text invalid"
          >Введите описание</span
        >
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { minValue, required } from "@vuelidate/validators";
import { mapGetters } from "vuex";

export default {
  name: "Record",
  data() {
    return {
      select: null,
      selectedCategoryId: null,
      categories: [],
      isLoading: true,
      type: "outcome",
      amount: 100,
      description: "",
    };
  },
  validations() {
    return {
      amount: {
        required,
        minValue: minValue(1),
      },
      description: { required },
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.isLoading = false;

    if (this.categories.length) {
      const { id, title, limit } = this.categories[0];
      this.selectedCategoryId = id;
      this.title = title;
      this.limit = limit;
    }

    await this.$nextTick(() => {
      this.select = window.M.FormSelect.init(this.$refs.select);
      window.M.updateTextFields();
    });
  },
  unmounted() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  computed: {
    ...mapGetters(["info"]),
    canCreateRecord() {
      if (this.type === "income") {
        return true;
      }
      return this.info.bill >= this.amount;
    },
  },
  methods: {
    async handleSubmit() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch("createRecord", {
            categoryId: this.selectedCategoryId,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON(),
          });

          const bill =
            this.type === "income"
              ? this.info.bill + this.amount
              : this.info.bill - this.amount;

          await this.$store.dispatch("updateInfo", { bill });
          this.$message("Запись создана");
          this.v$.$reset();
        } catch (e) {
          console.log(e);
        }
      } else {
        this.$message(
          `Недостаточно средств на счете(${this.amount - this.info.bill})`
        );
      }
    },
  },
};
</script>

<style scoped></style>
