import firebase from 'firebase'

export default {
  state: {
    boards: {},
    currentBoard: {}
  },
  mutations: {
    setBoards ( state, boards ) {
      state.boards = boards
    },
    setCurrentBoard ( state, board ) {
      state.currentBoard = board
    }
  },
  actions: {
    async fetchBoards({ commit }) {
      try {
        const userBoardsList = (await firebase.database().ref(`boards`).once('value')).val()
        commit('setBoards', userBoardsList)
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
    }
  },
  getters: {
    board: s => s.boards,
    getCurrentBoard: s => s.currentBoard
  }
}
