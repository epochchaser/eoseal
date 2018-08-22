import * as types from '../actions/ActionTypes'

const initialState = {
  liquid: 0,
  cpuStaked: 0,
  netStaked: 0,
  ramStaked: 0
}

function actionReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_LIQUID:
      return {
        ...state,
        liquid: action.liquid
      }
    case types.UPDATE_CPU_STAKED:
      return {
        ...state,
        cpuStaked: action.cpuStaked
      }
    case types.UPDATE_NET_STAKED:
      return {
        ...state,
        netStaked: action.netStaked
      }
    case types.UPDATE_RAM_STAKED:
      return {
        ...state,
        ramStaked: action.ramStaked
      }
    default:
      return state
  }
}

export default actionReducer
