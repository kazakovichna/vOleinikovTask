<template>
  <div class="current-board">
    <loader v-if="loading"/>
    <div class="wrapper"
          v-else
    >
      <div class="board-name">
        <p>{{ curBoard.name }}</p>
      </div>
      <div class="board-description">
        <p>{{ curBoard.description }}</p>
      </div>
      <div class="tables-div">
        <!--<div class="none-columns"
             v-if="curBoard.columns === undefined"
        >
          <div class="create-column-btn waves-effect waves-purple"
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
                     class="new-column-input"
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
        </div>-->


        <div class="columns">
          <div class="column"
               v-for="item in Object.values(curBoard.columns)"
               :key="item.name"
          >
            <div class="name">
              {{ item.name }}
            </div>
            <!--<loader />-->
            <div class="list"
                 v-if="item.pins !== undefined"
            >
              <div class="list-item"
                   v-for="itm in Object.values(item.pins)"
                   :key="itm"
              >
                <p>{{ itm }}</p>
              </div>
            </div>
            <div class="pin-creator-input-div">
            <textarea type="text"
                      placeholder="New pin name"
                      class="pin-creator-input"
                      v-model="pinNew[Object.values(curBoard.columns).indexOf(item)]"
            ></textarea>
              <div class="pin-creator-input-btn waves-orange waves-effect"
                   @click="createPin(item)"
              >
                Create
              </div>
            </div>
          </div>


          <div class="add-column waves-effect waves-orange"
               @click="columnCreator = true"
               v-if="columnCreator === false"
          >
            <p>+</p>
          </div>
          <div class="column"
               v-else
          >
            <form @submit.prevent="createColumnMet">
              <textarea v-model.trim="columnName"
                        type="text"
                        placeholder="Enter col name"></textarea>
              <button type="submit"
                      class="pin-creator-input-btn waves-orange waves-effect">
                Create
              </button>
            </form>
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
    pinCreator: [],
    pinIndex: 0,
    pinCreatorL: false,

    pinNew: [],
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
      'createColumn',
      'createPinAct'
    ]),
    /*openPinCreator(item) {
      this.pinIndex = Object.values(this.curBoard.columns).indexOf(item)

      console.log(this.pinIndex)
      this.pinCreator[this.pinIndex] = !this.pinCreator[this.pinIndex]
      console.log(this.pinCreator[this.pinIndex])
    },*/
    async createColumnMet() {
      if (this.columnName.length === 0) {
        this.columnCreator = false
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
        this.columnName = ''
      } catch (e) {}
    },
    async createPin(curCol) {
      const index = Object.values(this.curBoard.columns).indexOf(curCol)

      if ( this.pinNew[index] === '' ) {
        // this.pinCreator[index] = false
        return
      }

      const pinForm = {
        boardId: this.$route.params.id,
        board: this.curBoard,
        index: index,
        data: this.pinNew[index]
      }


      await this.createPinAct(pinForm)

      // this.curBoard = this.getCurrentBoard
      // this.pinLoading[index] = false

      this.pinNew[index] = ''
      // this.pinCreator[index] = false
    }
  },
  async mounted () {
    try {
      await this.fetchBoardsById(this.$route.params.id)
      this.curBoard = this.getCurrentBoard

      if (this.curBoard.columns !== undefined) {
        this.pinNew.length = Object.keys(this.curBoard.columns).length
        // this.pinCreator.length = this.pinNew.length

        for (let item = 0; item < this.pinNew.length; item++) {
          this.pinNew[item] = ''
          // this.pinCreator[item] = false
        }
      }

      this.loading = false
    } catch (e) {}
  }
}
</script>

<style scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
  }
  .board-name {
    width: 30%;
    box-shadow: 0 0 2px #5a5a5a;
    border-radius: 2px;
    background-color: #ffa726;

    display: flex;
    align-items: center;
  }
  .board-name p {
    margin-left: 24px;
    font-family: "Lucida Console", sans-serif;
    font-size: 20px;
  }
  .board-description {
    height: 35px;
    margin-top: 10px;
    width: 30%;
    box-shadow: 0 0 2px #5a5a5a;
    border-radius: 2px;
    background-color: #ffa726;

    display: flex;
    align-items: center;
  }
  .board-description p {
    margin-left: 24px;
    font-family: "Lucida Console", sans-serif;
    font-size: 16px;
  }
  .none-columns {
    margin-top: 20px;
    padding-top: 20px;
    height: 400px;
    width: 100%;
    box-shadow: 0 0 2px #5a5a5a;
    border-radius: 2px;
    background-color: #ffa726;

    font-family: "Lucida Console", sans-serif;
    font-size: 16px;
  }
  .create-column-btn {
    width: 220px;
    cursor: pointer;

    box-shadow: 0 0 2px #5a5a5a;
    border-radius: 2px;
    background-color: aliceblue;
    margin-left: 20px;
  }
  .create-column-btn p {
    margin-left: 12px;
  }
  .create-column-form form {
    margin-left: 12px;
    display: flex;
    flex-direction: column;
  }
  .create-column-form form button {
    width: 200px;
  }
  .new-column-input {
    color: white;
    width: 220px !important;

    font-family: "Lucida Console", sans-serif;
    font-size: 16px;
  }
  .columns {
    margin-top: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    min-height: 300px;
    width: 100%;

    box-shadow: 0 0 2px #5a5a5a;
    border-radius: 2px;
    background-color: #ffa726;

    font-family: "Lucida Console", sans-serif;
    font-size: 16px;

    display: flex;
    flex-direction: row;
  }
  .column {
    width: 200px;
    padding-top: 10px;
    padding-left: 10px;
    padding-bottom: 10px;
    margin-top: 20px;
    margin-left: 20px;
    height: 90%;

    box-shadow: 0 0 4px #5a5a5a;
    border-radius: 2px;
    background-color: aliceblue;
  }
  .column textarea {
    width: 180px !important;
    min-height: 30px !important;
    font-family: "Lucida Console", sans-serif;
    opacity: 0.9;
    color: black;
  }
  .column textarea::placeholder{
    font-family: "Lucida Console", sans-serif;
    color: black;
    opacity: 0.7;
  }
  .list-item {
    width: 180px;
    margin: 5px 0 5px 0;
    padding-left: 5px;
    height: 35px;

    background-color: white;
    border-radius: 2px;
    box-shadow: 0 2px 2px -2px #000000;

    display: flex;
    align-items: center;
  }
  .add-column {
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: white;
    border-radius: 360px;
    height: 36px;
    font-size: 26px;

    padding: 10px;
    margin-top: 20px;
    margin-left: 20px;
  }
  .name {
    padding-left: 10px;
    width: 180px;
    box-shadow: 0 0 2px #5a5a5a;
    border-radius: 2px;
    background-color: #ffa726;
  }
  .pin-creator-input-div {
    width: 150px;
  }
  .hidden {
    display: none;
  }
  .pin-creator-input {
    margin-top: 10px;
    width: 150px !important;
  }
  .pin-creator-input-btn {
    box-shadow: 0 0 1px #5a5a5a;
    background-color: #e17100;
    text-align: center;
    width: 180px;
    height: 25px;
    outline: none;
    border: none;
  }
</style>
