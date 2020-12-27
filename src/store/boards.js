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
    async fetchBoards({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        const userBoardsList = (await firebase.database().ref(`users/${uid}/boards`).once('value')).val()
        commit('setBoards', userBoardsList)
      }
      catch (e) {
        console.log(e)
        throw e
      }
    }
  },
  getters: {
    board: s => s.boards
  }
}
