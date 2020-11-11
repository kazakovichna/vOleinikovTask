<template>
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
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          {{ 'Login_Btn' | localize }}
          <i class="material-icons right">send</i>
        </button>
      </div>
      <p class="center">
        {{ 'Login_Sign_In_1' | localize }}
        <router-link to="/register">{{ 'Login_Sign_In_2' | localize }}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'
import messages from '@/common/messages'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  metaInfo() {
    return {
      title: this.$title('Login_Btn')
    }
  },
  data () {
    return {
      email: '',
      password: ''
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
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.login(formData)
        this.$router.push('/')
      } catch (e) {}
    }
  },
  mounted () {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  }
}
</script>

<style scoped>

</style>
