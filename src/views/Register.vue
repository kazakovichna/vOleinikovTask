<template>
  <div class="register">
    <form class="card auth-card" @submit.prevent="submitHandler">
      <div class="card-content">
        <span class="card-title">{{ 'Login_Name' | localize }}</span>
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
          >{{ 'Login_Email_Req' | localize }}</small>
          <small
            class="helper-text invalid"
            v-if="$v.email.$dirty && !$v.email.email"
          >{{ 'Login_Email_Er' | localize}}</small>
        </div>
        <div class="input-field">
          <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: ($v.password.$dirty && !$v.password.required) || !$v.password.minLength}"
          >
          <label for="password">{{ 'Login_Password' | localize }}</label>
          <small
            class="helper-text invalid"
            v-if="$v.password.$dirty && !$v.password.required"
          >{{ 'Login_Password_Er' | localize }}</small>
          <small
            class="helper-text invalid"
            v-if="$v.password.$dirty && !$v.password.minLength"
          >{{ 'Login_Password_Er_Len_1' | localize }} {{$v.password.$params.minLength.min}}
            {{ 'Login_Password_Er_Len_2' | localize }} {{password.length}}
          </small>
        </div>
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="{invalid: ($v.name.$dirty && !$v.name.required) || !$v.name.minLength}"
          >
          <label for="name">{{ 'Sign_In_Name' | localize }}</label>
          <small
            class="helper-text invalid"
            v-if="$v.name.$dirty && !$v.name.required"
          >{{ 'Sign_In_Name_Req' | localize }}</small>
          <small
            class="helper-text invalid"
            v-if="$v.name.$dirty && !$v.name.minLength"
          >{{ 'Sign_In_Name_Er_1' | localize }}
            {{$v.name.$params.minLength.min}}
            {{ 'Sign_In_Name_Er_2' | localize }}</small>
        </div>
        <p>
          <label>
            <input type="checkbox" v-model="agree"/>
            <span>{{ 'Sign_In_Agree' | localize }}</span>
          </label>
        </p>
      </div>
      <div class="card-action">
        <div>
          <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
          >
            {{ 'Sign_In_Btn' | localize }}
            <i class="material-icons right">send</i>
          </button>
        </div>

        <p class="center">
          {{ 'Sign_In_Login_1' |localize }}
          <router-link to="/login">{{ 'Sign_In_Login_2' | localize }}</router-link>
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
  metaInfo() {
    return {
      title: this.$title('Sign_In_Title')
    }
  },
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
