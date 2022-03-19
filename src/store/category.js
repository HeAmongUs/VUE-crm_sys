import { push, ref, set, get } from "firebase/database";
import firebase from "@/firebase";

export default {
  actions: {
    async createCategory({ dispatch, commit }, { title, limit }) {
      const uid = await dispatch("getUid");
      try {
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
  },
};
