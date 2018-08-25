import * as types from './ActionTypes'

export const getAccountInfo = payload => {
  return { type: types.GET_ACCOUNT_INFO, payload }
}

export const getAccountInfoSuccess = accountInfo => {
  return { type: types.GET_ACCOUNT_INFO_SUCCESS, payload: accountInfo }
}

export const getAccountInfoFailed = err => {
  return { type: types.GET_ACCOUNT_INFO_FAILED, payload: err }
}

export const refreshAccountInfo = payload => {
  return { type: types.REFRESH_ACCOUNT_INFO, payload }
}

export const refreshAccountInfoSuccess = accountInfo => {
  return { type: types.REFRESH_ACCOUNT_INFO_SUCCESS, payload: accountInfo }
}

export const refreshAccountInfoFailed = err => {
  return { type: types.REFRESH_ACCOUNT_INFO_FAILED, payload: err }
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

export const getTokens = payload => {
  return { type: types.GET_TOKENS, payload }
}

export const getTokensSuccess = payload => {
  return { type: types.GET_TOKENS_SUCCESS, payload }
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

export const updateEosOptions = options => {
  return { type: types.UPDATE_EOS_OPTIONS, payload: options }
}

export const updateEosOptionsSuccess = options => {
  return { type: types.UPDATE_EOS_OPTIONS_SUCCESS, payload: options }
}

export const updateEosOptionsFailed = err => {
  return { type: types.UPDATE_EOS_OPTIONS_FAILED, payload: err }
}
