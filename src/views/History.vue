<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas id="myCanvas"></canvas>
    </div>

    <loader v-if="isLoading" />

    <p class="center" v-else-if="!records.length">
      Записи не найдены.<router-link to="/record"
        >Добавить новую запись</router-link
      >
    </p>

    <section v-else>
      <history-table :records="items" :page="page" :itemsOnPage="itemsOnPage" />

      <paginate
        :pageCount="pageCount"
        :clickHandler="handlePageChange"
        :prevText="'Назад'"
        :nextText="'Вперед'"
        :containerClass="'paginate'"
        @input="(selected) => (page = selected)"
        :value="page"
      >
      </paginate>
    </section>
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable";
import paginationMixin from "@/mixins/pagination.mixin";

export default {
  name: "History",
  components: { HistoryTable },
  mixins: [paginationMixin],
  data() {
    return {
      isLoading: true,
      records: [],
    };
  },
  async mounted() {
    this.records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");

    this.setup(categories);

    this.isLoading = false;
  },
  methods: {
    setup(categories) {
      this.setupPagination(
        this.records.map((record) => {
          return {
            ...record,
            categoryName: categories.find((c) => c.id === record.categoryId)
              .title,
            typeClass: record.type === "income" ? "green" : "red",
            typeText: record.type === "income" ? "Доход" : "Расход",
          };
        })
      );
      const ctx = document.getElementById("myCanvas");
      // eslint-disable-next-line no-undef
      new Chart(ctx, {
        type: "pie",
        data: {
          labels: categories.map((c) => c.title),
          datasets: [
            {
              label: "Расходы по категориям",
              data: categories.map((c) => {
                return this.records.reduce((total, record) => {
                  if (record.categoryId === c.id && record.type === "outcome") {
                    total += record.amount;
                  }
                  return total;
                }, 0);
              }),
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
  },
};
</script>

<style lang="scss">
.paginate li {
  display: inline-block;
  border-radius: 2px;
  text-align: center;
  vertical-align: top;
  height: 30px;
  transition: 0.3s;
  user-select: none;
}

.paginate li a {
  color: #444;
  display: inline-block;
  font-size: 1.2rem;
  padding: 0 10px;
  line-height: 30px;
  transition: 0.1s;
}

.paginate li.active a {
  color: #fff;
}

.paginate li.active,
.paginate li:hover {
  background-color: #26a69a;
}

.paginate li a:hover {
  color: #fff;
}

.paginate li.disabled a {
  cursor: default;
  color: #999;
}

.paginate li i {
  font-size: 2rem;
}

.paginate li.pages ul li {
  display: inline-block;
  float: none;
}
</style>
