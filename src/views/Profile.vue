<template>
  <div>
    <div class="page-title">
      <h3>{{ localize("ProfileTitle") }}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="v$.username.$model"
          :class="{
            invalid:
              (v$.username.$dirty && v$.username.required.$invalid) ||
              (v$.username.$dirty && v$.username.minLength.$invalid),
          }"
        />
        <label for="name">{{ localize("ProfileUsername") }}</label>
        <small
          v-if="v$.username.$dirty && v$.username.required.$invalid"
          class="helper-text invalid"
        >
          {{ localize("Message_EnterName") }}
        </small>
        <small
          v-if="v$.username.$dirty && v$.username.minLength.$invalid"
          class="helper-text invalid"
        >
          {{ localize("Message_MinLength") }}
          {{ v$.username.minLength.$params.min }}
        </small>
      </div>

      <div class="switch">
        <label>
          English
          <input v-model="isRuLocale" type="checkbox" />
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ localize("UpdateButton") }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { minLength, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import localizeFilter from "../filters/localizeFilter";

export default {
  name: "Profile",
  data() {
    return {
      username: "",
      isRuLocale: "",
      localize: localizeFilter,
    };
  },
  validations() {
    return {
      username: { required, minLength: minLength(4) },
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  mounted() {
    this.username = this.info.username;
    this.isRuLocale = this.info.locale === "ru-RU";
    this.$nextTick(() => {
      window.M.updateTextFields();
    });
  },
  computed: {
    ...mapGetters(["info"]),
  },
  methods: {
    ...mapActions(["updateInfo"]),
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      try {
        await this.updateInfo({
          username: this.username,
          locale: this.isRuLocale ? "ru-RU" : "en-US",
        });
        this.$message("Информация обновлена");
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
.switch {
  margin-bottom: 20px;
}
</style>
