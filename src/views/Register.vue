<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="v$.email.$model"
          :class="{
            invalid:
              (v$.email.$dirty && v$.email.required.$invalid) ||
              (v$.email.$dirty && v$.email.email.$invalid),
          }"
        />
        <label for="email">Email</label>
        <small
          v-if="v$.email.$dirty && v$.email.required.$invalid"
          class="helper-text invalid"
        >
          Введите email
        </small>
        <small
          v-else-if="v$.email.$dirty && v$.email.email.$invalid"
          class="helper-text invalid"
        >
          Введите корректный email</small
        >
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="v$.password.$model"
          :class="{
            invalid:
              (v$.password.$dirty && v$.password.required.$invalid) ||
              (v$.password.$dirty && v$.password.minLength.$invalid),
          }"
        />
        <label for="password">Пароль</label>
        <small
          v-if="v$.password.$dirty && v$.password.required.$invalid"
          class="helper-text invalid"
        >
          Введите пароль
        </small>
        <small
          v-if="v$.password.$dirty && v$.password.minLength.$invalid"
          class="helper-text invalid"
        >
          Минимальная длина пароля 6 символов
        </small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="v$.name.$model"
          :class="{
            invalid:
              (v$.name.$dirty && v$.name.required.$invalid) ||
              (v$.name.$dirty && v$.name.minLength.$invalid),
          }"
        />
        <label for="name">Имя</label>
        <small
          v-if="v$.name.$dirty && v$.name.required.$invalid"
          class="helper-text invalid"
        >
          Введите логин
        </small>
        <small
          v-if="v$.name.$dirty && v$.name.minLength.$invalid"
          class="helper-text invalid"
        >
          Минимальная длина логина 4 символа
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { email, minLength, required } from "@vuelidate/validators";

export default {
  name: "Register",
  setup: () => ({ v$: useVuelidate() }),
  data: () => ({
    email: "",
    password: "",
    name: "",
    agree: false,
  }),
  validations() {
    return {
      email: { email, required },
      password: { required, minLength: minLength(6) },
      name: { required, minLength: minLength(4) },
      agree: { checked: (v) => v },
    };
  },
  methods: {
    submitHandler() {
      if (this.v$.$invalid) {
        return;
      }
      // const formData = {
      //   email: this.email,
      //   password: this.password,
      //   name: this.name,
      // };

      this.$router.push("/login");
    },
  },
};
</script>

<style scoped></style>
