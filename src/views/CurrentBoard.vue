<template>
  <div class="current-board">
    <loader v-if="loading"/>
    <div class="wrapper"
          v-else
    >
      <p class="board-name">{{ curBoard.description }}</p>
      <p class="board-description">{{ curBoard.name }}</p>
      <div class="tables-div">
        <div class="none-columns"
             v-if="curBoard.columns === undefined"
        >
          <div class="create-column-btn"
               v-if="!columnCreator"
               @click="createColumn"
          >
            <p>There is no columns. Create new one</p>
          </div>
          <div class="create-column-form"
               v-else
          >
            <input type="text"
                   placeholder="Input column's name"
            >
          </div>
        </div>
        <div class="columns"
             v-else
        >
          <p>Some Board are there</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import  { mapActions, mapGetters } from 'vuex'

export default {
  name: "CurrentBoard",
  data: () => ({
    curBoard: {},
    loading: true,
    columnCreator: false
  }),
  computed: {
    ...mapGetters([
      'getCurrentBoard'
    ])
  },
  methods: {
    ...mapActions([
      'fetchBoardsById'
    ]),
    createColumn() {
      this.columnCreator = true
    }
  },
  async mounted () {
    try {
      await this.fetchBoardsById( this.$route.params.id )
      this.curBoard = this.getCurrentBoard
      this.loading = false
    } catch (e) {}


  }
}
</script>

<style scoped>

</style>
