<template>
  <div>
    <loader v-if="isLoading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a @click.prevent class="breadcrumb">{{ record.typeText }}</a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="[record.typeClass]">
            <div class="card-content white-text">
              <p>Описание: {{ record.description }}</p>
              <p>Сумма: {{ currencyFilter(record.amount) }}</p>
              <p>Категория: {{ record.categoryName }}</p>

              <small>{{ dateFilter(record.date, "datetime") }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="center">Запись с id={{ $route.params.id }} не найдена</p>
  </div>
</template>

<script>
import dateFilter from "@/filters/dateFilter";
import currencyFilter from "@/filters/currencyFilter";
export default {
  name: "Detail",

  data() {
    return {
      isLoading: true,
      record: null,
      dateFilter: dateFilter,
      currencyFilter: currencyFilter,
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    const record = await this.$store.dispatch("fetchRecordById", id);
    console.log(record);
    const category = await this.$store.dispatch(
      "fetchRecordById",
      record.categoryId
    );

    this.record = {
      ...record,
      categoryName: category.title,
      typeClass: record.type === "income" ? "green" : "red",
      typeText: record.type === "income" ? "Доход" : "Расход",
    };

    this.isLoading = false;
  },
};
</script>

<style scoped></style>
