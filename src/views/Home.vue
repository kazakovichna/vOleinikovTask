<template>
  <div class="home">
    <div class="app-page">
      <button @click="printBoards">
        Click
      </button>
      <!--<div class="boards">
        <div class="boards-create"
             v-if="boards === []"
        >
          No boards
        </div>
        <div class="boards-item"
             v-else
        >
          Hello
        </div>
      </div>-->
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
      boards: null,
      boardsList: []
    }
  },
  methods: {
    printBoards() {
      console.log( this.boardsList )
    }
  },
  async mounted () {
    await this.$store.dispatch('fetchBoards')
    this.boards = this.$store.getters.board

    // for ( let i =  ) {}

    // this.boardsList = Object.keys(this.boards)
    this.loading = false
  }
}
</script>
