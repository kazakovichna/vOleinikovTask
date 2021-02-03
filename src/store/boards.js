import firebase from 'firebase'

export default {
  state: {
    boards: [],
    boardsList: [],
    currentBoard: {}
  },
  mutations: {
    setBoards ( state, boards ) {
      state.boards = boards
    },
    setBoardList ( state, boardsList ) {
      state.boardsList = boardsList
    },
    setCurrentBoard ( state, board ) {
      state.currentBoard = board
    }
  },
  actions: {
    async fetchBoards({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')
        const userBoardList = (await firebase.database().ref(`users/${uid}/boardList`).once('value')).val()

        let userBoards = []
        for (const item of Object.values(userBoardList)) {
          const userBoard = (await firebase.database().ref(`boards/${item.name}`).once('value')).val()
          userBoards.push(userBoard)
        }
        commit('setBoards', userBoards)
        commit('setBoardList', userBoardList)
      }
      catch (e) {
        console.log(e)
        throw e
      }
    },
    async fetchBoardsById ({ commit }, id) {
      try {
        const currentBoard = (await firebase.database().ref(`boards/${id}`).once('value')).val()
        commit('setCurrentBoard', currentBoard)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createBoard({ commit, dispatch }, { name, description }) {
      try {
        await firebase.database().ref(`/boards`).push({name, description})
      }
      catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async applyChangesAct ({ commit, dispatch }, { boardId, columns} ) {
      try {
        await firebase.database().ref(`/boards/${boardId}/columns`).set(columns)
        console.log('yep')
      } catch (e) {
        throw e
      }
    }
  },
  getters: {
    board: s => s.boards,
    boardList: s => s.boardsList,
    getCurrentBoard: s => s.currentBoard
  }
}
