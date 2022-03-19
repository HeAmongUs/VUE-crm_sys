<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p v-for="cur in currencies" :key="cur" class="currency-line">
          <span>{{
            currencyFilter(getCurrency(cur).toFixed(2), cur.slice(3, 7))
          }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import currencyFilter from "@/filters/currencyFilter";

export default {
  name: "HomeBill",
  props: {
    quotes: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currencies: ["USDRUB", "USDUSD", "USDEUR"],
      currencyFilter: currencyFilter,
    };
  },
  methods: {
    getCurrency(currency) {
      return Math.floor(this.base * this.quotes[currency]);
    },
  },
  computed: {
    base() {
      return (
        this.$store.getters.info.bill /
        (this.quotes["USDRUB"] / this.quotes["USDUSD"])
      );
    },
  },
};
</script>

<style scoped></style>
