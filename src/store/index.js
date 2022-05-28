import { createStore } from 'vuex'
import {getInfo, getHist} from '@/API/getCoins'
export default createStore({
  state: {
    value: null,
    reverseValue: null,
    histValues: {},
    cryptCurr: []
  },
  getters: {
  },
  mutations: {
    SET_COIN(state, payload){
     state.value = payload
    },
    SET_REVERSE(state, payload){
      state.reverseValue = payload
     },
     SET_USERCUR(state, payload){
      state.cryptCurr = payload
     },
     FETCH_HIST(state){
      state.histValues = {
        data: [],
        loading: true,
        error: null,
      }; 
    },
    FETCH_HIST_FAILURE(state, payload){
      state.histValues = {
        data: [],
        loading: false,
        error: payload,
      };
      console.log(state.histValues)
    },
    FETCH_HIST_SUCCESS(state, payload){
      state.histValues = {
        data: payload,
        loading: false,
        error: null,
      };
      console.log(state.histValues)
    },
  },
  actions: {
    async getCoin({commit}, payload){
      try{
      const value = await getInfo(payload)
  
      const transit  = payload.from 
      payload.from = payload.to 
      payload.to = transit

      const reverseValue = await getInfo(payload)
      commit('SET_COIN', Object.values(value)[0])
      commit('SET_REVERSE', Object.values(reverseValue)[0])
      }catch(error){
        console.error(error)
      }
    }, 
    async getHist ({commit}, payload){
      commit('FETCH_HIST')
      try {
        const promises = payload.dates.map(async (item) =>{
          const value = await getHist(payload.from, payload.to, item)
          return value 
        })
        let result = await Promise.all(promises)
        result = result.map( item => {
          return item[payload.from][payload.to] < 0.0001 ? item[payload.from][payload.to] * 100 : item[payload.from][payload.to]
        })
        commit('FETCH_HIST_SUCCESS', result)
      } catch (error) {
        commit('FETCH_HIST_FAILURE')
      }
    },
    async getCurr({commit}, payload){
      try {
        const promises = payload.map(async (item, index, array) => {
          let info = {from: item, to: array[2]}
          const value = await getInfo(info)
          return value
        })
        const result = await Promise.all(promises)
        commit('SET_USERCUR', [result[0]['USD'],result[1]['USD'] ])
      } catch (error) {
        console.error(error)
      }
    }
  },
  modules: {
  }
})
