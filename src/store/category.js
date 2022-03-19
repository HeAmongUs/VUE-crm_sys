import { push, ref, set, get, update } from "firebase/database";
import firebase from "@/firebase";

export default {
  actions: {
    async fetchCategories({ dispatch, commit }) {
      try {
        const uid = await dispatch("getUid");
        const categoriesListRef = ref(
          firebase.database,
          `users/${uid}/categories`
        );
        const categories = (await get(categoriesListRef)).val() || {};
        return Object.keys(categories).map((key) => ({
          ...categories[key],
          id: key,
        }));
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async createCategory({ dispatch, commit }, { title, limit }) {
      try {
        const uid = await dispatch("getUid");
        const categoriesListRef = ref(
          firebase.database,
          `users/${uid}/categories`
        );
        const newCategoryRef = await push(categoriesListRef);
        await set(newCategoryRef, {
          title: title,
          limit: limit,
        });
        return (await get(newCategoryRef)).val();
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async updateCategory({ dispatch, commit }, { id, title, limit }) {
      try {
        const uid = await dispatch("getUid");
        const updates = {};
        updates[`users/${uid}/categories/${id}`] = {
          title: title,
          limit: limit,
        };
        await update(ref(firebase.database), updates);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
  },
};
