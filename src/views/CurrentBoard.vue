<template>
  <div class="current-board">
    <loader v-if="loading"/>
    <div class="wrapper"
         v-else
    >

      <div class="board-name">
        <p id="boardName">{{ curBoard.name }}</p>
        <p id="boardDes">{{ curBoard.description }}</p>
      </div>


      <div class="tables-div">
        <div class="header-div">

          <div class="create-pin p-2"
               style="margin-top: 20px"
               v-if="allColumnsArr.length !== 0"
          >
            <b-form-input
              v-model="newTask"
              placeholder="Enter Task"
              @keyup.enter="addPin"
            >
            </b-form-input>
            <b-button
              @click="addPin"
            >
              Add
            </b-button>
          </div>
          <div class="col-3">
            <div class="update-div waves-effect waves-light"
                 @click="updateBoard()"
            >
              <p>Update</p>
            </div>
          </div>
        </div>

        <div class="row mt-5">

          <div class="col-3"
               v-for="item in allColumnsArr"
               :key="allColumnsArr.indexOf(item)"
          >
            <div class="p-2 column">
              <div class="col-label">
                <h3>{{allColumnsArrName[allColumnsArr.indexOf(item)]}}</h3>
                <div class="list-group-item-bucket material-icons"
                     @click="dltCol(item)"
                >delete_outline</div>
              </div>
              <draggable
                v-model="allColumnsArr[allColumnsArr.indexOf(item)]"
                class="list-group kanban-column"
                :list="allColumnsArr[item]"
                group="tasks"
              >
                <div class="list-group-item"
                     v-for="element in allColumnsArr[allColumnsArr.indexOf(item)]"
                     :key="element.name"
                >
                  <div>{{ element.name }}</div>
                  <div class="list-group-item-bucket material-icons"
                       @click="dltPin(element)"
                  >delete_outline</div>
                </div>
              </draggable>
            </div>
          </div>

          <div class="col-3 add_column">
            <div class="add_btn waves-effect waves-light"
                 v-if="columnCreator === false"
                 @click="columnCreator = true"
            >
              <p>+</p>
            </div>
            <div class="create-col"
                 v-else
            >
              <form @submit.prevent="addColumn">
                <b-form-input class="add_column_input_div"
                       type="text"
                       placeholder="Enter column name"
                       v-model="columnName"
                ></b-form-input>
                <b-button type="submit">
                  Add column
                </b-button>
              </form>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-3 apply-changes waves-effect waves-light"
               @click="applyChanges()"
               style="margin-top: 10px!important; margin-left: 15px;"
          >
            Apply Changes
          </div>
          <div class="col-8">
            <span class="copy-div-ins">Send that code to people you want to invite</span>
            <span class="copy-div">{{this.$route.params.id}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { required } from 'vuelidate/lib/validators'
  import draggable from 'vuedraggable'

  export default {
    name: 'CurrentBoard',
    components: {
      draggable
    },
    data: () => ({
      newTask: '',

      allColumnsArrName: [],
      allColumnsArr: [],

      curBoard: {},
      loading: true,
      columnCreator: false,

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
        'applyChangesAct'
      ]),
      async dltCol(itm) {
        console.log(this.allColumnsArr.indexOf(itm))
        await this.applyChanges()

        this.loading = true
        // console.log(this.allColumnsArrName[this.allColumnsArr.indexOf(itm)])
        await this.allColumnsArrName.splice(this.allColumnsArr.indexOf(itm), 1)
        // console.log(this.allColumnsArr[this.allColumnsArr.indexOf(itm)])
        await this.allColumnsArr.splice(this.allColumnsArr.indexOf(itm), 1)
        // console.log(this.allColumnsArr[this.allColumnsArr.indexOf(itm)])
        this.loading = false

        await this.applyChanges()
      },
      async dltPin(el) {
        await this.applyChanges()

        this.loading = true
        await this.allColumnsArr[el.id.x - 1].splice([el.id.y - 1], 1)
        this.loading = false

        await this.applyChanges()
      },
      async updateBoard() {
        try {
          // await this.applyChanges()
          this.loading = true
          await this.fetchBoardsById(this.$route.params.id)
          this.curBoard = this.getCurrentBoard

          if ( Object.values(this.curBoard).length === 0 ) {
            this.$router.push('/')
          }

          this.allColumnsArr.length = Object.keys(this.curBoard.columns).length
          this.allColumnsArrName.length = this.allColumnsArr.length

          if (this.curBoard.columns !== undefined) {
            for (let item = 0; item < Object.keys(this.curBoard.columns).length; item++) {
              this.allColumnsArr[item] = []
              if (Object.values(this.curBoard.columns)[item].pins !== undefined) {
                this.allColumnsArr[item] = Object.values(Object.values(this.curBoard.columns)[item].pins)
              }
              this.allColumnsArrName[item] = Object.values(this.curBoard.columns)[item].name
            }
          } else {
            this.allColumnsArr = []
            this.allColumnsArrName = []
          }
        } catch (e) {}
        this.loading = false
      },
      async addPin () {
        if (this.allColumnsArr.length === 0) {
          this.newTask = ''
          return
        }
        if (this.newTask) {
          this.allColumnsArr[0].push({
            name: this.newTask,
            id: {
              x: 1,
              y: this.allColumnsArr[0].length + 1
            }
          })
          // console.log(this.allColumnsArr[0][this.allColumnsArr[0].length - 1])
          this.newTask = ''
          await this.applyChanges()
        }
      },
      addColumn () {
        if (this.columnName) {
          this.allColumnsArr.push([])
          this.allColumnsArrName.push(this.columnName)
          this.columnName = ''
          this.columnCreator = false
        }
        this.applyChanges()
      },
      async applyChanges () {
        this.allColumnsArr.forEach(item => {
          item.forEach(el => {
            const itemId = this.allColumnsArr.indexOf(item)
            // el.id = Number(`${itemId + 1}${this.allColumnsArr[itemId].indexOf(el) + 1}`)
            el.id.x = itemId + 1
            el.id.y = this.allColumnsArr[itemId].indexOf(el) + 1
            // console.log(el.id)
          })
        })

        const newColumns = []
        this.allColumnsArr.forEach(item => {
          const column = {
            name: this.allColumnsArrName[this.allColumnsArr.indexOf(item)],
            pins: item
          }
          newColumns.push(column)
        })

        const payload = {
          boardId: this.$route.params.id,
          columns: newColumns
        }
        await this.applyChangesAct(payload)
      }
    },
    async mounted () {
      try {
        await this.fetchBoardsById(this.$route.params.id)
        this.curBoard = this.getCurrentBoard

        if ( Object.values(this.curBoard).length === 0 ) {
          this.$router.push('/')
        }

        this.allColumnsArr.length = Object.keys(this.curBoard.columns).length
        this.allColumnsArrName.length = this.allColumnsArr.length

        console.log(this.curBoard.columns)

        if (this.curBoard.columns !== undefined) {
          for (let item = 0; item < Object.keys(this.curBoard.columns).length; item++) {
            this.allColumnsArr[item] = []
            if (Object.values(this.curBoard.columns)[item].pins !== undefined) {
              this.allColumnsArr[item] = Object.values(Object.values(this.curBoard.columns)[item].pins)
            }
            this.allColumnsArrName[item] = Object.values(this.curBoard.columns)[item].name
          }
        } else {
          this.allColumnsArr = []
          this.allColumnsArrName = []
        }
      } catch (e) {}
      this.loading = false
    }
  }
