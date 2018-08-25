import * as types from '../actions/ActionTypes'
import * as values from '../constants/Values'

const initialState = {
  contract: '',
  authority: 'active',
  accountName: '',
  recipient: '',
  symbol: '',
  quantity: 0,
  memo: ''
}

const TransferToken = (state = initialState, { type, payload, err }) => {
  switch (type) {
    case types.TRANSFER_TOKENS_SUCCESS:
      return {
        ...state
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

export default TransferToken
