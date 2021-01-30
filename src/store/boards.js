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
    },
    sutPinsToCurrentBoard ( state, { col, index } ) {
      Object.values(state.currentBoard.columns)[index].pins = col.pins
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
    },
    async createColumn({ commit, dispatch }, { name, boardId } ) {
      try {
        await firebase.database().ref(`/boards/${boardId}/columns`).push({ name })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createPinAct({ commit }, { boardId, board, index, data }) {
      try {
        await firebase.database().ref(`/boards/${boardId}/columns/${Object.keys(board.columns)[index]}/pins`).push(data)

        const currentCol = (await firebase.database().ref(`/boards/${boardId}/columns/${Object.keys(board.columns)[index]}`).once('value')).val()

        const pinInfo = {
          col: currentCol,
          index: index
        }

        commit('sutPinsToCurrentBoard', pinInfo)
      } catch (e) {
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
