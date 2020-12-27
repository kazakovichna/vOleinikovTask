<template>
  <div class="home">
    <div class="app-page">
      <button @click="printBoards">
        Click
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  metaInfo() {
    return {
      title: this.$title('Bill_Name')
    }
  },
  data () {
    return {
      loading: true,
      currency: null
    }
  },
  methods: {
    printBoards() {
      console.log( this.$store.getters.board )
    }
  },
  async mounted () {
    this.currency = await this.$store.dispatch('fetchBoards')
    this.loading = false
  }
}
</script>
