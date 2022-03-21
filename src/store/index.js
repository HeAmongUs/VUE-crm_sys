import { createStore } from "vuex";
import auth from "@/store/auth";
import userInfo from "@/store/userInfo";
import category from "@/store/category";
import record from "@/store/record";

export default createStore({
  state: {
    error: null,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },
  getters: {
    error: (state) => state.error,
  },
  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXED;
      return await fetch(
        `http://api.currencylayer.com/live?access_key=${key}&currencies=USD,EUR,RUB&format=1`
      ).then((res) => res.json());
    },
  },
  modules: {
    auth,
    userInfo,
    category,
    record,
  },
});
