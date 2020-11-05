<template>
  <div class="register">
    <form class="card auth-card" @submit.prevent="submitHandler">
      <div class="card-content">
        <span class="card-title">Домашняя бухгалтерия</span>
        <div class="input-field">
          <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
          >
          <label for="email">Email</label>
          <small
            class="helper-text invalid"
            v-if="$v.email.$dirty && !$v.email.required"
          >Email обязательно для заполнения</small>
          <small
            class="helper-text invalid"
            v-if="$v.email.$dirty && !$v.email.email"
          >Введите корректный email</small>
        </div>
        <div class="input-field">
          <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: ($v.password.$dirty && !$v.password.required) || !$v.password.minLength}"
          >
          <label for="password">Пароль</label>
          <small
            class="helper-text invalid"
            v-if="$v.password.$dirty && !$v.password.required"
          >Все таки введите пароль пожалуйста</small>
          <small
            class="helper-text invalid"
            v-if="$v.password.$dirty && !$v.password.minLength"
          >Пароль должен быть длинее {{$v.password.$params.minLength.min}}
            сейчас {{password.length}}
          </small>
        </div>
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="{invalid: ($v.name.$dirty && !$v.name.required) || !$v.name.minLength}"
          >
          <label for="name">Имя</label>
          <small
            class="helper-text invalid"
            v-if="$v.name.$dirty && !$v.name.required"
          >Введите имя</small>
          <small
            class="helper-text invalid"
            v-if="$v.name.$dirty && !$v.name.minLength"
          >Имя должно быть длиннее {{$v.name.$params.minLength.min}} симвлов</small>
        </div>
        <p>
          <label>
            <input type="checkbox" v-model="agree"/>
            <span>С правилами согласен</span>
          </label>
        </p>
      </div>
      <div class="card-action">
        <div>
          <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
          >
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
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { email, required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: '',
      name: '',
      agree: false
    }
  },
  validations: {
    email: {
      email,
      required
    },
    password: {
      required,
      minLength: minLength(8)
    },
    name: {
      required,
      minLength: minLength(2)
    },
    agree: {
      checked: v => v
    }
  },
  methods: {
    ...mapActions([
      'register'
    ]),
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }
      try {
        await this.register(formData)
        this.$router.push('/')
      } catch (e) {}
    }
  }
}
</script>

<style scoped>

</style>
