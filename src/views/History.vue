<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <loader v-if="isLoading" />

    <p class="center" v-else-if="!records.length">
      Записи не найдены.<router-link to="/record"
        >Добавить новую запись</router-link
      >
    </p>

    <section v-else>
      <history-table :records="records" />
    </section>
  </div>
</template>

<script>
import HistoryTable from "../components/HistoryTable";
import Loader from "../components/app/Loader";
export default {
  name: "History",
  components: { Loader, HistoryTable },

  data() {
    return {
      isLoading: true,
      records: [],
      categories: [],
    };
  },
  async mounted() {
    const records = await this.$store.dispatch("fetchRecords");
    this.categories = await this.$store.dispatch("fetchCategories");

    this.records = records.map((record) => {
      return {
        ...record,
        categoryName: this.categories.find((c) => c.id === record.categoryId)
          .title,
        typeClass: record.type === "income" ? "green" : "red",
        typeText: record.type === "income" ? "Доход" : "Расход",
      };
    });

    this.isLoading = false;
  },
};
</script>

<style scoped></style>
