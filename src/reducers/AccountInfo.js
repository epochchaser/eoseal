import * as types from '../actions/ActionTypes'

const initialState = {
  liquid: 0,
  totalBalance: 0,
  cpu_staked: 0,
  cpu_usage: 0,
  net_staked: 0,
  net_usage: 0,
  ram_usage: 0,
  accountName: ''
}

const AccountInfo = (state = initialState, { type, payload, err }) => {
  switch (type) {
    case types.GET_ACCOUNT_INFO_SUCCESS:
      return {
        ...state,
        ...payload
      }
    case types.GET_ACCOUNT_INFO_FAILED:
      return {
        ...state,
        showError: true,
        err
      }

    case types.REFRESH_ACCOUNT_INFO_SUCCESS:
      return {
        ...state,
        ...payload
      }

    case types.REFRESH_ACCOUNT_INFO_FAILED:
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
