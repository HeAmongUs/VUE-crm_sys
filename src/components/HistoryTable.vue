<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, index) in records" :key="record.id">
        <td>{{ index + 1 + (page - 1) * itemsOnPage }}</td>
        <td>{{ currencyFilter(record.amount) }}</td>
        <td>{{ dateFilter(record.date, "datetime") }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span class="white-text badge" :class="[record.typeClass]">{{
            record.typeText
          }}</span>
        </td>
        <td>
          <button
            v-tooltip="'Открыть запись'"
            class="btn-small btn"
            @click="$router.push('/detail/' + record.id)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import currencyFilter from "@/filters/currencyFilter";
import dateFilter from "@/filters/dateFilter";
export default {
  name: "HistoryTable",
  props: {
    records: {
      required: true,
      type: Array,
    },
    page: {
      required: true,
      type: Number,
    },
    itemsOnPage: {
      required: true,
      type: Number,
    },
  },
  data() {
    return {
      currencyFilter: currencyFilter,
      dateFilter: dateFilter,
    };
  },
};
</script>

<style scoped></style>
