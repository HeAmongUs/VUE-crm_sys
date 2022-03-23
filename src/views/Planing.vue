<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ currencyFilter(info.bill) }}</h4>
    </div>

    <loader v-if="isLoading" />

    <p class="center" v-else-if="!categories.length">
      Категории не найдены.<router-link to="/categories"
        >Добавить новую категорию</router-link
      >
    </p>

    <section v-else>
      <div v-for="category in categories" :key="category.id">
        <p>
          <strong>{{ category.title }}:</strong>
          {{ currencyFilter(category.spend) }} из
          {{ currencyFilter(category.limit) }}
        </p>
        <div class="progress" v-tooltip="category.tooltip">
          <div
            class="determinate"
            :class="[category.progressColor]"
            :style="{ width: category.progressPercent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import currencyFilter from "@/filters/currencyFilter";
export default {
  name: "Planing",
  data() {
    return {
      isLoading: true,
      categories: [],
      currencyFilter: currencyFilter,
    };
  },
  computed: {
    ...mapGetters(["info"]),
  },
  async mounted() {
    const records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");

    this.categories = categories.map((cat) => {
      const spend = records
        .filter((r) => r.categoryId === cat.id)
        .filter((r) => r.type === "outcome")
        .reduce((total, record) => {
          return (total += +record.amount);
        }, 0);

      const percent = (100 * spend) / cat.limit;
      const progressPercent = percent > 100 ? 100 : percent;

      const progressColor =
        percent < 60 ? "green" : percent < 100 ? "yellow" : "red";

      const tooltipValue = cat.limit - spend;
      const tooltip = `${
        tooltipValue < 0 ? "Переышение на" : "Осталось"
      }: ${this.currencyFilter(Math.abs(tooltipValue))}`;

      return {
        ...cat,
        spend,
        progressPercent,
        progressColor,
        tooltip,
      };
    });
    console.log(this.categories);
    this.isLoading = false;
  },
};
</script>

<style scoped></style>
