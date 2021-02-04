<template>
  <div class="boards">
    <div class="boards-create"
         v-if="!boardsList.length"
    >
      No boards
    </div>

    <div class="boards-wrapper"
         v-else
    >
      <div class="boards-label">
        <p>You Boards</p>
      </div>
      <div class="boards-items">
        <div class="boards-item"
             v-for="item in Object.values(boards)"
             :key="Object.values(boards).indexOf(item)"
             @click="$router.push(`/currentBoard/${boardsList[Object.values(boards).indexOf(item)].name}`)"
        >
          <div class="boards-item-name">
            {{ item.name }}
          </div>
          <div class="boards-item-description">
            {{ item.description }}
          </div>
        </div>
      </div>
    </div>
    <div>
      <router-link to="/createBoard"
                   class="create-board waves-effect waves-light"
                   v-tooltip="'Create new board'"
      >
        <p>Create New Board</p>
      </router-link>
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
  async mounted () {
    await this.$store.dispatch('fetchBoards')
    this.boards = this.$store.getters.board
    this.boardsList = this.$store.getters.boardList
    console.log(this.boardsList[0].name)

    this.loading = false

  }
}
</script>

<style scoped>
.boards {
  width: inherit;
}
.boards-label {
  height: 30px;
  margin-bottom: 5px;
  font-family: "Lucida Console", sans-serif;
  font-size: 30px;
  font-weight: 900;
  opacity: 0.8;
}
.boards-items {
  width: inherit;
  display: flex;
  justify-content: center;
  flex-direction: row;

  box-shadow: 0 0 2px #000000;
  background-color: #fbfbfb;
}
.boards-item {
  width: 600px;
  margin: 20px;
  padding: 5px;
  box-shadow: 0 4px 8px -3px #5a5a5a;
  background-color: aliceblue;

  font-family: "Lucida Console", sans-serif;

  display: flex;
  justify-content: center;
  flex-direction: column;
}
.boards-item-name {
  text-align: center;

  font-weight: 600;
  font-size: 20px;
}
.boards-item-description {
  font-size: 16px;
}
.create-board {
  margin-top: 20px;
  padding: 10px;
  width: 30%;
  height: 40px;
  cursor: pointer;
  box-shadow: 0 4px 8px -3px #5a5a5a;
  background-color: aquamarine;

  color: black;
  font-size: 18px;
  font-weight: 900;
  opacity: 0.7;
  outline: none;

  display: flex;
  justify-content: center;
  align-items: center;
}
.create-board p{
  margin: 0!important;
  outline: none;
}
</style>
