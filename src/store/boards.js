import firebase from 'firebase'

export default {
  state: {
    boards: {}
  },
  mutations: {
    setBoards ( state, boards ) {
      state.boards = boards
    }
  },
  actions: {
    async fetchBoards({  commit }) {
      try {
        // const uid = await dispatch('getUid')
        const userBoardsList = (await firebase.database().ref(`boards`).once('value')).val()
        commit('setBoards', userBoardsList)
      }
      catch (e) {
        console.log(e)
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
    board: s => s.boards
  }
}
