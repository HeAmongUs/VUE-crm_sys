import _ from "lodash";

export default {
  data() {
    return {
      page: +this.$route.query.page || 1,
      itemsOnPage: 5,
      pageCount: 0,
      allItems: [],
      items: [],
    };
  },
  methods: {
    setupPagination(allItems) {
      this.allItems = _.chunk(allItems, this.itemsOnPage);
      this.pageCount = _.size(this.allItems);
      this.items = this.allItems[this.page - 1] || this.allItems[0];
    },
    handlePageChange(page) {
      this.$router.push(`${this.$route.path}?page=${page}`)
      this.items = this.allItems[page - 1] || this.allItems[0];
    },
  },
};
