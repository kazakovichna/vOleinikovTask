<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import messages from '@/common/messages'

export default {
  name: 'EmptyLayout',
  computed: {
    ...mapGetters([
      'error'
    ]),
    errors () {
      return this.error
    }
  },
  watch: {
    errors (fbError) {
      this.$error(messages[fbError.code] || 'Something went wrong')
    }
  }
}
</script>

<style scoped>

</style>
