<template>
  <div class="main-layout">
    <loader v-if="loading"/>
    <div class="app-main-layout" v-else>
      <Navbar />
      <!--<Sidebar v-model="isOpen" :key="locale"/>-->
      <main class="app-content" :class="{full: isOpen}">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue"
                     to="/createBoard"
                     v-tooltip="'Create new board'"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar'
import Sidebar from '@/components/app/Sidebar'
import { mapGetters } from 'vuex'
import messages from '@/common/messages'

export default {
  name: 'MainLayout',
  components: {
    Navbar,
    Sidebar
  },
  data () {
    return {
      isOpen: true,
      loading: true
    }
  },
  async mounted () {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.loading = false
  },
  computed: {
    ...mapGetters([
      'error'
    ]),
    errors () {
      return this.error
    },
    locale () {
      return this.$store.getters.info.locale
    }
  },
  watch: {
/*    locale () {
    },*/
    errors (fbError) {
      this.$error(messages[fbError.code] || 'Something went wrong')
    }
  }
}
</script>

<style scoped>

</style>
