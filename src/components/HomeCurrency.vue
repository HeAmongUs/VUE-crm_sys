<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Валюта</th>
              <th>Курс</th>
              <th>Дата</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="cur in currencies" :key="cur">
              <td>{{ cur.slice(3, 7) }}</td>
              <td>{{ quotes[cur].toFixed(3) }}</td>
              <td>{{ timestampToDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import currencyFilter from "@/filters/currencyFilter";

export default {
  name: "HomeCurrency",
  props: {
    quotes: {
      type: Object,
      required: true,
    },
    timestamp: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      currencies: ["USDRUB", "USDUSD", "USDEUR"],
      currencyFilter: currencyFilter,
    };
  },
  computed: {
    timestampToDate() {
      return new Date(this.timestamp * 1000).toLocaleDateString("ru-RU");
    },
  },
};
</script>

<style scoped></style>
