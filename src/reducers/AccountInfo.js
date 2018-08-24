import * as types from '../actions/ActionTypes'

const initialState = {
  liquid: 0,
  totalBalance: 0,
  cpu_staked: 0,
  cpu_usage: 0,
  net_staked: 0,
  net_usage: 0,
  ram_usage: 0
}

const AccountInfo = (state = initialState, { type, payload, err }) => {
  switch (type) {
    case types.GET_ACCOUNT_INFO_SUCCESS:
      const hm = {
        ...state,
        ...payload
      }

      return hm
    case types.GET_ACCOUNT_INFO_FAILED:
      return {
        ...state,
        showError: true,
        err
      }
    default:
      return state
  }
}

export default AccountInfo