</script>

<style scoped>
  .col-label {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .header-div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .update-div {
    width: 120px;
    padding: 10px;
    box-shadow: 0 0 2px #000000;
    background-color: #f0f8ff;
    border-radius: 4px;

    font-size: 20px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .update-div p {
    margin: 0;
  }
  .update-div:hover {
    background-color: #414f52;
    color: white;
    border-width: 1px;
    border-style: solid;
    border-color: white;
    box-shadow: none;
  }
  .kanban-column {
    min-height: 300px;
  }
  .current-board {
    width: 90%;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    background-color: #b0bcbd;
    box-shadow: 0 0 2px #000000;
  }
  .board-name {
    height: 60px;
    padding: 0 20px 0 20px;
    font-family: "Lucida Console", sans-serif;
    font-weight: 900;
    background-color: #414f52;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  #boardName {
    font-size: 35px;
    margin: 0!important;
  }
  #boardDes {
    font-size: 22px;
    margin: 0!important;
  }
  .tables-div {
    padding: 10px;
  }
  .list-group-item {
    font-size: 16px;
    font-weight: 900;
    font-family: "Lucida Console", sans-serif;
    box-shadow: 0 3px 6px -3px #5a5a5a;
    color: black;
    cursor: pointer;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    background-color: #b0baba;
  }
  .list-group-item:hover {
    background-color: #414f52;
    color: white;
  }
  .list-group-item-bucket {
    cursor: pointer;
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
  .create-column-form form {
    margin-left: 12px;
    display: flex;
    flex-direction: column;
  }
  .create-column-form form button {
    width: 200px;
  }
  .add_btn {
    width: 40px;
    height: 40px;
    cursor: pointer;
    font-size: 24px;

    display: flex;
    justify-content: center;
    border-radius: 360px;
    background-color: #f0f8ff;
    box-shadow: 0 3px 6px -3px #5a5a5a;
  }
  .add_btn:hover {
    background-color: #414f52;
    color: white;
  }
  .add_btn p::selection {
    background: transparent;
  }
  .copy-div{
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: "Lucida Console", sans-serif;
    font-size: 18px;
    font-weight: 900;
    opacity: 0.9;
  }
  .copy-div-ins {
    display: flex;
    justify-content: center;
    align-items: center;

    box-shadow: none;
    margin: 0;

    font-family: "Lucida Console", sans-serif;
    font-size: 14px;
    font-weight: 900;
    opacity: 0.7;
    text-align: right;
  }
  .copy-div span {
    padding: 10px;
    margin: 0;

    box-shadow: 0 0 2px #5a5a5a;
    background-color: #ffffff;
  }
  .copy-div::selection {
    color: white;
    background-color: #414f52;
  }
  .column {
    box-shadow: 0 4px 8px -3px #5a5a5a;
    background-color: aliceblue;
    margin-bottom: 40px;
  }
  .create-pin {
    padding: 5px;
    box-shadow: 0 4px 8px -3px #5a5a5a;
    background-color: aliceblue;
  }
  .create-col {
    padding: 10px;
    box-shadow: 0 4px 8px -3px #5a5a5a;
    background-color: aliceblue;
  }
  .apply-changes {
    box-shadow: 0 4px 8px -3px #5a5a5a;
    background-color: aliceblue;
    border-radius: 4px;
    border-style: solid;
    border-color: #414f52;
    border-width: 1px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .apply-changes:hover {
    background-color: #414f52;
    color: white;
    border-color: white;
  }
</style>
