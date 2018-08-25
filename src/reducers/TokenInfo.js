import * as types from '../actions/ActionTypes'
import * as values from '../constants/Values'

const initialState = {
  tokens: []
}

const TokenInfo = (state = initialState, { type, payload, err }) => {
  switch (type) {
    case types.GET_TOKENS_SUCCESS:
      return {
        ...state,
        tokens: payload.tokens
      }

    case types.GET_TOKENS_FAILED:
      return {
        ...state,
        showError: true,
        err
      }

    default:
      return state
  }
}

export default TokenInfo
