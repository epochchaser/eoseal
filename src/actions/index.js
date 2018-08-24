import * as types from './ActionTypes'

export const getAccountInfo = () => {
  return { type: types.GET_ACCOUNT_INFO }
}

export const getAccountInfoSuccess = accountInfo => {
  return { type: types.GET_ACCOUNT_INFO_SUCCESS, payload: accountInfo }
}

export const getAccountInfoFailed = err => {
  return { type: types.GET_ACCOUNT_INFO_FAILED, payload: err }
}
