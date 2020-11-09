import firebase from 'firebase'

export  default {
  state: {
    info: {}
  },
  mutations: {
    setInfo (state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = {}
    }
  },
  actions: {
    async updateInfo ({dispatch, commit, getters}, toUpdate) {
       try {
         const uid = await dispatch('getUid')
         const upadateData = { ...getters.info, ...toUpdate }
         await firebase.database().ref(`/users/${uid}/info/`).update(upadateData)
         commit('setInfo', upadateData)
       } catch (e) {
         commit('setError', e)
         throw e
       }
    },
    async fetchInfo ({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid')
        const info =  (await firebase.database().ref(`users/${uid}/info`).once('value')).val()
        commit('setInfo', info)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  getters: {
    info: s => s.info
  }
}
