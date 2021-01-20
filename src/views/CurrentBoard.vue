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
               @click="openColumnCreator"
          >
            <p>There is no columns. Create new one</p>
          </div>
          <div class="create-column-form"
               v-else
          >
            <form @submit.prevent="createColumnMet">
              <input type="text"
                     placeholder="Input column's name"
                     v-model.trim="columnName"
                     :class="{invalid: $v.columnName.$dirty && !$v.columnName.required }"
              >
              <small
                style="color: darkred"
                v-if=" $v.columnName.$dirty && !$v.columnName.required "
              >
                The name is required
              </small>
              <button type="submit">
                Create Column
              </button>
            </form>
          </div>
        </div>
        <div class="columns"
             v-else
        >
          <div class="column"
               v-for="item in Object.values(curBoard.columns)"
               :key="item"
          >
            <div class="name">
              {{ item.name }}
            </div>
            <div class="list">
              <div class="list-item">

              </div>
            </div>
            <div
              class="pin-creator"
              @click="pinCreator = true"
              v-if="pinCreator === false"
            >
              Create pin
            </div>
            <div class="pin-creator-form">
              <input type="text"
                     placeholder="Input pin name"
                     v-model="pinName"
              >
              <button
                @click="createPin()"
              >
                <span>Create</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import  { mapActions, mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  name: "CurrentBoard",
  data: () => ({
    curBoard: {},
    curColumnsMas: [],
    loading: true,
    columnCreator: false,
    pinCreator: false,
    pinName: null,
    columnName: ''
  }),
  computed: {
    ...mapGetters([
      'getCurrentBoard'
    ])
  },
  validations: {
    columnName: {
      required
    }
  },
  methods: {
    ...mapActions([
      'fetchBoardsById',
      'createColumn'
    ]),
    openColumnCreator() {
      this.columnCreator = true
    },
    async createColumnMet() {
      if ( this.$v.$invalid ) {
        this.$v.touch()
        return
      }
      try {

        const columnForm = {
          name: this.columnName,
          boardId: this.$route.params.id
        }
        await this.createColumn(columnForm)
        await this.fetchBoardsById(this.$route.params.id)
        this.curBoard = this.getCurrentBoard
        this.columnCreator = false
      } catch (e) {}
    },
    createPin() {
      0
    }
  },
  async mounted () {
    try {
      await this.fetchBoardsById(this.$route.params.id)
      this.curBoard = this.getCurrentBoard

      this.loading = false
    } catch (e) {}
  }
}
</script>

<style scoped>

</style>
