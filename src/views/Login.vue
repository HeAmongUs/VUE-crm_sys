<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="v$.email.$model"
            :class="{invalid: (v$.email.$dirty && v$.email.required.$invalid) || (v$.email.$dirty && v$.email.email.$invalid)}"

        >
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
          Введите корректный email</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="v$.password.$model"
            :class="{invalid: (v$.password.$dirty && v$.password.required.$invalid) || (v$.password.$dirty && v$.password.minLength.$invalid)}"

        >
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
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import {email, required, minLength } from '@vuelidate/validators'

export default {
  name: "LoginView",
  setup: () => ({ v$: useVuelidate() }),
  data: () => ({
    email: '',
    password: '',
  }),
  validations () {
    return {
      email: {email, required},
      password: {required, minLength: minLength(6)},
    }
  },
  methods: {
    submitHandler() {
      if (this.v$.$invalid){
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
      }
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>