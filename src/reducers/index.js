import * as types from '../actions/ActionTypes'
import { combineReducers } from 'redux'
import AccountInfo from './AccountInfo'
import PageTransitionInfo from './PageTransitionInfo'
import TokenInfo from './TokenInfo'
import TransferToken from './TransferToken'

const reducers = combineReducers({
  accountInfo: AccountInfo,
  pageTransitionInfo: PageTransitionInfo,
  tokenInfo: TokenInfo,
  transferToken: TransferToken
})

export default reducers
