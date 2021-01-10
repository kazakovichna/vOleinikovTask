<template>
  <div class="home">
    <div class="app-page">
      <button @click="printBoards">
        Click
      </button>
      <div class="boards">
        <div class="boards-create"
             v-if="!boardsList.length"
        >
          No boards
        </div>
        <div class="boards-items"
             v-else
        >
          <div class="boards-item"
               v-for="item in boardsList"
               :key="item"
          >
            <div
              @click="$router.push('/currentBoard/' + item)"
              class="board-wrapper"
            >
              <div class="boards-item-name">
                {{ boards[item].name }}
              </div>
              <div class="boards-item-id">
                id: {{ boards[item].description }}
              </div>
            </div>
          </div>
        </div>
      </div>
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
      // console.log( Object.keys(this.boards.board1) )
    }
  },
  async mounted () {
    await this.$store.dispatch('fetchBoards')
    this.boards = this.$store.getters.board

    this.boardsList = Object.keys(this.boards)
    this.loading = false

  }
}
</script>

<style scoped>
.boards {
  margin-top: 20px;
  border-color: #323232;
  border-style: solid;
  border-width: 1px;

  width: inherit;
}
.boards-items {
  width: inherit;
  display: flex;
  justify-content: center;
  flex-direction: row;
}
.boards-item {
  width: 600px;
  margin: 20px;
  border-color: red;
  border-style: solid;
  border-width: 1px;

  display: flex;
  justify-content: center;
  flex-direction: column;
}
.boards-item-name {

}
</style>
