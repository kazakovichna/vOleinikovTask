<template>
  <div class="profile">
    <div class="app-page">

      <div>
        <div class="page-title">
          <h3>{{'ProfileTitle' | localize}}</h3>
        </div>

        <form class="form" @submit.prevent="submitHandler">
          <div class="input-field">
            <input
              id="description"
              type="text"
              v-model="name"
              :class="{invalid: !$v.name.required && $v.name.$dirty}"
            >
            <label for="description">{{ 'Name' | localize }}</label>
            <small
              class="helper-text invalid"
              v-if="!$v.name.required && $v.name.$dirty"
            >{{ 'Message_EnterName' | localize }}</small>
          </div>

          <div class="switch">
            <label>
              English
              <input type="checkbox" v-model="isRuLocale">
              <span class="lever"></span>
              Русский
            </label>
          </div>

          <button class="btn waves-effect waves-light" type="submit">
            {{ 'Update' | localize }}
            <i class="material-icons right">send</i>
          </button>
        </form>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'Profile',
  metaInfo() {
    return {
      title: this.$title('ProfileTitle')
    }
  },
  computed: {
    ...mapGetters([
      'info'
    ])
  },
  data: () => ({
    name: '',
    isRuLocale: true
  }),
  validations: {
    name: {
      required
    }
  },
  methods: {
    ...mapActions([
      'updateInfo'
    ]),
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return {}
      }

      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US'
        })
      } catch (e) {}
    }
  },
  mounted () {
    this.isRuLocale = this.info.locale === 'ru-RU'
    this.name = this.info.name
    setTimeout(() => {
      M.updateTextFields()
    })
  }
}
</script>

<style scoped>
  .switch {
    margin-bottom: 2rem;
  }
</style>
