<template>
  <div class="category-create">
    <div class="col s12 m6">
      <div>
        <div class="page-subtitle">
          <h4>{{ 'Category_Create' | localize }}</h4>
        </div>

        <form @submit.prevent="submitHandler">
          <div class="input-field">
            <input
              id="name"
              type="text"
              v-model="title"
              :class="{invalid: $v.title.$dirty && !$v.title.required}"
            >
            <label for="name">{{ 'Category_Create_Name' | localize }}</label>
            <span class="helper-text invalid"
                  v-if="$v.title.$dirty && !$v.title.required"
            >{{ 'Category_Create_Name_Er' | localize }}</span>
          </div>

          <div class="input-field">
            <input
              id="limit"
              type="number"
              v-model.number="limit"
              :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
            >
            <label for="limit">{{ 'Category_Create_Limit' | localize }}</label>
            <span class="helper-text invalid"
                  v-if="$v.limit.$dirty && !$v.limit.minValue"
            >{{ 'Category_Create_Limit_Er' | localize }} {{$v.limit.$params.minValue.min}}</span>
          </div>

          <button class="btn waves-effect waves-light" type="submit">
            {{ 'Category_Create' | localize }}
            <i class="material-icons right">send</i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import localizeFilter from '@/filters/localize.filter'

export default {
  name: "CategoryCreate",
  data () {
    return {
      title: '',
      limit: 100
    }
  },
  validations: {
    title: {
      required
    },
    limit: {
      minValue: minValue(100)
    }
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit
        })
        this.title = ''
        this.limit = 100
        this.$v.$reset()
        this.$message(localizeFilter('Category_Create_Message'))
        this.$emit('created', category)
      } catch (e) {}
    }
  },
  mounted () {
     window.M.updateTextFields()
  }
}
</script>

<style scoped>

</style>
