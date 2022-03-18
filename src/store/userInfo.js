import firebase from "@/firebase";
import { ref, child, get } from "firebase/database";

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
        .catch((error) => {
          console.log(error);
        });
    },
  },
  getters: {
    info: (state) => state.info,
  },
};
