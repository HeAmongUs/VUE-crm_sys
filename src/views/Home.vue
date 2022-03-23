<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button @click="refresh" class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <loader v-if="isLoading" />

    <div v-else class="row">
      <home-bill :quotes="currency.quotes" />

      <home-currency
        :quotes="currency.quotes"
        :timestamp="currency.timestamp"
      />
    </div>
  </div>
</template>

<script>
import HomeCurrency from "../components/Home/HomeCurrency";
import HomeBill from "../components/Home/HomeBill";
export default {
  name: "Home",
  components: { HomeBill, HomeCurrency },
  data() {
    return {
      isLoading: true,
      currency: null,
    };
  },
  async mounted() {
    //this.currency = await this.$store.dispatch("fetchCurrency");
    this.isLoading = false;
  },
  methods: {
    async refresh() {
      this.isLoading = true;
      //this.currency = await this.$store.dispatch("fetchCurrency");
      this.isLoading = false;
    },
  },
};
</script>
