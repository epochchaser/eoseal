import * as types from './ActionTypes'

export const getAccountList = payload => {
  return { type: types.GET_ACCOUNT_LIST, payload }
}

export const getAccountListSuccess = accountInfo => {
  return { type: types.GET_ACCOUNT_LIST_SUCCESS, payload: accountInfo }
}

export const getAccountListFailed = err => {
  return { type: types.GET_ACCOUNT_LIST_FAILED, payload: err }
}

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

export const showRegisterStep = () => {
  return { type: types.SHOW_REGISTER_STEP }
}

export const showRegisterStepSuccess = pageInfo => {
  return { type: types.SHOW_REGISTER_STEP_SUCCESS, payload: pageInfo }
}

export const showRegisterStepFailed = err => {
  return { type: types.SHOW_REGISTER_STEP_FAILED, payload: err }
}

export const closeRegisterStep = () => {
  return { type: types.CLOSE_REGISTER_STEP }
}

export const closeRegisterStepSuccess = pageInfo => {
  return { type: types.CLOSE_REGISTER_STEP_SUCCESS, payload: pageInfo }
}

export const closeRegisterStepFailed = err => {
  return { type: types.CLOSE_REGISTER_STEP_FAILED, payload: err }
}

export const showLockScreen = () => {
  return { type: types.SHOW_LOCK_SCREEN }
}

export const showLockScreenSuccess = pageInfo => {
  return { type: types.SHOW_LOCK_SCREEN_SUCCESS, payload: pageInfo }
}

export const showLockScreenFailed = err => {
  return { type: types.SHOW_LOCK_SCREEN_FAILED, payload: err }
}

export const closeLockScreen = () => {
  return { type: types.CLOSE_LOCK_SCREEN }
}

export const closeLockScreenSuccess = pageInfo => {
  return { type: types.CLOSE_LOCK_SCREEN_SUCCESS, payload: pageInfo }
}

export const closeLockScreenFailed = err => {
  return { type: types.CLOSE_LOCK_SCREEN_FAILED, payload: err }
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

export const updateEosProvider = options => {
  return { type: types.UPDATE_EOS_PROVIDER, payload: options }
}

export const updateEosProviderSuccess = options => {
  return { type: types.UPDATE_EOS_PROVIDER_SUCCESS, payload: options }
}

export const updateEosProviderFailed = err => {
  return { type: types.UPDATE_EOS_PROVIDER_FAILED, payload: err }
}

export const updateAccountName = payload => {
  return { type: types.UPDATE_ACCOUNT_NAME, payload: payload }
}

export const updateAccountNameSuccess = payload => {
  return { type: types.UPDATE_ACCOUNT_NAME_SUCCESS, payload: payload }
}

export const updateAccountNameFailed = err => {
  return { type: types.UPDATE_ACCOUNT_NAME_FAILED, payload: err }
}
