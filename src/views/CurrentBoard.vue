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
        <div class="none-columns"
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
        </div>

        <div class="column_wrapper"
             v-else
        >
          <div class="row"
               style="margin-top: 20px"
          >
            <div class="col-3 form-inline">
              <b-form-input
                v-model="newTask"
                placeholder="Enter Task"
                @keyup.enter="addPin"
              >
              </b-form-input>
              <b-button
                @click="addPin"
                variant="primary"
                class="ml-3"
              >
                Add
              </b-button>
            </div>
            <div class="col-3 btn">
              <button
                class="ml-3"
                @click="applyChanges()"
              >
                Apply Changes
              </button>
            </div>
          </div>

          <div class="row mt-5">

            <div class="col-3"
                 v-for="item in allColumnsArr"
                 :key="allColumnsArr.indexOf(item)"
            >
              <div class="p-2 alert alert-success">
                <h3>{{allColumnsArrName[allColumnsArr.indexOf(item)]}}</h3>
                <draggable
                  v-model="allColumnsArr[allColumnsArr.indexOf(item)]"
                  class="list-group kanban-column"
                  :list="allColumnsArr[item]"
                  group="tasks"
                >
                  <div class="list-group-item"
                       v-for="element in allColumnsArr[allColumnsArr.indexOf(item)]"
                       :key="element.id"
                  >
                    {{ element.name }}
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
              <div class="add_column_input_div"
                   v-else
              >
                <form @submit.prevent="addColumn">
                  <input class="add_column_input_div"
                         type="text"
                         placeholder="Enter column name"
                         v-model="columnName"
                  >
                  <button class="ml-3" type="submit">
                    Add column
                  </button>
                </form>
              </div>
            </div>

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

      // Add a native mas
      addPin () {
        if (this.newTask) {
          this.allColumnsArr[0].push({
            name: this.newTask,
            id: Number(`1${this.allColumnsArr[0].length + 1}`)
          })
          console.log(this.allColumnsArr[0])
          this.newTask = ''
        }
      },
      addColumn () {
        if (this.columnName) {
          this.allColumnsArr.push([])
          this.allColumnsArrName.push(this.columnName)
          this.columnName = ''
          this.columnCreator = false
        }
      },
      async applyChanges () {
        this.allColumnsArr.forEach(item => {
          item.forEach(el => {
            const itemId = this.allColumnsArr.indexOf(item)
            el.id = Number(`${itemId + 1}${this.allColumnsArr[itemId].indexOf(el) + 1}`)
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

        // console.log(this.$route.params.id)
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
        }
      } catch (e) {}
      this.loading = false
    }
  }
</script>

<style scoped>
  .kanban-column {
    min-height: 300px;
  }

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
    background-color: #ffa726;
  }

  .add_btn p::selection {
    background: transparent;
  }
</style>
