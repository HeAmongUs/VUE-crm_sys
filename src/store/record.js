import firebase from "@/firebase";
import { push, ref, set } from "firebase/database";

export default {
  actions: {
    async createRecord({ dispatch, commit }, record) {
      try {
        const uid = await dispatch("getUid");
        const recordListRef = ref(firebase.database, `users/${uid}/records`);
        const newRecordRef = await push(recordListRef);
        await set(newRecordRef, record);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
  },
};
