import * as types from '../actions/ActionTypes'
import * as values from '../constants/Values'

const initialState = {
  httpEndpoint: values.httpEndpoint,
  keyProvider: '',
  chainId: values.NETWORK.chainId,
  sign: true,
  broadcast: true
}

const ConfigInfo = (state = initialState, { type, payload, err }) => {
  switch (type) {
    case types.UPDATE_EOS_PROVIDER_SUCCESS:
      return {
        ...state,
        ...payload
      }
    case types.UPDATE_EOS_PROVIDER_FAILED:
      return {
        ...state,
        showError: true,
        err
      }
    default:
      return state
  }
}

export default ConfigInfo
