import firebase from 'firebase'

export default {
  state: {
    boards: {},
    boardsList: {},
    currentBoard: {}
  },
  mutations: {
    setBoards ( state, boards ) {
      state.boards = boards
    },
    setBoardList ( state, boardsList ) {
      state.boardsList = Object.values(boardsList)
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
    async fetchBoardsById ({ dispatch, commit }, id) {
      const uid = await dispatch('getUid')
      const boardId = (await firebase.database().ref(`users/${uid}/boardList`).once('value')).val()
      let isBoardFind = false
      Object.values(boardId).forEach(item => { if( item.name === id ) { isBoardFind = true } })

      if (isBoardFind) {
        try {
          const currentBoard = (await firebase.database().ref(`boards/${id}`).once('value')).val()
          commit('setCurrentBoard', currentBoard)
        } catch (e) {
          commit('setError', e)
          throw e
        }
      }
    },
    async createBoard({ commit, dispatch }, { name, description }) {
      try {
        await firebase.database().ref(`/boards`).push({name, description})
        const boardIdList = (await firebase.database().ref(`/boards`).once('value')).val()
        const boardId = Object.keys(boardIdList)[Object.keys(boardIdList).length - 1]
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/boardList`).push({name: boardId})
      }
      catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async applyChangesAct ({ commit, dispatch }, { boardId, columns} ) {
      try {
        await firebase.database().ref(`/boards/${boardId}/columns`).set(columns)
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
