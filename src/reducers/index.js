import * as types from '../actions/ActionTypes'
import { combineReducers } from 'redux'
import AccountInfo from './AccountInfo'
import PageTransitionInfo from './PageTransitionInfo'
import TokenInfo from './TokenInfo'
import TransferToken from './TransferToken'
import ConfigInfo from './ConfigInfo'

const reducers = combineReducers({
  accountInfo: AccountInfo,
  pageTransitionInfo: PageTransitionInfo,
  tokenInfo: TokenInfo,
  transferToken: TransferToken,
  configInfo: ConfigInfo
})

export default reducers
