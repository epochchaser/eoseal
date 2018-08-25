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

export const showTransferView = () => {
  return { type: types.SHOW_TRANSFER_VIEW }
}

export const showTransferViewSuccess = pageInfo => {
  return { type: types.SHOW_TRANSFER_VIEW_SUCCESS, payload: pageInfo }
}

export const showTransferViewFailed = err => {
  return { type: types.SHOW_TRANSFER_VIEW_FAILED, payload: err }
}

export const closeTransferView = () => {
  return { type: types.CLOSE_TRANSFER_VIEW }
}

export const closeTransferViewSuccess = pageInfo => {
  return { type: types.CLOSE_TRANSFER_VIEW_SUCCESS, payload: pageInfo }
}

export const closeTransferViewFailed = err => {
  return { type: types.CLOSE_TRANSFER_VIEW_FAILED, payload: err }
}

export const getTokens = () => {
  return { type: types.GET_TOKENS }
}

export const getTokensSuccess = tokens => {
  return { type: types.GET_TOKENS_SUCCESS, payload: tokens }
}

export const getTokensFailed = err => {
  return { type: types.GET_TOKENS_FAILED, payload: err }
}

export const transferTokens = transferInfo => {
  return { type: types.TRANSFER_TOKENS, payload: transferInfo }
}

export const transferTokensSuccess = () => {
  return { type: types.TRANSFER_TOKENS_SUCCESS }
}

export const transferTokensFailed = err => {
  return { type: types.TRANSFER_TOKENS_FAILED, payload: err }
}
