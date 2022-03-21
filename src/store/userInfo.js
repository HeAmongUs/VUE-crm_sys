import firebase from "@/firebase";
import { ref, child, get, update } from "firebase/database";

export default {
  state: {
    info: {},
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = null;
    },
  },
  actions: {
    async updateInfo({ dispatch, commit, getters }, toUpdate) {
      try {
        const uid = await dispatch("getUid");
        const updateData = { ...getters.info, ...toUpdate };
        const updates = {};
        updates[`users/${uid}/info`] = updateData;
        await update(ref(firebase.database), updates);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async queryUserInfo({ dispatch, commit }) {
      const uid = await dispatch("getUid");
      const dbRef = ref(firebase.database);
      await get(child(dbRef, `users/${uid}/info`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            commit("setInfo", snapshot.val());
          } else {
            console.log("No data available");
            return null;
          }
        })
        .catch((e) => {
          commit("setError", e);
          throw e;
        });
    },
  },
  getters: {
    info: (state) => state.info,
  },
};
